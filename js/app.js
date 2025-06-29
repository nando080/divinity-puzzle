const startScreen = document.querySelector('.start-screen')
const buttonsContainer = document.querySelector('.buttons-container')
const soundConfigButton = document.querySelector('.sound-config')
const soundButtonImg = document.querySelector('.sound-config img')
const victoryScreen = document.querySelector('.victory-screen')

const hoverAudio = new Audio('../assets/audio/sfx/hover.mp3')
const clickAudio = new Audio('../assets/audio/sfx/click.mp3')
const soundButtonAudio = new Audio('../assets/audio/sfx/sound-button.mp3')
const doorsSound = new Audio('../assets/audio/sfx/doors.mp3')

let isSoundOn = true

const gameBoard = []

const winnerCombination = [
    [0, 2, 1, 2],
    [1, 2, 3, 1],
    [1, 2, 1, 2],
    [0, 1, 1, 1]
]

const maxBoardRows = winnerCombination.length
const maxBoardColumns = winnerCombination[0].length

const generateButton = (row, column) => {
    const newButton = document.createElement('button')
    newButton.setAttribute('class', 'button button--stage-0')
    newButton.dataset.row = row
    newButton.dataset.column = column
    return newButton
}

const fillGameBoard = () => {
    for (let row = 0; row < maxBoardRows; row++) {
        const newRow = []
        for (let column = 0; column < maxBoardColumns; column++) {
            newRow.push({
                stage: 0,
                isActive: false,
                button: generateButton(row, column)
            })
        }
        gameBoard.push(newRow)
    }
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
    const targetElement = event.target
    if (targetIsAButton(targetElement)) {
        if (isSoundOn) {
            playSound(hoverAudio)
        }
    }
}

const handleMouseOut = event => {
    const targetElement = event.target
     if (targetIsAButton(targetElement)) {
        if (isSoundOn) {
            playSound(hoverAudio)
        }
    }
}

const getAdjacentAdresses = (row, column) => {
    const adresses = []
    // Rows
    if (row === 0) {
        adresses.push( [ row + 1, column ] )
    } else if (row === maxBoardRows - 1) {
        adresses.push( [ row - 1, column ] )
    } else {
        adresses.push( [ row - 1, column ] )
        adresses.push( [ row + 1, column ] )
    }
    // Columns
    if (column === 0) {
        adresses.push( [ row, column + 1 ] )
    } else if (column === maxBoardColumns - 1) {
        adresses.push( [ row, column - 1 ] )
    } else {
        adresses.push( [ row, column - 1 ] )
        adresses.push( [ row, column + 1 ] )
    }
    return adresses
}

const switchCellActivation = (row, column) => {
    const cellIsActive = gameBoard[row][column].isActive
    if (cellIsActive) {
        gameBoard[row][column].isActive = false
        return
    }
    gameBoard[row][column].isActive = true
}

const updateCellStage = (row, column, operation='increase') => {
    const currentStageValue = gameBoard[row][column].stage
    const maxStage = maxBoardColumns - 1
    if (operation === 'increase') {
        if (currentStageValue < maxStage) {
            gameBoard[row][column].stage += 1
        }
    }
    if (operation === 'decrease') {
        if (currentStageValue > 0) {
            gameBoard[row][column].stage -= 1
        }
    }
}

const updateCellAndAdjacentStages = (row, column, operation) => {
    const adjacents = getAdjacentAdresses(row, column)
    updateCellStage(row, column, operation)
    adjacents.forEach(adress => {
        updateCellStage(adress[0], adress[1], operation)
    })
}

const updateCellAppearence = (row, column) => {
    const cellButton = gameBoard[row][column].button
    const currentCellStage = gameBoard[row][column].stage
    const currentCellIsActive = gameBoard[row][column].isActive
    cellButton.setAttribute('class', `button button--stage-${currentCellStage}`)
    if (currentCellIsActive) {
        cellButton.classList.add('button--active')
    }
}

const updateCellAndAdjacentAppearences = (row, column) => {
    const adjacents = getAdjacentAdresses(row, column)
    updateCellAppearence(row, column)
    adjacents.forEach(adress => {
        updateCellAppearence(adress[0], adress[1])
    })
}

const hasPlayerWon = () => {
    let hasWon = true
    winnerCombination.forEach((row, rowIndex) => {
        row.forEach((item, columnIndex) => {
            if (item !== gameBoard[rowIndex][columnIndex].stage) {
                hasWon = false
            }
        })
    })
    console.log(hasWon)
    return hasWon
}

const showVictoryScreen = () => {
    if (hasPlayerWon()) {
        victoryScreen.classList.add('is-active')
        const showTimer = setTimeout(() => {
            victoryScreen.classList.remove('is-hidden')
            buttonsContainer.classList.add('is-hidden')
        }, 10)
        const soundTimer = setTimeout(() => {
            playSound(doorsSound)
        },4900)
    }
}

const handleClick = event => {
    const targetElement = event.target
    const targetRow = Number(targetElement.dataset.row)
    const targetColumn = Number(targetElement.dataset.column)
    if (targetIsAButton(targetElement)) {
        const targetIsActive = gameBoard[targetRow][targetColumn].isActive
        if (isSoundOn) {
            playSound(clickAudio)
        }
        if (targetIsActive) {
            updateCellAndAdjacentStages(targetRow, targetColumn, 'decrease')
        } else {
            updateCellAndAdjacentStages(targetRow, targetColumn)
        }
        switchCellActivation(targetRow, targetColumn)
        updateCellAndAdjacentAppearences(targetRow, targetColumn)
        showVictoryScreen()
    }
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