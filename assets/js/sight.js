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

const apiUrl = "https://67266547302d03037e6d6bc0.mockapi.io/v1/sight-card";

// Функция для получения данных с API
(async function fetchData() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Ошибка сети");
    }
    const data = await response.json();
    displayData(data);
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  }
})();

// Функция для отображения данных на странице
function displayData(data) {
  const sight = document.getElementById("data-container");
  sight.innerHTML = ""; // Очищаем контейнер перед добавлением новых данных

  data.forEach((item) => {
    const card = document.createElement("li");
    card.classList.add("sight__items-item");
    card.setAttribute("data-category", item.category);
    card.setAttribute("ID", item.id);

    const wrap = document.createElement("div");
    wrap.classList.add("sight__items-card");

    const title = document.createElement("h2");
    title.textContent = item.title;
    title.classList.add("sight__items-card-title");
    wrap.appendChild(title);

    const wrap_block = document.createElement("div");
    wrap_block.classList.add("sight__items-card-block");
    wrap.appendChild(wrap_block);

    const image = document.createElement("img");
    image.src = item.image;
    image.alt = item.title;
    image.classList.add("sight__items-card-pic");
    wrap_block.appendChild(image);

    const description_block = document.createElement("div");
    wrap_block.appendChild(description_block);
    description_block.classList.add("sight__items-card-back");

    const description = document.createElement("p");
    description.textContent = item.description;
    description_block.appendChild(description);
    description.classList.add("sight__items-card-text");

    const adress = document.createElement("p");
    adress.textContent = item.adress;
    adress.classList.add("sight__items-card-adres")
    wrap_block.appendChild(adress);

    card.appendChild(wrap);
    sight.appendChild(card);
  });
}