/* ===== Veranda sto Aigaio — interactions ===== */
(function () {
  "use strict";

  // Year in footer
  var yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();

  // Sticky nav background on scroll
  var nav = document.getElementById("nav");
  function onScroll() {
    if (window.scrollY > 60) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile menu toggle
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("open");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { links.classList.remove("open"); });
    });
  }

  // Reveal on scroll
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (r) { io.observe(r); });
  } else {
    reveals.forEach(function (r) { r.classList.add("visible"); });
  }

  // Lightbox
  var grid = document.getElementById("galleryGrid");
  var lb = document.getElementById("lightbox");
  var lbImg = document.getElementById("lbImg");
  var lbClose = document.getElementById("lbClose");
  var lbPrev = document.getElementById("lbPrev");
  var lbNext = document.getElementById("lbNext");
  var imgs = grid ? Array.prototype.slice.call(grid.querySelectorAll("img")) : [];
  var current = 0;

  function show(i) {
    current = (i + imgs.length) % imgs.length;
    lbImg.src = imgs[current].src;
    lbImg.alt = imgs[current].alt;
  }
  function open(i) { show(i); lb.classList.add("open"); lb.setAttribute("aria-hidden", "false"); }
  function close() { lb.classList.remove("open"); lb.setAttribute("aria-hidden", "true"); }

  imgs.forEach(function (img, i) {
    img.parentElement.addEventListener("click", function () { open(i); });
  });
  if (lbClose) lbClose.addEventListener("click", close);
  if (lbPrev) lbPrev.addEventListener("click", function (e) { e.stopPropagation(); show(current - 1); });
  if (lbNext) lbNext.addEventListener("click", function (e) { e.stopPropagation(); show(current + 1); });
  if (lb) lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
  document.addEventListener("keydown", function (e) {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") close();
    else if (e.key === "ArrowLeft") show(current - 1);
    else if (e.key === "ArrowRight") show(current + 1);
  });
})();
