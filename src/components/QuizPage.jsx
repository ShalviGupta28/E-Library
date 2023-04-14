import React, { useState, useEffect } from "react";
import MainPage from "./MainPage";
import nextId from "react-id-generator";
import { ReactComponent as Header } from "./../icons/heading.svg";
import { ReactComponent as Quiz } from "./../icons/timer.svg";
import { useNavigate } from "react-router-dom";

function QuizPage({ title }) {
  console.log(title);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const navigate = useNavigate();
  const quizHandler = (event) => {
    event.preventDefault();
    console.log("quiz handler");
    setShowQuiz(!showQuiz);
    //navigate("/quiz");
  };
  const ids = nextId("88");
  const ebookId = ids.replace(/\D/g, "");
  const id = nextId("55555");
  const subscriptionId = id.replace(/\D/g, "");
  let newdate = new Date();
  let year = newdate.getFullYear();
  let month = newdate.getMonth() + 1;
  let date = newdate.getDate();
  let currentdate = date + "-" + month + "-" + year;

  useEffect(() => {
    async function fetchQuestions() {
      const response = await fetch("https://opentdb.com/api.php?amount=5");
      const data = await response.json();
      setQuestions(data.results);
      console.log(data.results);
    }
    fetchQuestions();
  }, []);

  function handleAnswerClick(answer) {
    if (answer === questions[currentQuestion].correct_answer) {
      console.log(questions[currentQuestion].correct_answer, answer);
      setScore(score + 1);
    }
    setCurrentQuestion(currentQuestion + 1);
  }
  console.log(currentQuestion, questions, score, questions.length);

  function renderQuiz() {
    if (currentQuestion >= questions.length) {
      return (
        <div>
          <h2>Total Questions: {questions.length}</h2>
          <h2>Total Score: {score}</h2>
          <h2>Correct Answers: {score}</h2>
          <h2>Incorrect Answers: {questions.length - score}</h2>
          <button
            className="restart-quiz"
            onClick={() => window.location.reload()}
          >
            Restart Quiz
          </button>
        </div>
      );
    }

    const question = questions[currentQuestion];
    const answers = [
      ...question.incorrect_answers,
      question.correct_answer,
    ].sort(() => Math.random() - 0.5);
    // Math.random() - 0.5 means Your second attempt,
    // with sort(() => Math.random() - 0.5), returns
    // with equal probability that the first number
    // is greater than the second, or vice versa,
    // which makes the shuffle work much better.
    // However, because of the unreliability of
    // the whole thing there's
    // zero assurance that the shuffle will work in all
    // browsers or be particularly random.
    // Please use the "real" shuffle algorithm linked above.
    console.log(
      currentQuestion,
      question,
      answers,
      ...question.incorrect_answers,
      question.correct_answer
    );

    return (
      <div>
        <div>
          {showQuiz && (
            <div className="quiz-questions">
              <h3>Quiz</h3>
              <div className="quiz-main-content">
              <p className="noofquestions">
                Question: {currentQuestion + 1}/{questions.length}
              </p>
              <p className="score">Score: {score}</p>
              <h4 className="questions">{question.question}</h4>
              <button className="quiz-options">
                <ol type="A" className="options">
                  {answers.map((answer, index) => (
                    <li key={index} onClick={() => handleAnswerClick(answer)}>
                      {answer}
                    </li>
                  ))}
              </ol>
              </button>
              </div>      
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      <MainPage />
      <div className="quiz-page-content">
        <h4>Select From Your Active Subscription</h4>
        <table className="quiz-table">
          <thead>
            <tr>
              <th>
                e-Book Id <Header />
              </th>
              <th>e-Book Name</th>
              <th>Subscription Date</th>
              <th>Subscription Id</th>
              <th>Quiz</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{ebookId}</td>
              <td>Chanakya</td>
              <td>{currentdate}</td>
              <td>{subscriptionId}</td>
              <td>
                <button
                  onClick={quizHandler}
                  className="active-subscription-quiz-handler"
                >
                  <Quiz />
                </button>
              </td>
            </tr>
            <tr>
              <td>8892</td>
              <td>Harry Potter</td>
              <td>2-2-2023</td>
              <td>5555509</td>
              <td>
                <button
                  onClick={quizHandler}
                  className="active-subscription-quiz-handler"
                >
                  <Quiz />
                </button>
              </td>
            </tr>
            <tr>
              <td>8826</td>
              <td>Instellar</td>
              <td>21-12-2022</td>
              <td>5555576</td>
              <td>
                <button
                  onClick={quizHandler}
                  className="active-subscription-quiz-handler"
                >
                  <Quiz />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {questions.length > 0 ? renderQuiz() : ""}
    </div>
  );
}

export default QuizPage;
