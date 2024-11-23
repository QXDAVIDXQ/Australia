const quiz = [
    {
        question: "What is the world's sixth-largest country?",
        correctAnswer: "Australia",
        answers: ["Canada", "Australia", "Brazil", "India"]
    },
    {
        question: "Approximately how many people live in Australia?",
        correctAnswer: "25 million",
        answers: ["20 million", "25 million", "30 million", "35 million"]
    },
    {
        question: "What is the capital city of Australia?",
        correctAnswer: "Canberra",
        answers: ["Sydney", "Melbourne", "Canberra", "Perth"]
    },
    {
        question: "What is the official language spoken in Australia?",
        correctAnswer: "English",
        answers: ["French", "English", "Spanish", "German"]
    },
    {
        question: "Which city is the capital of Western Australia?",
        correctAnswer: "Perth",
        answers: ["Sydney", "Perth", "Adelaide", "Brisbane"]
    },
    {
        question: "Name three famous attractions in Perth.",
        correctAnswer: "Kings Park, Perth Zoo, Swan River",
        answers: ["Eureka Tower, Botanic Gardens, Great Ocean Road", 
                  "Kings Park, Perth Zoo, Swan River", 
                  "Opera House, Darling Harbour, Bondi Beach", 
                  "Sydney Harbour Bridge, Great Barrier Reef, Uluru"]
    },
    {
        question: "Which two famous native animals can be found in Australia?",
        correctAnswer: "Kangaroos and koalas",
        answers: ["Elephants and tigers", 
                  "Kangaroos and koalas", 
                  "Pandas and monkeys", 
                  "Lions and giraffes"]
    },
    {
        question: "How old is the aboriginal culture in Australia?",
        correctAnswer: "Over 65,000 years old",
        answers: ["Over 10,000 years old", 
                  "Over 30,000 years old", 
                  "Over 65,000 years old", 
                  "Over 100,000 years old"]
    },
    {
        question: "What is the name of the largest coral reef system in the world, located in Australia?",
        correctAnswer: "The Great Barrier Reef",
        answers: ["Great Barrier Reef", 
                  "Blue Reef", 
                  "Coral Sea Reef", 
                  "Bali Reef"]
    },
    {
        question: "Which Australian city has the world's largest tram system?",
        correctAnswer: "Melbourne",
        answers: ["Sydney", "Melbourne", "Brisbane", "Adelaide"]
    }
];

let currentQuestion = 0;
let score = 0;
let coins = 0;

function loadQuestion() {
    const questionElement = document.getElementById('question');
    const answersElement = document.getElementById('answers');
    const feedbackElement = document.getElementById('feedback');
    const scoreElement = document.getElementById('score');
    const coinsElement = document.getElementById('coins');

    feedbackElement.innerHTML = '';

    questionElement.innerText = quiz[currentQuestion].question;
    answersElement.innerHTML = ''; 

    let shuffledAnswers = shuffleArray(quiz[currentQuestion].answers);
    shuffledAnswers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.innerText = answer;
        button.onclick = () => checkAnswer(answer);
        answersElement.appendChild(button);
    });

    scoreElement.innerText = `Punkte: ${score}`;
    coinsElement.innerText = `Münzen: ${coins}`;
}

function checkAnswer(selectedAnswer) {
    const correctAnswer = quiz[currentQuestion].correctAnswer;
    const feedbackElement = document.getElementById('feedback');

    if (selectedAnswer === correctAnswer) {
        score++;
        coins += 5; // 5 Münzen für jede richtige Antwort
        feedbackElement.innerText = 'Richtig! Du hast 5 Münzen verdient!';
    } else {
        feedbackElement.innerText = 'Leider falsch. Versuch es nochmal!';
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion >= quiz.length) {
        showCelebration();
        currentQuestion = 0;
        score = 0;
        coins = 0;
    } else {
        loadQuestion();
    }
}

function showCelebration() {
    const celebrationElement = document.getElementById('celebration');
    celebrationElement.classList.remove('hidden');
    document.querySelector('.quiz-container').style.display = 'none';
    setTimeout(() => {
        alert(`Quiz beendet! Du hast ${score} Punkte und ${coins} Münzen gesammelt.`);
    }, 1000);
}

function restartGame() {
    const celebrationElement = document.getElementById('celebration');
    celebrationElement.classList.add('hidden');
    document.querySelector('.quiz-container').style.display = 'block';
    currentQuestion = 0;
    score = 0;
    coins = 0;
    loadQuestion();
}

loadQuestion();
