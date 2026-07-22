// =====================
// MedLex Utilities
// =====================

function showToast(message, type = "info") {

    const toast = document.getElementById("toast");

    toast.innerText = message;

    toast.className = "";

    toast.classList.add(type);
    toast.classList.add("show");

    setTimeout(function () {

        toast.classList.remove("show");

    }, 2000);

}