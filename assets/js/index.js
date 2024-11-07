// Бургер

document.getElementById("burgerIcon").addEventListener("click", function () {
  const menuItems = document.getElementById("menuItems");
  const burgerIcon = document.getElementById("burgerIcon");

  if (menuItems.classList.contains("open")) {
    menuItems.classList.remove("open");
    burgerIcon.classList.remove("open");
  } else {
    menuItems.classList.add("open");
    burgerIcon.classList.add("open");
  }
});

// Бесконечный слайдер

document.addEventListener("DOMContentLoaded", function () {
  const sliderWrap = document.querySelector(".slider__wrap");
  const slides = document.querySelectorAll(".slider__slide");
  const btnPrev = document.querySelector(".slider__nav-back");
  const btnNext = document.querySelector(".slider__nav-next");
  let currentIndex = 1;

  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slides.length - 1].cloneNode(true);
  sliderWrap.appendChild(firstClone);
  sliderWrap.insertBefore(lastClone, slides[0]);

  const slideWidth = slides[0].clientWidth;
  sliderWrap.style.transform = `translateX(-${slideWidth * currentIndex}px)`;

  function moveToIndex(index) {
    sliderWrap.style.transition = "transform 0.6s ease-in-out";
    sliderWrap.style.transform = `translateX(-${slideWidth * index}px)`;
    currentIndex = index;
  }

  function handleTransitionEnd() {
    if (currentIndex === slides.length + 1) {
      sliderWrap.style.transition = "none";
      currentIndex = 1;
      sliderWrap.style.transform = `translateX(-${
        slideWidth * currentIndex
      }px)`;
    } else if (currentIndex === 0) {
      sliderWrap.style.transition = "none";
      currentIndex = slides.length;
      sliderWrap.style.transform = `translateX(-${
        slideWidth * currentIndex
      }px)`;
    }
  }

  sliderWrap.addEventListener("transitionend", handleTransitionEnd);

  btnPrev.addEventListener("click", () => {
    if (currentIndex <= 0) return;
    moveToIndex(currentIndex - 1);
  });

  btnNext.addEventListener("click", () => {
    if (currentIndex >= slides.length + 1) return;
    moveToIndex(currentIndex + 1);
  });
});
