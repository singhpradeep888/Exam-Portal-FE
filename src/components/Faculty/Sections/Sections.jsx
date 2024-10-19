import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../../Sidebar/sidebar';
import './sections.css';

function Sections() {
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
    checkExamExistence();
  });

  const examId = useParams().examId;
  const navigateTo = useNavigate();

  const formInitialStates = {
    title: '',
    duration: '',
    num_questions: '',
    rank: '',
    question_sheet: null,
  };
  const [sectionData, setData] = useState(formInitialStates);

  const handleData = (e) => {
    setData({
      ...sectionData,
      [e.target.name]: e.target.type === 'file' ? e.target.files[0] : e.target.value,
    });
  };

  const handleSubmission = async (e) => {
    e.preventDefault();

    // verifying form data existence
    let incompleteData = false;
    for (const key of Object.keys(sectionData)) {
      if (sectionData['key'] == '' || sectionData[key] == null) {
        alert('Incomplete Data');
        incompleteData = true;
        break;
      }
    }
    if (incompleteData) return;
    try {
      const response = await fetch('http://localhost:3000/exam/section/create', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sectionData),
      });

      const data = await response.json();

      if (!response.ok) {
        alert('Failed to create section');
        console.log(`Add Exam Section Error:: ${data.message}`);
        return;
      }

      alert('Section created successfully');
      setData(formInitialStates);
    } catch (err) {
      console.log(`Add Exam Section Error:: ${err.message}`);
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    setData(formInitialStates);
    document.getElementById('question_sheet').value = '';
  };

  return (
    <div className="section-main">
      <Sidebar />
      <div className="section-container">
        <form className="section-form" onSubmit={handleSubmission}>
          <h1>Add Exam Sections.</h1>
          <div className="section-input-container">
            <label htmlFor="title">Section Title</label>
            <input
              type="text"
              name="title"
              id="title"
              value={sectionData.title}
              onChange={handleData}
              placeholder="Title of section"
            />
          </div>
          <div className="section-input-container">
            <label htmlFor="duration">Section Duration (in minutes)</label>
            <input
              type="number"
              name="duration"
              id="duration"
              value={sectionData.duration}
              onChange={handleData}
              placeholder="Duration of section"
            />
          </div>
          <div className="section-input-container">
            <label htmlFor="num_questions">No. of question</label>
            <input
              type="number"
              name="num_questions"
              id="num_questions"
              value={sectionData.num_questions}
              onChange={handleData}
              placeholder="Questions to present in exam"
            />
          </div>
          <div className="section-input-container">
            <label htmlFor="num_questions">Section Rank</label>
            <input
              type="number"
              name="rank"
              id="rank"
              value={sectionData.rank}
              onChange={handleData}
              placeholder="Section order rank"
            />
          </div>
          <div className="section-input-container">
            <label htmlFor="question_sheet">Upload Questions Excel Sheet</label>
            <input type="file" name="question_sheet" id="question_sheet" onChange={handleData} />
          </div>
          <div className="section-button-group">
            <input type="submit" value="Create" />
            <input type="reset" onClick={handleReset} />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Sections;
