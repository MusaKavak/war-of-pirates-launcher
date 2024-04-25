import { createMemoryHistory, createRouter } from 'vue-router'

import Home from '../components/home.vue'
import Download from '../components/download.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/download/:type', component: Download },
]

export default createRouter({
    history: createMemoryHistory(),
    routes,
})