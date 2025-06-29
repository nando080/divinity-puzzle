const startScreen = document.querySelector('.start-screen')
const soundConfigButton = document.querySelector('sound-config')
const buttonsContainer = document.querySelector('.buttons-container')
const hoverAudio = document.querySelector('.button-hover-audio')


const maxStage = 3

let isSoundOn = true

const gameBoard = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
]

const winnerCombination = [
    [0, 2, 1, 2],
    [1, 2, 3, 1],
    [1, 2, 1, 2],
    [0, 1, 1, 1]
]

const generateButton = (row, column) => {
    const newButton = document.createElement('button')
    newButton.classList.add('button')
    newButton.dataset.row = row
    newButton.dataset.column = column
    newButton.dataset.stage = 0
    return newButton
}

const fillButtonsContainer = () => {
    gameBoard.forEach((row, rowIndex) => {
        row.forEach((_, columnIndex) => {
            buttonsContainer.appendChild(generateButton(rowIndex, columnIndex))
        })
    })
}

const initiateBoard = () => {
    fillButtonsContainer()
}

const playSound = sound => {
    sound.play()
}

const handleMouseOver = event => {
    const mouseTarget = event.target
    const isAButton = mouseTarget.dataset.stage
    if (isAButton  && isSoundOn) {
        playSound(hoverAudio)
    }
}

const handleMouseOut = () => playSound(hoverAudio)

const handleClick = event => {}

window.addEventListener('keypress', event => {
    const isStartScreenActive = startScreen.classList.contains('flex-center')
    if(isStartScreenActive) {
        startScreen.classList.remove('flex-center')
    }
})

buttonsContainer.addEventListener('mouseover', handleMouseOver)
buttonsContainer.addEventListener('mouseout', handleMouseOut)
buttonsContainer.addEventListener('click', handleClick)

initiateBoard()