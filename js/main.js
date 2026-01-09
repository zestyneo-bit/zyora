/* =========================
   ZYORA – MAIN JS
   Safe global enhancements
   ========================= */

/* ---------- Scroll Reveal ---------- */
const revealElements = document.querySelectorAll(
  ".reveal, section, .card, .project-card"
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach(el => {
  el.classList.add("reveal");
  revealObserver.observe(el);
});

/* ---------- Navbar Active Link ---------- */
const currentPage = location.pathname.split("/").pop() || "index.html";

document.querySelectorAll("nav a").forEach(link => {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
  }
});

/* ---------- Dark Mode Toggle ---------- */
const darkToggle = document.getElementById("dark-toggle");

if (darkToggle) {
  const savedTheme = localStorage.getItem("zyora-theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
  }

  darkToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem(
      "zyora-theme",
      document.body.classList.contains("dark") ? "dark" : "light"
    );
  });
}

/* ---------- Image Fade-in ---------- */
document.querySelectorAll("img").forEach(img => {
  img.style.opacity = "0";
  img.style.transition = "opacity 0.6s ease";

  if (img.complete) {
    img.style.opacity = "1";
  } else {
    img.addEventListener("load", () => {
      img.style.opacity = "1";
    });
  }
});

/* ---------- CONTACT FORM → SEND TO DISCORD ---------- */
const contactForm = document.getElementById("contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name")?.value || "";
    const email = document.getElementById("email")?.value || "";
    const message = document.getElementById("message")?.value || "";

    try {
      const response = await fetch("/api/send-to-discord", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message })
      });

      if (response.ok) {
        alert("Message sent successfully!");
        contactForm.reset();
      } else {
        alert("Error sending message. Try again later.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error. Please try again.");
    }
  });
}

/* ---------- Safety Log ---------- */
console.log("ZYORA main.js loaded safely");
