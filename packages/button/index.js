import WakakaButton from './main.vue'

WakakaButton.install = function (Vue) {
  Vue.component(WakakaButton.name, WakakaButton)
}

export default WakakaButton