import Vue from 'vue';
const emitter = mitt()

Vue.directive('async-scroller', {
    bind(el) {
        el.addEventListener("scroll", (event) => {
            let size = Number(el.scrollHeight - 5);
            let pos =
                Number(el.scrollTop) + Number(el.offsetHeight);

            // console.log('pos', pos, 'size', size);

            if (pos >= size) {
                emitter.on("bottom");
            } else if (Number(this.element.scrollTop) === 0) {
                emitter.on("top")
            }
        });
    }
});