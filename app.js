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

function cloneElementToViewPort(element, ) {
  let clone = document.createElement('div');
  let rect = element.getBoundingClientRect()
  clone.id = 'clone'
  clone.style.visibility = 'hidden'
  clone.style.color = element.style.color
  clone.style.margin = 'auto'
  clone.style.textAlign = 'center'
  clone.style.fontFamily = getComputedStyle(element).getPropertyValue('font-family') //element.style.fontFamily
  clone.style.fontSize = getComputedStyle(element).getPropertyValue('font-size')
  clone.style.paddingLeft = '10px'
  clone.style.paddingRight = '10px'
  clone.style.borderRadius = '23px'
  clone.textContent = element.textContent
  clone.style.display = 'inline-block'
  clone.style.position = 'absolute'
  clone.style.top = `${rect.top}px`
  clone.style.left = `${rect.left}px`
  clone.style.visibility = 'visible'
  clone.style.zIndex = '1000'
  clone.style.height = `${element.clientHeight}px`
  clone.style.width = `${element.clientWidth}px`
  document.body.appendChild(clone)

  return clone
}

function interpolate(x1, x2, y1, y2, y) {
  let x = (y - y1) * (x2 - x1) / (y2 - y1)
  return Math.floor(x)
}

function createToken(player) {
  let token = document.createElement('div');
  token.classList.add('token')
  // token.style.opacity = '0'
  document.getElementById(`${player}-won-games`).appendChild(token)
  return token
}

function drawWinner(player) {
  let gameStatus = document.getElementById('game-status')
  let winingElement = cloneElementToViewPort(gameStatus)
  let token = createToken('computer')
  let tokenRect = token.getBoundingClientRect()

  gameStatus.style.color = 'rgb(0, 0, 0, 0)'

  let scale = 0.95;
  let blur = 1;
  let offset = 1;
  let pause = 0
  let direction = 1

  let top = winingElement.offsetTop;

  let upId = setInterval(() => {
    if (scale >= 2) {
      let pauseId = setInterval(() => {
        pause++
        if (pause >= 1000) {
          let left = winingElement.offsetLeft;
          let l = left
          let t = winingElement.offsetHeight
          let s = scale
          let o = offset
          let b = blur
          if (tokenRect.left < left) {
            direction = -1
          }
          let moveId = setInterval(() => {
            if (left <= tokenRect.left) {
              clearInterval(moveId)
              clearInterval(upId);
              clearInterval(pauseId);
              gameStatus.style.color = 'rgb(0, 0, 0, 1)'
              gameStatus.innerText = 'Begin'
              winingElement.remove()
            } else {
              left = left + direction
              top = interpolate(t, token.offsetTop, l, tokenRect.left, left)
              scale = interpolate(s, 0, l, tokenRect.left, left)
              offset = interpolate(o, 0, l, tokenRect.left, left)
              blur = interpolate(b, 0, l, tokenRect.left, left)
              winingElement.style.left = `${left}`
              winingElement.style.top = `${top}px`
              winingElement.style.transform = `scale(${scale})`
              winingElement.style.boxShadow = `${offset}px ${offset}px ${blur}px black`
            }
          }, 23)
        }
      }, 23)
    } else {
      top -= 3
      scale += 0.05
      blur = interpolate(1, 20, 1, 2, scale)
      offset = interpolate(1, 10, 1, 2, scale)

      // gameStatus.style.opacity = `${opacity}`
      // gameStatus.style.transform = `scale(${opacity})`
      winingElement.style.top = `${top}px`
      winingElement.style.transform = `scale(${scale})`
      winingElement.style.boxShadow = `${offset}px ${offset}px ${blur}px black`
    }
  }, 23)
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

