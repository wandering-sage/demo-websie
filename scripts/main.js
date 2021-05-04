var loadScreen       = document.querySelector(".load-screen");
var sections         = document.querySelectorAll('.section');
var sectionContainer = document.querySelector('.sections');

// Apply reveal class on these to play entry animations
var animations = {
    0 : [".light-bg", ".ball-1", ".ball-2", ".ball-3", ".ball-4"],
    1 : [".circle-1", ".circle-2", ".circle-3", ".rect-1", ".rect-2", ".triangle", ".shapes-bg", ".man", ".woman"],
    2 : ["#notebook", "#Everything"],
    3 : [],
}



// For tracking the section currently displayed
var currentSection = 0;
var canScroll = true;
var scrollDir = 0;
var animationTime = 800;

// Touch data (for mobile)
// let touchStart = 0;
// let touchEnd = 0;

// document.addEventListener('touchstart', (event) => {
//   touchStart = event.changedTouches[0].clientY;
// });

// document.addEventListener('touchend', (event) => {
//   touchEnd = event.changedTouches[0].clientY;
//   if (touchStart > touchEnd) {
//     performScroll(1);
//   } else {
//     performScroll(-1);
//   }
// });

document.body.onload = ()=>{
    loadScreen.style.opacity = "0";
    setTimeout(()=>{
        loadScreen.style.display = "none";
    },300);
    addClass("h1", "reveal", sections[currentSection]);
    animations[currentSection].forEach(s => addClass(s,"reveal"));
}

document.addEventListener('wheel', (e) => {
    if (!canScroll) {
        return; 
    }
    
    scrollDir = e.deltaY > 1 ? 1 : -1;
    performScroll(scrollDir);
});

function performScroll(scrollDir) {
    currentSection += scrollDir;
    
    if (currentSection > sections.length - 1) {
        currentSection = sections.length - 1;
        return;
    }
    if (0 > currentSection) {
        currentSection = 0;
        return;
    }

    canScroll = false;
    setTimeout(() => {
        canScroll = true;
    }, animationTime);

    addClass("h1", "hide", sections[currentSection-scrollDir]);
    animations[currentSection-scrollDir].forEach(s => addClass(s,"hide"));

    setTimeout(()=>{
        removeClass("h1", "hide", sections[currentSection-scrollDir]);
        animations[currentSection-scrollDir].forEach(s => removeClass(s,"hide"));

        removeClass("h1", "reveal", sections[currentSection-scrollDir]);
        animations[currentSection-scrollDir].forEach(s => removeClass(s,"reveal"));

        sectionContainer.style.top = (currentSection * -100) + 'vh';

        addClass("h1", "reveal", sections[currentSection]);
        animations[currentSection].forEach(s => addClass(s,"reveal"));
    }, 400);
}

function addClass(selector, cls, doc = document){
    doc.querySelector(selector).classList.add(cls);
}
function removeClass(selector, cls, doc = document){
    doc.querySelector(selector).classList.remove(cls);
}