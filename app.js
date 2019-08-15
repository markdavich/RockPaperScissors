let _choiceId = -1;
let humanScore = 0;
let computerScore = 0;
let gameStatus = 'Begin'
let firstRound = true;

const BLANK_IMAGE = 'images/blank.png'
const PLAYER = {
  COMPUTER: {

  },
  PLAYER: {

  }
}
const CHOICE_NAMES = {
  PAPER: 'paper',
  SCISSORS: 'scissors',
  ROCK: 'rock'
}

function properCase(str) {
  return [...str][0].toUpperCase() + [...str].slice(1)
}

class Choice {
  constructor(name) {
    this._id = _choiceId++;
    this._name = name;
    this._imageUrl = `images/${name}.png`;
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
      case CHOICE_NAMES.ROCK:
        return choice === 'paper'
      case CHOICE_NAMES.PAPER:
        return choice === 'scissors'
      case CHOICE_NAMES.SCISSORS:
        return choice === 'rock'
    }
  }
  isTie(choice) {
    return choice === this._name
  }
}

let choices = [];

let resetChoice = new Choice('blank')

choices.push(new Choice(CHOICE_NAMES.PAPER))
choices.push(new Choice(CHOICE_NAMES.SCISSORS))
choices.push(new Choice(CHOICE_NAMES.ROCK))

function randomChoiceIndex() {
  let i = Math.floor(Math.random() * choices.length)
  console.log(i)
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
    if (choice.name === name) {
      result = choice
    }
  })
  return result
}

function randomChoice() {
  let choice = choiceByIndex(randomChoiceIndex())
  return choice
}

function resetHandIcons() {
  choices.forEach(choice => {
    document.getElementById(`icon-${choice.name.toLowerCase()}`).style.color = 'black'
  })
}

function drawHandIcons(userChoice) {
  resetHandIcons()
  document.getElementById(`icon-${userChoice.name.toLowerCase()}`).style.color = '#12db0b'
}

function setScore(humanChoice, computerChoice) {
  if (firstRound) {
    gameStatus = 'Begin'
  } else if (humanChoice.name === computerChoice.name) {
    gameStatus = "It's a tie"
  } else if (humanChoice.isBeatBy(computerChoice.name)) {
    gameStatus = 'Computer'
    computerScore++
  } else {
    gameStatus = 'Human'
    humanScore++
  }
}

function drawScores() {
  document.getElementById('game-status').textContent = gameStatus
  document.getElementById('human-score').textContent = `Human ${humanScore}`
  document.getElementById('computer-score').textContent = `Computer ${computerScore}`
}

function resetComputerChoiceImage() {
  drawComputerChoice(resetChoice)
}

function resetGame() {
  gameStatus = 'Begin'
  firstRound = true
  humanScore = 0;
  computerScore = 0;
  resetComputerChoiceImage();
  resetHandIcons()
  drawScores()
}

function dimElement(element, callBack) {
  let id = setInterval(frame, 10);
  let opacity = 1;

  function frame() {
    if (opacity <= 0) {
      clearInterval(id);
      callBack()
    } else {
      opacity -= 0.05
      element.style.opacity = `${opacity}`;
    }
  }
}

function brightenElement(element, callBack) {
  let id = setInterval(frame, 10);
  let opacity = 0;

  function frame() {
    if (opacity >= 1) {
      clearInterval(id);
      callBack()
    } else {
      opacity += 0.05
      element.style.opacity = `${opacity}`;
    }
  }
}

function drawComputerChoice(computerChoice) {
  let computerImage = document.getElementById('computer-choice')

  dimElement(computerImage, () => {
    computerImage.classList.remove(
      CHOICE_NAMES.PAPER,
      CHOICE_NAMES.SCISSORS,
      CHOICE_NAMES.ROCK
    )

    computerImage.classList.add(computerChoice.name)
    computerImage.src = computerChoice.imageUrl

    brightenElement(computerImage, () => { })
  })

  // computerImage.scr = ''







}

function drawChoices(humanChoice) {
  let computerChoice = randomChoice()

  setScore(humanChoice, computerChoice)

  drawScores()

  drawHandIcons(humanChoice)

  drawComputerChoice(computerChoice)

  firstRound = false
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

resetGame()

