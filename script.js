// Animate services text on page load
window.addEventListener("load", () => {
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

// Vimeo video gallery with lightbox
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".video-card");
  const lightbox = document.getElementById("videoLightbox");
  const lightboxIframe = lightbox.querySelector("iframe");

  if (!cards.length || !lightbox) return;

  // Helper function to build Vimeo URL
  const getVimeoURL = (id, autoplay = false) =>
    `https://player.vimeo.com/video/${id}?autoplay=${autoplay ? 1 : 0}&loop=0&muted=0`;

  cards.forEach(card => {
    const videoId = card.dataset.vimeo;

    // Create iframe inside card
    const iframe = document.createElement("iframe");
    iframe.src = getVimeoURL(videoId);
    iframe.frameBorder = "0";
    iframe.allow = "autoplay; fullscreen; picture-in-picture";
    iframe.allowFullscreen = true;
    card.appendChild(iframe);

    // Random rotation for scattered look
    const rotateDeg = (Math.random() * 6 - 3) + "deg";
    card.style.setProperty("--rotate", rotateDeg);


  // Close lightbox on click
  const closeLightbox = () => {
    lightbox.classList.remove("active");
    lightboxIframe.src = "";
    document.body.style.overflow = "auto";
  };

  lightbox.addEventListener("click", closeLightbox);
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeLightbox();
  });
});

