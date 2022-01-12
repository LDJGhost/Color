import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 创建Vue根实例，将router，store配知道根实例中
// 把App根组件渲染到#app节点
createApp(App).use(store).use(router).mount('#app')
