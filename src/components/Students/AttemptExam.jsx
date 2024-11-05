import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import logo from '../../../src/Logo.svg';

export default function AttemptExam() {
  const navigateTo = useNavigate();
  const location = useLocation();
  const examId = location.state?.examId;
  const [exam, setExam] = useState({});
  const [sections, setSections] = useState([]);
  const [isContVisible, setContVisible] = useState(true);

  useEffect(() => {
    !examId && navigateTo('/dashboard');
    const examEntranceValidity = async () => {
      try {
        const response = await fetch(
          'http://localhost:3000/exam/attempt-exam',
          {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ examId: examId }),
          }
        );

        const exam = (await response.json()).data;
        const startTime = new Date(exam.examDetails[0].startDate).getTime();
        const endEntranceTime =
          startTime +
          (exam.examDetails[0].duration - exam.examDetails[0].duration / 2) *
            60000;
        const currTime = Date.now();
        const entranceAllowed =
          currTime >= startTime && currTime < endEntranceTime;
        if (!entranceAllowed) {
          alert('Exam entrance not allowed');
          return navigateTo('/dashboard');
        }
        setExam((prev) => ({ ...exam.examDetails[0] }));
      } catch (err) {
        console.log(err);
      }
    };

    examEntranceValidity();
  }, []);

  const getSections = async () => {
    setSections((prev) => []);
    try {
      const url = `http://localhost:3000/exam/${examId}/section`;
      const response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
      });

      const data = await response.json();
      if (!response.ok) {
        alert(`${data.message}`);
        return;
      }
      data.data.forEach((section) =>
        setSections((prev) => [...prev, { ...section, attempted: false }])
      );
    } catch (ex) {
      alert(`Failed to get sections, ${ex.message}`);
    }
  };

  const handleAttempt = () => {
    /**
     * Steps:
     * TODO: -> Get the permissions from the user
     * TODO: -> Clear the screen
     * TODO: -> Go into Full Screen Mode
     * -> Get the sections and display them
     * -> Start the exam according to the section wise
     */

    // Get the sections of the exam.
    getSections();
    setContVisible(false);
  };

  return (
    <>
      {isContVisible && (
        <div
          id="container"
          className="flex justify-center items-center w-full h-svh bg-gray-100"
        >
          <div className="flex flex-col gap-12">
            <div>
              <p className="text-3xl text-gray-600">Hello,</p>
              <p className="text-6xl text-gray-800">Examinee</p>
            </div>
            <div>
              <p className="text-lg text-gray-600">
                Exam Title:{' '}
                <span className="uppercase text-gray-800">{exam.title}</span>
              </p>
              <p className="text-lg text-gray-600">
                Duration:{' '}
                <span className="uppercase text-gray-800">
                  {exam.duration} Minute(s)
                </span>
              </p>
            </div>
            <button
              className="text-xl text-white bg-blue-700 rounded cursor-pointer px-10 py-6"
              onClick={handleAttempt}
            >
              Attempt Now
            </button>
          </div>
        </div>
      )}
      {!isContVisible && (
        <div className="flex w-full h-svh justify-center bg-gray-100 p-5">
          <div className="w-2/3 h-full bg-white shadow-2xl rounded-xl p-5 relative">
            <p className="font-bold text-2xl text-gray-700">Sections</p>

            <div className="mt-8">
              {sections &&
                sections.map((section, idx) => {
                  console.log('Section rendered', section, idx);
                  return (
                    <div
                      key={section._id}
                      className="p-4 rounded border flex justify-between items-center "
                    >
                      <div>
                        <p className="font-bold text-lg font-gray-600">
                          {section.title}
                        </p>
                        <p>
                          Duration:{' '}
                          <span className="font-bold">
                            {section.duration} Minutes
                          </span>
                        </p>
                      </div>
                      {/* TODO: Start Working Here add button to start the section */}
                      <button
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                        onClick={() =>
                          navigateTo('/attempt-exam/attempt-question', {
                            state: { section: section, examId: examId },
                          })
                        }
                      >
                        Attempt Now
                      </button>
                    </div>
                  );
                })}
            </div>

            <div className="absolute bottom-0 flex justify-center items-center w-full gap-4 mb-5">
              <p className="text-gray-600 font-medium">Exam Portal by </p>
              <img src={logo} alt="" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
