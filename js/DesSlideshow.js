
// slideshow
var slideIndex = 1;
showSlides(slideIndex);


//slideshow
function plusSlidesSS(n) {
  showSlides(slideIndex += n);
}

function currentSlideSS(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var slidedots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  for (i = 0; i < slidedots.length; i++) {
    slidedots[i].className = slidedots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  slidedots[slideIndex-1].className += " active";
}



// lightbox
  function openModal() {
    document.getElementById("myModal").style.display = "block";
  }
  
  function closeModal() {
    document.getElementById("myModal").style.display = "none";
  }

//lightbox
var slideIndexlb = 1;
showSlidesa(slideIndexlb);
  
  function plusSlides(k) {
    showSlidesa(slideIndexlb += k);
  }
  
  function currentSlidelb(k) {
    showSlidesa(slideIndexlb = k);
  }
  
  function showSlidesa(k) {
    var p;
    var slideslb = document.getElementsByClassName("mylight");  //modal large pic
    var dots = document.getElementsByClassName("demolight");  //modal column pic
   // var captionText = document.getElementById("caption");
    if (k > slideslb.length) {slideIndexlb = 1}
    if (k < 1) {slideIndexlb = slideslb.length}
    for (p = 0; p < slideslb.length; p++) {
        slideslb[p].style.display = "none";
    }
    for (p = 0; p < dots.length; p++) {
        dots[p].className = dots[p].className.replace(" active", "");
    }
    slideslb[slideIndexlb-1].style.display = "block";
    dots[slideIndexlb-1].className += " active";
    //captionText.innerHTML = dots[slideIndexlb-1].alt;
  }