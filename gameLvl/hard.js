const questions = {
  hospital: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/hospital--_gb_1.mp3',
    although: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/although--_gb_1.mp3',
    scientist: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/scientist--_gb_1.mp3',
    certainly: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/certainly--_gb_1.mp3',
    direction: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/direction--_gb_1.mp3',
    financial: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/day--_gb_1.mp3',
    national: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/national--_gb_1.mp3',
    research: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/research--_gb_1.mp3',
    friendly: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/friendly--_gb_1.mp3',
    identify: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/identify--_gb_1.mp3',
    determine: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/determine--_gb_1.mp3',
    adventure: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/adventure--_gb_1.mp3',
    bathroom: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/bathroom--_gb_1.mp3',
    beautiful: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/beautiful--_gb_1.mp3',
    behavior: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/party--_gb_1.mp3',
    birthday: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/birthday--_gb_1.mp3',
    daughter: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/daughter--_gb_1.mp3',
    economic: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/economic--_gb_1.mp3',
    lifestyle: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/lifestyle--_gb_1.mp3',
    marketing: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/marketing--_gb_1.mp3',
}

const def = {
  hospital: 'Meaning; an institution for providing medical treatment',
   although: 'Meaning; It is used to show two opposite statements.',
   scientist: 'Meaning; man of science',
   certainly: 'Meaning; definitely, undoubtedly',
   direction: 'Meaning; aspect, way',
   financial: 'of or relating to those commonly engaged in dealing with money and credit.',
   national: 'Meaning; public',
   research: 'Meaning; investigate',
   friendly: 'Meaning; sincere, intimate',
   identify: 'Meaning; assign, adjust',
   determine: 'Meaning; set down',
   adventure: 'an exciting or very unusual experience.',
   bathroom: 'a room equipped for taking a bath or shower.',
   behavior: 'manner of behaving or acting.',
   beautiful: 'wonderful; fantastic:',
   birthday: 'A party of some guests, typically involving eating, drinking, and entertainment',
   daughter: 'a female child or person in relation to her parents.',
   economic: 'pertaining to the production, distribution, and use of income, wealth, and commodities.',
   lifestyle: 'the habits, attitudes, tastes, moral standards, economic level, etc., that together constitute the mode of living of an individual or group.',
   marketing: 'the act of buying or selling in a market.',



}

// Initializing element
const wrapper = document.getElementById('wrapper')
const main = document.getElementById('main')
const difficulty = document.getElementById('difficulty')
const audioSource = document.getElementById('audioSource')
const input = document.getElementById('answers')
const hintWrapper = document.getElementById('hintWrapper')
const hintBtn = document.getElementById('hint')
const hint = document.getElementById('showHint')
const scoreInfo = document.getElementById('scoreInfo')
let isLookAtHint = false

// init variable
const { values, keys } = Object
let audio
let currentQuestions = ''
let answers = ''
let diff = ''
let page = 1
let score = 0
const answered = []

// for the begining
wrapper.removeChild(main)

// For timer
let time = 5 // You can change the time here
let timeInMinutes = time * 60
let interval = null

/**
 * To start the timer
 */
const startTimer = () => {
    const timer = document.getElementById('timer')

    const minutes = Math.floor(timeInMinutes / 60)
    let seconds = timeInMinutes % 60

    timeInMinutes--
    timer.innerText = `${minutes < 10 ? '0'+minutes : minutes}:${seconds < 10 ? '0'+seconds : seconds}`

    if (timeInMinutes < 0) {
        clearInterval(interval)
    }
}

/**
 * Handling easy button click
 */
const handleEasyBtn = () => {
    wrapper.removeChild(difficulty)
    wrapper.append(main)
    diff = 'easy'

    runQuiz()
    interval = setInterval(startTimer, 1000)
}

/**
 * Handling show hint
 */
const showHint = () => {
    isLookAtHint = true
    hintWrapper.removeChild(hintBtn)
    switch (diff) {
        case 'easy':
            hint.innerHTML = `<b>Hint:</b> ${def[currentQuestions]}`
    }
}

/**
 * Running quiz
 */
const runQuiz = () => {
    const question = getDifficultyQuestion(diff)
    scoreInfo.innerText = `Your score: ${score}`
    switch (diff) {
        case 'easy':
            {
                currentQuestions = keys(questions)[question]
            }
    }
}

const random = () => {
        return Math.floor(Math.random() * keys(questions).length)
    }
    /**
     * Handling get question by difficulty
     * @returns {number}
     */
const getDifficultyQuestion = () => {
    let idx = random()

    // Filtering is the current question has passed yet
    const filterQuestion = answered.find(index => index === idx)
    if (page > 1 && filterQuestion !== undefined) {
        idx = random()
    }
    answered.push(idx)
    console.log(answered)

    switch (diff) {
        case 'easy':
            {
                audio = new Audio(values(questions)[idx])
            }
    }

    return idx
}

/**
 * Handle play audio
 */
const playAudio = () => {
    audio.play()
}

/**
 * To handle on change
 * @param {Event} e
 */
const handleChange = (e) => {
    answers = e.target.value
}

/**
 * Handling submit
 * @param {Event} e
 */
const handleSubmit = (e) => {
    e.preventDefault()
    if (page < 11) {
        if (answers.toLowerCase() === currentQuestions.toLowerCase()) {
            alert('Correct')
            score += 10
        } else {
            alert('Almost there')
        }

        input.value = ''

        if (isLookAtHint) { // If user took a look at hint
            hintWrapper.removeChild(hint)
            hintWrapper.append(hintBtn)
            isLookAtHint = false
        }

        page++
        runQuiz()
        console.log(page, `Hasil score: ${score}`)

    }

    if (page > 10) {
        stopQuiz()

    }

    function stopQuiz() {
        alert("FINISH!: YOUR SCORE IS: " + score)

    }
}
