document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. PAGE TRANSITIONS (SLIDE + FADE IN/OUT)
    // ==========================================
    const overlay = document.getElementById("transition-overlay");
    const links = document.querySelectorAll(".transition-link");

    // Slide+fade in when page loads
    requestAnimationFrame(() => {
        document.body.classList.add("loaded");
    });

    // Helper function to handle outgoing transitions safely
    function handlePageExit(targetUrl) {
        if (overlay) {
            overlay.classList.add("active");
        }
        document.body.classList.remove("loaded");

        // Wait for the CSS animation finish (600ms) before changing page
        setTimeout(() => {
            window.location.href = targetUrl;
        }, 600);
    }

    // Trigger transition when clicking normal header/footer transition-links
    links.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const href = this.getAttribute("href");
            if (href) handlePageExit(href);
        });
    });


    // ==========================================
    // 2. PORTFOLIO GRID CLICKS (MAIN PAGE)
    // ==========================================
    const projects = document.querySelectorAll(".mae[data-project]");

    projects.forEach(project => {
        project.addEventListener("click", (e) => {
            // Ignore if they somehow clicked an actual link anchor deep inside
            if (e.target.tagName === 'A') return;

            const projectKey = project.getAttribute("data-project");
            if (projectKey) {
                // Generates destination url and funnels it through the transition animation
                const targetUrl = `gallery.html?project=${projectKey}`;
                handlePageExit(targetUrl);
            }
        });
    });


    // ==========================================
    // 3. DYNAMIC GALLERY LOADER (GALLERY PAGE)
    // ==========================================
    const galleryData = {
        "chaos": {
            title: "CNTRL+CHAOS Magazine, 2025",
            images: ["imgs/cntrlChaos.gif"]
        },
    };

    const urlParams = new URLSearchParams(window.location.search);
    const activeProjectKey = urlParams.get('project');
    const pageTitle = document.getElementById("gallery-title");
    const imageContainer = document.getElementById("gallery-content");

    // Only attempt to run if we are actually on the gallery page elements
    if (pageTitle && imageContainer) {
        if (activeProjectKey && galleryData[activeProjectKey]) {
            const project = galleryData[activeProjectKey];
            pageTitle.textContent = project.title;

            project.images.forEach(imagePath => {
                const imgElement = document.createElement("img");
                imgElement.src = imagePath;
                imgElement.alt = project.title;
                imgElement.style.width = "100%"; 
                imgElement.style.display = "block";
                imgElement.style.marginBottom = "25px";
                imageContainer.appendChild(imgElement);
            });
        } else if (activeProjectKey) {
            pageTitle.textContent = "Project Gallery Not Found";
        }
    }


    // ==========================================
    // 4. CUSTOM CIRCLE MOUSE TRAIL
    // ==========================================
    // ==========================================
    // 4. CUSTOM CIRCLE MOUSE TRAIL (PERFECT ALIGNMENT)
    // ==========================================
    // ==========================================
    // 4. CUSTOM CIRCLE MOUSE TRAIL (PERFECT CENTERED ALIGNMENT)
    // ==========================================
    const cursor = document.getElementById("custom-cursor");

    if (cursor) {
        document.addEventListener("mousemove", (e) => {
            // Combines tracking coordinates and centering corrections into one calculation string
            cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;

            createTrailDot(e.clientX, e.clientY);
        });
    }

    function createTrailDot(x, y) {
        const dot = document.createElement("div");
        dot.className = "trail-dot";
        
        // Centers each trail dot exactly where your mouse was located
        dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
        
        document.body.appendChild(dot);

        setTimeout(() => {
            dot.remove();
        }, 600);
    }

});
