import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 自动设置 REM 基准值 （html标签字体大小适配）
import 'amfe-flexible'

// 加载全局样式
import './styles/index.less'

// 引入 vant 组件库
import { Button, Icon } from 'vant'

// 创建 Vue 根实例，将 router，store 配置到根实例中
// 把 App 根组件渲染到 #app 节点
createApp(App).use(store).use(router).use(Button).use(Icon).mount('#app')
