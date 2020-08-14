const Alexa = require('ask-sdk-core');
const i18n = require('i18next');

const languageStrings = require('./languageStrings');
const Spotify = require('./spotify').SpotifyClass;
const Helpers = require('./helpers');

const NextSongIntentHandler = {
  canHandle: Helpers.canHandleIntent('AMAZON.NextIntent'),
  async handle(handlerInput) {
    await Spotify(handlerInput).nextSong();
    return handlerInput.responseBuilder
      .speak('Okay, nächster Song.')
      .getResponse();
  }
};

const PauseIntentHandler = {
  canHandle: Helpers.canHandleIntent('AMAZON.PauseIntent'),
  async handle(handlerInput) {
    await Spotify(handlerInput).pause();
    return handlerInput.responseBuilder
      .speak('Okay, pausiere.')
      .getResponse();
  }
};

const Fuse = require('fuse.js');
const PlayOnDeviceIntentHandler = {
  canHandle: Helpers.canHandleIntent('PlayOnDeviceIntent'),
  async handle(handlerInput) {
    let deviceQuery = handlerInput.requestEnvelope.request.intent.slots.Device.value;
    let s = Spotify(handlerInput);
    const devices = (await s.getMyDevices()).body.devices;
    const results = (new Fuse(devices, {
      keys: ['name'],
      threshold: 0.4, //TODO
    })).search(deviceQuery);

    if (results.length) {
      let selectedDevice = results[0].item;

      await Spotify(handlerInput).transferMyPlayback({
        deviceIds: [selectedDevice.id],
        play: true
      });

      return handlerInput.responseBuilder
        .speak(`Okay, spiele auf ${Helpers.escapeContent(selectedDevice.name)}`)
        .getResponse();
    } else {
      return handlerInput.responseBuilder
        .speak('Ich habe kein passendes Gerät gefunden. Versuche es bitte noch einmal.')
        .reprompt('Versuche es noch einmal. Ich benötige den Namen des Geräts, auf dem du Musik abspielen möchtest.')
        .getResponse();
    }
  }
};

const PreviousSongIntentHandler = {
  canHandle: Helpers.canHandleIntent('AMAZON.PreviousIntent'),
  async handle(handlerInput) {
    await Spotify(handlerInput).previousSong();
    return handlerInput.responseBuilder
      .speak('Okay, vorheriger Song.')
      .getResponse();
  }
};

const SeekIntentHandler = {
  canHandle: Helpers.canHandleIntent('SeekIntent'),
  async handle(handlerInput) {
    const IsoDuration = require('iso8601-duration');
    let newIndex = handlerInput.requestEnvelope.request.intent.slots.Time.value;
    let millis = IsoDuration.toSeconds(IsoDuration.parse(newIndex)) * 1000;
    await Spotify(handlerInput).seek(millis);
    return handlerInput.responseBuilder
      .speak('Okay.')
      .getResponse();
  }
};

const ToggleShuffleIntentHandler = {
  canHandle: Helpers.canHandleIntent('AMAZON.ShuffleOnIntent', 'AMAZON.ShuffleOffIntent'),
  async handle(handlerInput) {
    let state = Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.ShuffleOnIntent';
    await Spotify(handlerInput).setShuffle({
      state
    });
    return handlerInput.responseBuilder
      .speak(`Okay, Zufallswiedergabe ist jetzt ${state ? 'an' : 'aus'}.`)
      .getResponse();
  }
};

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
  },
  handle(handlerInput) {
    console.log("LaunchRequest");
    try {
      Spotify(handlerInput); //throws NoTokenError
      return handlerInput.responseBuilder
        .speak(handlerInput.t('WELCOME'))
        .reprompt(handlerInput.t('WELCOME_REPROMPT'))
        .getResponse();
    } catch (e) {
      console.warn(e);
      return handlerInput.responseBuilder
        .speak(handlerInput.t('WELCOME_NO_TOKEN'))
        .withLinkAccountCard()
        .getResponse();
    }
  }
};

const HelpIntentHandler = {
  canHandle: Helpers.canHandleIntent('AMAZON.HelpIntent'),
  async handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(handlerInput.t('HELP'))
      .reprompt(handlerInput.t('HELP_REPROMPT'))
      .getResponse();
  }
};

const CancelAndStopIntentHandler = {
  canHandle: Helpers.canHandleIntent('AMAZON.CancelIntent', 'AMAZON.StopIntent'),
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak((Math.random() > 0.2) ? "Tschüss!" : "Tschüss und danke, dass du „Spotify Fernbedienung“ benutzt.")
      .getResponse();
  }
};

const FallbackIntentHandler = {
  canHandle: Helpers.canHandleIntent('AMAZON.FallbackIntent'),
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(handlerInput.t('FALLBACK'))
      .reprompt(handlerInput.t('FALLBACK'))
      .getResponse();
  }
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log("~~~~ Session ended: ", handlerInput.requestEnvelope);
    // Any cleanup logic goes here.
    return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
  }
};

const IntentReflectorHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
  },
  handle(handlerInput) {
    const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
    return handlerInput.responseBuilder
      .speak(handlerInput.t('REFLECTOR', {
        intentName,
      }))
      // .reprompt(handlerInput.t('ANYTHING_ELSE'))
      .getResponse();
  }
};

const NotAuthenticatedErrorHandler = {
  canHandle(handlerInput, error) {
    return error && error.isAxiosError && error.response.status === 403;
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak("Leider ist bei der Kommunikation mit Spotify etwas schief gelaufen. Bitte versuche, den Skill erneut mit Spotify zu verbinden. Öffne dazu die Alexa-App und klicke auf die Karte, die ich dir dorthin gesendet habe.")
      .withLinkAccountCard()
      .getResponse();
  }
};

const NoTokenErrorHandler = {
  canHandle(handlerInput, error) {
    return error && error.name === 'NoTokenError';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak("Du hast den Skill noch nicht mit Spotify verknüpft. Öffne einfach die Alexa-App und führe die Kontoverknüpfung durch.")
      .withLinkAccountCard()
      .getResponse();
  }
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log("~~~~ Error handled", error);

    return handlerInput.responseBuilder
      .speak(handlerInput.t('ERROR'))
      .reprompt(handlerInput.t('ERROR_REPROMPT'))
      .getResponse();
  }
};

// This request interceptor will bind a translation function 't' to the handlerInput
const LocalisationRequestInterceptor = {
  process(handlerInput) {
    i18n.init({
      lng: Alexa.getLocale(handlerInput.requestEnvelope),
      resources: languageStrings
    }).then((t) => {
      handlerInput.t = (...args) => t(...args);
    });
  }
};

exports.skillBuilder = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    NextSongIntentHandler,
    PauseIntentHandler,
    PlayOnDeviceIntentHandler,
    PreviousSongIntentHandler,
    SeekIntentHandler,
    ToggleShuffleIntentHandler,

    LaunchRequestHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    FallbackIntentHandler,
    SessionEndedRequestHandler,
    IntentReflectorHandler)
  .addErrorHandlers(
    NoTokenErrorHandler,
    NotAuthenticatedErrorHandler,
    ErrorHandler)
  .addRequestInterceptors(LocalisationRequestInterceptor)
  .withApiClient(new Alexa.DefaultApiClient())
  .withCustomUserAgent('sample/hello-world/v1.2');
