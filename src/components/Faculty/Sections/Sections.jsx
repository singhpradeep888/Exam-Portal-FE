import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '/src/components/Sidebar/sidebar';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import SectionForm from './SectionForm';

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
  }, []);

  const examId = useParams().examId;
  const navigateTo = useNavigate();

  const [sections, setSections] = useState({});
  const handleAddSection = () => {
    setSections((prev) => ({ ...prev, [Object.keys(prev).length + 1]: {} }));
  };

  const handleValueChanges = (index, values) => {
    setSections((prev) => ({ ...prev, [index]: values }));
  };

  const handleSectionDelete = (index) => {
    setSections((prev) => {
      const newSections = { ...prev };
      delete newSections[index];
      return newSections;
    });
  };

  const handleSubmission = async (e) => {
    e.preventDefault();

    console.log(sections);
    return;

    // TODO : Add the examId to the sections JSON.
    try {
      const response = await fetch('http://localhost:3000/exam/section/create', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(sections),
      });

      const data = await response.json();

      if (!response.ok) {
        alert('Failed to create section');
        console.log(`Add Exam Section Error:: ${data.message}`);
        return;
      }

      alert('Section created successfully');
      console.log(data);
      // TODO : Print the questions at the screen
      setData(formInitialStates);
    } catch (err) {
      console.log(`Add Exam Section Error:: ${err.message}`);
    }
  };

  return (
    <div className="flex">
        <Sidebar />
      <div className="flex flex-1 flex-col p-4 w-full h-screen gap-4 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center border-b py-4">
          <h1 className="text-4xl font-bold text-gray-700">Create Sections.</h1>
          <div>
            <button
              type="button"
              className="flex items-center border border-blue-700 text-blue-700 px-3 py-2 rounded hover:text-white hover:bg-blue-700 text-sm"
              onClick={handleAddSection}
            >
              <PlusCircleIcon className="size-4 me-2" />
              Add More
            </button>
          </div>
        </div>
        {/* Sections */}
        <div id="sectionsContainer" className="flex flex-col gap-4">
          {Object.entries(sections).map(([key, value]) => (
            <SectionForm key={key} index={key} onValuesChange={handleValueChanges} onDelete={handleSectionDelete} />
          ))}
        </div>
        <button type="button" className="text-black border" onClick={handleSubmission}>
          Log data
        </button>
      </div>
    </div>
  );
}

export default Sections;
