document.addEventListener("DOMContentLoaded", () => {
    
    const overlay = document.getElementById("transition-overlay");
    const links = document.querySelectorAll(".transition-link");

    
    requestAnimationFrame(() => {
        document.body.classList.add("loaded");
    });

    
    function handlePageExit(targetUrl) {
        if (overlay) {
            overlay.classList.add("active");
        }
        document.body.classList.remove("loaded");

        
        setTimeout(() => {
            window.location.href = targetUrl;
        }, 600);
    }

    
    links.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const href = this.getAttribute("href");
            if (href) handlePageExit(href);
        });
    });


    const projects = document.querySelectorAll(".mae[data-project]");

    projects.forEach(project => {
        project.addEventListener("click", (e) => {
        
            if (e.target.tagName === 'A') return;

            const projectKey = project.getAttribute("data-project");
            if (projectKey) {
            
                const targetUrl = `gallery.html?project=${projectKey}`;
                handlePageExit(targetUrl);
            }
        });
    });


    const galleryData = {
        "manta": {
            title: "Logo, Manta de Retalhos, 2025",
            images: ["../imgs/manta_detail1.jpg", "../imgs/manta_detail2.jpg"]
        },
        "chaos": {
            title: "CNTRL+CHAOS Magazine, 2025",
            images: ["../imgs/cntrlChaos.gif"]
        },
        "instapark": {
            title: "Concert visual, The Parkinglot band, 2025",
            images: ["../imgs/park_photo1.jpg"]
        },
        "workart": {
            title: "Motion Graphic, 2025",
            images: ["../imgs/workart_still1.jpg", "../imgs/workart_still2.jpg"]
        },
        "casaviver": {
            title: "Casa para viver, Modular type, 2025",
            images: ["../imgs/casa_render1.jpg"]
        },
        "aa25": {
            title: "Everything moves, Workshop, 2025",
            images: ["../imgs/workshop_1.jpg", "../imgs/workshop_2.jpg"]
        },
        "vinil": {
            title: "Vinyl addiction, animated poster, 2025",
            images: ["../imgs/vinil_still.jpg"]
        },
        "bowie": {
            title: "Blitz Mag, Bowie special edition, 2024",
            images: ["../imgs/bowie_mockup1.jpg", "../imgs/bowie_mockup2.jpg"]
        },
        "closing": {
            title: "Poster & animation, Ecosta Caparica, 2024",
            images: ["../imgs/closing_detail.jpg"]
        },
        "thankyou": {
            title: "Poster, Thank You Mama Caparica, 2023",
            images: ["../imgs/thankyou_print.jpg"]
        },
        "logoencosta": {
            title: "Logo, Ecosta Caparica, 2022",
            images: ["../imgs/logo_variants.jpg"]
        },
        "flyerencosta": {
            title: "Flyer, Ecosta Caparica, 2022",
            images: ["../imgs/flyer_back.jpg", "../imgs/flyer_front.jpg"]
        }
    };

    const urlParams = new URLSearchParams(window.location.search);
    const activeProjectKey = urlParams.get('project');
    const pageTitle = document.getElementById("gallery-title");
    const imageContainer = document.getElementById("gallery-content");

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

    const cursor = document.getElementById("custom-cursor");

    if (cursor) {
        document.addEventListener("mousemove", (e) => {

            cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;

            createTrailDot(e.clientX, e.clientY);
        });
    }

    function createTrailDot(x, y) {
        const dot = document.createElement("div");
        dot.className = "trail-dot";
        
    
        dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
        
        document.body.appendChild(dot);

        setTimeout(() => {
            dot.remove();
        }, 600);
    }

});			$.get("load.php?start="+$('#loaded_max').val(), function(loaded){
				$('body').append(loaded);
				$('#loaded_max').val(parseInt($('#loaded_max').val())+50);
				$('#loadingbar').css("display","none");
				loading = false;
			});
		}
	}
});

$(document).ready(function() {
	$('#loaded_max').val(50);
});
