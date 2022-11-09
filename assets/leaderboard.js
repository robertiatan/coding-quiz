// Variable declarations
var leaderBoard = document.querySelector("#leaderBoard");
var clearBtn = document.querySelector("#clear");
var returnBtn = document.querySelector("#return");

// Returns local storage values after being stored in function within script.js
var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);

if (allScores !== null) {
  for (var i = 0; i < allScores.length; i++) {
    var createLi = document.createElement("li");
    createLi.textContent = allScores[i].nickname + " - " + allScores[i].score;
    createLi.setAttribute("data-index", i);
    leaderBoard.appendChild(createLi);
  }
}

// Event listener allows for the quiz to return to main index on button click
returnBtn.addEventListener("click", function () {
  window.location.replace("./index.html");
});

// Event listener allows for leader board to be cleared on button click
clearBtn.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
});
