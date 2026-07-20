let mode = "tr-en";

let quizWord;
let score = 0;
let quizWords = [];


function startQuiz(){

    let category = document.getElementById("quizCategory").value;


if(category === "all"){

    quizWords = [...words];

}else if(category === "favorites"){

    quizWords = JSON.parse(localStorage.getItem("favorites")) || [];

}else{

    quizWords = words.filter(function(word){

        return word.category === category;

    });

}
if(quizWords.length === 0){

    document.getElementById("question").innerText =
    "⭐ Bu kategoride kelime yok.";

    document.getElementById("option1").innerText = "-";
    document.getElementById("option2").innerText = "-";
    document.getElementById("option3").innerText = "-";
    document.getElementById("option4").innerText = "-";

    return;

}

    quizWord = quizWords[Math.floor(Math.random() * quizWords.length)];

    if(mode === "tr-en"){

    document.getElementById("question").innerText =
    quizWord.turkish;

}else{

    document.getElementById("question").innerText =
    quizWord.english;

}


    let options = [];

if(mode === "tr-en"){

    options.push(quizWord.english);

}else{

    options.push(quizWord.turkish);

}


    while(options.length < 4){

        let randomWord;

if(mode === "tr-en"){

    randomWord =
    words[Math.floor(Math.random() * words.length)].english;

}else{

    randomWord =
    words[Math.floor(Math.random() * words.length)].turkish;

}


        if(!options.includes(randomWord)){

            options.push(randomWord);

        }

    }


    options.sort(() => Math.random() - 0.5);


    document.getElementById("option1").innerText = options[0];
    document.getElementById("option2").innerText = options[1];
    document.getElementById("option3").innerText = options[2];
    document.getElementById("option4").innerText = options[3];

}
function checkAnswer(button){

    if(
(mode === "tr-en" && button.innerText === quizWord.english) ||
(mode === "en-tr" && button.innerText === quizWord.turkish)
)
    {

        score++;

        alert("Doğru! 🎉");

    }else{

        alert("Yanlış! Doğru cevap: " + quizWord.english);

    }


    document.getElementById("score").innerText =
    "Puan: " + score;


    startQuiz();

}
function changeMode(){

    if(mode === "tr-en"){

        mode = "en-tr";

    }else{

        mode = "tr-en";

    }

    startQuiz();

}
function showCategoryCount(){

    let category = document.getElementById("quizCategory").value;

    let count;

    if(category === "all"){

        count = words.length;

    }else if(category === "favorites"){

        const favorites =
        JSON.parse(localStorage.getItem("favorites")) || [];

        count = favorites.length;

    }else{

        count = words.filter(function(word){

            return word.category === category;

        }).length;

    }

    document.getElementById("categoryCount").innerText =
    "Bu kategoride " + count + " kelime var.";

}



startQuiz();
