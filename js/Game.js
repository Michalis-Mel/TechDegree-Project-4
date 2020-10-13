class Game {
  constructor() {
    this.missed = 0;
    this.phrases = this.createPhrases();
    this.activePhrase = null;
  }
//Creating an array of 10 phrases and return the array to the this.phrases property
  createPhrases() {
    let phraseArray = [];
    phraseArray = [
      new Phrase("i am in love"),
      new Phrase("what a nice weather"),
      new Phrase("good afternoon"),
      new Phrase("how are you today"),
      new Phrase("treehouse rocks"),
      new Phrase("greece is the best place"),
      new Phrase("i am to the mall"),
      new Phrase("my dog is beautiful"),
      new Phrase("i want to get a job"),
      new Phrase("i am not in the mood"),
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

  
    handleInteraction(button) {
      //disabling the button that the user pressed
      button.disabled = true;
      if (this.checkForWin() !== true) {
        if (this.activePhrase.checkLetter(button.textContent)) {
            button.classList.add('chosen');
            this.activePhrase.showMatchedLetter(button.textContent);

            if (this.checkForWin()) {
                this.gameOver(true);
            }
        } else {
            button.classList.add('wrong');
            this.removeLife();
        }
    }  
  }

  //Checks if the user has found all the letters or not
  checkForWin() {
    //counting the spaces and the letters in the phrase
    let spaces = 0;
    let count = 0;
    //Putting all the letters of the phrase in the phraseElements array(it's a tip that i got from slack)
    const phraseElements = Array.from(document.querySelector("#phrase > ul").children);

    //Checking if all the letters of the phrase are found with the counting variables
    phraseElements.forEach(letter => {
        if (letter.className !== 'space') {
            if (letter.classList.contains('show')) {
                count++;
        }
        }else{
          spaces++;
        }
    });

    if (phraseElements.length === (count + spaces)){
      return true;
    }else{
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
    

    document.querySelector('.title').style.marginTop = '43vh';
    let message = document.getElementById("game-over-message");
    let over = document.getElementById("overlay");
    if (gameWon) {
      message.innerText = "Congratulations.You Won!";
      over.classList.remove("start");
      if(over.classList.contains('lose')){
        over.classList.remove('lose');
      }
      
      over.classList.add("win");
      
    } else {
      message.innerText = "You Lost!";
      over.classList.remove("start");
      if(over.classList.contains('win')){
          over.classList.remove('win');
        }
        
          over.classList.add("lose");
        
    }

    //Clearing the game so it can start from the start after it is over

    //clearing the letters
    document.querySelector("#phrase > ul").textContent = '';

      //Changing the button to play again after the game ends
   document.querySelector('#btn__reset').innerText= 'Play Again';

  //clearing the querty keyboard
    const keyboard = document.querySelectorAll("#qwerty div button");
    for (let i = 0; i < keyboard.length; i++) {
      keyboard[i].className = 'key';
      keyboard[i].disabled = false;
    }

    //clearing the heart images
    const hearts = document.querySelector("#scoreboard > ol");
    for (let i = 0; i < hearts.children.length; i++) {
      hearts.children[i].firstElementChild.src = "images/liveHeart.png";            
    }
  }
}

