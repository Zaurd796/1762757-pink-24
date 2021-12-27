const form = document.querySelector(".form");
// const input = form.querySelectorAll("[required]");
const input = form.querySelectorAll("[data-required]");
console.log(input);
const modalError = document.querySelector(".form-modal--error");
const modalSuccess = document.querySelector(".form-modal--success");
const buttonError = modalError.querySelector(".form-modal__button--error");
const buttonSuccess = modalSuccess.querySelector(".form-modal__button--success");

form.addEventListener("submit", function(evt) {
  evt.preventDefault();
  input.forEach(function(item) {
    // if(item.value === "") {
    //   console.log("empty");
    // }
    if (item.value === "") {
      modalError.classList.add("form-modal--open");
      item.style.boxShadow = "0 0 10px red";
    } else {
      modalSuccess.classList.add("form-modal--open");
    }
    item.addEventListener("input", function () {
      item.style.boxShadow = "none";
    });
  });
  buttonSuccess.addEventListener("click", function() {
    modalSuccess.classList.remove("form-modal--open");
  })

  buttonError.addEventListener("click", function() {
    modalError.classList.remove("form-modal--open");
  })

  window.addEventListener("keydown", function (evt) {
    if (evt.key === "Escape") {
      if (modalSuccess.classList.contains("form-modal--open")) {
        modalSuccess.classList.remove("form-modal--open");
      }
    }
  });

  window.addEventListener("keydown", function (evt) {
    if (evt.key === "Escape") {
      if (modalError.classList.contains("form-modal--open")) {
        modalError.classList.remove("form-modal--open");
      }
    }
  });
});
