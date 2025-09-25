const questions = [
    {
        question: " What will the following code output? <br>console.log(typeof null);",
        answers: [
            {text: "object", correct: true},
            {text: "null", correct: false},
            {text: "undefined", correct: false},
            {text: "boolean", correct: false}
        ]
    },
    {
        question: " Which method is used to convert a JSON string into a JavaScript object?",
        answers: [
            {text: "JSON.parse()", correct: true},
            {text: "JSON.stringify()", correct: false},
            {text: "Object.parse()", correct: false},
            {text: "toJSON()", correct: false}
        ]
    },
    {
        question: 'What is the result of:<br> console.log(2 + "2");',
        answers: [
            {text: "4", correct: false},
            {text: '"22"', correct: true},
            {text: "NaN", correct: false},
            {text: "Error", correct: false}
        ]
    },
    {
        question: "Which of the following is NOT a JavaScript data type?",
        answers: [
            {text: "String", correct: false},
            {text: 'Number', correct: false},
            {text: "Character", correct: true},
            {text: "Boolean", correct: false}
        ]
    },
    {
        question: "What does the === operator check in JavaScript?",
        answers: [
            {text: "Value only", correct: false},
            {text: 'Type only', correct: false},
            {text: "Value and type", correct: true},
            {text: "Memory reference", correct: false}
        ]
    }
]

const questionElement = document.getElementById("question-here");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.querySelector(".next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex+1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block"; 
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=> {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});
startQuiz();