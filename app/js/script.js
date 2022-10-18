

//	ANIMATION SUR LE LIVRE

var front = document.querySelector('.face-front');
var back = document.querySelector('.face-back');
var flip = document.querySelector('.histoire_book__content');
var uno = document.querySelectorAll('.book');
var portada = document.querySelectorAll('#portada');
var contZindex = 2;
var customZindex = 1;
var windowsW = window.innerWidth;
var counter = 1;

if(windowsW >= 810){
	for (var i = 0; i < uno.length; i++) {
		uno[i].style.zIndex = customZindex;
		customZindex--;
		uno[i].addEventListener('click', function(e){
			var tgt = e.target;
			var unoThis = this;
			unoThis.style.zIndex = contZindex;
			contZindex++;
	
			if (tgt.getAttribute('class') == 'face-front') {
				unoThis.style.zIndex = contZindex;
				contZindex +=20;
				setTimeout(function(){
					unoThis.style.transform = 'rotateY(-180deg)';
				}, 500);
			}
			if (tgt.getAttribute("class") == 'face-back') {
				unoThis.style.zIndex = contZindex;
				contZindex +=20;
	
				setTimeout(function(){
					unoThis.style.transform = 'rotateY(0deg)';
				}, 500);
			}
			if (tgt.getAttribute('id') == 'portada') {
				flip.classList.remove("trnsf-reset");
				flip.classList.add("trnsf");
			}
			if (tgt.getAttribute('id') == 'trsf') {
				flip.classList.remove("trnsf");
				flip.classList.add("trnsf-reset");
			}
		});
	}
} else {
	for (var i = 0; i < uno.length; i++) {
		uno[i].style.zIndex = customZindex;
		customZindex--;
		uno[i].addEventListener('click', function(e){
			var tgt = e.target;
			var unoThis = this;
			unoThis.style.zIndex = contZindex;
			contZindex++;

			if (tgt.getAttribute('class') == 'face-front') {
				unoThis.style.zIndex = contZindex;
				contZindex -=20;
				setTimeout(function(){
					unoThis.style.transform = 'rotateY(180deg)';
				}, 500);
			}
			if (tgt.getAttribute("class") == 'face-back') {
				unoThis.style.zIndex = contZindex;
				contZindex +=20;
				setTimeout(function(){
					unoThis.style.transform = 'rotateY(180deg)';
				}, 500);
			}
			// if (tgt.getAttribute('id') == 'portada-back') {
			// 	flip.classList.remove("");
			// 	flip.classList.add("reset");
			// }
			// if (tgt.getAttribute('id') == '') {
			// 	flip.classList.remove("");
			// 	flip.classList.add("");
			// }
		});
	}
}



// ANIMATION AU CLICK DU HAMBURGER

var toggleClick = document.querySelector(".navbar_menu__togglebox");
var navbar_menu =document.querySelector(".navbar_menu");
toggleClick.addEventListener('click', ()=>{
	toggleClick.classList.toggle('active');
	navbar_menu.classList.toggle('block')
});

///////////////////// Animation du banner
let playBtn = document.querySelector('.banner__playbtn');
let banner = document.querySelector('.banner');
let bannerImage = document.querySelector('.banner__image ');
let bannerImageDiv = document.querySelectorAll('.banner__image__elt');


playBtn.addEventListener('click', function(){
	banner.classList.toggle('show');
	bannerImage.classList.toggle('show');
	//bannerImageDiv.style.display = "none"
	gsap.to(".banner__image__elt", {
		duration: 3,
		opacity:0,
		rotation:360,
		ease: "power1.inOut",
		stagger: {
	
			each: 0.1,
			from: "center",
			grid: [0,0],
			ease: "power2.inOut",
			
			
		}
	  }); 
	  gsap.to(".banner__text p", {
		duration: 1,
		opacity:1,
		delay:3.5,
		ease: "power1.inOut",
		stagger: {
	
			each: 0.7,
			from: "center",
			grid: [0,0],
			ease: "power2.inOut",
			
		}
	  }); 
});



var devSlideIndex = 1;
devShowSlide(devSlideIndex);

function currentSlidde(n) {
	devShowSlide((devSlideIndex = n));
}
function devShowSlide(n) {
	var i;
	var slides = document.querySelectorAll('.programme__bloc1__slider .slide');
	var slidesText = document.querySelectorAll('.programme__bloc1__text__slider .slide');
	//var dotts = document.getElementsByClassName('dott');
	if (n > slides.length || n > slidesText.length) {
		devSlideIndex = 1;
	}
	if (n < 1) {
		devSlideIndex = slides.length;
	}
	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = 'none';
		slidesText[i].style.display = 'none';
	}
	// for (i = 0; i < dotts.length; i++) {
	//     dotts[i].className = dotts[i].className.replace(' actived', '');
	// }
	slides[devSlideIndex - 1].style.display = 'block';
	slidesText[devSlideIndex - 1].style.display = 'block';
	//dotts[devSlideIndex - 1].className += ' actived';
}

var slideInd = 0;
devShowSlides();
function devShowSlides() {
	var i;
	var slides = document.querySelectorAll('.programme__bloc1__slider .slide');
	var slidesText = document.querySelectorAll('.programme__bloc1__text__slider .slide');
	//var dotts = document.getElementsByClassName('dott');

	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = 'none';
		slidesText[i].style.display = 'none';
	}
	slideInd++;
	if (slideInd > slides.length) {
		slideInd = 1;
	}
	// for (i = 0; i < dotts.length; i++) {
	//     dotts[i].className = dotts[i].className.replace(' actived', '');
	// }

	slides[slideInd - 1].style.display = 'block';
	slidesText[slideInd - 1].style.display = 'block';
   // dotts[slideInd - 1].className += ' actived';
	setTimeout(devShowSlides, 4000); // Change image every 2 seconds
}
