
let current = 0;
let filteredWords = [...words];
let flipped = false;

function nextWord() {

    current = (current + 1) % filteredWords.length;

    showCurrentWord();

}
function previousWord(){

    current = (current - 1 + filteredWords.length) % filteredWords.length;

    showCurrentWord();

}

function randomWord(){

    current = Math.floor(Math.random() * filteredWords.length);

    showCurrentWord();

}


function flipCard(){

    const currentWord = filteredWords[current];

    if(flipped){

        document.getElementById("english").innerText = currentWord.english;
        document.getElementById("turkish").innerText = currentWord.turkish;

    }else{

        document.getElementById("english").innerText = currentWord.turkish;
        document.getElementById("turkish").innerText = currentWord.english;

    }

    flipped = !flipped;

}
function searchWord(){

    const text = document.getElementById("search").value.toLowerCase();

    for(let i = 0; i < filteredWords.length; i++){

        if(
            filteredWords[i].english.toLowerCase().includes(text) ||
            filteredWords[i].turkish.toLowerCase().includes(text)
        ){

            current = i;

            showCurrentWord();

            return;

        }

    }

}
function showCurrentWord(){

    flipped = false;

    if(filteredWords.length === 0){

        document.getElementById("english").innerText = "Kelime bulunamadı";
        document.getElementById("turkish").innerText = "-";
        document.getElementById("example").innerText = "-";

        return;
    }

    const currentWord = filteredWords[current];

    document.getElementById("english").innerText = currentWord.english;
    document.getElementById("turkish").innerText = currentWord.turkish;
    document.getElementById("example").innerText = currentWord.example;
    
    updateFavoriteButton();

}
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

function addFavorite(){

    const word = words[current];

    const index = favorites.findIndex(function(item){

        return item.english === word.english;

    });


    if(index !== -1){

        favorites.splice(index,1);

        localStorage.setItem("favorites", JSON.stringify(favorites));

        document.getElementById("favoriteCount").innerText = favorites.length;

        alert(word.english + " favorilerden çıkarıldı.");
        updateFavoriteButton();

    }else{

        favorites.push(word);

        localStorage.setItem("favorites", JSON.stringify(favorites));

        document.getElementById("favoriteCount").innerText = favorites.length;

        alert(word.english + " favorilere eklendi.");
        updateFavoriteButton();

    }

}

function filterCategory(){

    const category = document.getElementById("category").value;

    if(category === "all"){

        filteredWords = [...words];

    }else{

        filteredWords = words.filter(function(word){

            return word.category === category;

        });

    }

    current = 0;

    showCurrentWord();

    document.getElementById("wordCount").innerText = filteredWords.length;

}

document.getElementById("favoriteCount").innerText = favorites.length;

document.getElementById("wordCount").innerText = words.length;


showCurrentWord();

function updateFavoriteButton(){

    const button = document.querySelector("button[onclick='addFavorite()']");

    const word = filteredWords[current];

    const exists = favorites.some(function(item){

        return item.english === word.english;

    });

    if(exists){

        button.innerText = "❌ Favoriden Çıkar";

    }else{

        button.innerText = "⭐ Favorilere Ekle";

    }

}