/* =========================
   SERVICES TEXT ANIMATION
========================= */

window.addEventListener("load", function () {
  const container = document.getElementById("services-text");
  if (!container) return;

  const paragraphs = container.querySelectorAll("p");

  paragraphs.forEach(function (paragraph, paragraphIndex) {
    const content = paragraph.textContent;
    paragraph.textContent = "";

    content.split("").forEach(function (character, charIndex) {
      const span = document.createElement("span");

      span.textContent = character === " " ? "\u00A0" : character;
      span.style.opacity = "0";
      span.style.transform = "translateY(8px)";
      span.style.display = "inline-block";
      span.style.transition = "opacity 0.4s ease, transform 0.4s ease";

      paragraph.appendChild(span);

      setTimeout(function () {
        span.style.opacity = "1";
        span.style.transform = "translateY(0)";
      }, charIndex * 40 + paragraphIndex * 250);
    });
  });
});


/* =========================
   VIMEO VIDEO GALLERY
========================= */

document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".video-card");
  const lightbox = document.getElementById("videoLightbox");

  if (!cards.length || !lightbox) return;

  const lightboxIframe = lightbox.querySelector("iframe");

  function buildVimeoURL(id, autoplay) {
    return `https://player.vimeo.com/video/${id}?autoplay=${autoplay ? 1 : 0}&loop=0&muted=0`;
  }

  function closeLightbox() {
    lightbox.classList.remove("active");
    if (lightboxIframe) lightboxIframe.src = "";
    document.body.style.overflow = "auto";
  }

  cards.forEach(function (card) {
    const videoId = card.dataset.vimeo;
    if (!videoId) return;

    /* Create embedded preview iframe */
    const iframe = document.createElement("iframe");
    iframe.src = buildVimeoURL(videoId, false);
    iframe.frameBorder = "0";
    iframe.allow = "autoplay; fullscreen; picture-in-picture";
    iframe.allowFullscreen = true;

    card.appendChild(iframe);

    /* Random slight rotation */
    const randomRotation = (Math.random() * 6 - 3) + "deg";
    card.style.setProperty("--rotate", randomRotation);

    /* Open lightbox on click */
    card.addEventListener("click", function () {
      if (!lightboxIframe) return;

      lightboxIframe.src = buildVimeoURL(videoId, true);
      lightbox.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  /* Close lightbox */
  lightbox.addEventListener("click", closeLightbox);

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeLightbox();
    }
  });
});
