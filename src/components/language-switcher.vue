<template>
    <div class="language-switcher">
    <div
        v-for="(lang, index) in supportedLanguages"
        :key="index"
        @click="switchLanguage(lang.code)"
        :class="{ active: lang.code === currentLocale }"
        class="language-button"
    >
        <img :src="lang.icon" :alt="lang.name" />
    </div>
    </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { locale } = useI18n({ useScope: 'global' })

const supportedLanguages = [
    { code: 'tr', name: 'Türkçe', icon: 'src/assets/tr.svg' },
    { code: 'en', name: 'English', icon: 'src/assets/us.svg' },
    { code: 'pt', name: 'Português', icon: 'src/assets/pt.svg' },
    { code: 'es', name: 'Español', icon: 'src/assets/es.svg' },
    { code: 'fr', name: 'Français', icon: 'src/assets/fr.svg' },
    { code: 'de', name: 'Deutsch', icon: 'src/assets/de.svg' }
]

const currentLocale = locale.value

const switchLanguage = (newLocale) => {
    locale.value = newLocale
    currentLocale = newLocale
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
    opacity: 0.6;
}

.language-button.active {
    opacity: 1;   
}

.language-button img {
    width: 24px;
    height: 24px;
}
</style>