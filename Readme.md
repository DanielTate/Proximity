



### Proximity

https://user-images.githubusercontent.com/2068815/130337929-2527b415-8e37-439e-be6f-c1edd3ea16bf.mp4

Your card will become a wrapper. Make sure to add background styles to the ```.proximity-wrapper``` class.

Usage:

```js

Proximity({
    elements: '.card',
    perspective: '800px',
    rotateY: (x) => `${x / 4}deg`,
    rotateX: (x) => `${(x / 4) * -1}deg`,
    transform: 'transform 250ms ease-out'
})

```

### Note:

The elements option can be either a Node, NodeList, ClassName or Array of HTMLNodes.

These are all valid options.
```js
const element = document.querySelector('.card')
Proximity({ elements: element })

const elements = document.querySelectorAll('.card')
Proximity({ elements })

const elements = Array.from(document.querySelectorAll('.card'))
Proximity({ elements })
```
