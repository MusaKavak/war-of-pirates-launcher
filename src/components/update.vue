<template>
    <div id="changelog-container">
        <div id="changelog-card"></div>
        <div id="download-button-wrapper">
            <button @click="update()" id="download-button">Update</button>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const props = defineProps({
    location: {
        type: String,
        required: true
    }
})

const router = useRouter()

function update() {
    localStorage.setItem("download-location", props.location)
    router.push("/download/update");
}

</script>

<style scoped>
#changelog-container {
    width: 100%;
    max-width: 900px;
    color: white;
}

#changelog-container>div {
    width: 100%;
}

#changelog-card {
    height: 50vh;
    background-color: #110b04;
}
</style>