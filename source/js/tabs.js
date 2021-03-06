if (document.querySelectorAll(".upload__item-button").length) {
  const uploadButtons = document.querySelectorAll(".upload__item-button");
  const contentBoxes = document.querySelectorAll(".upload__range-input-box");

  uploadButtons.forEach(function (item) {
    item.addEventListener("click", function() {
      uploadButtons.forEach(function (item) {
        item.classList.remove("upload__item-button--active");
      });
      item.classList.add("upload__item-button--active");
      contentBoxes.forEach(function (item) {
        item.classList.add("upload__range-input-box--hidden");
      });
      const inputBox = document.querySelector("#" + this.dataset.tab);
      inputBox.classList.remove("upload__range-input-box--hidden");
    });
  });
}
