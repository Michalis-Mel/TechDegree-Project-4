let game = {};

//Adding an event listener to the start button so when i click it i create a new game object and call the function to start playing
document.getElementById("btn__reset").addEventListener("click", () => {
  game = new Game();
  game.startGame();
});

//Adding an event listener so when i press a key from the onscreen keyboard it interacts with the game
document.querySelector("#qwerty").addEventListener('click', (e) => {
  if (e.target.className !== 'keyrow' && e.target.id !== 'qwerty') {
      game.handleInteraction(e.target);
  }
});

//Adding an event listener so whn i press a key from my keyboard it interacts with the game
document.addEventListener('keydown',(e=> {
  const keyboard = document.querySelectorAll("#qwerty div button");

    if (game !== null) {
        for (let i = 0; i < keyboard.length; i++) {
            if (keyboard[i].disabled === false) {
                if (keyboard[i].textContent === e.key.toLowerCase()) {
                    game.handleInteraction(keyboard[i]);
                }
            }
        }
    }
}))

