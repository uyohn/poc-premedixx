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

// skip initial anim play
anim.goToAndPlay(138, true)
anim.pause()

// define segments
const segments = [
    [0, 30],
    [30, 58],
    [58, 85],
    [85, 112],
    [112, 138]
]

const segmentsReversed = [
    [30, 0],
    [58, 30],
    [85, 58],
    [111, 85],
    [138, 111]
]


// change slides
let current = 0

function nextSlide () {
    // play the anim
    current = Number(current) + 1
    anim.playSegments(segments[current], true)

    // update content
    updateContent(current)

    // update url param
    let stateObj = {
        id: current
    }
    window.history.replaceState(stateObj, 'Premedix Academy', `/?slide=${current}`)
}

function prevSlide () {
    // play the anim
    anim.playSegments(segmentsReversed[current], true)
    current = Number(current) - 1

    // update content
    updateContent(current)

    // update url param
    // update url param
    let stateObj = {
        id: current
    }
    window.history.replaceState(stateObj, 'Premedix Academy', `/?slide=${current}`)
}


//  also capture the mouse scroll if scroll-lock and treshold
//  instead of scrolling change slide, until scroll unlocked
//  via "explore ..." button
let cooldown = 0;

function changeSlide(e){
    var evt=window.event || e //equalize event object
    var delta=evt.detail? evt.detail*(-120) : evt.wheelDelta //check for detail first so Opera uses that instead of wheelDelta
    
    if (cooldown === 0) {
        if (body.classList.contains('scroll-lock')) {
            if (delta >= 0) {      
                if (current > 1)
                    prevSlide()
            } else {
                if (current < 4)
                    nextSlide()
            }
    
            window.scrollTo(0, 0)
        }

        cooldown = 1

        setTimeout(() => {
            cooldown = 0;
        }, 200);
    }
}
 
var mousewheelevt=(/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "mousewheel" //FF doesn't recognize mousewheel as of FF3.x
 
if (document.attachEvent) //if IE (and Opera depending on user setting)
    document.attachEvent("on"+mousewheelevt, changeSlide)
else if (document.addEventListener) //WC3 browsers
    document.addEventListener(mousewheelevt, changeSlide, false)



// change content

// init content
slides = [
    {
        ui: `           

            <div class="intro">
                <button onclick="nextSlide()">Premedix Academy</btn>
            </div>`,
        content: ``
    },
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
        
        if (scrollUnlocker != null)
            scrollUnlocker.onclick = () => {
                body.classList.remove('scroll-lock')  
            }
    }, 800 )
    
    current = slide
}


document.addEventListener('DOMContentLoaded', function() {
    // skip initial anim play
    anim.goToAndPlay(138, true)
    anim.pause()
    
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    
    if (urlParams.has('slide')) {
        const slide = urlParams.get('slide')

        current = Number(slide)
        updateContent(slide)

        // play first segment right away
        setTimeout(() => {   
            anim.playSegments(segments[slide])
        }, 300)
    } else {
        updateContent(0)

        // play first segment right away
        setTimeout(() => {   
            anim.playSegments(segments[0])
        }, 300)
    }
}, false);