// =====================
// MedLex Quiz Script
// Version 2.0
// =====================


// ---------- Variables ----------

let mode = "tr-en";

let score = 0;

let currentQuestion = 0;

let correctAnswers = 0;

let wrongAnswers = 0;

let quizWords = [];

let quizPool = [];

let quizWord = null;


// ---------- DOM Elements ----------

const question = document.getElementById("question");

const scoreText = document.getElementById("score");

const categoryCount = document.getElementById("categoryCount");

const quizCategory = document.getElementById("quizCategory");

const optionButtons = [

    document.getElementById("option1"),

    document.getElementById("option2"),

    document.getElementById("option3"),

    document.getElementById("option4")

];

// ---------- New Quiz ----------

function newQuiz() {

    score = 0;

    currentQuestion = 0;

    correctAnswers = 0;

    wrongAnswers = 0;

    scoreText.innerText = "🏆 Puan: 0";

    const category = quizCategory.value;

    if (category === "all") {

        quizWords = [...words];

    } else if (category === "favorites") {

        quizWords =
            JSON.parse(localStorage.getItem("favorites")) || [];

    } else {

        quizWords = words.filter(function(word) {

            return word.category === category;

        });

    }

    quizPool = [...quizWords];

    optionButtons.forEach(function(button) {

        button.style.display = "block";

    });

    startQuiz();

}

// ---------- Start Quiz ----------

function startQuiz() {

    if (quizPool.length === 0) {

        showResult();

        return;

    }

    const randomIndex = Math.floor(Math.random() * quizPool.length);

    quizWord = quizPool[randomIndex];

    quizPool.splice(randomIndex, 1);

    currentQuestion++;

    if (mode === "tr-en") {

        question.innerText =
            "Soru " +
            currentQuestion +
            " / " +
            quizWords.length +
            "\n\n" +
            quizWord.turkish;

    } else {

        question.innerText =
            "Soru " +
            currentQuestion +
            " / " +
            quizWords.length +
            "\n\n" +
            quizWord.english;

    }

    createOptions();

}

// ---------- Options ----------

function createOptions() {

    let options = [];

    if (mode === "tr-en") {

        options.push(quizWord.english);

    } else {

        options.push(quizWord.turkish);

    }

    while (options.length < 4) {

        let randomOption;

        if (mode === "tr-en") {

            randomOption =
                words[Math.floor(Math.random() * words.length)].english;

        } else {

            randomOption =
                words[Math.floor(Math.random() * words.length)].turkish;

        }

        if (!options.includes(randomOption)) {

            options.push(randomOption);

        }

    }

    options.sort(function () {

        return Math.random() - 0.5;

    });

    optionButtons.forEach(function (button, index) {

        button.innerText = options[index];

    });

}

// ---------- Check Answer ----------

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

    scoreText.innerText =
        "🏆 Puan: " + score;

    startQuiz();

}

// ---------- Result ----------

function showResult() {

    saveStatistics();

    const percentage = Math.round(
        (correctAnswers / quizWords.length) * 100
    );

    let message = "";

    if (percentage === 100) {

        message = "🏆 Mükemmel!";

    } else if (percentage >= 80) {

        message = "🎉 Çok iyi!";

    } else if (percentage >= 60) {

        message = "👍 Güzel!";

    } else if (percentage >= 40) {

        message = "📚 Biraz daha çalış!";

    } else {

        message = "💪 Vazgeçme!";

    }

    question.innerHTML = `
        ${message}<br><br>
        🏆 Puan: ${score}<br>
        ✅ Doğru: ${correctAnswers}<br>
        ❌ Yanlış: ${wrongAnswers}<br>
        📈 Başarı: %${percentage}
    `;

    optionButtons.forEach(function(button) {

        button.style.display = "none";

    });

}

// ---------- Mode ----------

function changeMode() {

    if (mode === "tr-en") {

        mode = "en-tr";

    } else {

        mode = "tr-en";

    }

    newQuiz();

}

// ---------- Category ----------

function showCategoryCount() {

    const category = quizCategory.value;

    let count = 0;

    if (category === "all") {

        count = words.length;

    } else if (category === "favorites") {

        count = JSON.parse(
            localStorage.getItem("favorites")
        )?.length || 0;

    } else {

        count = words.filter(function(word) {

            return word.category === category;

        }).length;

    }

    categoryCount.innerText =
        "Bu kategoride " + count + " kelime var.";

}

// ---------- Statistics ----------

function saveStatistics() {

    const statistics = {

        totalQuestions:
            Number(localStorage.getItem("totalQuestions")) || 0,

        totalCorrect:
            Number(localStorage.getItem("totalCorrect")) || 0,

        totalWrong:
            Number(localStorage.getItem("totalWrong")) || 0,

        totalScore:
            Number(localStorage.getItem("totalScore")) || 0

    };

    statistics.totalQuestions += quizWords.length;

    statistics.totalCorrect += correctAnswers;

    statistics.totalWrong += wrongAnswers;

    statistics.totalScore += score;

    localStorage.setItem(
        "totalQuestions",
        statistics.totalQuestions
    );

    localStorage.setItem(
        "totalCorrect",
        statistics.totalCorrect
    );

    localStorage.setItem(
        "totalWrong",
        statistics.totalWrong
    );

    localStorage.setItem(
        "totalScore",
        statistics.totalScore
    );

}

// ---------- Startup ----------

optionButtons.forEach(function(button) {

    button.style.display = "none";

});

showCategoryCount();