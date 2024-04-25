<template>
    <div class="language-switcher">
        <div v-for="(lang, index) in supportedLanguages" :key="index" @click="switchLanguage(lang.code)"
            :class="{ active: lang.code === currentLocale }" class="language-button">
            <img :src="lang.icon" :alt="lang.name" />
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n'

const { locale } = useI18n({ useScope: 'global' })

const supportedLanguages = [
    { code: 'tr', name: 'Türkçe', icon: '/tr.svg' },
    { code: 'en', name: 'English', icon: '/us.svg' },
    { code: 'pt', name: 'Português', icon: '/pt.svg' },
    { code: 'es', name: 'Español', icon: '/es.svg' },
    { code: 'fr', name: 'Français', icon: '/fr.svg' },
    { code: 'de', name: 'Deutsch', icon: '/de.svg' }
]

let currentLocale = ref(locale.value)

const switchLanguage = (newLocale) => {
    locale.value = newLocale
    currentLocale.value = newLocale
}
</script>

<style scoped>
.language-switcher {
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    z-index: 999;
}

.language-button {
    margin-left: 5px;
    cursor: pointer;
    opacity: 0.4;
}

.language-button.active {
    opacity: 1;
}

.language-button img {
    width: 24px;
    height: 24px;
}
</style>