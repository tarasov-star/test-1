const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");
const menuClose = document.querySelector(".menu-close");

function openMenu() {
  if (!mobileMenu || !menuToggle) return;
  mobileMenu.classList.add("is-open");
  mobileMenu.setAttribute("aria-hidden", "false");
  menuToggle.setAttribute("aria-expanded", "true");
  document.body.style.overflow = "hidden";
}

function closeMenu() {
  if (!mobileMenu || !menuToggle) return;
  mobileMenu.classList.remove("is-open");
  mobileMenu.setAttribute("aria-hidden", "true");
  menuToggle.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";
}

if (menuToggle) {
  menuToggle.addEventListener("click", openMenu);
}

if (menuClose) {
  menuClose.addEventListener("click", closeMenu);
}

if (mobileMenu) {
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  mobileMenu.addEventListener("click", (event) => {
    if (event.target === mobileMenu) closeMenu();
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});
