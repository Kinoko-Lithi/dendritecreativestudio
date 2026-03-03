// Animate services text on page load
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

      setTimeout(() => {
        span.style.opacity = "1";
        span.style.transform = "translateY(0)";
      }, charIndex * 40 + lineIndex * 250);
    });
  });
});
