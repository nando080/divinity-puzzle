const startScreen = document.querySelector('.start-screen')
const buttonsContainer = document.querySelector('.buttons-container')
const soundConfigButton = document.querySelector('.sound-config')
const soundButtonImg = document.querySelector('.sound-config img')

const hoverAudio = new Audio('../assets/audio/sfx/hover.mp3')
const clickAudio = new Audio('../assets/audio/sfx/click.mp3')
const soundButtonAudio = new Audio('../assets/audio/sfx/sound-button.mp3')

let isSoundOn = true

const gameBoard = []

const winnerCombination = [
    [0, 2, 1, 2],
    [1, 2, 3, 1],
    [1, 2, 1, 2],
    [0, 1, 1, 1]
]

const generateButton = (row, column) => {
    const newButton = document.createElement('button')
    newButton.setAttribute('class', 'button button--stage-0 is-active')
    newButton.dataset.row = row
    newButton.dataset.column = column
    return newButton
}

const fillGameBoard = () => {
    winnerCombination.forEach(row => {
        const currentRow = []
        row.forEach(column => {
            currentRow.push({
                stage: 0,
                isActive: false,
                button: generateButton(row, column)
            })
        })
        gameBoard.push(currentRow)
    })
    console.log(gameBoard)
}

const insertGameBoardIntoDom = () => {
    gameBoard.forEach(row => {
        row.forEach(item => {
            buttonsContainer.appendChild(item.button)
        })
    })
}

const playSound = sound => {
    sound.play()
}

const initiateBoard = () => {
    fillGameBoard()
    insertGameBoardIntoDom()
}

const handleSoundButtonClick = () => {
    if (isSoundOn) {
        isSoundOn = false
        soundButtonImg.setAttribute('src', './assets/img/sound-on.svg')
        return
    }
    isSoundOn = true
    soundButtonImg.setAttribute('src', './assets/img/sound-off.svg')
    playSound(soundButtonAudio)
}

const targetIsAButton = target => target.dataset.row ? true : false

const handleMouseOver = event => {
}

const handleMouseOut = () => {
}

const handleClick = event => {
}

window.addEventListener('keypress', event => {
    const isStartScreenActive = startScreen.classList.contains('flex-center')
    if (isStartScreenActive) {
        startScreen.classList.remove('flex-center')
    }
})

soundConfigButton.addEventListener('click', handleSoundButtonClick)

buttonsContainer.addEventListener('mouseover', handleMouseOver)
buttonsContainer.addEventListener('mouseout', handleMouseOut)
buttonsContainer.addEventListener('click', handleClick)

initiateBoard()