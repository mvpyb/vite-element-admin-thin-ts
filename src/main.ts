import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { registerStore } from '/@/store'
import { useSvgIcon } from './icons'
import ElementPlus from 'element-plus'
import './permission'

// 导入公共样式
import './styles/index.scss'
// 第三方自定义字体文件
import './assets/fonts/index.css'
import 'element-plus/dist/index.css'

// 导入字体图标
import './assets/iconfont/iconfont.css'
// 全局事件总成
import globalEmitter from '/@/utils/mitt'
// 自定义指令
import registerDirective from '/@/directive'
// 注册所有element icons
import { setupElementIcons } from '/@/plugins/elementIcons'

const app = createApp( App )

const initApp = async() => {
  app.use( router )
  useSvgIcon( app )
  registerStore( app )
  registerDirective( app )
  await router.isReady()

  setupElementIcons( app )

  app.use( globalEmitter )
  app.use( ElementPlus )
  app.mount( '#app' )
}
initApp()
