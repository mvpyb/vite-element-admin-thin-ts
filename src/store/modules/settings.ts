import { defineStore } from 'pinia'
// import variables from '/@/styles/element-variables.scss'
import { localStorageHandle } from '/@/utils/storage'
import defaultSettings from '/@/settings'
import { setType } from '../types'

const { showSettings, tagsView, fixedHeader, sidebarLogo } = defaultSettings

const useSettingsStore = defineStore( {
  id : 'settings',
  state : (): setType => {
    const localTagsView = localStorageHandle.getItem( 'tagsView' )
    const localFixedHeader = localStorageHandle.getItem( 'fixedHeader' )
    const localSidebarLogo = localStorageHandle.getItem( 'sidebarLogo' )
    return {
      // theme : variables.theme,
      showSettings,
      tagsView : localTagsView ? !!+localTagsView : tagsView,
      fixedHeader : localFixedHeader ? !!+localFixedHeader : fixedHeader,
      sidebarLogo : localSidebarLogo ? !!+localSidebarLogo : sidebarLogo,
      layoutMod : localStorageHandle.getItem( 'layoutMod' ) == 'horizontal' ? 'horizontal' : 'vertical'
    }
  },
  actions : {
    CHANGE_SETTING( payload: { key: string; value: any } ) {
      const { key, value } = payload
      // eslint-disable-next-line no-prototype-builtins
      if ( this.hasOwnProperty( key ) ) {
        ;( this as any )[key] = value
        localStorageHandle.setItem( key, +value )
      }
    },
    CHANGE_LAYOUT_MOD( val = 'vertical' ) {
      const mod = val == 'vertical' ? 'vertical' : 'horizontal'
      localStorageHandle.setItem( 'layoutMod', mod )
      this.layoutMod = mod
    }
  }
} )
export default useSettingsStore
