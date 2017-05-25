import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function load (component) {
    return () => System.import(`components/${component}.vue`)
}

export default new VueRouter({
    /*
     * NOTE! VueRouter "history" mode DOESN'T works for Cordova builds,
     * it is only to be used only for websites.
     *
     * If you decide to go with "history" mode, please also open /config/index.js
     * and set "build.publicPath" to something other than an empty string.
     * Example: '/' instead of current ''
     *
     * If switching back to default "hash" mode, don't forget to set the
     * build publicPath back to '' so Cordova builds work again.
     */

    routes: [
        { path: '/scout/new', component: load('Scout/NewMatch/new') },
        { path: '/scout/:matchID',
            component: load('Scout/NewMatch/layout'),
            children: [
                {path: '', component: load('Scout/NewMatch/PreMatch')},
                {path: 'auto', component: load('Scout/NewMatch/Auto')},
                {path: 'teleop', component: load('Scout/NewMatch/Teleop')},
                {path: 'after_match', component: load('Scout/NewMatch/AfterMatch')}
            ]
        },
        { path: '/demo',
            component: load('demo/layout'),
            children: [
                {path: '', component: load('demo/TabOne')},
                {path: 'tabtwo', component: load('demo/TabTwo')}
            ]
        },
        { path: '/soundboard', component: load('SoundBoard') },
        { path: '/', component: load('Index') }, // Default
        { path: '*', component: load('Error404') } // Not found
    ]
})
