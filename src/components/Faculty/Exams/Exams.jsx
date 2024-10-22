import { useState, useEffect } from 'react';
import Sidebar from '../../Sidebar/sidebar';
import React from 'react';
import './exams.css';
import { Link } from 'react-router-dom';

const Exams = () => {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    async function fetchExams() {
      try {
        const request = await fetch('http://localhost:3000/exam', {
          credentials: 'include',
        });
        const data = await request.json();

        if (!request.ok) {
          alert(`Failed to retrieve exams,\n${data.message}, ${data?.error}`);
          return;
        }

        if (data.data.length === 0) {
          const p = document.createElement('p');
          p.appendChild(document.createTextNode(`No exams found`));
          console.log(p);
          document.getElementById('examsList').appendChild(p);
          return;
        }

        setExams([]);
        for (const exam of data.data) {
          setExams((prev) => [...prev, exam]);
        }
      } catch (err) {
        alert(`Failed to retrive exams`);
        console.log(`Exam Fetch Error:: ${err.message}`);
      }
    }

    fetchExams();
  }, []);

  const formInitialStates = {
    title: '',
    duration: '',
    startDate: '',
  };

  const [examData, setData] = useState(formInitialStates);

  function handleData(e) {
    //  e.target.value should not be negative
    //  and should only accept integer value not floating values.
    if (e.target.name === 'duration') {
      const intValue = parseInt(e.target.value, 10);
      if(isNaN(intValue) || intValue < 0 ||  value.trim() === '' || value.includes('.')) {
        return;
      }
      
    }

    setData({
      ...examData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmission(e) {
    e.preventDefault();

    if (!examData.title || !examData.duration || !examData.startDate) {
      alert('Incomplete Data');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/exam/', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(examData),
      });

      const data = await response.json();

      if (!response.ok) {
        console.log('Request failed', data.message);
        return;
      }
      // storing Exam ID in session for further usage.
      sessionStorage.setItem('exam', data.data.id);
      setData(formInitialStates);
      alert('Exam Created');
    } catch (err) {
      console.log(`Create Exam Error:: ${err.message}`);
    }
  }

  function handleReset(e) {
    e.preventDefault();
    setData(formInitialStates);
    console.log(examData);
  }

  return (
    <div className="exam-main">
      <Sidebar />
      <div className="exam-container flex-col gap-4 justify-start items-start">
        <form onSubmit={handleSubmission} className="exam-form w-full">
          <h1>Let's create an Exam.</h1>
          <div className="flex gap-4 w-full">
            <div className="exam-input-container flex-1">
              <label htmlFor="title">Exam Title</label>
              <input
                type="text"
                name="title"
                id="title"
                value={examData.title}
                onChange={handleData}
                placeholder="Title of exam"
              />
            </div>
            <div className="exam-input-container flex-1">
              <label htmlFor="duration">Exam Duration (in minutes)</label>
              <input
                type="number"
                name="duration"
                id="duration"
                value={examData.duration}
                onChange={handleData}
                placeholder="Duration of exam"
              />
            </div>
            <div className="exam-input-container flex-1">
              <label htmlFor="startDate">Exam Date</label>
              <input
                type="date"
                name="startDate"
                id="startDate"
                value={examData.startDate}
                onChange={handleData}
                placeholder="Date of exam"
              />
            </div>
          </div>
          <div className="w-full flex justify-end items-center gap-4 mt-2">
            <input type="submit" value="Create" />
            <input type="reset" onClick={handleReset} />
          </div>
        </form>
        <div className='w-full'>
          <h1 className="text-2xl pt-4 border-t">Scheduled Exams</h1>
          <div id="examsList" className='flex flex-col w-full gap-4'>
            {exams.map((item, index) => {
              return (
                <Link to={`/exams/${item._id}/sections`} key={index} className='text-xl font-bold underline text-blue-500 p-4 border rounded w-1/2 cursor-pointer hover:bg-blue-50'>
                  {item.title}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exams;
