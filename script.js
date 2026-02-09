//dom element
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answerContainer = document.getElementById("answer-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

//quiz data
const quizQuestions = [
  {
    question: "What is the capital of India?",
    answers: [
      { text: "New Delhi", correct: true },
      { text: "Beijing ", correct: false },
      { text: "Tokyo", correct: false },
      { text: "Seoul", correct: false },
    ],
  },
  {
    question: "How many days are there in a week?",
    answers: [
      { text: "5", correct: false },
      { text: "7", correct: true },
      { text: "6", correct: false },
      { text: "8", correct: false },
    ],
  },
  {
    question: "Which device is used to input text into a computer?",
    answers: [
      { text: "Keyboard", correct: true },
      { text: "Mouse", correct: false },
      { text: "Monitor", correct: false },
      { text: "Printer", correct: false },
    ],
  },
  {
    question: "What is 5 × 6?",
    answers: [
      { text: "25", correct: false },
      { text: "11", correct: false },
      { text: "30", correct: true },
      { text: "35", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
    ],
  },
  {
    question: "Which language is mainly used for web page structure?",
    answers: [
      { text: "HTML", correct: true },
      { text: "CSS", correct: false },
      { text: "JavaScript", correct: false },
      { text: "Python", correct: false },
    ],
  },
];

//quiz state
let currentQuestionIndex = 0;
let score = 0;
let answerdisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

//event listeners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
  //reset vars
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = 0;

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}

function showQuestion() {
  //RESET STATE
  answerdisabled = false;

  const currentQuestion = quizQuestions[currentQuestionIndex];

  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  const progresspercent =
    (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = progresspercent + "%";
  //50% for the bar when on the question 3 of 6

  questionText.textContent = currentQuestion.question;
  //todo:explain this in a second
  answerContainer.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");

    // use dataset to store data in a set
    button.dataset.correct = answer.correct;

    button.addEventListener("click", selectAnswer);

    answerContainer.appendChild(button);
  });
}

function selectAnswer(event) {
  //optimization check
  if (answerdisabled) return;
  answerdisabled = true;

  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  //todo: explain this in a sec
  Array.from(answerContainer.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else {
      button.classList.add("incorrect");
    }
  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  setTimeout(() => {
    currentQuestionIndex++;

    //check if there are more questions
    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResult();
    }
  }, 1000);
}

function showResult() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;

  const percentage = (score / quizQuestions.length) * 100;
  if (percentage === 100) {
    resultMessage.textContent = "Perfect Score! Excellent work!";
  } else if (percentage >= 80) {
    resultMessage.textContent = "Great job! You did well!";
  } else if (percentage >= 50) {
    resultMessage.textContent = "Good effort! Keep practicing!";
  } else {
    resultMessage.textContent = "Don't be discouraged. Try again!";
  }
}

function restartQuiz() {
  resultScreen.classList.remove("active");
  startScreen.classList.add("active");
}





