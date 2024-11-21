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
  const title = document.getElementById("sight_title");
  title.textContent = data.title;

  const text = document.getElementById("sight_text");
  text.textContent = data.description;

  const image1 = document.createElement("img");
  image1.src = data.image1
  image1.classList.add("sight__item-main-pic");

  const imageMain = document.getElementById("sight_main");
  imageMain.appendChild(image1);

  const image2 = document.createElement("img");
  image2.src = data.image2
  image2.classList.add("sight__item-second-pics");

  const image3 = document.createElement("img");
  image3.src = data.image3
  image3.classList.add("sight__item-second-pics");

  imageSecond = document.getElementById("sight_second");
  imageSecond.appendChild(image2);
  imageSecond.appendChild(image3);

  const adress = document.getElementById("sight_adress");
  adress.textContent = data.adress

  const map = document.getElementById("map");
  map.src = data.map3;
}

// Лоадер
window.addEventListener('load' , function() {
  let preloader = document.getElementById('loader');
  let bg = document.getElementById("loading")
  preloader.classList.add('hide-loader');
  bg.classList.add('hide-loader');
  setInterval(function() {
    preloader.classList.add('loader-hidden');
    bg.classList.add('loader-hidden');
  }, 1200);
});


document.getElementById("map_btton").addEventListener("click", function() {
  document.getElementById("map_yandex").style.display = "block";
  document.getElementById("map_yandex").style.animation = "fade 1s ease";
  document.getElementById("back").style.display = "block";
  document.getElementById("back").style.animation = "fade 1s ease";
  document.getElementById("close").style.display = "block";
  document.getElementById("close").style.animation = "fade 1s ease";
  document.body.style.overflow = "hidden"
})

document.getElementById("close").addEventListener("click", function() {
  document.getElementById("map_yandex").style.display = "none";
  document.getElementById("back").style.display = "none";
  document.getElementById("close").style.display = "none";
  document.body.style.overflow = "visible"
})