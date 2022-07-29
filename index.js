const canvas = document.querySelector("#game-field");
const context = canvas.getContext("2d");

const game = new gameOfLife();
game.gameSetUp();
window.onload = () => {
  document.querySelector("#start").addEventListener("click", () => {
    game.arrayRandomize();
    game.fillArray();
    window.setInterval(() => {
      game.runGame();
    }, 300);
  });
  document.querySelector("#stop").addEventListener("click", () => {
    game.gameSetUp();
  });
};
