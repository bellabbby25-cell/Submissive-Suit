window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader) {
    window.setTimeout(() => loader.classList.add("is-hidden"), 350);
  }
});

const header = document.getElementById("siteHeader");
const menu = document.querySelector(".menu");
const menuIcon = menu?.querySelector("i");
const navLinks = document.querySelector(".nav-links");

window.addEventListener("scroll", () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 24);
});

menu?.addEventListener("click", () => {
  const open = navLinks.classList.toggle("is-open");
  menu.setAttribute("aria-expanded", String(open));
  menuIcon?.classList.toggle("fa-bars", !open);
  menuIcon?.classList.toggle("fa-xmark", open);
});

navLinks?.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("is-open");
    menu?.setAttribute("aria-expanded", "false");
    menuIcon?.classList.add("fa-bars");
    menuIcon?.classList.remove("fa-xmark");
  });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", event => {
    const target = document.querySelector(anchor.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

const duration = document.getElementById("duration");
const toy = document.getElementById("toy");
document.querySelectorAll(".addon-row").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".addon-row").forEach(row => row.classList.remove("is-active"));
    button.classList.add("is-active");
    toy.value = button.dataset.price;
    toy.dispatchEvent(new Event("change"));
  });
});