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
        "mais52": {
            title: "Venham mais 52, 2026",
            images: ["imgs/mais52video.gif", "imgsArchive/45.png",]
        },
        "escravidao": {
            title: "Escravidão, 2026",
            images: ["imgs/escravidao.gif"]
        },
        "capitalism": {
            title: "CAPITALISM, 2026",
            images: ["imgsGallery/capitalism_1.jpeg", "imgsGallery/capitalism_2.jpeg", "imgsGallery/capitalism_3.jpeg", "imgsGallery/capitalism_4.jpeg", "imgsGallery/capitalism_5.jpeg",
                     "imgsGallery/capitalism_6.jpeg", "imgsGallery/capitalism_7.jpeg", "imgsGallery/capitalism_8.jpeg", "imgsGallery/capitalism_9.jpeg", "imgsGallery/capitalism_10.jpeg"]
        },
        "manta_logo": {
            title: "Manta Logo, 2025",
            images: ["imgsGallery/mantaLogo_1.png", "imgsGallery/mantaLogo_2.png", "imgsGallery/mantaLogo_3.png", "imgsGallery/mantaLogo_4.png"]
        },
        "chaos": {
            title: "CNTRL+CHAOS, 2025",
            images: ["imgsGallery/chaos_1.jpeg", "imgsGallery/chaos_2.jpeg", "imgsGallery/chaos_3.jpeg", "imgsGallery/chaos_4.jpeg"]
        },
        "Motion": {
            title: "untitled motion", 2025",
            images: ["imgs/workArt.gif"]
        },
        "vinylAddiction": {
            title: "Vinyl Addiction", 2025",
            images: ["imgs/vinilAnimatic.gif", "imgsGallery/B&W_recordaddiction.jpeg"]
        },
        "B&W_dragonfly": {
            title: "Vinyl Addiction", 2025",
            images: ["imgs/dragonflyAnimatic.gif", "imgsGallery/B&W_dragonfly.jpeg"]
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

});
