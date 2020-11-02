const hamburger = document.getElementById('hamburger')
const nav = document.getElementById('main-nav')

hamburger.addEventListener('click', () => {
    nav.classList.toggle('active')
})

// jump to page
const jumpMissions  = document.getElementById('jump-missions')
const jumpResearch  = document.getElementById('jump-research')
const jumpEducation = document.getElementById('jump-education')
const jumpContact   = document.getElementById('jump-contact')

jumpMissions.onclick = () => {
    updateContent(1)
    anim.playSegments(segments[1], true)
    nav.classList.remove('active')

    window.scrollTo(0, 0)
    body.classList.add('scroll-lock')
}

jumpResearch.onclick = () => {
    updateContent(2)
    anim.playSegments(segments[2], true)
    nav.classList.remove('active')

    window.scrollTo(0, 0)
    body.classList.add('scroll-lock')
}

jumpEducation.onclick = () => {
    updateContent(3)
    anim.playSegments(segments[3], true)
    nav.classList.remove('active')

    window.scrollTo(0, 0)
    body.classList.add('scroll-lock')
}

jumpContact.onclick = () => {
    updateContent(4)
    anim.playSegments(segments[4], true)
    nav.classList.remove('active')
    
    window.scrollTo(0, 0)
    body.classList.add('scroll-lock')
}