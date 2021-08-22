export const Proximity = function(options = {}) {

    if(!options.elements) {
        throw new Error('Undefined element. Requires Array, Node, NodeList or QuerySelector.')
    }

    const defaults = {
        perspective: '800px',
        rotateY: (x) => `${x / 4}deg`,
        rotateX: (x) => `${(x / 4) * -1}deg`,
        transform: 'transform 250ms ease-out'
    }

    for(const [key, value] of Object.entries(defaults)) {
        if(options[key] === undefined) {
            options[key] = value 
        }
    }

    function normalize(elements) {
        if(!Array.isArray(elements)) {
            if(typeof elements === 'string') {
                elements = Array.from(document.querySelectorAll(elements))
            }

            if(elements.length === undefined) {
                elements = [elements]
            }

            if(!Array.isArray(elements)) {
                elements = Array.from(elements)
            }
        }
        return elements
    }

    function decorate(element) {
        element.innerHTML = `<div class="proximity-wrapper">
            <div class="proximity-trigger"></div>
            <div class="proximity-content">${element.innerHTML}</div>
        </div>`

        const trigger = element.querySelector('.proximity-trigger')
        const { width, height, left, top } = trigger.getBoundingClientRect()

        const centerX = width / 2
        const centerY = height / 2

        trigger.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e
            const cleanX = (clientX - left)
            const cleanY = (clientY - top)
            const x = (cleanX - centerX)
            const y = (cleanY - centerY)
            const detail = {
                x,
                y 
            }
            const EVENT = new CustomEvent('proximity', { detail })
            element.dispatchEvent(EVENT)
        })

        element.addEventListener('proximity', (e) => {
            const { x, y } = e.detail
            let el = element.querySelector('.proximity-wrapper')
            el.style.transform = `perspective(${options.perspective}) rotateY(${options.rotateY(x)}) rotateX(${options.rotateX(y)})`
        })

        element.addEventListener('mouseleave', (e) => {
            let el = element.querySelector('.proximity-wrapper')
            el.style.transition = options.transform
            el.style.transform = `perspective(${options.perspective}) rotateY(0deg) rotateX(0deg)`
        })
    } 

    let elements = normalize(options.elements)

    elements.forEach(decorate)

    return true 
}
