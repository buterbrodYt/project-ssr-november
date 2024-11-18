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

const url = "https://67266547302d03037e6d6bc0.mockapi.io/v1/sight-card";
let data;
const id = localStorage.getItem("savedId");
if (!id) {
  console.error("ID не найден в localStorage");
}

(async function fetchData() {
  try {
    const response = await fetch(`${url}/${id}`);
    if (!response.ok) {
      throw new Error("Ошибка сети");
    }
    data = await response.json();
    displayData(data);

  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  }
})();

function displayData(data) {
  const sight = document.getElementById("data_container");
  const card = document.createElement("li");
  card.classList.add("sight__items-item");
  card.setAttribute("data-category", data.category);
  card.setAttribute("ID", data.id);

  const wrap = document.createElement("div");
  wrap.classList.add("sight__items-card");

  const title = document.createElement("h2");
  title.textContent = data.title;
  title.classList.add("sight__items-card-title");
  wrap.appendChild(title);

  const wrap_block = document.createElement("div");
  wrap_block.classList.add("sight__items-card-block");
  wrap.appendChild(wrap_block);

  const image1 = document.createElement("img");
  image1.src = data.image1;
  image1.alt = data.title;
  image1.classList.add("sight__items-card-pic1");
  wrap_block.appendChild(image1);

  const image2 = document.createElement("img");
  image2.src = data.image2;
  image2.alt = data.title;
  image2.classList.add("sight__items-card-pic2");
  wrap_block.appendChild(image2);

  const image3 = document.createElement("img");
  image3.src = data.image3;
  image3.alt = data.title;
  image3.classList.add("sight__items-card-pic3");
  wrap_block.appendChild(image3);

  const description_block = document.createElement("div");
  description_block.classList.add("sight__items-card-back");
  wrap_block.appendChild(description_block);

  const description = document.createElement("p");
  description.textContent = data.description;
  description.classList.add("sight__items-card-text");
  description_block.appendChild(description);

  const adress = document.createElement("p");
  adress.textContent = data.adress;
  adress.classList.add("sight__items-card-adres");
  wrap_block.appendChild(adress);

  card.appendChild(wrap);
  sight.appendChild(card);
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
  }, 990);
}