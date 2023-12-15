var audioElement = document.getElementById("audioElement");
var pButton = document.getElementById('pButton');
var songtitle = document.getElementById('songtitle');
var dropdownList = document.getElementsByClassName('dropdownList');
var videoElement = document.getElementById('videoElement');
var body = document.getElementById('body');
var dropdown = document.getElementById('dropdown');
var contentMain = document.getElementById('content-main');
var x=1;


// since browsers tend to jump back to the same scroll position after a page reload, this function scrolls to the top before a page reload
$(window).on('beforeunload', function() {
    $(window).scrollTop(0); 
});




function ToVideoOrNot() {
	if (screen.width > 799 && window.innerHeight < window.innerWidth) {
		$("header").before('<div id="loader"></div>');
		$("header").before('<video id="videoElement" autoplay><source src="video/trimmed.mp4" type="video/mp4"><source src="video/video-background-audio.webm" type="video/webm"></video>');
		//if video does not start playing after 8 seconds, run the removeVideo() function
		setTimeout (function() {
			if (videoElement.currentTime < 0.1) {removeVideo();}
			}
			,8000
		);
		var videoElement = document.getElementById('videoElement');
		var loader = document.getElementById('loader');
		videoElement.addEventListener('canplaythrough', function() {
			$("#loader").fadeOut(1000);
		})
		//to make the content appear sooner (if I run this function, I would need to also adjust z-index for #content-main and mobile nav)
		// videoElement.addEventListener('timeupdate', function() {
		// 	if (this.currentTime > this.duration-1) {
		// 		$("#div-news").fadeIn("slow");
		// 	}
		// });
		videoElement.addEventListener('ended', removeVideo);
		document.addEventListener('click', removeVideo2);
	} else {
		document.body.style.background = "black url('images/background-stars.jpg') no-repeat center center fixed";
		document.body.style.backgroundSize = "cover";
		$("#div-news").fadeIn("slow");
	}
}
function removeVideo() {
	document.body.style.background = "black url('images/background-stars.jpg') no-repeat center center fixed";
	document.body.style.backgroundSize = "cover";
	var videoElement = document.getElementById('videoElement');
	$("#div-news").fadeIn("slow");
	$("#loader").fadeOut(1000);
	$("video").fadeOut(800, function() {
		body.removeChild(videoElement);
	});
}
function removeVideo2() {
	document.body.style.background = "black url('images/background-stars.jpg') no-repeat center center fixed";
	document.body.style.backgroundSize = "cover";
	var videoElement = document.getElementById('videoElement');
	$("video").fadeOut(800, function() {
		body.removeChild(videoElement);
	});
}










function playPause() {
	if (audioElement.paused) {
		pButton.className = "";
		pButton.className = "pause";
		if (x == 14) x = 1;
		songtitle.innerHTML = dropdownList[x-1].innerHTML;
		var nextTrack = "music/track"+x+".mp3";
		var getTime = audioElement.currentTime;
		var duration = audioElement.duration;
		audioElement.src = nextTrack;
		audioElement.load(); //this is needed because, unlike desktops browsers, mobile browsers don't autoload without some user interaction. So we are forcing load to set up our subsequent condition.
		audioElement.onloadedmetadata = function() {
			if (getTime > 0 && getTime < duration) {		
				audioElement.currentTime = getTime; 
				audioElement.volume = 0;
				audioElement.play();
				$('#audioElement').animate({volume: 1}, 800);//jquery
			} else {
			audioElement.play();
			}
		}
		x++;
		audioElement.addEventListener('ended', playPause);	
	} else {
		pButton.className = "";
		pButton.className = "play";	
		x--;	
		audioElement.pause();
	}
}

for(var i=0;i<dropdownList.length;i++){
  	dropdownList[i].addEventListener("click", selectTrack);
}

function selectTrack(event) {
    pButton.className = "";
    pButton.className = "pause";
    songtitle.innerHTML = event.target.innerHTML;
    audioElement.src = "music/track"+this.id+".mp3";
    audioElement.load();
    audioElement.onloadedmetadata = function() {
    	audioElement.play();
    }
    x=1+parseFloat(this.id);
    audioElement.addEventListener('ended', playPause);
}


