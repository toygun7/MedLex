// =====================
// MedLex Main Script
// =====================


// ---------- Variables ----------

let current = 0;

let filteredWords = [...words];

let flipped = false;

let selectedCategory = "all";

let favorites =
JSON.parse(localStorage.getItem("favorites")) || [];

// ---------- DOM Elements ----------

const english =
document.getElementById("english");

const turkish =
document.getElementById("turkish");

const example =
document.getElementById("example");

const translationTitle =
document.getElementById("translationTitle");

const favoriteButton =
document.getElementById("favoriteButton");

const favoriteCount =
document.getElementById("favoriteCount");

const wordCount =
document.getElementById("wordCount");

const dropdownButton =
document.getElementById("dropdownButton");

const dropdownMenu =
document.getElementById("dropdownMenu");

const searchInput =
document.getElementById("search");

// ---------- Navigation ----------

function nextWord() {

    if (filteredWords.length === 0) return;

    current = (current + 1) % filteredWords.length;

    showCurrentWord();

}

function previousWord() {

    if (filteredWords.length === 0) return;

    current--;

    if (current < 0) {

        current = filteredWords.length - 1;

    }

    showCurrentWord();

}

function randomWord() {

    if (filteredWords.length === 0) return;

    current = Math.floor(Math.random() * filteredWords.length);

    showCurrentWord();

}

// ---------- Search ----------

function searchWord() {

    const text = searchInput.value.trim().toLowerCase();

    if (text === "") {

        current = 0;
        showCurrentWord();
        return;

    }

    const index = filteredWords.findIndex(function(word) {

        return (
            word.english.toLowerCase().includes(text) ||
            word.turkish.toLowerCase().includes(text)
        );

    });

    if (index !== -1) {

        current = index;
        showCurrentWord();

    }

}

// ---------- Card ----------

function showCurrentWord() {

    flipped = false;

    if (filteredWords.length === 0) {

        english.innerText = "Kelime bulunamadı";
        turkish.innerText = "-";
        example.innerText = "-";
        translationTitle.innerText = "Türkçesi:";

        return;

    }

    const word = filteredWords[current];

    english.innerText = word.english;

    turkish.innerText = word.turkish;

    example.innerText = word.example;

    translationTitle.innerText = "Türkçesi:";

    updateFavoriteButton();

}

function flipCard() {

    if (filteredWords.length === 0) return;

    const word = filteredWords[current];

    if (!flipped) {

        english.innerText = word.turkish;

        turkish.innerText = word.english;

        translationTitle.innerText = "İngilizcesi:";

    } else {

        english.innerText = word.english;

        turkish.innerText = word.turkish;

        translationTitle.innerText = "Türkçesi:";

    }

    flipped = !flipped;

}

// ---------- Favorites ----------

function updateFavoriteButton() {

    if (filteredWords.length === 0) return;

    const word = filteredWords[current];

    const isFavorite = favorites.some(function(item) {

        return item.english === word.english;

    });

    if (isFavorite) {

        favoriteButton.innerText = "❤️ Favoriden Çıkar";

        favoriteButton.classList.remove("favorite-inactive");
        favoriteButton.classList.add("favorite-active");

    } else {

        favoriteButton.innerText = "⭐ Favorilere Ekle";

        favoriteButton.classList.remove("favorite-active");
        favoriteButton.classList.add("favorite-inactive");

    }

}

function addFavorite() {

    if (filteredWords.length === 0) return;

    const word = filteredWords[current];

    const index = favorites.findIndex(function(item) {

        return item.english === word.english;

    });

    if (index === -1) {

        favorites.push(word);

        showToast(
            "⭐ " + word.english + " favorilere eklendi.",
            "success"
        );

    } else {

        favorites.splice(index, 1);

        showToast(
            "❤️ " + word.english + " favorilerden çıkarıldı.",
            "error"
        );

    }

    localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
    );

    favoriteCount.innerText = favorites.length;

    updateFavoriteButton();

}

// ---------- Category ----------

function filterCategory() {

    switch (selectedCategory) {

        case "favorites":

            filteredWords = [...favorites];
            break;

        case "all":

            filteredWords = [...words];
            break;

        default:

            filteredWords = words.filter(function(word) {

                return word.category === selectedCategory;

            });

    }

    current = 0;

    showCurrentWord();

}

function selectCategory(value, text) {

    selectedCategory = value;

    dropdownButton.innerHTML = text + " ▼";

    dropdownMenu.classList.remove("show");

    filterCategory();

}

// ---------- Dropdown ----------

function toggleDropdown() {

    dropdownMenu.classList.toggle("show");

}

window.addEventListener("click", function(event) {

    if (!event.target.closest(".dropdown")) {

        dropdownMenu.classList.remove("show");

    }

});

// ---------- Startup ----------

favoriteCount.innerText = favorites.length;

wordCount.innerText = words.length;

showCurrentWord();