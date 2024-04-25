import { createI18n } from 'vue-i18n'

export default createI18n({
    locale: 'tr',
    fallbackLocale: 'en',
    legacy: false,
    messages: {
        en: {
            home: {
                downloadMessage: "Welcome Aboard Captain! Let's Download The Game:",
                updateMessage: "There is a new version of the game! Let's update it."
            },
            download: {
                downloading: "Downloading",
                unpacking: "Unpacking",
                finished: "Finished",
                finishedMessage: "War of Pirates has been successfully installed on your computer.",
                exit: "Exit",
                play: "Play"
            },
            downloadLocation: {
                message: "Select a download location",
                download: "Download"
            },
            update: "Update"
        },
        tr: {
            home: {
                downloadMessage: "Hoşgeldin Kaptan! Hadi Oyunu İndirelim:",
                updateMessage: "Oyunun yeni bir sürümü var! Hemen Güncelle."
            },
            download: {
                downloading: "İndiriliyor",
                unpacking: "Yükleniyor",
                finished: "Tamamlandı",
                finishedMessage: "War of Pirates bilgisayarınıza başarıyla yüklendi.",
                exit: "Çıkış",
                play: "Oyna"
            },
            downloadLocation: {
                message: "İndirme konumunu seçin",
                download: "İndir"
            },
            update: "Güncelle"
        },
        pt: {
            home: {
                downloadMessage: "Bem-vindo a bordo, Capitão! Vamos baixar o jogo:",
                updateMessage: "Há uma nova versão do jogo! Vamos atualizá-lo."
            },
            download: {
                downloading: "Baixando",
                unpacking: "Descompactando",
                finished: "Concluído",
                finishedMessage: "War of Pirates foi instalado com sucesso no seu computador.",
                exit: "Sair",
                play: "Jogar"
            },
            downloadLocation: {
                message: "Selecione um local para baixar",
                download: "Baixar"
            },
            update: "Atualizar"
        },
        es: {
            home: {
                downloadMessage: "¡Bienvenido a bordo, Capitán! Descargemos el juego:",
                updateMessage: "¡Hay una nueva versión del juego! Actualicémosla."
            },
            download: {
                downloading: "Descargando",
                unpacking: "Descomprimiendo",
                finished: "Terminado",
                finishedMessage: "War of Pirates se ha instalado correctamente en su computadora.",
                exit: "Salir",
                play: "Jugar"
            },
            downloadLocation: {
                message: "Seleccione una ubicación de descarga",
                download: "Descargar"
            },
            update: "Actualizar"
        },
        fr: {
            home: {
                downloadMessage: "Bienvenue à bord, Capitaine ! Téléchargeons le jeu :",
                updateMessage: "Il y a une nouvelle version du jeu ! Mettons à jour."
            },
            download: {
                downloading: "Téléchargement",
                unpacking: "Décompression",
                finished: "Terminé",
                finishedMessage: "War of Pirates a été installé avec succès sur votre ordinateur.",
                exit: "Quitter",
                play: "Jouer"
            },
            downloadLocation: {
                message: "Sélectionnez un emplacement de téléchargement",
                download: "Télécharger"
            },
            update: "Mettre à jour"
        },
        de: {
            home: {
                downloadMessage: "Willkommen an Bord, Kapitän! Lass uns das Spiel herunterladen:",
                updateMessage: "Es gibt eine neue Version des Spiels! Lass uns updaten."
            },
            download: {
                downloading: "Herunterladen",
                unpacking: "Entpacken",
                finished: "Fertig",
                finishedMessage: "War of Pirates wurde erfolgreich auf Ihrem Computer installiert.",
                exit: "Beenden",
                play: "Spielen"
            },
            downloadLocation: {
                message: "Wählen Sie einen Download-Speicherort",
                download: "Herunterladen"
            },
            update: "Aktualisieren"
        }
    }
})