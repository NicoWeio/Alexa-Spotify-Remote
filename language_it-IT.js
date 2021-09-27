module.exports = {
  translation: {
    WELCOME: "Benvenuto in “Playback control”, il telecomando per Spotify Connect. Cosa vorresti fare?",
    WELCOME_NO_TOKEN: "Benvenuto in “Playback control”, il telecomando per Spotify Connect. Per usare questa skill, è necessario collegare il tuo account Spotify, ti basta aprire l'app Alexa e seguire le istruzioni.",
    WELCOME_REPROMPT: "Cosa vorresti fare? Se ti serve aiuto, basta dire “aiuto”.",
    HELP: "Ecco una piccola introduzione alle funzionalità di questa skill. Permette di controllare la riproduzione di Spotify, anche se non c'è nulla che sta suonando sul dispositivo a cui stai parlando. Sono disponibili le seguenti funzioni: Riproduzione su uno specifico dispositivo, play, pausa, cambio del volume, brano precedente o successivo, avanti e indietro, traccia in riproduzione e riproduzione casuale. Puoi anche chiedermi che brano sto riproducendo. Come posso aiutarti ora?",
    HELP_REPROMPT: "Se ti serve altro aiuto, controlla la descrizione della skill nell'app Alexa. Come posso aiutarti ora?",
    GOODBYE: "Alla prossima!",
    GOODBYE_THANKS: "Alla prossima, grazie per aver usato “Playback control”.",
    REFLECTOR: "Hai appena invocato {{intentName}}.",
    FALLBACK: "Non so come aiutarti, prova a riformulare la richiesta",
    ERROR: "Mi dispiace, non ha funzionato. Prova di nuovo.",
    ERROR_REPROMPT: "Riprova. Se ti serve altro aiuto, controlla la descrizione della skill nell'app Alexa o scrivi una mail a “alexa@nicolaiweitkemper.de”.",

    GET_CURRENTLY_PLAYING: "È “{{itemName}}” di “{{artists}}”, in riproduzione su “{{deviceName}}”.",
    NOTHING_PLAYING: "Non c'è musica in riproduzione.",

    PLAY_SUCCESS: "Ok, inizio la riproduzione.",
    PLAY_ERROR: "Qualcosa non ha funzionato. Forse qualcosa è già in riproduzione?",

    PLAYONDEVICE_SUCCESS: "Ok, sto riproducendo su {{deviceName}}",
    PLAYONDEVICE_NO_MATCH: "Non ho trovato il dispositivo richiesto, riprova.",
    PLAYONDEVICE_NO_MATCH_REPROMPT: "Riprova. Dimmi il nome del dispositivo su cui vuoi iniziare la riproduzione.",

    PAUSE_SUCCESS: "Ok, metto in pausa.",
    PAUSE_ERROR: "Qualcosa non ha funzionato. Forse la musica è già in pausa?",

    NEXTSONG_SUCCESS: "Ok, successivo.",

    PREVIOUSSONG_SUCCESS: "Ok, precendente.",

    SETVOLUME_SUCCESS: "Ok, imposto il volume al {{volume}}%.",

    TOGGLESHUFFLE_ON: "Ok, riproduzione casuale attiva.",
    TOGGLESHUFFLE_OFF: "Ok, riproduzione casuale disattiva.",

    SEEK_SUCCESS: "Okay.",

    ERR_NO_TOKEN: "Non hai ancora collegato questa skill al tuo account Spotify. Per farlo, apri l'app Alexa e segui le istruzioni.",
    ERR_UNKNOWN: "Errore, riprova più tardi.",

    // https://developer.spotify.com/documentation/web-api/reference/object-model/#player-error-object
    ERR_REASON: {
      NO_PREV_TRACK: "Questo comando richiede una traccia precendente, ma non ce n'è nessuna nella playlist.",
      NO_NEXT_TRACK: "Questo comando richiede una traccia successiva, ma non ce n'è nessuna disponibile nella playlist.",
      // NO_SPECIFIC_TRACK: "La traccia richiesta non esiste.",
      ALREADY_PAUSED: "Questo comando richiede che la musica non sia già in pausa.",
      NOT_PAUSED: "Questo comando richiede che la musica sia in pausa.",
      // NOT_PLAYING_LOCALLY: "Questo comando richiede della musica in riproduzione su questo dispositivo.",
      NOT_PLAYING_TRACK: "Questo comando richiede una traccia attualmente in riproduzione.",
      NOT_PLAYING_CONTEXT: "Questo comando richiede che una playlist sia attualmente in riproduzione.",
      ENDLESS_CONTEXT: "La riproduzione casuale non può essere attivata su una playlist senza fine.",
      CONTEXT_DISALLOW: "Non è stato possibile eseguire questo comando.",
      // ALREADY_PLAYING: "La traccia non dovrebbe essere ricominciata da capo se la stessa traccia e la stessa playlist sono già in riproduzione e se c'è un punto di ripresa.",
      // RATE_LIMITED: "Sei al momento limitato per un numero eccessivo di richieste.",
      REMOTE_CONTROL_DISALLOW: "La riproduzione non può essere controllata.",
      DEVICE_NOT_CONTROLLABLE: "Non è possibile controllare questo dispositivo da remoto.",
      VOLUME_CONTROL_DISALLOW: "Non è possibile controllare il volume di questo dispositivo.",
      NO_ACTIVE_DEVICE: "Non c'è nessun dispositivo disponibile su cui eseguire questo comando.",
      PREMIUM_REQUIRED: "Sfortunatamente questa richiesta è disponibile solo per gli utenti Spotify premium.",
      UNKNOWN: "Hm, qualcosa è andato storto. Forse hai provato a iniziare la riproduzione quando stavo già riproducendo della musica.",
    }
  },
};
