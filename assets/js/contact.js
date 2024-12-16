//Бургер
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

// Модальное окно

class Modal {
    constructor() {
        this.name = document.getElementById("name").value = localStorage.getItem("name") || "";
        this.phone = document.getElementById("phone").value = localStorage.getItem("phone") || "";
        this.modal = document.getElementById("modal");
        this.message = document.getElementById("message").value;
    }

    openModal() {
        this.name = localStorage.getItem("name") || "";
        this.phone = localStorage.getItem("phone") || "";
        this.modal.style.display = "block";
        this.modal.style.animation = "fadeIn 0.5s ease"
    }

    closeModal() {
        this.modal.style.display = "none";
    }

    sumbitModal() {
        localStorage.setItem("name", this.name);
        localStorage.setItem("phone", this.phone);

        console.log("Имя:", this.name, "Телефон:", this.phone, "Сообщение:", this.message);

        this.modal.style.display = "none";
    }
}

const modal = new Modal();
const burg = new BurgerMenu();