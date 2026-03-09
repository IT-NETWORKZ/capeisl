document.addEventListener("DOMContentLoaded", () => {

    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    // Load Header + Footer in parallel
    Promise.all([
        fetch("header.html").then(r => r.text()),
        fetch("footer.html").then(r => r.text())
    ]).then(([headerHTML, footerHTML]) => {

        const headerEl = document.getElementById("header");
        const footerEl = document.getElementById("footer");

        if (headerEl) headerEl.innerHTML = headerHTML;
        if (footerEl) footerEl.innerHTML = footerHTML;

        // ✅ Set active nav link
        document.querySelectorAll("#navmenu a").forEach(link => {
            const linkPage = link.getAttribute("href");
            if (linkPage === currentPage) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });

        // ✅ Now that header/footer are in the DOM, initialize everything
        if (typeof window.initApp === "function") {
            window.initApp();
        }

    }).catch(err => {
        console.error("Failed to load header/footer:", err);
    });

});