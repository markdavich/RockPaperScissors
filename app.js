let choiceIndex = 0;

class Choice {
  constructor(name, imageName) {
    this._id = choiceIndex++;
    this._name = name;
    this._imageUrl = `images/${imageName}.png`;
  }
  get id() {
    return this._id
  }
  get name() {
    return this._name
  }
  get imageUrl() {
    return this._imageUrl
  }
  isBeatBy(choice) {
    switch (this._name) {
      case 'Rock':
        return choice === 'Paper'
      case 'Paper':
        return choice === 'Scissors'
      case 'Scissors':
        return choice === 'Rock'
    }
  }
  isTie(choice) {
    return choice === this._name
  }
}

let choices = [];

choices.push(new Choice('Rock', 'rock'))
choices.push(new Choice('Paper', 'paper'))
choices.push(new Choice('Scissors', 'scissors'))

function randomChoiceIndex() {
  let i = Math.floor(Math.random() * choices.length)
  // debugger
  return i
}


function choiceByIndex(index) {
  let result;
  choices.forEach(choice => {
    if (choice.id === index) {
      result = choice
    }
  })
  return result
}

function choiceByName(name) {
  let result;
  choices.forEach(choice => {
    if (choice.name.toLowerCase() === name.toLowerCase()) {
      result = choice
    }
  })
  return result
}

function randomChoice() {
  return choiceByIndex(randomChoiceIndex())
}

function clearHandIcons() {
  choices.forEach(choice => {
    document.getElementById(`icon-${choice.name.toLowerCase()}`).style.color = 'black'
  })
}

function drawHandIcons(userChoice) {
  clearHandIcons()
  document.getElementById(`icon-${userChoice.name.toLowerCase()}`).style.color = '#12db0b'
}

function drawChoices(userChoice) {
  let computerChoice = randomChoice()

  drawHandIcons(userChoice)

  document.getElementById('computer-choice').src = computerChoice.imageUrl
}

function play(choice) {
  drawChoices(choiceByName(choice))
}

function drawBrain() {
  let brain = document.getElementById('brain');
  let opacity = 0.00;
  let scale = 1.00;
  let dimBrain = false;

  var id = setInterval(frame, 23);

  brain.style.visibility = 'visible'
  function frame() {
    if (scale >= 2.250) {
      clearInterval(id);
      brain.style.visibility = 'hidden'
      brain.style.transform = 'scale(1)'
      brain.style.opacity = '0.00'
      play(randomChoice().name)
    } else {

      if (!dimBrain) {
        opacity += 0.05
        if (opacity >= 1) {
          dimBrain = true
        }
      } else {
        opacity -= 0.08
      }

      // console.log(`opacity: ${opacity}`)
      // opacity += 0.05;
      scale += 0.05;
      brain.style.transform = `scale(${scale})`
      brain.style.opacity = `${opacity}`;
    }
  }
}

function playRandom() {
  drawBrain()
}

