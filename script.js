import { startGame, nextTry, winCase, loseCase } from "./colorgame";

const formatRgb = document.getElementById("rgb");
const formatHex = document.getElementById("hex");
const formatHsl = document.getElementById("hsl");
const squares = document.querySelectorAll("[data-square]");
const nextButton = document.querySelector("[data-next-color]");
const difficultyEasy = document.getElementById("easy");
const difficultyMedium = document.getElementById("medium");
const difficultyHard = document.getElementById("hard");

squares.forEach((box) => {
  box.addEventListener("click", (e) => {
    winCase(box);
    loseCase(box);
  });
});

nextButton.addEventListener("click", (e) => {
  nextTry();
  startGame();
});

formatHex.addEventListener("click", () => {
  startGame();
});

formatRgb.addEventListener("click", () => {
  startGame();
});

formatHsl.addEventListener("click", () => {
  startGame();
});

difficultyEasy.addEventListener("click", () => {
  startGame();
});

difficultyMedium.addEventListener("click", () => {
  startGame();
});

difficultyHard.addEventListener("click", () => {
  startGame();
});

startGame();
