const slides = document.querySelectorAll(".slide");

for (let slide of slides) {
    slide.addEventListener("click", () => {
        removeActiveClasses();

        slide.classList.add("active");
    })
}

function removeActiveClasses() {
    slides.forEach(function(slide) {
        slide.classList.remove("active");
    })
}