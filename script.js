

document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("transition-overlay");
  const links = document.querySelectorAll(".transition-link");

  // Slide+fade in when page loads
  requestAnimationFrame(() => {
    document.body.classList.add("loaded");
  });

  // Slide+fade out when clicking a link
  links.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const href = this.getAttribute("href");

      // Slide+fade out effect
      overlay.classList.add("active");
      document.body.classList.remove("loaded");

      // Navigate after animation
      setTimeout(() => {
        window.location.href = href;
      }, 600); // same duration as CSS
    });
  });
});


var loading = false;
$(window).scroll(function(){
  if((($(window).scrollTop()+$(window).height())+250)>=$(document).height()){
		if(loading === false){
			loading = true;
			$('#loadingbar').css("display","block");
			$.get("load.php?start="+$('#loaded_max').val(), function(loaded){
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
