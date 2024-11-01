import React, { useState } from 'react';
import { Input } from '../../ui/Input';
import Button from '../../ui/Button';
import { read, utils } from 'xlsx';

const SectionForm = ({ index, onValuesChange, onDelete }) => {
  const formInitialStates = {
    title: '',
    duration: '',
    num_question: '',
    question_sheet: null,
  };
  const [sectionData, setData] = useState(formInitialStates);
  const [isUpdating, setUpdating] = useState(true);

  const handleData = (e) => {
    const { name, type, files, value } = e.target;
    let newValue = value;

    // Processing the file if changed.
    // TODO : Handle the Cancel button event in File select window.
    if (type === 'file' && files.length > 0) {
      const file = files[0];
      if (!isExcelFile(file.type, file.name.split('.').pop())) {
        alert(`Invalid file`);
        document.getElementsByName(name)[0].value = '';
        return;
      }
      readExcel(file, name);
      return;
    }

    const updatedData = {
      ...sectionData,
      [name]: newValue,
    };
    setData(updatedData);
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
      const questionJSON = utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
      setData((prev) => ({ ...prev, [name]: questionJSON }));
    };

    reader.readAsArrayBuffer(file);
  }

  const handleDelete = (e) => {
    e.preventDefault();
    onDelete(index);
  };

  const handleBlur = (e) => {
    if (sectionData[e.target.name] <= 0) {
      const updatedData = {
        ...sectionData,
        [e.target.name]: 1,
      };
      setData(updatedData);
    }
  };

  const validateSectionData = () => {
    for (const key of Object.keys(sectionData)) {
      // Check if any input field is empty
      if (typeof sectionData[key] === 'string' && sectionData[key] === '') {
        return { passed: false, message: `Section ${index} contains incomplete data: ${key}` };
      }

      // Check if the questions uploaded
      if (typeof sectionData[key] === 'object' && sectionData[key] == null) {
        return { passed: false, message: `Please upload the question sheet for Section ${index}` };
      }

      // Checking for the validity of number of questions
      if (
        sectionData.question_sheet != null &&
        key === 'num_question' &&
        sectionData[key] > Object.keys(sectionData.question_sheet).length
      ) {
        return { passed: false, message: `Total questions can't be higher than uploaded questions` };
      }
      // Check questions contains the correct option
      if (typeof sectionData[key] === 'object') {
        // iterating over the questions
        for (const quesIdx in sectionData[key]) {
          const question = sectionData[key][quesIdx];
          // If question isn't MCQ no need to check anything
          if (question.Type.toLowerCase() != 'mcq') continue;
          // If question is MCQ extracting the options
          const options = [question['Option 1'], question['Option 2'], question['Option 3'], question['Option 4']];
          // checking for existence of correct answer in options
          if (!options.includes(question['Correct Ans'])) {
            // if correct answer not found
            return {
              passed: false,
              message: `Section ${index} Question ${Number(quesIdx) + 1} doesn't contain correct answer in options`,
            };
          }
        }
      }
    }
    return { passed: true };
  };

  const handleSave = (e) => {
    e.preventDefault();

    // Verifying the data
    const validation = validateSectionData();
    if (!validation.passed) {
      alert(validation.message);
      return;
    }

    for (const key of Object.keys(sectionData)) {
      document.getElementsByName(key)[0].disabled = true;
    }

    setData((prev) => ({ ...prev, rank: index }));
    onValuesChange(index, sectionData);
    setUpdating(false);
  };

  const [showQuestion, setShowQuestions] = useState(false);
  const handleQuesPreview = () => {
    setShowQuestions(!showQuestion);
  };

  const QuestionPreview = ({ index, question }) => {
    return (
      <div className="border rounded p-4 flex flex-col gap-2">
        <p className="font-semibold border-b">
          Ques. {index}: {question.Question}
        </p>
        {question.Type.toLowerCase() == 'mcq' ? (
          <>
            <p className="font-semibold">Options:</p>
            <p><b>a&gt;</b> {question['Option 1']}</p>
            <p><b>b&gt;</b> {question['Option 2']}</p>
            <p><b>c&gt;</b> {question['Option 3']}</p>
            <p><b>d&gt;</b> {question['Option 4']}</p>
          </>
        ) : (
          <></>
        )}
        <p className="font-semibold mt-4">
          Correct Ans: <span className="font-normal">{question['Correct Ans']}</span>
        </p>
      </div>
    );
  };

  return (
    <div className="flex flex-col border border-1 p-4 w-full rounded-md gap-4" key={index}>
      <p className="text-xl">Section {index}</p>
      <div className="flex gap-4 flex-wrap">
        <Input
          label="Section Name"
          name="title"
          type="text"
          placeholder="Type section title"
          className="flex-1"
          value={sectionData.title}
          onChange={handleData}
        />
        <Input
          label="Upload question sheet"
          type="file"
          name="question_sheet"
          placeholder="No file choosen"
          className="flex-1"
          accept=".xls .xlsx"
          onChange={handleData}
        />
        <Input
          label="Total Questions"
          type="text"
          name="num_question"
          placeholder="No. of questions"
          className="flex-1"
          value={sectionData.num_question}
          onChange={handleData}
          onBlur={handleBlur}
        />
        <Input
          label="Duration"
          type="number"
          name="duration"
          placeholder="In minutes"
          className="flex-1"
          value={sectionData.duration}
          onChange={handleData}
          onBlur={handleBlur}
        />
      </div>

      {sectionData.question_sheet != null ? (
        <div>
          <Button
            size="sm"
            variant="ghost"
            className="px-2 py-1 text-blue-500 hover:bg-blue-200"
            onClick={handleQuesPreview}
          >
            {showQuestion ? 'Hide' : 'Show'} question bank
          </Button>
          <div className={`${showQuestion ? 'flex' : 'hidden'} flex-col gap-2 mt-2`} id="questionContainer">
            {sectionData.question_sheet.map((question, index) => (
              <QuestionPreview key={index} index={index + 1} question={question} />
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}

      <div className="flex w-full justify-end items-center gap-2">
        {isUpdating ? (
          <>
            <Button onClick={handleSave}>Save</Button>
            <Button variant="outline" className="border-red-700 text-red-700 hover:bg-red-100" onClick={handleDelete}>
              Delete
            </Button>
          </>
        ) : (
          <Button onClick={() => setUpdating(true)}>Update</Button>
        )}
      </div>
    </div>
  );
};

export default SectionForm;
