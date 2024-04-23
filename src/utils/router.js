import { createMemoryHistory, createRouter } from 'vue-router'

import Home from '../components/home.vue'
import DownloadOptions from '../components/download-options.vue'
import Download from '../components/download.vue'
import Launch from '../components/launch.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/download-options', component: DownloadOptions },
    { path: '/download/:type', component: Download },
    { path: '/launch', component: Launch },
]

export default createRouter({
    history: createMemoryHistory(),
    routes,
})