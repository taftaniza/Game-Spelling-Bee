const questions = {
  ridiculous: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/ridiculous--_gb_1.mp3',
  historical: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/historical--_gb_1.mp3',
  prejudice: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/prejudice--_gb_1.mp3',
  telescope: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/telescope --_gb_1.mp3',
  imagination: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/imagination--_gb_1.mp3',
  glimpse: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/glimpse--_gb_1.mp3',
  treatment: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/treatment--_gb_1.mp3',
  geography: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/geography--_gb_1.mp3',
  haphazard: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/fast--_gb_1.mp3',
  bankruptcy: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/bankruptcy--_gb_1.mp3',
  catastrophe : 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/catastrophe --_gb_1.mp3',
  excessive: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/excessive--_gb_1.mp3',
  envious: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/envious--_gb_1.mp3',
  committal: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/committal --_gb_1.mp3',
  patrician: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/patrician--_gb_1.mp3',
  idolatrous: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/idolatrous--_gb_1.mp3',
  horrific: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/horrific--_gb_1.mp3',
  dominance : 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/dominance --_gb_1.mp3',
  anxious : 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/anxious--_gb_1.mp3',
  fiasco: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/fiasco--_gb_1.mp3',
}

const def = {
  ridiculous: '(ad) very silly or unreasonable',
  historical: '(ad) connected with the past',
  prejudice: '(n) an unreasonable dislike of or preference for a person, group, custom, etc., especially when it is based on their race, religion, sex, etc.',
  telescope : ' (n) a piece of equipment like a tube in shape, containing lenses, that you look through to make objects that are far away appear larger and nearer',
  imagination: '(n) the ability to create pictures in your mind; the part of your mind that does this',
  glimpse: '(n) a sight of somebody/something for a very short time, when you do not see the person or thing completely',
  treatment: '(n) something that is done to cure an illness or injury, or to make somebody look and feel good',
  geography: '(n) the scientific study of the earth’s surface, physical features, divisions, products, population, etc.',
  haphazard : '(ad) with no particular order or plan; not organized well',
  bankruptcy: '(n) the state of being bankrupt',
  catastrophe: '(n) a sudden event that causes many people to suffer',
  excessive: '(ad) greater than what seems reasonable or appropriate',
  envious: '(ad) wanting to be in the same situation as somebody else; wanting something that somebody else has',
  committal: '(n) the official process of sending somebody to prison or to a mental hospital',
  patrician: '(n) a person from the highest social class',
  idolatrous: '(ad) connected with the practice of worshipping statues as gods',
  horrific: '(ad) extremely bad and making you feel shocked or frightened',
  dominance: '(n) the fact of being more important, powerful or easy to notice than somebody/something else',
  anxious: '(ad) feeling worried or nervous',
  fiasco: '(n) something that does not succeed, often in a way that makes people feel embarrassed',
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
