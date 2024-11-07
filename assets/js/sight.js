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

// Поиск

document.addEventListener("DOMContentLoaded", function () {
  const items = document.getElementById("items").children;
  const searchInput = document.getElementById("search__input");
  const categorySelect = document.getElementById("category__select");
  const prevPageButton = document.getElementById("prevPage");
  const nextPageButton = document.getElementById("nextPage");
  const pageInfo = document.getElementById("pageInfo");

  let currentPage = 1;
  const itemsPerPage = 10;
  let filteredItems = [];

  // Восстановление сохраненной категории из localStorage
  const savedCategory = localStorage.getItem("selectedCategory");
  if (savedCategory) {
    categorySelect.value = savedCategory;
  }

  // Восстановление сохраненной текущей страницы из localStorage
  const savedPage = localStorage.getItem("currentPage");
  if (savedPage) {
    currentPage = parseInt(savedPage);
  }

  function filterItems() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categorySelect.value;

    localStorage.setItem("selectedCategory", selectedCategory);

    filteredItems = Array.from(items).filter((item) => {
      const title = item
        .querySelector(".sight__items-card-title")
        .textContent.toLowerCase();
      const categories = item.getAttribute("data-category").split(" ");

      const matchSearch = title.includes(searchTerm);
      const matchCategory =
        selectedCategory === "all" || categories.includes(selectedCategory);

      return matchSearch && matchCategory;
    });

    // Если не найдено подходящих элементов выводит только первый элемент
    if (filteredItems.length === 0) {
      filteredItems = [items[0]];
    }

    currentPage = 1; // После фильтрации переход к 1 странице
    updatePagination();
  }

  // Обновление пагинации
  function updatePagination() {
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

    if (currentPage > totalPages) {
      currentPage = totalPages;
    }

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    // Скрытие всех элементов
    for (let i = 0; i < items.length; i++) {
      items[i].style.display = "none";
    }

    // Отображение отфильтрованных элементов
    for (let i = start; i < end && i < filteredItems.length; i++) {
      filteredItems[i].style.display = "block";
    }

    // Кнопки пагинации и номер текущей страницы
    pageInfo.textContent = `${currentPage}`;
    prevPageButton.disabled = currentPage === 1;
    nextPageButton.disabled = currentPage === totalPages;

    // Сохранение текущей страницы в localStorage
    localStorage.setItem("currentPage", currentPage);

    // Скролл к началу страницы
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  searchInput.addEventListener("input", filterItems);
  categorySelect.addEventListener("change", filterItems);

  // Переход к предыдущей странице
  prevPageButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      updatePagination();
    }
  });

  // Переход к следующей странице
  nextPageButton.addEventListener("click", () => {
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      updatePagination();
    }
  });

  filterItems();
});