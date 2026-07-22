// =====================
// MedLex Quiz Script
// =====================

// ---------- Variables ----------

let mode = "tr-en";

let quizWord = null;
let score = 0;
let quizWords = [];

let currentQuestion = 0;
let correctAnswers = 0;
let wrongAnswers = 0;
let quizPool = [];

// ---------- Elements ----------

const question = document.getElementById("question");
const scoreText = document.getElementById("score");
const categoryCount = document.getElementById("categoryCount");

const optionButtons = [
    document.getElementById("option1"),
    document.getElementById("option2"),
    document.getElementById("option3"),
    document.getElementById("option4")
];

// ---------- New Quiz ----------

function newQuiz() {

    score = 0;
    correctAnswers = 0;
    wrongAnswers = 0;
    currentQuestion = 0;

    scoreText.innerText = "🏆 Puan: 0";

    const category = document.getElementById("quizCategory").value;

    if (category === "all") {

        quizWords = [...words];

    } else if (category === "favorites") {

        quizWords = JSON.parse(localStorage.getItem("favorites")) || [];

    } else {

        quizWords = words.filter(word => word.category === category);

    }

    quizPool = [...quizWords];

    optionButtons.forEach(button => {

        button.style.display = "block";

    });

    startQuiz();

}

// ---------- Quiz ----------

function startQuiz() {

    if (quizWords.length === 0) {

        question.innerText = "⭐ Bu kategoride kelime yok.";

        optionButtons.forEach(function(button) {

            button.style.display = "none";

        });

        return;

    }

    if (quizPool.length === 0) {

        showResult();

        return;

    }

    currentQuestion++;

    const randomIndex = Math.floor(Math.random() * quizPool.length);

    quizWord = quizPool[randomIndex];

    quizPool.splice(randomIndex, 1);

    if (mode === "tr-en") {

        question.innerText =
            "Soru " + currentQuestion + " / " + quizWords.length +
            "\n\n" +
            quizWord.turkish;

    } else {

        question.innerText =
            "Soru " + currentQuestion + " / " + quizWords.length +
            "\n\n" +
            quizWord.english;

    }

    let options = [];

    if (mode === "tr-en") {

        options.push(quizWord.english);

    } else {

        options.push(quizWord.turkish);

    }

    while (options.length < 4) {

        let randomOption;

        if (mode === "tr-en") {

            randomOption = words[Math.floor(Math.random() * words.length)].english;

        } else {

            randomOption = words[Math.floor(Math.random() * words.length)].turkish;

        }

        if (!options.includes(randomOption)) {

            options.push(randomOption);

        }

    }

    options.sort(() => Math.random() - 0.5);

    optionButtons.forEach(function(button, index) {

        button.style.display = "block";
        button.innerText = options[index];

    });

}
// ---------- Answer ----------

function checkAnswer(button) {

    const isCorrect =
        (mode === "tr-en" && button.innerText === quizWord.english) ||
        (mode === "en-tr" && button.innerText === quizWord.turkish);

    if (isCorrect) {

        score++;
        correctAnswers++;

        showToast("🎉 Doğru!", "success");

    } else {

        wrongAnswers++;

        const correctAnswer =
            mode === "tr-en"
                ? quizWord.english
                : quizWord.turkish;

        showToast(
            "❌ Doğru cevap: " + correctAnswer,
            "error"
        );

    }

    scoreText.innerText = "🏆 Puan: " + score;

    setTimeout(function () {

        startQuiz();

    }, 700);

}


// ---------- Result ----------

function showResult() {

    const percentage = Math.round(
        (correctAnswers / quizWords.length) * 100
    );

    question.innerHTML = `
        <div style="line-height:1.8">
            <h2>🎉 Quiz Tamamlandı</h2>

            <p>🏆 Puan: <b>${score}</b></p>

            <p>✅ Doğru: <b>${correctAnswers}</b></p>

            <p>❌ Yanlış: <b>${wrongAnswers}</b></p>

            <p>📈 Başarı: <b>%${percentage}</b></p>

            <br>

            <button onclick="newQuiz()">
                🔄 Tekrar Oyna
            </button>

        </div>
    `;

    optionButtons.forEach(function(button){

        button.style.display = "none";

    });

}
// ---------- Mode ----------

function changeMode() {

    mode = (mode === "tr-en") ? "en-tr" : "tr-en";

    if (quizWords.length > 0) {

        startQuiz();

    }

}


// ---------- Category ----------

function showCategoryCount() {

    const category = document.getElementById("quizCategory").value;

    let count;

    if (category === "all") {

        count = words.length;

    } else if (category === "favorites") {

        count = (JSON.parse(localStorage.getItem("favorites")) || []).length;

    } else {

        count = words.filter(word => word.category === category).length;

    }

    categoryCount.innerText =
        "📚 Bu kategoride " + count + " kelime var.";

}


// ---------- Startup ----------

showCategoryCount();

question.innerText = "▶ Quiz başlatmak için butona basın.";