import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '/src/components/Sidebar/sidebar';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import SectionForm from './SectionForm';
import Button from '../../ui/Button';

function Sections() {
  const examId = useParams().examId;
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
  }, [examId]);
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

    if (Object.keys(sections).length == 0) {
      alert('Exam should contain at least 1 section');
      return;
    }
    console.log(sections);
    // return;
    // TODO : Add the examId to the sections JSON.
    try {
      const response = await fetch('http://localhost:3000/exam/section/create', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: JSON.stringify(sections), examId: examId }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert('Failed to create section');
        console.log(`Add Exam Section Error:: ${data.message}`);
        return;
      }

      alert('Section created successfully');
      setSections({});
    } catch (err) {
      console.log(`Add Exam Section Error:: ${err.message}`);
    }
  };

  return (
    <div className="flex overflow-x-auto">
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
              Add Section
            </button>
          </div>
        </div>
        {/* Sections */}
        <div id="sectionsContainer" className="flex flex-col flex-1 gap-4">
          {Object.entries(sections).map(([key, value]) => (
            <SectionForm key={key} index={key} onValuesChange={handleValueChanges} onDelete={handleSectionDelete} />
          ))}
        </div>
        <Button onClick={handleSubmission}>Upload Sections</Button>
      </div>
    </div>
  );
}

export default Sections;
