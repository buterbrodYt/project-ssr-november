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

// Модальное окно с формой

document.getElementById("openModalBtn").addEventListener("click", function () {
  document.getElementById("name").value = localStorage.getItem("name") || "";
  document.getElementById("phone").value = localStorage.getItem("phone") || "";
  document.getElementById("modal").style.display = "block";
  document.getElementById("modal").style.animation = "fadeIn 0.5s ease"
});

document
  .getElementsByClassName("close")[0]
  .addEventListener("click", function () {
    document.getElementById("modal").style.display = "none";
  });

window.addEventListener("click", function (event) {
  if (event.target == document.getElementById("modal")) {
    document.getElementById("modal").style.display = "none";
  }
});

document
  .getElementById("modal__Form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const message = document.getElementById("message").value;

    localStorage.setItem("name", name);
    localStorage.setItem("phone", phone);

    console.log("Имя:", name, "Телефон:", phone, "Сообщение:", message);

    document.getElementById("modal").style.display = "none";
  });
