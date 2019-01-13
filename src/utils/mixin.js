import { mapGetters, mapActions } from 'vuex'

export const ebookMixin = {
    computed: {
        ...mapGetters([
            "fileName",
            "menuVisible",
            "settingVisible",
            "defaultFontSize"
        ])
    },
    methods: {
        ...mapActions([
            "setMenuVisible",
            "setFileName",
            "setSettingVisible",
            "setDefaultFontSize"
        ])
    },
}

// 以后修改只在一处修改件就行