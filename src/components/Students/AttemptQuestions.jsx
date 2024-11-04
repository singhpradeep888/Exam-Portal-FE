import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function AttempQuestions() {
  const location = useLocation();
  const { section, examId } = location.state;
  const [questions, setQuestions] = useState([]);
  const initialFormState = {
    examId,
    sectionId: section._id,
  };
  const [formData, setFormData] = useState(initialFormState);
  const [quesIdx, setQuesIdx] = useState(-1);

  const setAttemptingSection = async () => {
    try {
      const url = 'http://localhost:3000/exam/section/attempt-section';
      const response = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sectionData: { examId, sectionId: section._id },
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        alert(data.message);
        return navigateTo('/dashboard');
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const getQuestions = async () => {
    try {
      const url = 'http://localhost:3000/exam/section/question/get-questions';
      const response = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ examId, sectionId: section._id }),
      });

      const data = await response.json();
      if (!response.ok) {
        alert(data.message);
      }
      const ques = [];
      data.assignedQuestions.forEach((assigned) => {
        data.fetchedQuestions.forEach((fetched) => {
          if (assigned.questionId === fetched._id) {
            const q = {
              ...assigned,
              title: fetched.title,
              correctAns: fetched.correctAns,
              options: fetched.options,
              type: fetched.type,
            };
            ques.push(q);
          }
        });
      });
      setQuestions((prev) => [...ques]);
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    setAttemptingSection();
    getQuestions();
  }, []);

  const handleForm = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAnswerSubmission = async (e) => {
    e.preventDefault();
    setQuestions((prev) => {
      let i = 0;
      const updatedData = [];
      while (i < questions.length) {
        if (i != quesIdx) {
          updatedData.push(questions[i]);
          i++;
          continue;
        }
        const obj = {
          ...questions[quesIdx],
          ...formData,
          status: 'attempted',
          result:
            formData.answer == questions[quesIdx].correctAns
              ? 'correct'
              : 'incorrect',
        };
        updatedData.push(obj);
        i++;
      }
      return updatedData;
    });
    // setFormData((prev) => initialFormState);
    // if (quesIdx != questions.length - 1) setQuesIdx((prev) => prev + 1);
    // return;
    try {
      const response = await fetch(
        'http://localhost:3000/exam/section/question/submit',
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            answerData: {
              ...questions[quesIdx],
              ...formData,
              status: 'attempted',
              result:
                formData.answer == questions[quesIdx].correctAns
                  ? 'correct'
                  : 'incorrect',
            },
          }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        alert(data.message);
        return;
      }
      setFormData((prev) => initialFormState);
      if (quesIdx != questions.length - 1) setQuesIdx((prev) => prev + 1);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="bg-gray-200 w-full h-svh">
      <div className="w-full h-full shadow-xl bg-white rounded flex">
        {/* Question Navigator */}
        <div className="w-1/5 border-e h-full flex flex-col relative">
          <div className="px-6 py-10 flex-1">
            <div className="h-20 border-b">
              <p className="text-lg font-bold text-gray-600">
                <span className="text-sm font-light text-gray-700">
                  Section
                  <br />
                </span>{' '}
                {section.title}
              </p>
            </div>
            <div className="py-4 flex flex-wrap gap-[14px]">
              {questions.map((_, idx) => (
                <div
                  className={`p-2 w-12 h-12 cursor-pointer ${
                    _.status === 'attempted'
                      ? 'bg-green-500'
                      : _.status === 'skipped'
                      ? 'bg-yellow-500'
                      : quesIdx == idx
                      ? 'bg-gray-400 shadow-xl'
                      : 'bg-gray-200'
                  } rounded-full`}
                  key={idx + 1}
                  onClick={() => {
                    if (quesIdx != idx) {
                      setQuesIdx((prev) => idx);
                    }
                  }}
                >
                  <p className="text-2xl font-semibold text-center text-gray-700">
                    {idx + 1}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full h-52 bg-gray-600 absolute bottom-0">
            Camera View Here
          </div>
        </div>
        {/* Question Screen */}
        {quesIdx != -1 ? (
          <div className="flex-1 border-e h-full relative">
            <p className="text-gray-700 text-xl px-6 py-10 bg-gray-100 font-medium">
              <span className="text-xs font-regular text-black">
                Question:
                <br />
              </span>
              {questions[quesIdx].title}
            </p>
            <form onSubmit={handleAnswerSubmission}>
              {/* Options or Input to give answer */}
              <div className="p-4">
                {questions[quesIdx].type === 'mcq' ? (
                  <div>
                    <p>Choose the correct answer:</p>
                    {questions[quesIdx].options.map((option, idx) => (
                      <div
                        key={idx}
                        className={`w-full p-4 border ${
                          idx != questions[quesIdx].options.length - 1 &&
                          'border-b-0'
                        } flex items-center gap-2`}
                      >
                        <input
                          type="radio"
                          name="answer"
                          id={`mcqAnswer${idx}`}
                          onChange={handleForm}
                          value={option}
                        />
                        <label htmlFor={`mcqAnswer${idx}`}>{option}</label>
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    <input
                      type="text"
                      name="answer"
                      id="inputAnswer"
                      placeholder="Type your answer here"
                      onChange={handleForm}
                      className="p-4 border w-full rounded outline-none focus:border-2 focus:border-blue-400"
                    />
                  </>
                )}
              </div>
              <div className="flex justify-end items-center gap-4 p-4 absolute bottom-0 w-full">
                <button
                  type="submit"
                  className="p-4 rounded bg-blue-400 font-semibold text-white"
                >
                  Submit Answer
                </button>
                <button className="p-4 rounded bg-blue-800 font-semibold text-white">
                  Next
                </button>
              </div>
            </form>
          </div>
        ) : (
          <>
            {(() => {
              for (let i = 0; i < questions.length; i++) {
                if (questions[i].status == 'unattempted' && quesIdx == -1) {
                  setQuesIdx((prev) => i);
                  break;
                }
              }
            })()}
          </>
        )}
        {/* Don't know why I created it... */}
        <div className="w-1/5 border-e h-full"></div>
      </div>
    </div>
  );
}
