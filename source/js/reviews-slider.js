if (document.querySelectorAll("[data-item='reviews-slide']").length) {
  const reviewsSlides = document.querySelectorAll("[data-item='reviews-slide']");
  const prev =document.querySelector(".reviews__arrow--left");
  const next =document.querySelector(".reviews__arrow--right");
  const reviewsDots = document.querySelectorAll("[data-button='reviews-dot']");

  let index = 0;

  const activeSlide = n => {
    for(slide of reviewsSlides) {
      slide.classList.remove("slider__item--active");
    }
    reviewsSlides[n].classList.add("slider__item--active");
  }

  const activeDot = n => {
    for(dot of reviewsDots) {
      dot.classList.remove("slider__dot--active");
    }
    reviewsDots[n].classList.add("slider__dot--active");
  }

  const prepareCurrentSlide = ind => {
      activeSlide(ind);
      activeDot(ind);
  }

  const nextSlide = () => {
    if (index == reviewsSlides.length - 1) {
      index = 0;
      prepareCurrentSlide(index);
    } else {
      index++;
      activeSlide(index);
      activeDot(index);
    }
  }

  const prevSlide = () => {
    if (index == 0) {
      index = reviewsSlides.length - 1;
      prepareCurrentSlide(index);
    } else {
      index--;
      prepareCurrentSlide(index);
    }
  }

  next.addEventListener("click", nextSlide);
  prev.addEventListener("click", prevSlide);

  reviewsDots.forEach(function(item, indexDot) {
    item.addEventListener("click", function () {
      index = indexDot;
      prepareCurrentSlide(index);
    });
  });
}
