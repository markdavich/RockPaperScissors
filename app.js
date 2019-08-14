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

function drawChoices(userChoice) {
  let computerChoice = randomChoice()

  document.getElementById('computer-choice').src = computerChoice.imageUrl
}

function play(choice) {
  drawChoices(choiceByName(choice))
}

async function drawBrain() {
  let brain = document.getElementById('brain');
  let opacity = 0.00;
  let scale = 1.00;

  var id = setInterval(await frame, 23);

  brain.style.visibility = 'visible'
  async function frame() {
    if (scale >= 2.00) {
      clearInterval(id);
      brain.style.visibility = 'hidden'
      brain.style.transform = 'scale(1)'
      brain.style.opacity = '0.00'
    } else {
      opacity += 0.05;
      scale += 0.05;
      brain.style.transform = `scale(${scale})`
      brain.style.opacity = `${opacity}`;
    }
  }
}

async function playRandom() {
  await drawBrain()
  play(randomChoice().name)
}

