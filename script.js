// ============================
// QUIZ DATA
// ============================
const quizData = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "Rome", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "Which language runs in a web browser?",
    options: ["Python", "C", "JavaScript", "Java"],
    answer: "JavaScript",
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Pablo Picasso", "Vincent Van Gogh", "Leonardo da Vinci"],
    answer: "Leonardo da Vinci",
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Computer Style Sheets",
      "Cascading Style Sheets",
      "Creative Style Sheets",
      "Colorful Style Sheets",
    ],
    answer: "Cascading Style Sheets",
  },
  {
    question: "How many continents are there?",
    options: ["5", "6", "7", "8"],
    answer: "7",
  },
];

// ============================
// VARIABLES
// ============================
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 60;
let timer;

// ============================
// DOM ELEMENTS
// ============================
const startPage = document.getElementById("start-page");
const quizContainer = document.getElementById("quiz-container");
const resultPage = document.getElementById("result-page");

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const timeEl = document.getElementById("time");
const scoreEl = document.getElementById("current-score");

const totalCorrectEl = document.getElementById("total-correct");
const percentageEl = document.getElementById("percentage");
const timeUsedEl = document.getElementById("time-used");

const nameInput = document.getElementById("name");
const welcomeMessage = document.getElementById("welcome-message");
const warningEl = document.getElementById("name-warning");

// ============================
// START QUIZ
// ============================
document.getElementById("start-btn").addEventListener("click", () => {
  const userName = nameInput.value.trim();

  if (userName === "") {
    warningEl.textContent = "⚠️ Please enter your name to start the quiz.";
    nameInput.style.borderColor = "red";
    return;
  } else {
    warningEl.textContent = "";
    nameInput.style.borderColor = "#410044";
  }

  welcomeMessage.textContent = `Welcome, ${userName}!`;
  startPage.style.display = "none";
  quizContainer.style.display = "block";

  quizData.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  score = 0;
  timeLeft = 60;

  scoreEl.textContent = `${score} / ${quizData.length}`;
  timeEl.textContent = timeLeft;

  startTimer();
  showQuestion();
});

// ============================
// START TIMER
// ============================
function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timeEl.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      showResult();
    }
  }, 1000);
}

// ============================
// SHOW QUESTION
// ============================
function showQuestion() {
  nextBtn.disabled = true;
  const current = quizData[currentQuestionIndex];

  questionEl.textContent = current.question;
  optionsEl.innerHTML = "";

  current.options.forEach((option) => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.classList.add("option");
    btn.addEventListener("click", () => checkAnswer(btn, current.answer));
    optionsEl.appendChild(btn);
  });
}

// ============================
// CHECK ANSWER
// ============================
function checkAnswer(selectedBtn, correctAnswer) {
  const allOptions = document.querySelectorAll(".option");
  allOptions.forEach((btn) => (btn.disabled = true));

  if (selectedBtn.textContent === correctAnswer) {
    selectedBtn.classList.add("correct");
    score++;
    scoreEl.textContent = `${score} / ${quizData.length}`;
  } else {
    selectedBtn.classList.add("wrong");
    allOptions.forEach((btn) => {
      if (btn.textContent === correctAnswer) {
        btn.classList.add("correct");
      }
    });
  }

  nextBtn.disabled = false;
}

// ============================
// NEXT QUESTION
// ============================
nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < quizData.length) {
    showQuestion();
  } else {
    clearInterval(timer);
    showResult();
  }
});

// ============================
// SHOW RESULT
// ============================
function showResult() {
  quizContainer.style.display = "none";
  resultPage.style.display = "block";

  totalCorrectEl.textContent = `${score} / ${quizData.length}`;
  percentageEl.textContent = Math.round((score / quizData.length) * 100);

  const timeUsed = 60 - timeLeft;
  timeUsedEl.textContent = timeUsed;
}

// ============================
// RESTART QUIZ
// ============================
document.getElementById("restart-btn").addEventListener("click", () => {
  location.reload(); // Reloads the entire app
});
