import { addClass, removeClass } from "./utils-class";

// membuat fungsi accordion
function accordion() {
  // menangkap kelas berdasarkan classnName
  const accordionContainer = document.getElementsByClassName("accordion");

  // membuat pengulangan/looping
  for (let index = 0; index < accordionContainer.length; index++) {
    const e = accordionContainer[index];

    // membuat element ke html button dan element baru
    const button = document.createElement("button");
    // menambahkan kelas ke button
    addClass(
      button,
      "absolute block md:hidden right-0 transform -translate-y-1/2 focus:outline-none transition duration-200 rotate-0"
    );

    // membuat style inline css
    button.style.top = "50%";
    button.innerHTML = `<svg width="20" height="9" viewBox="0 0 20 9" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 1L9.75 7.5L18.5 1" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;

    // membuat variable baru ulList dan tangkap tagnamenya dari yg pertama
    const ulList = e.getElementsByTagName("ul")[0];
    // menambahkan kelas ke ulList
    addClass(ulList, "transition duration-200");

    // membuat fungsi apabila acordion dijalankan
    function onClickAccordion() {
      if (ulList.className.indexOf("h-0") > -1) {
        addClass(button, "rotate-180");
        addClass(ulList, "opacity-100");
        removeClass(ulList, "h-0 invisible opacity-0");
      } else {
        removeClass(button, "rotate-180");
        removeClass(ulList, "opacity-100");
        addClass(ulList, "h-0 invisible opacity-0");
      }
    }
    // membuat fungsi apabila diclick
    button.addEventListener("click", onClickAccordion);
    // memasukan element h5 kedalam button
    e.getElementsByTagName("h5")[0].append(button);
  }
}

// memangil fungsinya
if (window.innerWidth < 768) window.addEventListener("load", accordion);
