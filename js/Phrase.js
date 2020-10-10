class Phrase {
  constructor(phrase) {
    this.phrase = phrase.toLowerCase();
  }

  //Displaying the letters and the spaces to the screen 
  addPhraseToDisplay() {
    const ul = document.querySelector("ul");
    let disPhrase = this.phrase;
    //this will add the phrase to the display
    for (let i = 0; i < disPhrase.length; i++) {
      if (disPhrase[i] !== " ") {
        let li = document.createElement("li");
        li.classList.add("letter");
        li.classList.add("hide");
        li.textContent = disPhrase.charAt(i);
        ul.appendChild(li);
      } else if (disPhrase[i] === " ") {
        let liSpace = document.createElement("li");
        liSpace.classList.add("space");
        liSpace.textContent = disPhrase.charAt(i);
        ul.appendChild(liSpace);
      }
    }
    return ul;
  }

  // This function checks if a letter is contained in the this.phrase of the phrase object.
  checkLetter(letter) {
    if (this.phrase.includes(letter.toLowerCase())) {
      return true;
    } else {
      return false;
    }
  }
//Showing the letters the user guessed right
  showMatchedLetter(letter) {
    for (let i = 0; i < game.activePhrase.phrase.length; i++) {
      console.log(game.activePhrase.phrase[i]);
      if (letter === game.activePhrase.phrase[i]) {
        console.log(letter);
        console.log(game.activePhrase.phrase[i]);
        document.getElementsByClassName("letter")[i].classList.add("show");
        document.getElementsByClassName("letter")[i].classList.remove('hide');
      }
    }
  }
}
