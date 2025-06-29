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

const playSound = sound => {
    sound.play()
}

const handleSoundButtonClick = () => {
    console.log(isSoundOn)
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

const handleClick = event => { }

window.addEventListener('keypress', event => {
    const isStartScreenActive = startScreen.classList.contains('flex-center')
    if (isStartScreenActive) {
        startScreen.classList.remove('flex-center')
    }
})