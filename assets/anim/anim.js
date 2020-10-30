const lottieContainer = document.getElementById('lottie-container')
const body = document.getElementsByTagName("BODY")[0];

// load the animation
const anim = lottie.loadAnimation({
    container: lottieContainer,
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: '/anim/data.json',
    name: 'slider'
})

// define segments
const segments = [
    // [0, 30],
    [30, 58],
    [58, 85],
    [85, 112],
    [112, 138]
]

const segmentsReversed = [
    // [30, 0],
    [58, 30],
    [85, 58],
    [111, 85],
    [138, 111]
]

// skip initial anim play
anim.goToAndPlay(138, true)
anim.pause()

// play first segment right away
setTimeout(() => {   
    anim.playSegments(segments[0])
}, 300)


// change slides
let current = 0

function nextSlide () {
    // play the anim
    current += 1
    anim.playSegments(segments[current], true)

    // update content

    updateContent(current)
}

function prevSlide () {
    // play the anim
    anim.playSegments(segmentsReversed[current], true)
    current -= 1

    // update content
    updateContent(current)
}

// also capture scroll events, if the cursor is in hero
$(window).bind('mousewheel', function(event) {
    if (body.classList.contains('scroll-lock')) {
        if (event.originalEvent.wheelDelta >= 0) {      
            if (current > 0)
                prevSlide()
        } else {
            if (current < 3)
                nextSlide()
        }

        window.scrollTo(0, 0)
    }
})



// change content

// init content
slides = [
    {
        ui: `<button id="btnPrev" disabled></button>
            
            <div class="heading">
                <h1>Missions</h1>
                <a id="unlock-scroll" href="#content">explore missions</a>
            </div>
            
            <button id="btnNext" onclick="nextSlide()"></button>`,
        content: ``
    },
    {
        ui: `<button id="btnPrev" onclick="prevSlide()"></button>
            
            <div class="heading">
                <h1>Research</h1>
                <a id="unlock-scroll" href="#content">explore research</a>
            </div>
            
            <button id="btnNext" onclick="nextSlide()"></button>`,
        content: '<h2>lroem ipsum<h2><p>'
    },
    {
        ui: `<button id="btnPrev" onclick="prevSlide()"></button>
            
            <div class="heading">
                <h1>Education</h1>
                <a id="unlock-scroll" href="#content">explore education</a>
            </div>
            
            <button id="btnNext" onclick="nextSlide()"></button>`,
        content: '<h2>lroem ipsum<h2><p>'
    },
    {
        ui: `<button id="btnPrev" onclick="prevSlide()"></button>
            
            <div class="heading">
                <h1>CONTACT</h1>
                <a id="unlock-scroll" href="#content">explore</a>
            </div>
            
            <button id="btnNext" disabled"></button>`,
        content: ''
    }
]

const uiElement = document.getElementById('slide-ui')
const contentElement = document.getElementById('content')

function updateContent (slide) {
    uiElement.classList.add('hidden')

    setTimeout(() => {
        uiElement.innerHTML = slides[slide].ui
        contentElement.innerHTML = slides[slide].content
    }, 700)
    
    
    setTimeout(() => {
        uiElement.classList.remove('hidden')
        
        // enable scroll if user clicks the explore... button
        const scrollUnlocker = document.getElementById('unlock-scroll')
        scrollUnlocker.onclick = () => {
            body.classList.remove('scroll-lock')  
        }
    }, 800 )
    
    current = slide
}


document.addEventListener('DOMContentLoaded', function() {
    updateContent(0)
}, false);