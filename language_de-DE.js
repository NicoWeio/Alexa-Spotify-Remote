module.exports = {
  translation: {
    WELCOME: "Willkommen bei „Musik-Steuerung“, der Fernbedienung für Spotify. Was möchtest du tun?",
    WELCOME_NO_TOKEN: "Willkommen bei „Musik-Steuerung“, der Fernbedienung für Spotify. Um den Skill zu verwenden, verknüpfe ihn zuerst mit Spotify. Gehe dazu in die Alexa-App und folge den Anweisungen.",
    WELCOME_REPROMPT: "Was möchtest du tun? Wenn du Hilfe brauchst, sage „Hilfe“.",
    HELP: "Hier ist eine kurze Einführung in den Skill „Musik-Steuerung“. Dieser Skill ermöglicht es dir, die Spotify-Wiedergabe zu steuern, auch wenn sie nicht auf dem Alexa-Gerät läuft, zu dem du gerade sprichst. Folgende Funktionen stehen dir zur Verfügung: Wiedergabe auf einem bestimmten Gerät, Pause, Lautstärke ändern, Songs vor und zurück springen, zu einer Stelle im Song springen, Zufallswiedergabe an oder aus schalten. Außerdem kannst du mich fragen, was gerade spielt. Was kann ich nun für dich tun?",
    HELP_REPROMPT: "Falls du weitere Informationen brauchst, schau mal in die Beschreibung des Skills. Wie kann ich dir nun helfen?",
    GOODBYE: "Tschüss!",
    GOODBYE_THANKS: "Tschüss und danke, dass du „Musik-Steuerung“ benutzt.",
    REFLECTOR: "Du hast gerade {{intentName}} ausgelöst",
    FALLBACK: "Ich weiß leider nicht, wie ich dir damit helfen kann. Versuche, deine Anfrage anders zu formulieren.",
    ERROR: "Tut mir leid, das hat nicht funktioniert. Bitte versuche es erneut.",
    ERROR_REPROMPT: "Bitte versuche es erneut. Für weitere Hilfe, schaue in die Skill-Beschreibung in der Alexa-App oder schreibe eine E-Mail an „alexa@nicolaiweitkemper.de“.",

    GET_CURRENTLY_PLAYING: "Es spielt gerade „{{itemName}}“ von „{{artists}}“ auf „{{deviceName}}“.",
    NOTHING_PLAYING: "Gerade wird nichts wiedergegeben.",

    PLAY_SUCCESS: "Okay, ich starte die Wiedergabe.",
    PLAY_ERROR: "Das hat leider nicht geklappt. Vielleicht läuft die Wiedergabe schon?",

    PLAYONDEVICE_SUCCESS: "Okay, spiele auf {{deviceName}}",
    PLAYONDEVICE_NO_MATCH: "Ich habe kein passendes Gerät gefunden. Versuche es bitte noch einmal.",
    PLAYONDEVICE_NO_MATCH_REPROMPT: "Versuche es noch einmal. Ich benötige den Namen des Geräts, auf dem du Musik abspielen möchtest.",

    PAUSE_SUCCESS: "Okay, pausiere.",
    PAUSE_ERROR: "Das hat leider nicht geklappt. Vielleicht ist die Wiedergabe schon pausiert?",

    NEXTSONG_SUCCESS: "Okay, nächster Song.",

    PREVIOUSSONG_SUCCESS: "Okay, vorheriger Song.",

    SETVOLUME_SUCCESS: "Okay, setze Lautstärke auf {{volume}}%.",

    TOGGLESHUFFLE_ON: "Okay, Zufallswiedergabe ist jetzt an.",
    TOGGLESHUFFLE_OFF: "Okay, Zufallswiedergabe ist jetzt aus.",

    SEEK_SUCCESS: "Okay.",

    ERR_NO_TOKEN: "Du hast den Skill noch nicht mit Spotify verknüpft. Öffne einfach die Alexa-App und führe die Kontoverknüpfung durch.",
    ERR_UNKNOWN: "Ich weiß nicht, was schief gelaufen ist.",

    // https://developer.spotify.com/documentation/web-api/reference/object-model/#player-error-object
    ERR_REASON: {
      NO_PREV_TRACK: "Es gibt keinen Track, zu dem ich zurück springen kann.",
      NO_NEXT_TRACK: "Es gibt keinen Track, zu dem ich vor springen kann.",
      // NO_SPECIFIC_TRACK: "The requested track does not exist.",
      ALREADY_PAUSED: "Die Wiedergabe ist bereits pausiert.",
      NOT_PAUSED: "Die Wiedergabe läuft bereits.",
      // NOT_PLAYING_LOCALLY: "The command requires playback on the local device.",
      NOT_PLAYING_TRACK: "Dazu muss zunächst ein Track wiedergegeben werden.",
      NOT_PLAYING_CONTEXT: "Dazu muss zunächst eine Wiedergabeliste abgespielt werden.",
      ENDLESS_CONTEXT: "Auf die aktuelle Wiedergabeliste kann keine Zufallswiedergabe angewandt werden.",
      CONTEXT_DISALLOW: "Das kann ich auf dieser Wiedergabeliste nicht machen.",
      // ALREADY_PLAYING: "The track should not be restarted if the same track and context is already playing, and there is a resume point.",
      // RATE_LIMITED: "The user is rate limited due to too frequent track play, also known as cat-on-the-keyboard spamming.",
      REMOTE_CONTROL_DISALLOW: "Ich kann die aktuelle Wiedergabeliste leider nicht fernsteuern.",
      DEVICE_NOT_CONTROLLABLE: "Ich kann das Gerät leider nicht fernsteuern.",
      VOLUME_CONTROL_DISALLOW: "Ich kann die Lautstärke des aktuellen Geräts leider nicht fernsteuern.",
      NO_ACTIVE_DEVICE: "Dazu wird ein Gerät benötigt, auf dem Spotify aktiv ist.",
      PREMIUM_REQUIRED: "Für diesen Befehl benötigst du leider einen Spotify Premium Account.",
      UNKNOWN: "Hm, das hat leider nicht geklappt. Vielleicht hast du versucht, zum Beispiel die Wiedergabe zu starten, obwohl sie schon läuft.",
    }
  },
};
