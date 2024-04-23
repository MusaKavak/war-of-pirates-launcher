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
        </div>
    </div>
</template>

<script setup>
import { invoke } from '@tauri-apps/api';
import { appWindow } from '@tauri-apps/api/window';
import { onMounted, ref } from 'vue';
import { fetch } from '@tauri-apps/api/http';
import { BaseDirectory, writeTextFile } from '@tauri-apps/api/fs';
import { useRouter } from 'vue-router';

const router = useRouter()

let progress = ref("0.0%")
let status = ref("Downloading")
let progressVisible = ref(true)


async function listenProgress() {

    await appWindow.listen('download-progress', (event) => {
        progress.value = event.payload.toFixed(2) + "%"
    })

    await appWindow.listen('unpacking', (event) => {
        status.value = "Unpacking"
        progressVisible.value = false
    })

    await appWindow.listen('unpack-finished', (event) => {
        status.value = "Finished"

        fetch('https://warofpirates.com.tr/version', {
            method: 'GET',
        }).then(res => {
            const version = res.data
            const location = localStorage.getItem("download-location")

            writeTextFile("version", JSON.stringify({ location, version }, null, 4), { dir: BaseDirectory.Resource })

            setTimeout(() => {
                router.push("/")
            }, 1000);
        })

    })
}

onMounted(() => {

    listenProgress()

    setTimeout(() => {
        const folder = localStorage.getItem("download-location")

        console.log("Starting")
        invoke("download_file", { "gameFolder": folder })
    }, 1000);
})
</script>

<style scoped>
#download-page {
    height: 100dvh;
    display: flex;
    align-items: center;
    justify-content: center;
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
    background: linear-gradient(0deg, rgba(75, 54, 208, 1) 0%, rgba(132, 116, 254, 1) 100%);
    width: v-bind('progress');
    transition: .5s;
}

#progress span {
    min-width: 5rem;
    font-size: x-large;
}
</style>