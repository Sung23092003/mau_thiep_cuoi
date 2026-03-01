document.addEventListener("DOMContentLoaded", function () {

  const items = document.querySelectorAll(".kk-item");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform += " scale(1)";
        }
      });
    },
    { threshold: 0.3 }
  );

  items.forEach((item) => {
    item.style.opacity = 0;
    item.style.transform += " scale(0.9)";
    item.style.transition = "all 0.8s ease";
    observer.observe(item);
  });

});