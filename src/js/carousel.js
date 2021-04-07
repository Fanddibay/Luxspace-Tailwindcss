import { addClass, removeClass } from "./utils-class";

// mengambil constanta dari id carousel
const carouselId = document?.getElementById("carousel");
// mengambil kelas dari constanta id (carousel)
const carouselItems = carouselId?.getElementsByClassName("flex")[0];
// mengambil kelas dari constanta id (carousel)
const carouselContainer = carouselId?.getElementsByClassName("container")[0];

// menjalankan function
function carouselCalculateOffset() {
  const carouselOffset = carouselContainer.getBoundingClientRect().left;
  //   menambahkan css kedalam javascript
  carouselItems.style.paddingLeft = `$(carouselOffset - 16)px`;
  carouselItems.style.paddingRight = `$(carouselOffset - 16)px`;
}

function slide(wrapper, items) {
  let posX1 = 0,
    posX2 = 0,
    posInitial,
    posFinal,
    threshold = 100,
    itemToShow = 4,
    slides = items.getElementsByClassName("card"),
    slidesLength = slides.length,
    slideSize = items.getElementsByClassName("card")[0].offsetWidth,
    index = 0,
    allowShift = true;

  wrapper.classList.add("loaded");

  items.onmousedown = dragStart;

  items.addEventListener("touchstart", dragStart);
  items.addEventListener("touchend", dragEnd);
  items.addEventListener("touchmove", dragAction);

  items.addEventListener("transitionend", checkIndex);

  function dragStart(e) {
    e = e || window.event;
    e.preventDefault();
    posInitial = items.offsetLeft;

    if (e.type == "touchstart") {
      posX1 = e.touches[0].clientX;
    } else {
      posX1 = e.clientX;
      document.onmouseup = dragEnd;
      document.onmousemove = dragAction;
    }
  }

  function dragAction(e) {
    e = e || window.event;

    if (e.type == "touchmove") {
      posX2 = posX1 - e.touches[0].clientX;
      posX1 = e.touches[0].clientX;
    } else {
      posX2 = posX1 - e.clientX;
      posX1 = e.clientX;
    }

    items.style.left = `${items.offsetLeft - posX2}px`;
  }

  function dragEnd() {
    posFinal = items.offsetLeft;

    if (posFinal - posInitial < -threshold) {
      shiftSlide(1, "drag");
    } else if (posFinal - posInitial > threshold) {
      shiftSlide(-1, "drag");
    } else {
      items.style.left = posInitial + "px";
    }
    // jika tidak di kli maka kembalikan seperti semula
    document.onmouseup = null;
    document.onmousemove = null;
  }

  function shiftSlide(direction, action) {
    addClass(items, "transition-all duration-200");

    if (allowShift) {
      if (!action) posInitial = items.offsetLeft;

      // jika sudah mentok geser ke kanan maka stop
      if (direction == 1) {
        items.style.left = `${posInitial - slideSize}px`;
        index++;
        // jika sudah mentok geser ke kanan maka stop
      } else if (direction == -1) {
        items.style.left = `${posInitial + slideSize}px`;
        index--;
      }
    }
    allowShift = false;
  }
  function checkIndex() {
    // debounds animasi yang ada
    setTimeout(() => {
      removeClass(items, "transition-all duration-200");
    }, 200);

    if (index == -1) {
      items.style.left = -(slidesLength * slideSize) + "px";
      index = slidesLength - 1;
    }

    if (index == slidesLength - itemToShow) {
      items.style.left = -((slidesLength - itemToShow - 1) * slideSize) + "px";
      index = slidesLength - itemToShow - 1;
    }

    if (index == slidesLength || index == slidesLength - 1) {
      items.style.left = "0px";
      index = 0;
    }

    allowShift = true;
  }
}

if (carouselId) {
  slide(carouselId, carouselItems);
  window.addEventListener("load", carouselCalculateOffset);
  window.addEventListener("resize", carouselCalculateOffset);
}
