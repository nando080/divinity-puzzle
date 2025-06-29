const startScreen = document.querySelector('.start-screen')
const buttonsContainer = document.querySelector('.buttons-container')
const soundConfigButton = document.querySelector('.sound-config')
const soundButtonImg = document.querySelector('.sound-config img')

const hoverAudio = new Audio('../assets/audio/sfx/hover.mp3')
const clickAudio = new Audio('../assets/audio/sfx/click.mp3')
const soundButtonAudio = new Audio('../assets/audio/sfx/sound-button.mp3')

const generateButton = (row, column) => {
    const newButton = document.createElement('button')
    newButton.classList.add('button')
    newButton.dataset.row = row
    newButton.dataset.column = column
    newButton.dataset.stage = 0
    newButton.dataset.state = 'inactive'
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

soundConfigButton.addEventListener('click', handleSoundButtonClick)

buttonsContainer.addEventListener('mouseover', handleMouseOver)
buttonsContainer.addEventListener('mouseout', handleMouseOut)
buttonsContainer.addEventListener('click', handleClick)

initiateBoard()