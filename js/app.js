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

const updateBoard = (row, column, operation='increase') => {
    const currentStage = gameBoard[row][column]
    let newStage = currentStage
    if (operation === 'increase') {
        if (currentStage < maxStage) {
            gameBoard[row][column] = ++newStage
        }
    }
    if (operation === 'decrease') {
        if (currentStage > 0) {
            gameBoard[row][column] = --newStage
        }
    }
}

const updateButtonStage = button => {
    const buttonRow = button.dataset.row
    const buttonColumn = button.dataset.column
    button.dataset.stage = gameBoard[buttonRow][buttonColumn]
}

const switchButtonState = (button) => {
    const isButtonPressed = button.dataset.state === 'enabled'
    if (isButtonPressed) {
        button.dataset.state = 'disenabled'
        return
    }
    button.dataset.state = 'enabled'
}

const playSound = sound => {
    sound.play()
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

const isElementButton = event => event.target.dataset.stage ? true : false

const handleMouseOver = event => {
    if (isElementButton(event) && isSoundOn) {
        playSound(hoverAudio)
    }
}

const handleMouseOut = () => {
    if (isSoundOn) {
        playSound(hoverAudio)
    }
}

const handleClick = event => {
    if (isElementButton(event)) {
        if (isSoundOn) {
            playSound(clickAudio)
        }
        const currentButton = event.target
        const buttonRow = currentButton.dataset.row
        const buttonColumn = currentButton.dataset.column
        const isButtonPressed = currentButton.dataset.state === 'enabled'
        if (isButtonPressed) {
            updateBoard(buttonRow, buttonColumn, 'decrease')
        } else {
            updateBoard(buttonRow, buttonColumn)
        }
        switchButtonState(currentButton)
        updateButtonStage(currentButton)
        console.log(currentButton, gameBoard.flat(1))
    }
}

window.addEventListener('keypress', event => {
    const isStartScreenActive = startScreen.classList.contains('flex-center')
    if (isStartScreenActive) {
        startScreen.classList.remove('flex-center')
    }
})