// Бургер

class BurgerMenu {
  constructor() {
    this.burgerIcon = document.getElementById("burgerIcon");
    this.menuItems = document.getElementById("menuItems");
    this.burgerIcon.addEventListener("click", this.toggleMenu.bind(this));
  }

  toggleMenu() {
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

    this.fetchData();
  }

  async fetchData() {
    try {
      const response = await fetch(this.idUrl);
      if (!response.ok) {
        throw new Error("Ошибка сети");
      }
      this.Data = await response.json();
      this.displayData(this.Data);
      console.log(this.Data);
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    }
  }

  displayData(data) {
    const title = document.getElementById("sight_title");
    title.textContent = data.title;

    const image1 = document.createElement("img");
    image1.src = data.image1;
    image1.classList.add("sight__item-main-pic");

    const image = document.getElementById("sight_main");
    image.appendChild(image1);

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
    window.addEventListener("load", this.hideLoader.bind(this));
  }

  hideLoader() {
    this.preloader.classList.add("hide-loader");
    this.bg.classList.add("hide-loader");
    setTimeout(() => {
      this.preloader.classList.add("loader-hidden");
      this.bg.classList.add("loader-hidden");
    }, 1200);
  }
}

// Карта
class YMap {
    constructor() {
        this.Listener();
    }

    Listener() {
        document.getElementById("map_btton").addEventListener("click", function () {
        document.getElementById("map_yandex").style.display = "block";
        document.getElementById("map_yandex").style.animation = "fade 1s ease";
        document.getElementById("back").style.display = "block";
        document.getElementById("back").style.animation = "fade 1s ease";
        document.getElementById("close").style.display = "block";
        document.getElementById("close").style.animation = "fade 1s ease";
        document.body.style.overflow = "hidden";
        });

        document.getElementById("close").addEventListener("click", function () {
        document.getElementById("map_yandex").style.display = "none";
        document.getElementById("back").style.display = "none";
        document.getElementById("close").style.display = "none";
        document.body.style.overflow = "visible";
        });
    }
}

new DisplayingServer();
new BurgerMenu();
new Loader()
new YMap();