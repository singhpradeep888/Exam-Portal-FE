import React, { useEffect, useState } from 'react';
import Sidebar from '/src/components/Sidebar/sidebar';
import { Input } from '../../ui/Input';
import Button from '../../ui/Button';
import { useParams, useNavigate } from 'react-router-dom';
import { read, utils } from 'xlsx';
import { Link } from 'react-router-dom';

const Examinees = () => {
  const [existingExaminees, setExistingExaminees] = useState([]);
  const examId = useParams().examId;
  const navigateTo = useNavigate();

  useEffect(() => {
    async function checkExamExistence() {
      try {
        const response = await fetch(`http://localhost:3000/exam/${examId}`, {
          method: 'GET',
          credentials: 'include',
        });

        const data = await response.json();

        if (!response.ok) {
          console.log(`Exam Error:: ${data.message}`);
          navigateTo('/exams');
        }
      } catch (err) {
        console.log(`Exam Error:: ${err.message}`);
        navigateTo('/exams');
      }
    }

    async function getExaminees() {
      try {
        const response = await fetch(
          `http://localhost:3000/exam/${examId}/examinees`,
          {
            method: 'GET',
            credentials: 'include',
          }
        );
        const data = await response.json();
        setExistingExaminees(data.data);
      } catch (error) {
        console.error('Examinee error:', error.message);
      }
    }
    checkExamExistence();
    getExaminees();
  }, [examId]);

  const initialState = {
    examinees: {},
  };

  const [data, setData] = useState(initialState);

  const handleData = (e) => {
    const { name, files } = e.target;

    if (!isExcelFile(files[0].type, files[0].name.split('.').pop())) {
      alert('Please provide an excel file');
      return;
    }

    readExcel(files[0], name);
  };

  function isExcelFile(mimeType, extension) {
    const allowedMimes = [
      'application/vnd.ms-excel', // For .xls files
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // For .xlsx files
      'application/vnd.oasis.opendocument.spreadsheet', // For .ods files
    ];
    const isValidMime = allowedMimes.includes(mimeType);
    const extName = /xls|xlsx|ods/.test(extension.toLowerCase());
    return isValidMime && extName;
  }

  function readExcel(file, name) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = read(data, { type: 'array' });

      // Convert the sheet to JSON
      const examinees = utils.sheet_to_json(
        workbook.Sheets[workbook.SheetNames[0]]
      );
      setData((prev) => ({ ...prev, [name]: examinees }));
    };

    reader.readAsArrayBuffer(file);
  }

  const handleSubmission = async (e) => {
    e.preventDefault();

    if (Object.keys(data.examinees).length == 0) {
      alert(`Please add the examinees sheet`);
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/examinees', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: JSON.stringify(data), examId: examId }),
      });

      const res = await response.json();
      if (!response.ok) {
        alert(`Failed to add examinees, ${res.message}`);
        return;
      }

      alert('Examinees inserted');
    } catch (err) {
      alert('Failed to add examinees to exam');
      console.log(`ADD EXAMINEES ERROR::: ${err}`);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-1 flex-col p-4 w-full h-screen gap-4">
        <h1 className="text-4xl font-bold text-gray-700 py-4 border-b">
          Add Examinees
        </h1>

        <div className="border rounded p-4 ">
          <div className="flex items-end gap-4">
            <div>
              <Input
                label="Upload Examinees sheet"
                type="file"
                name="examinees"
                onChange={handleData}
              />
            </div>
            <Button className="h-min" onClick={handleSubmission}>
              Upload examinees
            </Button>
          </div>
          <p className="mt-4 text-gray-400 italic text-xs">
            NOTE: Examinees email that doesn't have student account with us will
            be created.
          </p>
        </div>

        <div className="flex-1 overflow-y-auto">
          {Object.keys(data.examinees).length > 0 ? (
            <>
              <h1 className="text-2xl text-gray-500 mt-4">Examinees</h1>
              <div className="relative overflow-x-auto border sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Sr. No.
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Email
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.examinees.map((examinee, index) => (
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
                        <td className="px-6 py-4">{examinee['Name']}</td>
                        <td className="px-6 py-4">{examinee['Email']}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <></>
          )}

          {existingExaminees.length > 0 ? (
            <>
              <h1 className="text-2xl text-gray-500 mt-4">
                Existing Examinees
              </h1>
              <div className="relative overflow-x-auto border sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Sr. No.
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Email
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {existingExaminees.map((examinee, index) => (
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
                        <td className="px-6 py-4">{examinee.username}</td>
                        <td className="px-6 py-4">{examinee.email}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>

        <div className="border-t flex justify-end pt-4 gap-4">
          <Link
            to="/exams"
            className="px-8 py-3 rounded bg-blue-700 text-white"
          >
            Finish
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Examinees;
