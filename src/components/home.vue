<template>
    <LanguageSwitcher v-if="state != 'splash'"></LanguageSwitcher>
    <div v-if="state == 'splash'" id="splash-container">
        War of Pirates
    </div>
    <div v-if="state == 'download'" id="download-container">
        <div id="title">War of Pirates</div>
        <p> {{ $t('home.downloadMessage') }} </p>
        <div id="download-location-wrapper">
            <DownloadLocation></DownloadLocation>
        </div>
    </div>
    <div v-if="state == 'update'" id="download-container">
        <div id="title">War of Pirates</div>
        <p> {{ $t('home.updateMessage') }}</p>
        <div id="changelog-wrapper">
            <Update :location="location"></Update>
        </div>
    </div>
    <!-- <div id="home">
        <div>
            <h1>War of Pirates</h1>
            <button @click="buttonAction()">{{ buttonLabel }}</button>
        </div>
    </div> -->
</template>

<style scoped>
#splash-container {
    width: 100dvw;
    height: 100dvh;
    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("../assets/background.jpg");
    background-position: center;
    background-size: cover;
    font-size: 5rem;
    display: grid;
    place-items: center;
    font-family: "WhiteStorm";
    color: white;
}

#download-container {
    width: 100dvw;
    height: 100dvh;
    box-sizing: border-box;
    padding: 1rem;
    background-color: #231709;
}

#download-container #title {
    font-size: 3.5rem;
    font-family: "WhiteStorm";
    color: white;
}

#download-container p {
    font-size: 1.5rem;
    color: white;
}

#download-container #download-location-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 10rem;
}

#changelog-wrapper {
    display: flex;
    justify-content: center;
}

#home {
    height: 100dvh;
    display: grid;
    place-items: center;
}

#home>div {
    display: grid;
    place-items: center;
}

button {
    font-size: 17px;
    color: white;
    background: #ad5389;
    background: linear-gradient(0deg, rgba(77, 54, 208, 1) 0%, rgba(132, 116, 254, 1) 100%);
    border: none;
    box-shadow: 0 0.7em 1.5em -0.5em #4d36d0be;
    border-radius: 20em;
}

button:hover {
    cursor: pointer;
    box-shadow: 0 0.5em 1.5em -0.5em #4d36d0be;
}

span {
    color: #686868;
}
</style>


<script setup>
import LanguageSwitcher from './language-switcher.vue'
import DownloadLocation from './download-location.vue'
import Update from './update.vue'
import { onMounted, ref } from 'vue';
import { BaseDirectory, exists, readTextFile } from '@tauri-apps/api/fs';
import { invoke } from '@tauri-apps/api';
import { join } from '@tauri-apps/api/path';
import { fetch } from '@tauri-apps/api/http';
import { appWindow, LogicalSize } from '@tauri-apps/api/window';

const state = ref("splash")

const location = ref("")

async function init() {

    if (exists("version", { dir: BaseDirectory.Resource })) {

        const version = JSON.parse(await readTextFile("version", { dir: BaseDirectory.Resource }))
        const gameExec = await join(version["location"], "game", "War of Pirates.exe")

        if (await invoke("exists", { path: gameExec })) {
            const latest = await fetch('https://warofpirates.com.tr/version', { method: 'GET', })

            if (version["version"] == latest.data) {
                stateStart(gameExec)
            } else {
                stateUpdate(version["location"])
            }

        } else {
            stateDownload()
        }

    } else {
        stateDownload()
    }
}

async function stateDownload() {
    state.value = "download"
    expand()
}

async function stateUpdate(gameLocation) {
    state.value = "update"
    expand()
    location.value = gameLocation
}

async function expand() {
    await appWindow.setSize(new LogicalSize(800, 600))
    await appWindow.setResizable(true)
    await appWindow.setDecorations(true)
    await appWindow.setSkipTaskbar(false)
    await appWindow.center()
}

function stateStart(gameExec) {
    invoke("run", { path: gameExec })
    appWindow.close()
}



onMounted(() => {
    setTimeout(() => {
        init()
    }, 2000);
})
</script>