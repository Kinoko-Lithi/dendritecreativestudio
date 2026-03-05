/* =========================
   SERVICES TEXT ANIMATION
========================= */
window.addEventListener("load", () => {
  const container = document.getElementById("services-text");
  if (!container) return;

  const lines = container.querySelectorAll("p");

  lines.forEach((line, lineIndex) => {
    const text = line.textContent;
    line.textContent = "";

    text.split("").forEach((char, charIndex) => {
      const span = document.createElement("span");
      span.textContent = char === " " ? "\u00A0" : char;
      span.style.opacity = "0";
      span.style.transform = "translateY(8px)";
      span.style.display = "inline-block";
      span.style.transition = "opacity 0.4s ease, transform 0.4s ease";
      line.appendChild(span);

      const delay = charIndex * 40 + lineIndex * 250; // delay in ms

      const start = performance.now();
      function animate(timestamp) {
        if (timestamp - start >= delay) {
          span.style.opacity = "1";
          span.style.transform = "translateY(0)";
        } else {
          requestAnimationFrame(animate);
        }
      }

      requestAnimationFrame(animate);
    });
  });
});


/* =========================
   VIMEO VIDEO GALLERY / LIGHTBOX
========================= */
document.addEventListener("DOMContentLoaded", () => {
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

  cards.forEach(card => {
    const videoId = card.dataset.vimeo;
    if (!videoId) return;

    // Create embedded preview iframe
    const iframe = document.createElement("iframe");
    iframe.src = buildVimeoURL(videoId, false);
    iframe.frameBorder = "0";
    iframe.allow = "autoplay; fullscreen; picture-in-picture";
    iframe.allowFullscreen = true;

    card.appendChild(iframe);

    // Random slight rotation
    const randomRotation = (Math.random() * 6 - 3) + "deg";
    card.style.setProperty("--rotate", randomRotation);

    // Open lightbox on click
    card.addEventListener("click", () => {
      if (!lightboxIframe) return;

      lightboxIframe.src = buildVimeoURL(videoId, true);
      lightbox.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  // Close lightbox when clicking overlay
  lightbox.addEventListener("click", closeLightbox);

  // Close lightbox on Escape key
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeLightbox();
    }
  });
});
