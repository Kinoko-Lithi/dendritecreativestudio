document.addEventListener("DOMContentLoaded", function () {

  const cards = document.querySelectorAll(".video-card");
  const lightbox = document.getElementById("videoLightbox");

  if (!cards.length) return;

  const lightboxVideo = lightbox.querySelector("video");

  // Random rotation for scattered artistic look
  cards.forEach(card => {

    const randomRotate = (Math.random() * 6 - 3) + "deg";
    card.style.setProperty("--rotate", randomRotate);

    const video = card.querySelector("video");

    // Hover preview
    card.addEventListener("mouseenter", () => {
      video.play();
    });

    card.addEventListener("mouseleave", () => {
      video.pause();
      video.currentTime = 0;
    });

    // Click to fullscreen
    card.addEventListener("click", () => {
      lightbox.classList.add("active");
      lightboxVideo.src = video.src;
      document.body.style.overflow = "hidden";
    });

  });

  // Close lightbox on click
  lightbox.addEventListener("click", () => {
    lightbox.classList.remove("active");
    lightboxVideo.pause();
    lightboxVideo.src = "";
    document.body.style.overflow = "auto";
  });

  // ESC closes
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      lightbox.classList.remove("active");
      lightboxVideo.pause();
      lightboxVideo.src = "";
      document.body.style.overflow = "auto";
    }
  });

});
