const quizData = [
    { question: "Complete the quote: SMRITI, YOU ARE NOT ________", options: ["my best friend","a snake tamer","french","a member of seventeen"], answer: "french" },
    { question: "Choose the thing we've never had a discussion about", options: ["manjun sunitha social media ban", "things that should not be done with carrots","slovakian invasion","pradeep ranganthan is a cutiepie"], answer: "pradeep ranganthan is a cutiepie" },
    { question: "What is my sister's surname", options: ["Lakshmi","Bullock","Thotten","Chechi"], answer: "Thotten" },
    { question: "Math problem: (Number of degrees you'll have in two years + Number of degrees I have)/(Number of degrees you'll have in two years - Number of degrees I have)", options: ["0.75","1.75","1.5","2"], answer: "2" },
    { question: "Rearrange the words in the nickname I once made(to which you replied None of those adjectives go together!) in the correct order: 1.Jelly 2.Turbo 3.Disco 4.Wolf  ", options: ["1234","2413","2143","3124"], answer: "2143" }
];
let currentQuestion = 0;
let score = 0;
let timeLeft = 30;
let timer;

const questionEl = document.querySelector(".question");
const optionsEl = document.querySelector(".options");
const timerContainer = document.querySelector(".timer"); 
const timerEl = document.getElementById("time");
const resultEl = document.querySelector(".result");
const scoreEl = document.getElementById("score");
const finalMessageEl = document.querySelector(".final-message");
const restartBtn = document.querySelector(".restart-btn");

function loadQuestion() {
    if (currentQuestion >= quizData.length) return endQuiz();

    clearInterval(timer);
    timeLeft = 30;
    timerEl.textContent = timeLeft;
    timerContainer.style.display = "block"; 

    timer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = timeLeft;
        if (timeLeft <= 0) endQuiz();
    }, 1000);

    const q = quizData[currentQuestion];
    questionEl.textContent = q.question;
    optionsEl.innerHTML = "";

    q.options.forEach(opt => {
        const btn = document.createElement("button");
        btn.className = "option";
        btn.textContent = opt;
        btn.onclick = () => {
            if (opt === q.answer) score++;
            currentQuestion++;
            loadQuestion();
        };
        optionsEl.appendChild(btn);
    });
}

function endQuiz() {
    clearInterval(timer);

    timerContainer.style.display = "none"; 

    questionEl.style.display = "none";
    optionsEl.style.display = "none";
    resultEl.style.display = "block";
    finalMessageEl.style.display = "block";

    if (score === quizData.length) {
        finalMessageEl.innerHTML = `
            🎉 Congratulations! You've proven who you are ╰(*°▽°*)╯<br><br>
            <button onclick=" location.href='valentine.html'">Continue -></button>
        `;
    } else {
        finalMessageEl.textContent = "❌(┬┬﹏┬┬) Not a perfect score. Try again.";
        restartBtn.style.display = "block";
    }
}

restartBtn.onclick = () => {
    currentQuestion = 0;
    score = 0;

    questionEl.style.display = "block";
    optionsEl.style.display = "flex";
    resultEl.style.display = "none";
    finalMessageEl.style.display = "none";
    restartBtn.style.display = "none";

    loadQuestion();
};

loadQuestion();
