import Vue from 'vue';
import App from './src/index'
import './src/assets/scss/index.scss';
new Vue({
    el: '#app',
    render: h => h(App)
})