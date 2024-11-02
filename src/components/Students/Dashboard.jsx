import React, { useEffect, useState, useRef } from 'react';
import Sidebar from '../Faculty/Sidebar/sidebar';
import Button from '../ui/Button';

export default function Dashboard() {
  const [exams, setExams] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const getExams = async () => {
      const response = await fetch('http://localhost:3000/exam', {
        method: 'GET',
        credentials: 'include',
      });
      const data = await response.json();
      setExams((prev) => [...data.data]);
    };
    getExams();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col p-5 flex-1 bg-white" ref={containerRef}>
        <p className="text-gray-700 text-4xl font-semibold border-b-2 w-full pb-5 mb-5">
          Student Dashboard
        </p>
        {exams && (
          <div className="border rounded-xl shadow-sm max-h-80 overflow-hidden">
            <p className="text-xl font-semibold text-gray-700 p-4">
              Recent Exams
            </p>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 border-0">
              <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Sr. No.
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Exam
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Date & Time
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {exams.map((exam, index) => (
                  <tr
                    key={index}
                    className="odd:bg-white  even:bg-gray-50 border-b "
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                    >
                      {index + 1}
                    </th>
                    <td className="px-6 py-4">{exam.examName}</td>
                    <td className="px-6 py-4">
                      {new Date(exam.startDate).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      {(() => {
                        const startTime = new Date(exam.startDate).getTime();
                        const currentTime = Date.now();
                        const endTime = startTime + exam.duration * 60000; // Total duration in milliseconds
                        const halfDurationEndTime =
                          startTime +
                          (exam.duration - exam.duration / 2) * 60000; // Half duration end time

                        if (currentTime > endTime) {
                          // Exam is over
                          return (
                            <p className="rounded-full bg-green-100 text-green-700 font-medium text-xs px-3 py-2 w-fit">
                              View Result
                            </p>
                          );
                        } else if (
                          currentTime >= startTime &&
                          currentTime < halfDurationEndTime
                        ) {
                          // Exam is ongoing
                          return (
                            <button
                              type="button"
                              key={exam._id}
                              className="rounded bg-blue-600 font-medium px-4 py-2 text-white hover:bg-blue-700"
                            >
                              Attempt Now
                            </button>
                          );
                        } else if (currentTime < startTime) {
                          // Exam hasn't started yet
                          return (
                            <p className="rounded-full bg-yellow-100 text-yellow-700 font-medium text-xs px-3 py-2 w-fit">
                              Exam Not Started Yet
                            </p>
                          );
                        } else {
                          // Entrance time limit exceeded
                          return (
                            <p className="rounded-full bg-red-300 text-red-700 font-medium text-xs px-3 py-2 w-fit">
                              Entrance Time Limit Exceeded
                            </p>
                          );
                        }
                      })()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
