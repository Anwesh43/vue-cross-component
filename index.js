Vue.component('line', {
    props : ['rot'],
    template : '#linetemplate'
})

const vueInstance = new Vue({
    el : '#app',
    data : {
        numbers : [0, 1, 2, 3, 4, 5]
    }
})
