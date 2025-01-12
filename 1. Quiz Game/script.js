import { quizData } from "./quizData.js";

const categoriesDiv = document.getElementById("categories");
const quizDiv = document.getElementById("quiz");
const questionDiv = document.getElementById("question");
const optionsList = document.getElementById("options");
const scoreDiv = document.getElementById("score");
const restartDiv = document.getElementById("restart");

let currentCategory = null;
let currentQuestionIndex = 0;
let score = 0;
let shuffledQuestions = [];

// Function to shuffle questions
function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Function to load a quiz category
function loadCategory(category) {
  currentCategory = category;
  currentQuestionIndex = 0;
  score = 0;

  categoriesDiv.classList.add("hidden");
  quizDiv.classList.remove("hidden");

  // Shuffle questions for the selected category
  shuffledQuestions = shuffleArray([...quizData[currentCategory]]);
  loadQuestion();
}

// Function to load the current question
function loadQuestion() {
  const currentQuestion = shuffledQuestions[currentQuestionIndex];

  questionDiv.textContent = currentQuestion.question;
  optionsList.innerHTML = "";

  // Shuffle options for the current question
  const shuffledOptions = shuffleArray([...currentQuestion.options]);

  shuffledOptions.forEach((option, index) => {
    const li = document.createElement("li");
    li.textContent = option;
    li.className = "option";
    li.onclick = () => checkAnswer(option, currentQuestion.correct);
    optionsList.appendChild(li);
  });

  updateScore();
}

// Function to check the selected answer
function checkAnswer(selectedOption, correctIndex) {
  const currentQuestion = shuffledQuestions[currentQuestionIndex];
  const correctOption = currentQuestion.options[correctIndex];

  if (selectedOption === correctOption) {
    score++;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < shuffledQuestions.length) {
    loadQuestion();
  } else {
    displayResults();
  }
}

// Function to display the results
function displayResults() {
  questionDiv.textContent = `Quiz Complete!`;
  optionsList.innerHTML = "";
  scoreDiv.textContent = `Your final score: ${score} / ${shuffledQuestions.length}`;
  restartDiv.classList.remove("hidden");
}

// Function to update the score display
function updateScore() {
  scoreDiv.textContent = `Score: ${score}`;
}

// Function to restart the quiz
function restartQuiz() {
  categoriesDiv.classList.remove("hidden");
  quizDiv.classList.add("hidden");
  restartDiv.classList.add("hidden");
}

// Expose functions to the global scope for HTML to access
window.loadCategory = loadCategory;
window.restartQuiz = restartQuiz;
