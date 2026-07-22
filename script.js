// =====================
// MedLex Main Script
// =====================

// ---------- Variables ----------

let current = 0;
let filteredWords = [...words];
let flipped = false;
let selectedCategory = "all";
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

// ---------- Navigation ----------
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



// ---------- Search ----------

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

// ---------- Card ----------

function showCurrentWord(){

    flipped = false;

    if(filteredWords.length === 0){

        document.getElementById("english").innerText = "Kelime bulunamadı";
        document.getElementById("turkish").innerText = "-";
        document.getElementById("example").innerText = "-";

        return;
    }

    const currentWord = filteredWords[current];

    document.getElementById("translationTitle").innerText = "Türkçesi:";
    document.getElementById("english").innerText = currentWord.english;
    document.getElementById("turkish").innerText = currentWord.turkish;
    document.getElementById("example").innerText = currentWord.example;
    
    updateFavoriteButton();

}

function flipCard(){

    const currentWord = filteredWords[current];

    if(flipped){

        document.getElementById("english").innerText = currentWord.english;
        document.getElementById("turkish").innerText = currentWord.turkish;

        document.getElementById("translationTitle").innerText = "Türkçesi:";

    }else{

        document.getElementById("english").innerText = currentWord.turkish;
        document.getElementById("turkish").innerText = currentWord.english;

        document.getElementById("translationTitle").innerText = "İngilizcesi:";

    }

    flipped = !flipped;

}

// ---------- Favorites ----------

function addFavorite(){

    const word = filteredWords[current];

    const index = favorites.findIndex(function(item){

        return item.english === word.english;

    });


    if(index !== -1){

        favorites.splice(index,1);

        localStorage.setItem("favorites", JSON.stringify(favorites));

        document.getElementById("favoriteCount").innerText = favorites.length;

        showToast("❤️ " + word.english + " favorilerden çıkarıldı.","error");
        updateFavoriteButton();

    }else{

        favorites.push(word);

        localStorage.setItem("favorites", JSON.stringify(favorites));

        document.getElementById("favoriteCount").innerText = favorites.length;

        showToast("⭐ " + word.english + " favorilere eklendi.","success");
        updateFavoriteButton();

    }

}

function filterCategory(){

    const category = selectedCategory;
    
    if(category === "all"){

        filteredWords = [...words];

    }else if(category === "favorites"){

        filteredWords = [...favorites];

    }else{

        filteredWords = words.filter(function(word){

            return word.category === category;

        });

    }

    current = 0;

    showCurrentWord();

}
function updateFavoriteButton(){

    const button = document.getElementById("favoriteButton");

    const word = filteredWords[current];

    const exists = favorites.some(function(item){

        return item.english === word.english;

    });

    if(exists){

        button.innerText = "❤️ Favoriden Çıkar";

        button.classList.remove("favorite-inactive");
        button.classList.add("favorite-active");

    }else{

        button.innerText = "⭐ Favorilere Ekle";

        button.classList.remove("favorite-active");
        button.classList.add("favorite-inactive");

    }

}

// ---------- Toast ----------

function showToast(message,type="info"){

    const toast = document.getElementById("toast");

    toast.innerText = message;

    toast.classList.remove("success","error","info");

    toast.classList.add(type);

    toast.classList.add("show");

    setTimeout(function(){

        toast.classList.remove("show");

    },2000);

}

// ---------- Dropdown ----------

function toggleDropdown(){

    document
        .getElementById("dropdownMenu")
        .classList.toggle("show");

}

function selectCategory(value,text){

    selectedCategory = value;

    document.getElementById("dropdownButton").innerHTML =
    text + " ▼";

    document
        .getElementById("dropdownMenu")
        .classList.remove("show");

    filterCategory();

}
window.addEventListener("click", function(event){

    if (!event.target.closest(".dropdown")) {

        document
            .getElementById("dropdownMenu")
            .classList.remove("show");

    }

});

// ---------- Startup ----------

document.getElementById("favoriteCount").innerText = favorites.length;

document.getElementById("wordCount").innerText = words.length;

showCurrentWord();