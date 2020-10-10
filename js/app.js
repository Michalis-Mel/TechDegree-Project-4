let game = {};
//Initialize the button that starts the game
const reset = document.getElementById("btn__reset");

//Add an event listener to the start button so when i click it i create a new game object and call the function to start playing
reset.addEventListener("click", () => {
  game = new Game();
  game.startGame();
});


