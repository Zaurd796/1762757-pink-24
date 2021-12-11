const toggle = document.querySelector(".menu-burger");
const header = document.querySelector(".header");
const menu = document.querySelector(".nav-list");
const menuItems = menu.querySelectorAll(".nav-list__item");
const menuLinks = menu.querySelectorAll(".nav-list__link");

toggle.addEventListener("click", function (evt) {
  evt.preventDefault();

  toggle.classList.toggle("menu-burger--closed");
  if(header.classList.contains("header--menu-open")) {
    header.classList.remove("header--menu-open");
  } else {
    header.classList.add("header--menu-open");
  }

  if(menu.classList.contains("nav-list--menu-open")) {
    menu.classList.remove("nav-list--menu-open");
  } else {
    menu.classList.add("nav-list--menu-open");
  }

  menuItems.forEach(function(item) {
    if(item.classList.contains("nav-list__item--menu-open")) {
      item.classList.remove("nav-list__item--menu-open");
    } else {
      item.classList.add("nav-list__item--menu-open");
    }
  });

  menuLinks.forEach(function(item) {
    if(item.classList.contains("nav-list__link--menu-open")) {
      item.classList.remove("nav-list__link--menu-open");
    } else {
      item.classList.add("nav-list__link--menu-open");
    }
  });
})
