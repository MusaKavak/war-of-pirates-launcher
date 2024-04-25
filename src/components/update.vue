<template>
    <div id="changelog-container">
        <div id="changelog-card" v-html="markdownHTML"></div>
        <div id="download-button-wrapper">
            <button @click="update()" id="download-button">{{ $t('update') }}</button>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { fetch, ResponseType } from '@tauri-apps/api/http';
import { marked } from 'marked';
import { onMounted } from 'vue';
import { ref } from 'vue';

const props = defineProps({
    location: {
        type: String,
        required: true
    }
})

const router = useRouter()

const markdownHTML = ref('')

async function getChangelog() {
    const changelogStr = await fetch('https://warofpirates.com.tr/changelog', { method: 'GET', responseType: ResponseType.Text })

    if (changelogStr?.data) {
        markdownHTML.value = await marked(changelogStr.data)
    }
}

function update() {
    localStorage.setItem("download-location", props.location)
    router.push("/download/update");
}

onMounted(() => {
    getChangelog()
})

</script>

<style scoped>
#changelog-container {
    width: 80%;
    max-width: 900px;
    color: white;
}

#changelog-container>div {
    width: 100%;
}

#changelog-card {
    height: 50vh;
    background-color: #110b04;
    padding: 0 1rem;
    overflow: auto;
}
</style>