//remove dropdown playlist when clicking off it
// $(window).click(function(e) {
// 	var reveal = $('#reveal');
// 	var revealLI = $('#revealLI');
// 	var songtitle = $('#songtitle');
// 	var dropdown = $('#dropdown');
//     var target = $(e.target);

//     if(target.is('#reveal' || '#songtitle' || '#dropdown' || '#revealLI')) {
//        $("#dropdown").toggle();
//     } else {
//        $("#dropdown").toggle(false);
//     } 
// })




//toggles the dropdown playlist
$('#reveal').click(function(event){
    event.stopPropagation(); //when an element is clicked, it bubbles up the DOM for every containing element until it hits the document. "event.stopPropogation()" stops that at the event (in this case, at #reveal). So a click on #reveal is not a click on the document.  
    $('#dropdown').toggle();
});
$(document).click(function(){
    $('#dropdown').hide();
});
//for some reason the window.click functiona above does not work when the main content is clicked on for mobile iOS, so that's why this function.
$("#content-main").click(function(){
    $('#dropdown').hide();
});








$("nav").before('<div id="menu">☰</div>');

//toggles the dropdown nav
$('#menu').click(function(event){
    event.stopPropagation(); //when an element is clicked, it bubbles up the DOM for every containing element until it hits the document. "event.stopPropogation()" stops that at the event (in this case, at #menu). So a click on #menu is not a click on the document. 
    $('nav > ul').toggle();
});
$(document).click(function(){
    if (window.innerWidth < 938) {
    	$("nav > ul").hide();
    }
});
//for some reason the window.click functiona above does not work when the main content is clicked on for mobile iOS, so that's why this function.
$("#content-main").click(function(){
    if (window.innerWidth < 938) {
    	$("nav > ul").hide();
    }
});

// $("#menu").click(function(){
// 	if(window.innerWidth < 938) {
// 		$("nav > ul").toggle();
// 	}
// });

// $("nav, #div-player, #content-main").click(function(){
// 	if(window.innerWidth < 938) {
// 		$("nav > ul").toggle(false);
// 	}
// });


//this fixes an issue when resizing the screen with a desktop browser
$(window).resize(function(){
	if(window.innerWidth > 937) {
		$("nav > ul").removeAttr("style");
	}
});




//This game generates a ball with increasing speed that is confined to three walls (top, left, right), and gives the player a paddle at the bottom of the screen. Points are earned by blocking the ball as many times as you can.


// var positionX = random(20, 380);
// var positionY = 10;
// var dropAngleX = random(-10,10);
// var dropAngleY = 10;
// var counter = 0;
// function draw() {
    
//    background(255, 255, 255);
    
//    // the ball
//    fill(0, 136, 255);
//    ellipse(positionX, positionY, 20, 20);
//    positionY = positionY + dropAngleY;
//    positionX = positionX + dropAngleX;    
    
//    // the Paddle
//    noStroke();
//    fill(255, 0, 0);
//    rect(mouseX - 39,390,78,10);  
    
//    // the Point Counter
//    fill(0, 0, 0);
//    textSize(31);
//    text(counter, 334, 49);
    
//    // the walls
//    if (positionX < 10) {
//        dropAngleX = -1 * dropAngleX;
//    }
//    if (positionX > 390) {
//        dropAngleX = -1 * dropAngleX;
//    }
//    if (positionY < 10) {
//        dropAngleY = dropAngleY * -1;   
//    }
    
//    // ball hits top of the paddle 
//    if (dist(mouseX,10,mouseX,positionY) === 370 && positionX < 
//        mouseX + 39 && positionX > mouseX - 39) { 
//        // gets a point
//        counter = counter + 1;
//        // changes Ydirection
//        dropAngleY = dropAngleY * -1;
//        // increases speed
//        dropAngleY = dropAngleY - 2;
//        // randomizes Xdirection
//        dropAngleX = random(-10,10);
//    }  
// };



