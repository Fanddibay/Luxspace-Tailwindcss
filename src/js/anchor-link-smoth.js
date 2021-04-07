const smothScrollAnchor = document.querySelectorAll("a[href^='#']");

// menangkap smua yang ada / looping
for (let index = 0; index < smothScrollAnchor.length; index++) {
  const el = smothScrollAnchor[index];

  // fungsikan
  el.addEventListener("click", function (ev) {
    ev.preventDefault();
    if (document.getElementById(this.getAttribute("href").replace("#", "")))
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
  });
}
