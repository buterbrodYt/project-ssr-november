import Fetch from "./fetch.js";
import Reviews from "./reviews.js";

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

// Отображение карточки

class DisplayingServer {
  constructor(fetch, loader,review) {
    this.id = localStorage.getItem("savedId");
    this.url = new URL(`https://67266547302d03037e6d6bc0.mockapi.io/v1/sight-card/${this.id}`);
    this.fetch = fetch;
    this.loader = loader;
    this.review = review;
    this.Data = [];
  }

  async displayData() {
    this.Data = await this.fetch.fetchApi(this.url);
    console.log(this.Data);
    
    const title = document.getElementById("sight_title");
    title.textContent = this.Data.title;

    const sliderWrap = document.getElementById("sliderWrap");

    this.Data.images.forEach(image => {
        let img = document.createElement("img");
        img.src = image;
        img.classList.add("gallery__img");
        sliderWrap.appendChild(img);
    });

    const reviewContainer = document.getElementById("reviewsData");

    this.Data.reviews.forEach(review => {
        console.log(review,"rec");
        
        let reviews = document.createElement("div");
        reviews.classList.add("sight__reviews-review");

        let reviewsBlock = document.createElement("div");
        reviewsBlock.classList.add("sight__reviews-review-block");
        reviews.appendChild(reviewsBlock);

        let name = document.createElement("p");
        name.textContent = review.name;
        name.classList.add("sight__reviews-review-name");
        reviewsBlock.appendChild(name)

        let rating = document.createElement("p");
        rating.classList.add("sight__reviews-review-rating");
        const ratingText = "★ ";
        rating.textContent = (ratingText.repeat(review.rating));
        reviewsBlock.appendChild(rating);

        let description = document.createElement("p");
        description.classList.add("sight__reviews-review-description");
        description.textContent = review.description;
        reviews.appendChild(description);
        reviewContainer.appendChild(reviews);
    })

    const images = document.getElementById("sight__img");

    const image1 = document.createElement("img");
    image1.src = this.Data.images[0];
    image1.classList.add("sight__item-main-pic");
    images.appendChild(image1);

    const text = document.getElementById("sight_text");
    text.textContent = this.Data.description;

    const adress = document.getElementById("sight_adress");
    adress.textContent = this.Data.adress;

    const map = document.getElementById("map");
    map.src = this.Data.map;

    this.reviews = this.Data.reviews || [];
    
    this.loader.hideLoader();
  }


  async addReview() {
    if (document.getElementById("reviewsName").value == "" || document.getElementById("reviewsRating").value > 5 || document.getElementById("reviewsRating").value < 1 || document.getElementById("reviewsDescription") == "") {
        alert('Данные не верны')
    } else {
        this.loader.showLoader();
        await this.review.uploadReview(this.url, this.reviews);
        location.reload();
    }
  }
}

// Лоадер

class Loader {
    constructor() {
      this.preloader = document.getElementById("loader");
      this.bg = document.getElementById("loading");
    }
  
    showLoader() {
      this.preloader.classList.remove("hide-loader");
      this.bg.classList.remove("hide-loader");
      this.preloader.classList.remove("loader-hidden");
      this.bg.classList.remove("loader-hidden");
    }
  
    hideLoader() {
      this.preloader.classList.add("hide-loader");
      this.bg.classList.add("hide-loader");
      setTimeout(() => {
        this.preloader.classList.add("loader-hidden");
        this.bg.classList.add("loader-hidden");
      }, 0);
    }
  }

// Карта
class YMap {
    constructor() {
        this.map = document.getElementById("map_yandex");
        this.mapClose = document.getElementById("mapClose");
        this.back = document.getElementById("back");
    }

    open() {
        this.map.style.display = "block";
        this.map.style.animation = "fade 1s ease";
        this.back.style.display = "block";
        this.back.style.animation = "fade 1s ease";
        this.mapClose.style.display = "block";
        this.mapClose.style.animation = "fade 1s ease";
        document.body.style.overflow = "hidden";
    }

    close() {
        this.map.style.display = "none";
        this.back.style.display = "none";
        this.mapClose.style.display = "none";
        document.body.style.overflow = "visible";
    }
}

class Gallery {
    constructor() {
        this.open = document.getElementById("sight__img");
        this.back = document.getElementById("back");
        this.close = document.getElementById("gallClose");
        this.gallery = document.getElementById("gallery");
        
        this.sliderWrap = document.getElementById("sliderWrap");
        this.prev = document.getElementById("galleryPrev");
        this.next = document.getElementById("galleryNext");
        this.sliderWrap.style.transform = `translateX(-${60 * this.currentIndex}vw)`;
        this.currentIndex = 0;
    }

    closeGallery() {
        this.gallery.style.display = "none";
        this.close.style.display = "none";
        this.back.style.display = "none";
        document.body.style.overflow = "visible";
    }

    openGallery() {
        this.back.style.display = "block";
        this.gallery.style.display = "flex"
        this.close.style.display = "block";
        document.body.style.overflow = "hidden";
    }

    prevSlide() {
        if (this.currentIndex <= 0) return;
        this.moveToIndex(this.currentIndex - 1);
    }

    nextSlide() {
        this.slides = document.querySelectorAll(".gallery__img");
        this.slidesLen = this.slides.length;
        if (this.currentIndex >= this.slidesLen-1) return;
        this.moveToIndex(this.currentIndex + 1);
    }

    moveToIndex(index) {
        this.sliderWrap.style.transition = "transform 0.6s ease-in-out";
        this.sliderWrap.style.transform = `translateX(-${60 * index}vw)`;
        this.currentIndex = index;
    }
}
const fetch = new Fetch();
const review = new Reviews(fetch);
const load = new Loader();
load.showLoader();
const display = new DisplayingServer(fetch,load,review);
display.displayData();
const burg = new BurgerMenu();
const gall = new Gallery();
const map = new YMap();

window.review = review;
window.display = display;
window.burg = burg;
window.gall = gall;
window.map = map;