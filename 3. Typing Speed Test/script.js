const textToType = document.getElementById("text-to-type");
const typingArea = document.getElementById("typing-area");
const startBtn = document.getElementById("start-btn");
const timeSelect = document.getElementById("time-select");
const timerDisplay = document.getElementById("timer");
const accuracyDisplay = document.getElementById("accuracy");
const wpmDisplay = document.getElementById("wpm");

let timer = 0;
let timeLimit = 60;
let interval = null;
let started = false;
let correctChars = 0;
let totalChars = 0;

// Paragraph Bank
const paragraphs = [
  "The quick brown fox jumps over the lazy dog. Typing tests are fun!",
  "JavaScript is a versatile language used for building web applications.",
  "Coding challenges help improve problem-solving and typing speed.",
  "Practice typing regularly to improve your speed and accuracy.",
  "Front-end developers build visually stunning user interfaces."
];

// Reset Function
function resetTest() {
  clearInterval(interval);
  timer = 0;
  started = false;
  correctChars = 0;
  totalChars = 0;

  // Randomize Paragraph
  const randomParagraph = paragraphs[Math.floor(Math.random() * paragraphs.length)];
  textToType.textContent = randomParagraph;

  typingArea.value = "";
  typingArea.disabled = true;
  timerDisplay.textContent = "⏳ Time Left: 0s";
  accuracyDisplay.textContent = "✅ Accuracy: 0%";
  wpmDisplay.textContent = "⚡ WPM: 0";
}

// Start Test
function startTest() {
  resetTest();
  timeLimit = parseInt(timeSelect.value);
  timer = timeLimit;
  started = true;
  typingArea.disabled = false;
  typingArea.focus();

  interval = setInterval(() => {
    timer--;
    timerDisplay.textContent = `⏳ Time Left: ${timer}s`;

    if (timer === 0) {
      clearInterval(interval);
      typingArea.disabled = true;
      calculateResults();
    }
  }, 1000);
}

// Calculate Results
function calculateResults() {
  const typedText = typingArea.value.trim();
  totalChars = typedText.length;

  const sampleText = textToType.textContent.trim();
  correctChars = 0;

  for (let i = 0; i < typedText.length; i++) {
    if (typedText[i] === sampleText[i]) correctChars++;
  }

  const accuracy = Math.round((correctChars / totalChars) * 100) || 0;
  const wordsTyped = typedText.split(" ").length;
  const wpm = Math.round((wordsTyped / timeLimit) * 60) || 0;

  accuracyDisplay.textContent = `✅ Accuracy: ${accuracy}%`;
  wpmDisplay.textContent = `⚡ WPM: ${wpm}`;
}

// Event Listeners
startBtn.addEventListener("click", startTest);
typingArea.addEventListener("input", () => {
  if (!started) startTest();
});

// Initialize
resetTest();
