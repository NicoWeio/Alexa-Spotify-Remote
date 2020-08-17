module.exports = {
  en: {
    translation: {

    }
  },
  de: {
    translation: {
      WELCOME: "Willkommen bei „Fernbedienung für Spotify“. Was möchtest du tun?",
      WELCOME_NO_TOKEN: "Willkommen bei „Fernbedienung für Spotify“. Um den Skill zu verwenden, verknüpfe ihn zuerst mit Spotify. Gehe dazu in die Alexa-App und folge den Anweisungen.",
      WELCOME_REPROMPT: "Was möchtest du tun? Wenn du Hilfe brauchst, sage „Hilfe“.",
      HELP: 'Hier ist eine kurze Einführung in den Skill „Fernbedienung für Spotify“. Dieser Skill ermöglicht es dir, die Spotify-Wiedergabe zu steuern, auch wenn sie nicht auf dem Alexa-Gerät läuft, zu dem du gerade sprichst. Folgende Funktionen stehen dir zur Verfügung: Wiedergabe auf einem bestimmten Gerät, Pause, Lautstärke ändern, Songs vor und zurück springen, zu einer Stelle im Song springen, Zufallswiedergabe an oder aus schalten. Außerdem kannst du mich fragen, was gerade spielt. Was kann ich nun für dich tun?',
      HELP_REPROMPT: "Falls du weitere Informationen brauchst, schau mal in die Beschreibung des Skills. Wie kann ich dir nun helfen?",
      GOODBYE: "Tschüss!",
      REFLECTOR: "Du hast gerade {{intentName}} ausgelöst",
      FALLBACK: "Ich weiß leider nicht, wie ich dir damit helfen kann. Versuche, deine Anfrage anders zu formulieren.",
      ERROR: "Tut mir leid, das hat nicht funktioniert. Bitte versuche es erneut.",
      ERROR_REPROMPT: "Bitte versuche es erneut. Für weitere Hilfe, schaue in die Skill-Beschreibung in der Alexa-App oder schreibe eine E-Mail an „kontakt@nicolaiweitkemper.de“.",

      // https://developer.spotify.com/documentation/web-api/reference/object-model/#player-error-object
      ERR_REASON_NO_PREV_TRACK: "Es gibt keinen Track, zu dem ich zurück springen kann.",
      ERR_REASON_NO_NEXT_TRACK: "Es gibt keinen Track, zu dem ich vor springen kann.",
      // ERR_REASON_NO_SPECIFIC_TRACK: "The requested track does not exist.",
      ERR_REASON_ALREADY_PAUSED: "Die Wiedergabe ist bereits pausiert.",
      ERR_REASON_NOT_PAUSED: "Die Wiedergabe läuft bereits.",
      // ERR_REASON_NOT_PLAYING_LOCALLY: "The command requires playback on the local device.",
      ERR_REASON_NOT_PLAYING_TRACK: "Dazu muss zunächst ein Track wiedergegeben werden.",
      ERR_REASON_NOT_PLAYING_CONTEXT: "Dazu muss zunächst eine Wiedergabeliste abgespielt werden.",
      ERR_REASON_ENDLESS_CONTEXT: "Auf die aktuelle Wiedergabeliste kann keine Zufallswiedergabe angewandt werden.",
      ERR_REASON_CONTEXT_DISALLOW: "Das kann ich auf dieser Wiedergabeliste nicht machen.",
      // ERR_REASON_ALREADY_PLAYING: "The track should not be restarted if the same track and context is already playing, and there is a resume point.",
      // ERR_REASON_RATE_LIMITED: "The user is rate limited due to too frequent track play, also known as cat-on-the-keyboard spamming.",
      ERR_REASON_REMOTE_CONTROL_DISALLOW: "Ich kann die aktuelle Wiedergabeliste leider nicht fernsteuern.",
      ERR_REASON_DEVICE_NOT_CONTROLLABLE: "Ich kann das Gerät leider nicht fernsteuern.",
      ERR_REASON_VOLUME_CONTROL_DISALLOW: "Ich kann die Lautstärke des aktuellen Geräts leider nicht fernsteuern.",
      ERR_REASON_NO_ACTIVE_DEVICE: "Dazu wird ein Gerät benötigt, auf dem Spotify aktiv ist.",
      ERR_REASON_PREMIUM_REQUIRED: "Für diesen Befehl benötigst du leider einen Spotify Premium Account.",
      ERR_REASON_UNKNOWN: "Hm, das hat leider nicht geklappt. Vielleicht hast du versucht, zum Beispiel die Wiedergabe zu starten, obwohl sie schon läuft.",

      TODO: "TODO. Dieser String wurde noch nicht geschrieben!",
    }
  },
};
