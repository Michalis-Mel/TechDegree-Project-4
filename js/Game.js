class Game {
  constructor() {
    this.missed = 0;
    this.phrases = this.createPhrases();
    this.activePhrase = null;
  }
//Creating an array of 5 phrases and return the array to the this.phrases property
  createPhrases() {
    let phraseArray = [];
    phraseArray = [
      new Phrase("fuck off"),
      new Phrase("no hostages"),
      new Phrase("good afternoon"),
      new Phrase("how are you today"),
      new Phrase("my life sucks"),
    ];
    return phraseArray;
  }

  //Getting a random phrase from the phrases array i created before
  getRandomPhrase() {
    let randomNum = Math.floor(Math.random() * this.phrases.length);
    return this.phrases[randomNum];
  }

  //the function which is called when the start button is pressed
  startGame() {
    document.getElementById("overlay").style.display = "none";
    //reset the phrase if i already have one
    let active = this.activePhrase;
    if (active != null) {
      let ul = document.querySelector("ul");
      let children = ul.childNodes;
      for (let i = 0; i < children.length; i++) {
        children[i].innerHTML = "";
        ul.remove(children);
      }
      //creating a new ul to append the new phrase
      let newul = document.createElement("ul");
      let div = document.querySelector("#phrase");
      div.appendChild(newul);
    }

    //creating a random phrase and display it to the screen
    const random = this.getRandomPhrase();
    this.activePhrase = random;
   
    random.addPhraseToDisplay();
  }

  handleInteraction(button) {}

  //Checks if the user has found all the letters or not
  checkForWin() {
    let count = 0;
    for (let i = 0; i < this.activePhrase.length; i++) {
      if (document.getElementById("letter")[i].contains("show")) {
        count++;
      }
    }
    if (count === this.activePhrase.length) {
      return true;
    } else {
      return false;
    }
  }

  //Removing the heart image and replacing it with the lostheart img when a user guesses the wrong letter
  //If he has lost 5 hearts i call the gameOver function to end the game
  removeLife() {
    this.missed++;
    let hearts = document.querySelector('img[src="images/liveHeart.png"]');
    hearts.src = "images/lostHeart.png";
    if (this.missed === 5) {
      this.gameOver(false);
    }
  }

  //Showing the message if the player won or lost at the starting screen 
  gameOver(gameWon) {
    const startScreen = document.getElementById('overlay');
    startScreen.style.display = "initial";
    let message = document.getElementById("game-over-message");
    let over = document.getElementById("overlay");
    if (gameWon) {
      message.innerText = "Congratulations.You Won!";
      over.classList.remove("start");
      over.classList.add("win");
    } else {
      message.innerText = "You Lost!";
      over.classList.remove("start");
      over.classList.add("lose");
    }
  }
}
