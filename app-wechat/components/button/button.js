// components/button/button.js

// 注册一个小程序组件
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        text: { type: String, value: '点击' },
        type: { type: String, value: 'default' }
    },
    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        tap() {
            console.log('----')
            this.triggerEvent('myevent', [1,2,3])
        }
    }
})
