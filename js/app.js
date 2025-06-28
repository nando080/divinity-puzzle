const buttonsContainer = document.querySelector('.buttons-container')
const hoverAudio = document.querySelector('.button-hover-audio')

const maxStage = 3

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
    winnerCombination.forEach((row, rowIndex) => {
        row.forEach((_, columnIndex) => {
            buttonsContainer.appendChild(generateButton(rowIndex, columnIndex))
        })
    })
}

const initiateBoard = () => {
    fillButtonsContainer()
}

const handleHover = event => {
    if (event.target.dataset.stage) {
        hoverAudio.play()
    }
    console.log(event)
}

buttonsContainer.addEventListener('mouseover', handleHover)

initiateBoard()

console.log(hoverAudio)