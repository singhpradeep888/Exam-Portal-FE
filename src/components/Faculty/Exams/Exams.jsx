import { useState } from 'react';
import Sidebar from '../../Sidebar/sidebar';
import React from 'react';
import './exams.css';

const Exams = () => {

  const formInitialStates = {
    title: '',
    duration: '',
    startDate: '',
  }

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
      <div className="exam-container">
        <form onSubmit={handleSubmission} className="exam-form">
          <h1>Let's create an Exam.</h1>
          <div className="exam-input-container">
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
          <div className="exam-input-container">
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
          <div className="exam-input-container">
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
          <input type="submit" value="Create" />
          <input type="reset" onClick={handleReset} />
        </form>
      </div>
    </div>
  );
};

export default Exams;
