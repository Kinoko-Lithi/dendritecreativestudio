// SERVICES TEXT ANIMATION
window.addEventListener("load", function () {
  const container = document.getElementById("services-text");
  if (!container) return;

  const lines = container.querySelectorAll("p");

  lines.forEach((line, index) => {
    const text = line.textContent;
    line.textContent = "";

    text.split("").forEach((char, i) => {
      const span = document.createElement("span");
      span.textContent = char === " " ? "\u00A0" : char;
      span.style.opacity = "0";
      span.style.transform = "translateY(8px)";
      span.style.display = "inline-block";
      span.style.transition = "opacity 0.4s ease, transform 0.4s ease";

      line.appendChild(span);

      setTimeout(() => {
        span.style.opacity = "1";
        span.style.transform = "translateY(0)";
      }, i * 40 + index * 250);
    });
  });
});


// LIGHTBOX FUNCTIONALITY
document.addEventListener("DOMContentLoaded", function () {

  const images = document.querySelectorAll(".image-grid img");
  const lightbox = document.getElementById("lightbox");

  if (!lightbox) return;

  const lightboxImg = lightbox.querySelector("img");

  images.forEach(img => {
    img.addEventListener("click", function () {
      lightbox.classList.add("active");
      lightboxImg.src = img.src;
      document.body.style.overflow = "hidden";
    });
  });

  // Close on background click
  lightbox.addEventListener("click", function () {
    lightbox.classList.remove("active");
    document.body.style.overflow = "auto";
  });

  // Close on ESC
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      lightbox.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });

});
