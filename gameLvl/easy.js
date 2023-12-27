const questions = {
    age: "https://ssl.gstatic.com/dictionary/static/sounds/oxford/age--_gb_1.mp3",
    chair: "https://ssl.gstatic.com/dictionary/static/sounds/oxford/chair--_gb_1.mp3",
    born: "https://ssl.gstatic.com/dictionary/static/sounds/oxford/born--_gb_1.mp3",
    blind: "https://ssl.gstatic.com/dictionary/static/sounds/oxford/blind--_gb_1.mp3",
    clown: "https://ssl.gstatic.com/dictionary/static/sounds/oxford/clown--_gb_1.mp3",
    butter: "https://ssl.gstatic.com/dictionary/static/sounds/oxford/butter--_gb_1.mp3",
    heavy: "https://ssl.gstatic.com/dictionary/static/sounds/oxford/heavy--_gb_1.mp3",
    hurt: "https://ssl.gstatic.com/dictionary/static/sounds/oxford/hurt--_gb_1.mp3",
    law: "https://ssl.gstatic.com/dictionary/static/sounds/oxford/law--_gb_1.mp3",
    laugh: "https://ssl.gstatic.com/dictionary/static/sounds/oxford/laugh--_gb_1.mp3",
    lift: "https://ssl.gstatic.com/dictionary/static/sounds/oxford/lift--_gb_1.mp3",
    know: "https://ssl.gstatic.com/dictionary/static/sounds/oxford/know--_gb_1.mp3",
    leave: "https://ssl.gstatic.com/dictionary/static/sounds/oxford/leave--_gb_1.mp3",
    corner: "https://ssl.gstatic.com/dictionary/static/sounds/oxford/corner--_gb_1.mp3",
    match: "https://ssl.gstatic.com/dictionary/static/sounds/oxford/match--_gb_1.mp3",
    bag: "https://ssl.gstatic.com/dictionary/static/sounds/oxford/bag--_gb_1.mp3",
    left: "https://ssl.gstatic.com/dictionary/static/sounds/oxford/left--_gb_1.mp3",
    love: "https://ssl.gstatic.com/dictionary/static/sounds/oxford/love--_gb_1.mp3",
    bird: "https://ssl.gstatic.com/dictionary/static/sounds/oxford/bird--_gb_1.mp3",
    circle: "https://ssl.gstatic.com/dictionary/static/sounds/oxford/circle--_gb_1.mp3",
}

const def = {
    age: "(n) the number of years that a person has lived or a thing has existed",
    chair: "(n) a piece of furniture for one person to sit on, with a back, a seat and four legs",
    born: "(v) to come out of your mother’s body at the beginning of your life",
    blinde: "(ad) not able to see",
    clown: "(n) an entertainer who wears funny clothes and a large red nose and does silly things to make people laugh",
    butter: "(n) a soft yellow food made from cream, used in cooking and for spreading on bread",
    heavy: "(ad) weighing a lot; difficult to lift or move",
    hurt: "(v) to cause physical pain to somebody/yourself; to injure somebody/yourself",
    law: "(n) a rule that deals with a particular crime, agreement, etc.",
    laugh: "(v) to make the sounds and movements of your face that show you think something is funny or silly",
    lift: "(n) to raise somebody/something or be raised to a higher position or level",
    know: "(v) to have information in your mind as a result of experience or because you have learned or been told it",
    leave: "(v) to go away from a person or a place",
    corner: "(n) a part of something where two or more sides, lines or edges join",

    match: "(n) a sports event where people or teams compete against each other",
    bag: "(n) a container made of cloth, leather, plastic or paper, used to carry things in, especially when shopping or travelling",
    left: "(ad) on the side of your body that is towards the west when you are facing north",
    love: "(n) a very strong feeling of liking and caring for somebody/something, especially a member of your family or a friend",
    bird: "(n) a creature that is covered with feathers and has two wings and two legs.",
    circle: "(n) a completely round flat shape",

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