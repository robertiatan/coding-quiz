// Assigning variables
var landing = document.querySelector("#landing");
var landingPg = document.querySelector("#landing-page");
var startBtn = document.querySelector("#start-button");
var questionPg = document.querySelector("#question-page");
var question = document.querySelector("#question");
var aBtn1 = document.querySelector("#a-btn1");
var aBtn2 = document.querySelector("#a-btn2");
var aBtn3 = document.querySelector("#a-btn3");
var aBtn4 = document.querySelector("#a-btn4");
var questionCheck = document.querySelector("#q-check");
var submitPage = document.querySelector("#submit-page");
var score = document.querySelector("#score");
var endScore = document.querySelector("#end-score");
var submitBtn = document.querySelector("#submit-btn");
var done = document.querySelector("#done");
var hsBtn = document.querySelector("#hs-button");
var choiceButtons = document.querySelectorAll(".choices-btn");

// List of possible questions in order
var questionBank = [
  {
    question: "Question 1 : JavaScript is a ___ -side programming language.",
    choices: ["a. client", "b. server", "c. both", "d. none"],
    answer: "c",
  },
  {
    question: "Question 2 : Who invented JavaScript?",
    choices: [
      "a. Tim Berners-Lee",
      "b. Brendan Eich",
      "c. Håkon Wium Lie",
      "d. Elon Musk",
    ],
    answer: "b",
  },
  {
    question: "Question 3 : JavaScript File Has An Extension of:",
    choices: ["a. .js", "b. .java", "c. .javascript", "d. .html"],
    answer: "a",
  },
  {
    question: "Question 4 : Which function is Used To Parse a String To Int?",
    choices: [
      "a. integer.parse",
      "b. parse.integer",
      "c. .pint",
      "d. parseInt()",
    ],
    answer: "d",
  },
  {
    question:
      "Question 5 : String values must be enclosed within ____ when being assigned to variables.",
    choices: [
      "a. commas",
      "b. curly brackets",
      "c. quotes",
      "d. square brackets",
    ],
    answer: "c",
  },
];

// Variable declarations for timer and countdown method
var totalTime = document.getElementById("timer");
var timeLeft = 60;
var questionNumber = 0;
var totalScore = 0;
var questionCount = 1;

// Function that handles starting the timer and counting down from 60 seconds
function startTimer() {
  var timerTick = setInterval(function () {
    timeLeft--;
    totalTime.textContent = `Time Left: ${timeLeft}`;
    if (timeLeft <= 0) {
      clearInterval(timerTick);
      totalTime.textContent = `Time's Up!`;
      endGame();
    } else if (questionCount >= questionBank.length + 1) {
      clearInterval(totalTime);
      endGame();
    }
  }, 1000);
}

// Function to start the quiz and transition from landing page to questions page
function startQuiz() {
  landingPg.style.display = "none";
  questionPg.style.display = "block";
  questionNumber = 0;
  startTimer();
  showQuestion(questionNumber);
}

// Function to display questions on screen
function showQuestion(n) {
  question.textContent = questionBank[n].question;
  aBtn1.textContent = questionBank[n].choices[0];
  aBtn2.textContent = questionBank[n].choices[1];
  aBtn3.textContent = questionBank[n].choices[2];
  aBtn4.textContent = questionBank[n].choices[3];
  questionNumber = n;
}

// Function to verify if user's answer is correct
function answerCheck(event) {
  event.preventDefault();
  questionCheck.style.display = "block";
  setTimeout(function () {
    questionCheck.style.display = "none";
  }, 1000);
  if (questionBank[questionNumber].answer == event.target.value) {
    questionCheck.textContent = "Correct!";
    totalScore = totalScore + 1;
  } else {
    timeLeft = timeLeft - 10;
    questionCheck.textContent = `Wrong! The correct answer is ${questionBank[questionNumber].answer}`;
  }
  if (questionNumber < questionBank.length - 1) {
    showQuestion(questionNumber + 1);
  } else {
    endGame();
    clearInterval(startTimer);
  }
  questionCount++;
}

// Function to end the game once user runs out of time or questionIndex reaches end
function endGame() {
  questionPg.style.display = "none";
  submitPage.style.display = "block";
  endScore.textContent = `Your Score Is: ${totalScore}`;
  totalTime.style.display = "none";
}

// Function to save score to local storage, will be retrieved in leaderboard.js
function saveScore() {
  var finalScore = {
    nickname: document.getElementById("nickname").value,
    score: totalScore,
  };
  var allScores = localStorage.getItem("allScores");
  if (allScores === null) {
    allScores = [];
  } else {
    allScores = JSON.parse(allScores);
  }
  allScores.push(finalScore);
  var newScore = JSON.stringify(allScores);
  localStorage.setItem("allScores", newScore);
}

// Event listeners

// Gives start button functionality
startBtn.addEventListener("click", startQuiz);

// Gives each question choice button functionality and triggers function to check for correctness
choiceButtons.forEach(function (click) {
  click.addEventListener("click", answerCheck);
});

// Saves final score on submit button click
submitBtn.addEventListener("click", function (event) {
  event.preventDefault();
  submitPage.style.display = "none";
  landingPg.style.display = "none";
  questionPg.style.display = "none";
  window.location.replace("./leaderboard.html");
  saveScore();
});
