import Fetch from "./fetch.js";
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

class DisplayingSight {
  constructor(data,allData) {
    this.url = new URL(
      "https://67266547302d03037e6d6bc0.mockapi.io/v1/sight-card"
    );
    this.allSightURL = new URL(
      "https://67266547302d03037e6d6bc0.mockapi.io/v1/sight-card"
    );
    this.Data = data;
    this.allData = allData;
    this.totalPages = Math.ceil(this.allData/this.itemsPerPage);
    this.itemsPerPage = 9;
  }

  updateParams() {
    this.currentPage = parseInt(localStorage.getItem("savedPage")) || 1;
    this.searchTerm = localStorage.getItem("savedSearch") || "";
    this.selectedCategory = localStorage.getItem("savedCategory") || "";
    this.selectedSort = localStorage.getItem("savedSort") || "";
    this.selectedOrder = localStorage.getItem("savedOrder") || "";
    if (this.selectedCategory == "all") {
      this.selectedCategory = "";
    }
    if (this.selectedSort == "none") {
      this.selectedSort = "";
    }

    this.url.searchParams.set("limit", this.itemsPerPage);
    this.url.searchParams.set("page", this.currentPage);
    this.url.searchParams.set("title", this.searchTerm);
    this.url.searchParams.set("sortBy", this.selectedSort);
    this.url.searchParams.set("order", this.selectedOrder);
    this.allSightURL.searchParams.set("title", this.searchTerm);
    this.url.searchParams.set("category", this.selectedCategory);
    this.allSightURL.searchParams.set("category", this.selectedCategory);
  }

  get pages() {
    return this.totalPages;
  }

  displayData(data) {
    const sight = document.getElementById("data_container");
    sight.innerHTML = "";

    if (data.length > 0) {
      data.forEach((item) => {
        const card = document.createElement("li");
        card.classList.add("sight__items-item");
        card.setAttribute("data-category", item.category);

        const wrap = document.createElement("div");
        wrap.classList.add("sight__items-card");

        const title = document.createElement("h2");
        title.innerHTML += item.title;
        title.classList.add("sight__items-card-title");
        wrap.appendChild(title);

        const a = document.createElement("a");
        a.href = "./sight-card.html";
        a.classList.add("sight__items-link");
        a.setAttribute("id", item.id);
        wrap.appendChild(a);

        const wrap_block = document.createElement("div");
        wrap_block.classList.add("sight__items-card-block");
        a.appendChild(wrap_block);

        const image = document.createElement("img");
        image.src = item.images[0];
        image.alt = item.title;
        image.classList.add("sight__items-card-pic");
        wrap_block.appendChild(image);

        const description_block = document.createElement("div");
        description_block.classList.add("sight__items-card-back");
        wrap_block.appendChild(description_block);

        const description = document.createElement("p");
        description.innerHTML += item.description;
        description.classList.add("sight__items-card-text");
        description_block.appendChild(description);

        card.appendChild(wrap);
        sight.appendChild(card);
      });
    } else {
      this.unknownSearchQuery();
    }

    sight.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", function (event) {
        event.preventDefault();
        localStorage.setItem("savedId", a.getAttribute("id"));
        window.location.href = a.href;
      });
    });
  }

  unknownSearchQuery() {
    const sight = document.getElementById("data_container");
    sight.innerHTML = "";
    const card = document.createElement("li");
    card.classList.add("sight__items-item");
    card.setAttribute("data-category", "unknow");

    const wrap = document.createElement("div");
    wrap.classList.add("sight__items-card");

    const title = document.createElement("h2");
    title.textContent = "Неизвестный поисковой запрос";
    title.classList.add("sight__items-card-title");
    wrap.appendChild(title);

    const wrap_block = document.createElement("div");
    wrap_block.classList.add("sight__items-card-block");
    wrap.appendChild(wrap_block);

    const image = document.createElement("img");
    image.src = "./assets/img/sight/unknow_pic.png";
    image.alt = "picture_unknow";
    image.classList.add("sight__items-card-pic");
    wrap_block.appendChild(image);

    card.appendChild(wrap);
    sight.appendChild(card);
  }
}

class SearchFilterSort {
  constructor(obj,loader) {
    this.searchTerm = localStorage.getItem("savedSearch") || "";
    this.selectedCategory = localStorage.getItem("savedCategory") || "";
    this.selectedSort = localStorage.getItem("savedSort") || "";
    this.fetch = obj;
    this.loader = loader;
  }

