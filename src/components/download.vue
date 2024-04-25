<template>
    <div id="download-page">
        <div>
            <h1>{{ status }}</h1>
            <div id="progress" v-if="progressVisible">
                <div id="progress-bar">
                    <div></div>
                </div>
                <span>{{ progress }}</span>
            </div>
            <div id="finished-container" v-if="finished">
                <p>{{$t('download.finishedMessage')}}</p>
                <div id="actions">
                    <button class="outlined" @click="appWindow.close()">{{$t('download.exit')}}</button>
                    <button class="primary" @click="play()">{{$t('download.play')}}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { invoke } from '@tauri-apps/api';
import { appWindow, LogicalSize } from '@tauri-apps/api/window';
import { onMounted, ref } from 'vue';
import { fetch } from '@tauri-apps/api/http';
import { BaseDirectory, writeTextFile } from '@tauri-apps/api/fs';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

const router = useRouter()
const {t} = useI18n()

let progress = ref("0%")
let status = ref(t('download.downloading'))
let progressVisible = ref(true)
let finished = ref(false)


async function play() {
    appWindow.setSize(new LogicalSize(500, 280))
    appWindow.setDecorations(false)
    appWindow.setResizable(false)
    appWindow.setSkipTaskbar(true)

    router.push('/')
}

async function listenProgress() {

    await appWindow.listen('download-progress', (event) => {
        progress.value = event.payload.toFixed(2) + "%"
    })

    await appWindow.listen('unpacking', (event) => {
        status.value = t('download.unpacking')
        progressVisible.value = false
    })

    await appWindow.listen('unpack-finished', (event) => {
        fetch('https://warofpirates.com.tr/version', {
            method: 'GET',
        }).then(res => {
            const version = res.data
            const location = localStorage.getItem("download-location")

            writeTextFile("version", JSON.stringify({ location, version }, null, 4), { dir: BaseDirectory.Resource })

            localStorage.setItem("download-location", "")

            status.value = t('download.finished')
            finished.value = true
        })

    })
}

onMounted(() => {

    listenProgress()

    setTimeout(() => {
        const folder = localStorage.getItem("download-location")
        if (folder) {
            invoke("download_file", { "gameFolder": folder })
        }
    }, 1000);
})
</script>

<style scoped>
#download-page {
    height: 100dvh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #231709;
    color: white;
    font-family: "WhiteStorm";
    padding: 1rem;
    box-sizing: border-box;
}

h1 {
    font-size: 3rem;
    margin-bottom: .5rem;
}

#progress {
    width: 70dvw;
    max-width: 900px;
    display: flex;
    align-items: center;
    gap: 0.4rem;
}

#progress-bar {
    flex-grow: 1;
    height: 2rem;
    border: 3px solid gray;
    border-radius: 5px;
}

#progress-bar>div {
    height: inherit;
    background-color: rgb(255, 255, 0);
    width: v-bind('progress');
    transition: .5s;
}

#progress span {
    min-width: 5rem;
    font-size: 2.5rem;
}


#finished-container p {
    font-size: 1.5rem;
    font-family: sans-serif;
}

#finished-container #actions {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
}

button {
    font-size: 2rem;
    padding: .2rem 1.5rem;
    border-radius: 15px;
    border: none;
    outline: none;
}

button.outlined {
    background-color: transparent;
    border: 3px solid gray;
    color: gray;
}

button.primary {
    background-color: rgb(255, 255, 0);
    color: #231709;
}
</style>