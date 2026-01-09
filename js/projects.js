import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { firebaseConfig } from "./firebase-config.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const container = document.querySelector(".projects-grid");
const loadingText = document.querySelector("#loading");

async function loadProjects(filter = "all") {
    loadingText.textContent = "Loading projects...";
    container.innerHTML = "";

    const querySnapshot = await getDocs(collection(db, "projects"));

    querySnapshot.forEach((doc) => {
        const p = doc.data();

        if (filter !== "all" && p.category.toLowerCase() !== filter) return;

        container.innerHTML += `
        <div class="project-card" data-category="${p.category}">
            <div class="project-image">
                <img src="${p.imageUrl}" alt="${p.title}">
            </div>
            <div class="project-info">
                <div class="project-category">${p.category}</div>
                <h3 class="project-title">${p.title}</h3>
                <p class="project-description">${p.description}</p>
            </div>
        </div>`;
    });

    loadingText.textContent = "";
}

loadProjects();

// Filter buttons
document.querySelectorAll(".filter-tab").forEach(btn => {
    btn.addEventListener("click", () => {
        const type = btn.getAttribute("data-filter");
        loadProjects(type);
    });
});
