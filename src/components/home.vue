<template>
    <div id="home">
        <div>
            <h1>War of Pirates</h1>
            <button @click="buttonAction()">{{ buttonLabel }}</button>
        </div>
    </div>
</template>

<style scoped>
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
import { onMounted, ref } from 'vue';
import { BaseDirectory, exists, readTextFile } from '@tauri-apps/api/fs';
import { useRouter } from 'vue-router'
import { invoke, path } from '@tauri-apps/api';
import { join } from '@tauri-apps/api/path';
import { fetch } from '@tauri-apps/api/http';
import { open } from '@tauri-apps/api/shell';

const router = useRouter()

let buttonAction = ref(() => { })
let buttonLabel = ref("Donwload")

async function init() {

    if (exists("version", { dir: BaseDirectory.Resource })) {

        const version = JSON.parse(await readTextFile("version", { dir: BaseDirectory.Resource }))
        const gameExec = await join(version["location"], "game", "War of Pirates.exe")

        if (await invoke("exists", { path: gameExec })) {
            const latest = await fetch('https://warofpirates.com.tr/version', { method: 'GET', })

            if (version["version"] == latest.data) {
                console.log("latest")
                console.log(latest)
                stateStart(gameExec)
            } else {
                stateUpdate(version["location"])
            }

            console.log("5")
        } else {
            console.log("2")
            stateDownload()
        }

    } else {
        console.log("3")
        stateDownload()
    }
}

function stateDownload() {
    buttonAction.value = () => router.push("/download-options")
    buttonLabel.value = "Download"
}

function stateUpdate(gameLocation) {
    buttonAction.value = () => {
        localStorage.setItem("download-location", gameLocation)
        router.push("/download/update")
    }
    buttonLabel.value = "Update"
}

function stateStart(gameExec) {
    buttonAction.value = () => invoke("run", { path: gameExec })
    buttonLabel.value = "Start"
}



onMounted(() => {
    init()
})
</script>