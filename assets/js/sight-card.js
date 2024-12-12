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

// Данные с сервера

class DisplayingServer {
  constructor() {
    this.id = localStorage.getItem("savedId");
    this.idUrl = new URL(`https://67266547302d03037e6d6bc0.mockapi.io/v1/sight-card/${this.id}`);
    this.Data = [];
  }

  async fetchData() {
    try {
      const response = await fetch(this.idUrl);
      if (!response.ok) {
        throw new Error("Ошибка сети");
      }
      this.Data = await response.json();
      this.displayData(this.Data);
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    }
  }

  displayData(data) {
    const title = document.getElementById("sight_title");
    title.textContent = data.title;

    const sliderWrap = document.getElementById("sliderWrap");

    data.images.forEach(image => {
        let img = document.createElement("img");
        img.src = image;
        img.classList.add("gallery__img");
        sliderWrap.appendChild(img);
    });

    const images = document.getElementById("sight__img");

    const image1 = document.createElement("img");
    image1.src = data.images[0];
    image1.classList.add("sight__item-main-pic");
    images.appendChild(image1);

    const text = document.getElementById("sight_text");
    text.textContent = data.description;

    const adress = document.getElementById("sight_adress");
    adress.textContent = data.adress;

    const map = document.getElementById("map");
    map.src = data.map;
  }
}

// Лоадер

class Loader {
    constructor() {
      this.preloader = document.getElementById("loader");
      this.bg = document.getElementById("loading");
    }

    listener() {
        if (window.onload) {
            this.showLoader();
        } else {
            this.hideLoader();
        }
    }

    showLoader() {
        this.preloader.classList.remove("hide-loader");
        this.bg.classList.remove("hide-loader");
        setTimeout(() => {
            this.preloader.classList.remove("loader-hidden");
            this.bg.classList.remove("loader-hidden");
        }, 1000);
    }

    hideLoader() {
      this.preloader.classList.add("hide-loader");
      this.bg.classList.add("hide-loader");
      setTimeout(() => {
        this.preloader.classList.add("loader-hidden");
        this.bg.classList.add("loader-hidden");
      }, 1000);
    }
}

// Карта
class YMap {
    constructor() {
        this.map = document.getElementById("map_yandex");
        this.close = document.getElementById("close");
        this.back = document.getElementById("back");
    }

    open() {
        this.map.style.display = "block";
        this.map.style.animation = "fade 1s ease";
        this.back.style.display = "block";
        this.back.style.animation = "fade 1s ease";
        this.close.style.display = "block";
        this.close.style.animation = "fade 1s ease";
        document.body.style.overflow = "hidden";
    }

    close() {
        this.map.style.display = "none";
        this.back.style.display = "none";
        this.close.style.display = "none";
        document.body.style.overflow = "visible";
    }
}

class Gallery {
    constructor() {
        this.open = document.getElementById("sight__img");
        this.back = document.getElementById("back");
        this.close = document.getElementById("close");
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
        console.log('123');
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

display = new DisplayingServer();
display.fetchData()
burg = new BurgerMenu();
load = new Loader();
load.listener();
map = new YMap();
gall = new Gallery();