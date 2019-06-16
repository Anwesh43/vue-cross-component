class Animator {

    constructor() {
        this.components = []
    }

    add(component) {
        this.components.push(component)
        if (this.components.length == 1) {
            this.start()
        }
    }

    start() {
        this.interval = setInterval(() => {
            this.components.forEach((component, index) => {
                component.update(() => {
                    this.components.splice(index, 1)
                    if (this.components.length == 0) {
                        clearInterval(this.interval)
                    }
                })
            })
        }, 20)
    }
}

class State {

    constructor() {
        this.scale = 0
        this.dir = 0
        this.prevScale = 0
    }

    update(cb) {
        this.scale += 0.05 * this.dir
        if (Math.abs(this.scale - this.prevScale) > 1) {
            this.scale = this.prevScale + this.dir
            this.dir = 0
            this.prevScale = this.scale
            cb()
        }
    }

    startUpdating(cb) {
        if (this.dir == 0) {
            this.dir = 1 - 2 * this.prevScale
            cb()
        }
    }
}

const animator = new Animator()

Vue.component('line-component', {
    props : ['rot'],
    template : '#linetemplate'
})

Vue.component('cross', {
    props : ['i'],
    data() {
        return {curr : 0, state : new State()}
    },

    template : '#crossTemplate',

    methods : {
        start() {
            this.state.startUpdating(() => {
                animator.add(this)
            })
        },
        update(cb) {
            this.curr = this.state.scale * 45
            this.state.update(() => {
                cb()
            })
        }
    }
})



const vueInstance = new Vue({
    el : '#app',
    data : {
        numbers : [0, 1, 2, 3, 4, 5]
    }
})
