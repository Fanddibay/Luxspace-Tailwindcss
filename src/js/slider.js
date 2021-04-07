import { addClass, removeClass } from "./utils-class";

// membuat costanta
const sliders = document.getElementsByClassName("slider");

for (let index = 0; index < sliders.length; index++) {
  const slider = sliders[index];

  const items = slider.querySelectorAll(".slider .item");
  const preview = slider.querySelector("div > .preview");

  for (let item = 0; item < items.length; item++) {
    const itemTrigger = items[item];

    itemTrigger.addEventListener("click", function () {
      const dataImg = this.attributes?.["data-img"]?.value;
      for (
        let eachItemTrigger = 0;
        eachItemTrigger < items.length;
        eachItemTrigger++
      ) {
        const triggerNeedToRemoved = items[eachItemTrigger];

        removeClass(triggerNeedToRemoved, "selected");
      }
      addClass(itemTrigger, "selected");

      preview.querySelector("img").setAttribute("src", dataImg);
    });
  }
}