  filteringAndSearching() {
    this.loader.showLoader();
    const searchInput = document.getElementById("search__input");
    const categorySelect = document.getElementById("category__select");
    const sortSelect = document.getElementById("sorting__select");
    this.searchTerm = searchInput.value.toLowerCase();
    this.selectedCategory = categorySelect.value;
    this.selectedSort = sortSelect.value;
    this.currentPage = 1;
    if (this.selectedCategory == "all") {
      localStorage.setItem("savedCategory", "");
    } else {
      localStorage.setItem("savedCategory", this.selectedCategory);
    }
    if (this.selectedSort == "none") {
      localStorage.setItem("savedSort", "");
      localStorage.setItem("savedOrder", "");
    } else if (this.selectedSort === "a-z") {
      localStorage.setItem("savedSort", "title");
      localStorage.setItem("savedOrder", "asc");
    } else if (this.selectedSort === "z-a") {
      localStorage.setItem("savedSort", "title");
      localStorage.setItem("savedOrder", "desc");
    } else if (this.selectedSort === "pop") {
      localStorage.setItem("savedSort", "popularity");
      localStorage.setItem("savedOrder", "desc");
    } else if (this.selectedSort === "!pop") {
      localStorage.setItem("savedSort", "popularity");
      localStorage.setItem("savedOrder", "asc");
    } else if (this.selectedSort === "year") {
      localStorage.setItem("savedSort", "year");
      localStorage.setItem("savedOrder", "asc");
    } else if (this.selectedSort === "!year") {
      localStorage.setItem("savedSort", "year");
      localStorage.setItem("savedOrder", "desc");
    }

    localStorage.setItem("savedSearch", this.searchTerm);
    localStorage.setItem("savedPage", this.currentPage);
    this.fetch.fetchData();
    this.loader.listener();
  }

  displayMenu() {
    const menuBtn = document.getElementById("menu__button");
    const menu = document.getElementById("menu");
    const sight = document.getElementById("sight");
    let c = 0;
    menuBtn.addEventListener("click", () => {
      if (c == 0) {
        menu.style.display = "flex";
        sight.style.opacity = "0.5";
        c++;
      } else {
        menu.style.display = "none";
        sight.style.opacity = "1";
        c--;
      }
    });
  }
}

class Pagination {
  constructor(obj, loader) {
    this.currentPage = parseInt(localStorage.getItem("savedPage")) || 1;
    this.obj = obj;
    this.totalPages = this.obj.pages;
    this.loader = loader;
  }

  updatePagination() {
    const firstPage = document.getElementById("firstPage");
    const page1 = document.getElementById("nowPage-1");
    const nowPage = document.getElementById("nowPage");
    const page2 = document.getElementById("nowPage+1");
    const lastPage = document.getElementById("lastPage");
    page1.textContent = `${this.currentPage - 1}`;
    nowPage.textContent = `${this.currentPage}`;
    page2.textContent = `${this.currentPage + 1}`;

    if (this.currentPage === 1) {
      page1.style.display = "none";
      firstPage.disabled = true;
    } else {
      page1.style.display = "block";
      firstPage.disabled = false;
    }

    if (this.currentPage < this.totalPages) {
      page2.style.display = "block";
      lastPage.disabled = false;
    } else {
      page2.style.display = "none";
      lastPage.disabled = true;
    }
    this.loader.listener();
  }

  firstPage() {
    this.currentPage = 1;
    localStorage.setItem("savedPage", this.currentPage);
    this.loader.showLoader();
    this.updatePagination();
    this.obj.fetchData();
  }

  prevPage() {
    this.currentPage--;
    localStorage.setItem("savedPage", this.currentPage);
    this.loader.showLoader();
    this.updatePagination();
    this.obj.fetchData();
  }

  nextPage() {
    this.currentPage++;
    localStorage.setItem("savedPage", this.currentPage);
    this.loader.showLoader();
    this.updatePagination();
    this.obj.fetchData();
  }

  lastPage() {
    this.currentPage = this.totalPages;
    localStorage.setItem("savedPage", this.currentPage);
    this.loader.showLoader();
    this.updatePagination();
    this.obj.fetchData();
  }
}

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
    this.preloader.classList.remove("loader-hidden");
    this.bg.classList.remove("loader-hidden");
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

let search
let pag
let serv
const fetch = new Fetch();
const load = new Loader();
load.listener();
const burg = new BurgerMenu();
serv = new DisplayingSight(fetch.Data(),fetch.AllData());
pag = new Pagination(serv, load);
pag.updatePagination();
search = new SearchFilterSort(serv,load);
search.displayMenu();
