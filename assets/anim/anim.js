const lottieContainer = document.getElementById('lottie-container')

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

// skip initial anim play
anim.goToAndPlay(138, true)

// play first segment right away
anim.playSegments(segments[0])

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

// change content

// init content
slides = [
    {
        ui: `<button onclick="prevSlide()" disabled>Prev</button>
            
            <div class="heading">
                <h1>MISSIONS</h1>
                <a href="#content">explore</a>
            </div>
            
            <button onclick="nextSlide()">Next</button>`,
        content: '<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur quae numquam minus laborum accusantium velit libero quaerat accusamus porro vero facere recusandae obcaecati commodi aliquid, odio earum, officia reiciendis labore.</p><p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur quae numquam minus laborum accusantium velit libero quaerat accusamus porro vero facere recusandae obcaecati commodi aliquid, odio earum, officia reiciendis labore.</p><p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur quae numquam minus laborum accusantium velit libero quaerat accusamus porro vero facere recusandae obcaecati commodi aliquid, odio earum, officia reiciendis labore.</p><p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur quae numquam minus laborum accusantium velit libero quaerat accusamus porro vero facere recusandae obcaecati commodi aliquid, odio earum, officia reiciendis labore.</p>'
    },
    {
        ui: `<button onclick="prevSlide()">Prev</button>
            
            <div class="heading">
                <h1>RESEARCH</h1>
                <a href="#content">explore</a>
            </div>
            
            <button onclick="nextSlide()">Next</button>`,
        content: '<h2>lroem ipsum<h2><p>'
    },
    {
        ui: `<button onclick="prevSlide()">Prev</button>
            
            <div class="heading">
                <h1>EDUCATION</h1>
                <a href="#content">explore</a>
            </div>
            
            <button onclick="nextSlide()">Next</button>`,
        content: '<h2>lroem ipsum<h2><p>'
    },
    {
        ui: `<button onclick="prevSlide()">Prev</button>
            
            <div class="heading">
                <h1>CONTACT</h1>
                <a href="#content">explore</a>
            </div>
            
            <button disabled>Next</button>`,
        content: ''
    }
]

const uiElement = document.getElementById('slide-ui')
const contentElement = document.getElementById('content')

function updateContent (current) {

    console.log(current, slides[current])
    uiElement.innerHTML = slides[current].ui
    contentElement.innerHTML = slides[current].content
}


document.addEventListener('DOMContentLoaded', function() {
    updateContent(0)
}, false);