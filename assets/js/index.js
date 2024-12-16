// Бургер
class BurgerMenu {
    constructor() {
      this.burgerIcon = document.getElementById("burgerIcon");
      this.menuItems = document.getElementById("menuItems");
    }
  
    listener() {
      if (this.menuItems.classList.contains("open")) {
        this.menuItems.classList.remove("open");
        this.burgerIcon.classList.remove("open");
      } else {
        this.menuItems.classList.add("open");
        this.burgerIcon.classList.add("open");
      }
    }
  }

// Бесконечный слайдер

class Slider {
    constructor() {
        this.sliderWrap = document.querySelector(".slider__wrap");
        this.slides = document.querySelectorAll(".slider__slide");
        this.btnPrev = document.querySelector(".slider__nav-back");
        this.btnNext = document.querySelector(".slider__nav-next");
        this.currentIndex = 1;

        this.firstClone = this.slides[0].cloneNode(true);
        this.slidesLen = this.slides.length;
        this.lastClone = this.slides[this.slidesLen - 1].cloneNode(true);
        this.sliderWrap.appendChild(this.firstClone);
        this.sliderWrap.insertBefore(this.lastClone, this.slides[0]);

        this.slideWidth = this.slides[0].clientWidth;
        this.sliderWrap.style.transform = `translateX(-${this.slideWidth * this.currentIndex}px)`;
    }

    moveToIndex(index) {
        this.sliderWrap.style.transition = "transform 0.6s ease-in-out";
        this.sliderWrap.style.transform = `translateX(-${this.slideWidth * index}px)`;
        this.currentIndex = index;
    }

    handleTransitionEnd() {
        if (this.currentIndex == this.slidesLen + 1) {
            this.sliderWrap.style.transition = "none";
            this.currentIndex = 1;
            this.sliderWrap.style.transform = `translateX(-${this.slideWidth * this.currentIndex}px)`;
          } else if (this.currentIndex == 0) {
            this.sliderWrap.style.transition = "none";
            this.currentIndex = this.slidesLen;
            this.sliderWrap.style.transform = `translateX(-${this.slideWidth * this.currentIndex}px)`;
          }
    }

    prevSlide() {
        if (this.currentIndex <= 0) return;
        this.moveToIndex(this.currentIndex - 1);
        this.sliderWrap.addEventListener("transitionend", this.handleTransitionEnd.bind(this));
    }
    nextSlide() {
        if (this.currentIndex >= this.slidesLen + 1) return;
        this.moveToIndex(this.currentIndex + 1);
        this.sliderWrap.addEventListener("transitionend", this.handleTransitionEnd.bind(this));
    }
}

const burg = new BurgerMenu();
const slide = new Slider();