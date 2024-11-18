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

// Данные с сервера
function DisplayingServer() {
  const url = "https://67266547302d03037e6d6bc0.mockapi.io/v1/sight-card";
  let allData;
  let currentPage = parseInt(localStorage.getItem("savedPage")) || 1;
  const itemsPerPage = 10;
  let totalPages;
  let searchTerm = localStorage.getItem("savedSearch") || "";
  let selectedCategory = localStorage.getItem("savedCategory") || "all";

  // Получение данных с API
  (async function fetchData() {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Ошибка сети");
      }

      allData = await response.json();
      displayData(allData);
      filteringAndSearching();

    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    }
  })();

  // Отображение данных
  function displayData(data) {
    const sight = document.getElementById("data_container");
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedData = data.slice(start, end);
    totalPages = Math.ceil(data.length / itemsPerPage);

    paginatedData.forEach((item) => {
      const card = document.createElement("li");
      card.classList.add("sight__items-item");
      card.setAttribute("data-category", item.category);

      const wrap = document.createElement("div");
      wrap.classList.add("sight__items-card");

      const title = document.createElement("h2");
      title.textContent = item.title;
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
      image.src = item.image1;
      image.alt = item.title;
      image.classList.add("sight__items-card-pic");
      wrap_block.appendChild(image);

      const description_block = document.createElement("div");
      description_block.classList.add("sight__items-card-back");
      wrap_block.appendChild(description_block);

      const description = document.createElement("p");
      description.textContent = item.description;
      description.classList.add("sight__items-card-text");
      description_block.appendChild(description);

      const adress = document.createElement("p");
      adress.textContent = item.adress;
      adress.classList.add("sight__items-card-adres");
      wrap_block.appendChild(adress);

      card.appendChild(wrap);
      sight.appendChild(card);
    })

    sight.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", function(event) {
        event.preventDefault();
        localStorage.setItem("savedId", a.getAttribute("id"));
        window.location.href = a.href;
      });
    });
    updatePagination(data);
  }

  // Пагинация
  function updatePagination(data) {
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const firstPage = document.getElementById("firstPage");
    const notnowPage1 = document.getElementById("nowPage-1");
    const nowPage = document.getElementById("nowPage");
    const notnowPage2 = document.getElementById("nowPage+1");
    const lastPage = document.getElementById("lastPage");
    notnowPage1.textContent = `${currentPage - 1}`;
    nowPage.textContent = `${currentPage}`;
    notnowPage2.textContent = `${currentPage + 1}`;

    if (currentPage === 1) {
      notnowPage1.style.display = "none";
      firstPage.disabled = true;
    } else {
      notnowPage1.style.display = "block";
      firstPage.disabled = false;
    }

    const showMore = document.getElementById("showMoreButton");
    if (currentPage < totalPages) {
      showMore.style.display = "block";
      notnowPage2.style.display = "block";
      lastPage.disabled = false;
    } else {
      showMore.style.display = "none";
      notnowPage2.style.display = "none";
      lastPage.disabled = true;
    }
  }

   // Кнопки пагинации
   function Buttons() {
    const showMore = document.getElementById("showMoreButton");
    const firstPage = document.getElementById("firstPage");
    const lastPage = document.getElementById("lastPage");
    const notnowPage1 = document.getElementById("nowPage-1");
    const notnowPage2 = document.getElementById("nowPage+1");

    showMore.addEventListener("click", () => {
      currentPage++;
      localStorage.setItem("savedPage", currentPage);
      displayData(allData);
    });

    firstPage.addEventListener("click", () => {
      document.getElementById("data_container").innerHTML = " ";
      currentPage = 1;
      localStorage.setItem("savedPage", currentPage);
      displayData(allData);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });

    lastPage.addEventListener("click", () => {
      document.getElementById("data_container").innerHTML = " ";
      currentPage = totalPages;
      localStorage.setItem("savedPage", currentPage);
      displayData(allData);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });

    notnowPage1.addEventListener("click", () => {
      document.getElementById("data_container").innerHTML = " ";
      currentPage--;
      localStorage.setItem("savedPage", currentPage);
      displayData(allData);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });

    notnowPage2.addEventListener("click", () => {
      document.getElementById("data_container").innerHTML = " ";
      currentPage++;
      localStorage.setItem("savedPage", currentPage);
      displayData(allData);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // Поиск и фильтрация

  function filteringAndSearching() {
    document.getElementById("data_container").innerHTML = "";
    const searchInput = document.getElementById("search__input").value.toLowerCase();
    const categorySelect = document.getElementById("category__select").value;

    searchTerm = searchInput;
    selectedCategory = categorySelect;

    localStorage.setItem("savedSearch", searchTerm);
    localStorage.setItem("savedCategory", selectedCategory);

    const filteredData = allData.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm);
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    currentPage = 1;
    localStorage.setItem("savedPage", currentPage);

    if (filteredData.length === 0) {
      displayData(unknownSearchQuery());
    } else {
      displayData(filteredData);
    }
  }

  document.getElementById("search__input").addEventListener("input", filteringAndSearching);
  document.getElementById("category__select").addEventListener("change", filteringAndSearching);

  // При неизвестном поисковом

  function unknownSearchQuery() {
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
    updatePagination(1);
  }
  Buttons();
}

// Лоадер

window.onload = function() {
  let preloader = document.getElementById('loader');
  let bg = document.getElementById("loading")
  preloader.classList.add('hide-loader');
  bg.classList.add('hide-loader');
  setInterval(function() {
    preloader.classList.add('loader-hidden');
    bg.classList.add('loader-hidden');
  }, 2500);
}
DisplayingServer();