<template>
    <div id="download-options-page">
        <h1>Download Options</h1>
        <div id="options-wrapper">
            <div id="options">
                <div>Download Location</div>
                <div id="download-input">
                    <input v-model="path" type="text" id="location-input">
                    <button @click="selectDir()" title="Browse">
                        <svg viewBox="0 0 24 24" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M1 5C1 3.34315 2.34315 2 4 2H8.55848C9.84977 2 10.9962 2.82629 11.4045 4.05132L11.7208 5H20C21.1046 5 22 5.89543 22 7V9.00961C23.1475 9.12163 23.9808 10.196 23.7695 11.3578L22.1332 20.3578C21.9603 21.3087 21.132 22 20.1654 22H3C1.89543 22 1 21.1046 1 20V5ZM20 9V7H11.7208C10.8599 7 10.0956 6.44914 9.82339 5.63246L9.50716 4.68377C9.37105 4.27543 8.98891 4 8.55848 4H4C3.44772 4 3 4.44772 3 5V12.2709L3.35429 10.588C3.54913 9.66249 4.36562 9 5.31139 9H20ZM3.36634 20C3.41777 19.9109 3.4562 19.8122 3.47855 19.706L5.31139 11L21 11H21.8018L20.1654 20L3.36634 20Z"
                                fill="#fff" />
                        </svg>
                    </button>
                </div>
                <div id="download-button-wrapper">
                    <button @click="continueToDownload()">Continue</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { open } from '@tauri-apps/api/dialog';
import { join } from '@tauri-apps/api/path';
import { useRouter } from 'vue-router';

let path = ref("C:\\Games\\WarOfPirates")
let createShortcut = ref(true)

const router = useRouter()

async function selectDir() {
    // Open a selection dialog for directories
    const selected = await open({
        directory: true,
        multiple: false,
        title: "Select Download Location"
    });

    if (Array.isArray(selected)) {
        // user selected multiple directories
    } else if (selected === null) {
        // user cancelled the selection
    } else {
        path.value = await join(selected, "WarOfPirates")
    }
}

async function continueToDownload() {
    localStorage.setItem("download-location", path.value)
    router.push("/download/new");
}
</script>

<style>
#download-options-page {
    height: 100dvh;
    display: flex;
    flex-direction: column;
}

#options-wrapper {
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
}

#download-input {
    width: 70vw;
    max-width: 900px;
    display: flex;
    align-items: center;
}

#location-input {
    height: 2rem;
    flex-grow: 1;
}


button {
    align-items: center;
    font-size: 17px;
    background: #ad5389;
    background: linear-gradient(0deg, rgba(77, 54, 208, 1) 0%, rgba(132, 116, 254, 1) 100%);
    border: none;
    box-shadow: 0 0.7em 1.5em -0.5em #4d36d0be;
    border-radius: 15px;
    height: 2.4rem;
    padding: .4rem;
    margin-left: .4rem;
    color: white;

}

button:hover {
    cursor: pointer;
    box-shadow: 0 0.5em 1.5em -0.5em #4d36d0be;
}

svg {
    height: 100%;
}

#download-button-wrapper {
    width: 70vw;
    max-width: 900px;
    display: flex;
    justify-content: end;
    margin-top: 5rem;
}
</style>