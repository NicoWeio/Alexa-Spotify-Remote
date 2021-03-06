const Alexa = require('ask-sdk-core');
const i18n = require('i18next');

const languageStrings = require('./languages');
const Spotify = require('./spotify').SpotifyClass;
const Helpers = require('./helpers');

// --- getters ---

const GetCurrentlyPlayingIntentHandler = {
  canHandle: Helpers.canHandleIntent('GetCurrentlyPlayingIntent'),
  async handle(handlerInput) {
    let state = (await Spotify(handlerInput).getMyCurrentPlaybackState()).body;
    //TODO handle not playing
    if (state.item)
      return handlerInput.responseBuilder
        .speak(handlerInput.t('GET_CURRENTLY_PLAYING', {
          artists: Helpers.escapeContent(state.item.artists.map(a => a.name).join(', ')),
          deviceName: Helpers.escapeContent(state.device.name),
          itemName: Helpers.escapeContent(state.item.name),
        }))
        .getResponse();
    else
      return handlerInput.responseBuilder
        .speak(handlerInput.t('NOTHING_PLAYING'))
        .getResponse();
  }
};

// --- play/pause ---

const PlayIntentHandler = {
  canHandle: Helpers.canHandleIntent('PlayIntent'),
  async handle(handlerInput) {
    try {
      await Spotify(handlerInput).play();
      return handlerInput.responseBuilder
        .speak(handlerInput.t('PLAY_SUCCESS'))
        .getResponse();
    } catch (e) {
      if (e.statusCode === 403 && ['ALREADY_PLAYING', 'UNKNOWN'].includes(e.reason))
        return handlerInput.responseBuilder
          .speak(handlerInput.t('PLAY_ERROR'))
          .getResponse();
      else throw e;
    }
  }
};

const PlayOnDeviceIntentHandler = {
  canHandle: Helpers.canHandleIntent('PlayOnDeviceIntent'),
  async handle(handlerInput) {
    const Fuse = require('fuse.js');
    let deviceQuery = handlerInput.requestEnvelope.request.intent.slots.Device.value;
    let s = Spotify(handlerInput);
    const devices = (await s.getMyDevices()).body.devices;

    if (devices.length === 0) {
      return handlerInput.responseBuilder
        .speak(handlerInput.t('ERR_REASON.NO_ACTIVE_DEVICE'))
        .getResponse();
    }

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
        .speak(handlerInput.t('PLAYONDEVICE_SUCCESS', {
          deviceName: Helpers.escapeContent(selectedDevice.name),
        }))
        .getResponse();
    } else {
      return handlerInput.responseBuilder
        .speak(handlerInput.t('PLAYONDEVICE_NO_MATCH'))
        .reprompt(handlerInput.t('PLAYONDEVICE_NO_MATCH_REPROMPT'))
        .getResponse();
    }
  }
};

const PauseIntentHandler = {
  canHandle: Helpers.canHandleIntent('AMAZON.PauseIntent'),
  async handle(handlerInput) {
    try {
      await Spotify(handlerInput).pause();
      return handlerInput.responseBuilder
        .speak(handlerInput.t('PAUSE_SUCCESS'))
        .getResponse();
    } catch (e) {
      if (e.statusCode === 403 && ['ALREADY_PAUSED', 'UNKNOWN'].includes(e.reason))
        return handlerInput.responseBuilder
          .speak(handlerInput.t('PAUSE_ERROR'))
          .getResponse();
      else throw e;
    }
  }
};

// --- skip ---

const NextSongIntentHandler = {
  canHandle: Helpers.canHandleIntent('AMAZON.NextIntent'),
  async handle(handlerInput) {
    await Spotify(handlerInput).skipToNext();
    return handlerInput.responseBuilder
      .speak(handlerInput.t('NEXTSONG_SUCCESS'))
      .getResponse();
  }
};

const PreviousSongIntentHandler = {
  canHandle: Helpers.canHandleIntent('AMAZON.PreviousIntent'),
  async handle(handlerInput) {
    await Spotify(handlerInput).skipToPrevious();
    return handlerInput.responseBuilder
      .speak(handlerInput.t('PREVIOUSSONG_SUCCESS'))
      .getResponse();
  }
};

const JumpToContextStartEndIntentHandlerFactory = (toStart) => ({
  canHandle: Helpers.canHandleIntent(toStart ? 'JumpToContextStartIntent' : 'JumpToContextEndIntent'),
  async handle(handlerInput) {
    let state = (await Spotify(handlerInput).getMyCurrentPlaybackState()).body;
    // don't crash on private sessions / radio / …
    if (!state.context) state.context = {
      type: state.context,
    };
    switch (state.context.type) {
      case 'album':
      case 'playlist':
        {
          let id = state.context.uri.split(':').pop();
          let position = toStart ? 0 : ((await Spotify(handlerInput)[state.context.type === 'album' ? 'getAlbumTracks' : 'getPlaylistTracks'](id, {
            limit: 1 // we only care about the number of tracks
          })).body.total - 1);
          await Spotify(handlerInput).play({
            context_uri: state.context.uri,
            offset: {
              position,
            },
          });
          return handlerInput.responseBuilder
            .speak(handlerInput.t(toStart ?
              (state.context.type === 'playlist' ?
                "Okay, springe zum Anfang der Playlist." :
                "Okay, springe zum Anfang des Albums.") :
              (state.context.type === 'playlist' ?
                "Okay, springe zum Ende der Playlist." :
                "Okay, springe zum Ende des Albums.")
            ))
            .getResponse();
        }
      default:
        {
          console.log("Unsupported context type:", state.context.type);
          return handlerInput.responseBuilder
            .speak(handlerInput.t("Das funktioniert mit deiner aktuellen Wiedergabe nicht."))
            .getResponse();
        }
    }
  }
});

// --- setters/toggles ---

const SetVolumeIntentHandler = {
  canHandle: Helpers.canHandleIntent('SetVolumeIntent'),
  async handle(handlerInput) {
    let volume = handlerInput.requestEnvelope.request.intent.slots.Volume.value;
    await Spotify(handlerInput).setVolume(volume);
    return handlerInput.responseBuilder
      .speak(handlerInput.t('SETVOLUME_SUCCESS', {
        volume,
      }))
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
      .speak(handlerInput.t(state ? 'TOGGLESHUFFLE_ON' : 'TOGGLESHUFFLE_OFF'))
      .getResponse();
  }
};

// --- misc. ---

const SeekIntentHandler = {
  canHandle: Helpers.canHandleIntent('SeekIntent'),
  async handle(handlerInput) {
    const IsoDuration = require('iso8601-duration');
    let newIndex = handlerInput.requestEnvelope.request.intent.slots.Time.value;
    let millis = IsoDuration.toSeconds(IsoDuration.parse(newIndex)) * 1000;
    await Spotify(handlerInput).seek(millis);
    return handlerInput.responseBuilder
      .speak(handlerInput.t('SEEK_SUCCESS'))
      .getResponse();
  }
};

// --- general handlers ---

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
  },
  handle(handlerInput) {
    console.log('LaunchRequest');
    try {
      Spotify(handlerInput); //throws NoTokenError
      return handlerInput.responseBuilder
        .speak(handlerInput.t('WELCOME'))
        .reprompt(handlerInput.t('WELCOME_REPROMPT'))
        .getResponse();
    } catch (e) {
      if (e.name !== 'NoTokenError') throw e;
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
      .speak(handlerInput.t((Math.random() > 0.2) ? 'GOODBYE' : 'GOODBYE_THANKS'))
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
    console.log('~~~~ Session ended: ', handlerInput.requestEnvelope);
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

// --- error handlers ----


const NoTokenErrorHandler = {
  canHandle(handlerInput, error) {
    return error && error.name === 'NoTokenError';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(handlerInput.t('ERR_NO_TOKEN'))
      .withLinkAccountCard()
      .getResponse();
  }
};

const ReasonedPlayerErrorHandler = {
  canHandle(handlerInput, error) {
    return error && error.reason;
  },
  handle(handlerInput, error) {
    // TODO bekomme von dem upstream-Paket gar keinen response-body zurück…
    // Bis es dort behoben ist, auf diesen Fork gewechselt:
    // https://github.com/nailujx86/spotify-web-api-node
    return handlerInput.responseBuilder
      .speak(handlerInput.t('ERR_REASON.' + error.reason) || handlerInput.t('ERR_UNKNOWN'))
      .getResponse();
  }
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.warn('~~~~ Error handled', error);

    return handlerInput.responseBuilder
      .speak(handlerInput.t('ERROR'))
      .reprompt(handlerInput.t('ERROR_REPROMPT'))
      .getResponse();
  }
};

// --- interceptors ---

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

// ---------

exports.skillBuilder = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    // --- getters ---
    GetCurrentlyPlayingIntentHandler,
    // --- play/pause ---
    PlayIntentHandler,
    PlayOnDeviceIntentHandler,
    PauseIntentHandler,
    // --- skip ---
    NextSongIntentHandler,
    PreviousSongIntentHandler,
    JumpToContextStartEndIntentHandlerFactory(true), // JumpToContextStartIntent
    JumpToContextStartEndIntentHandlerFactory(false), // JumpToContextEndIntent
    // --- setters/toggles ---
    SetVolumeIntentHandler,
    ToggleShuffleIntentHandler,
    // --- misc. ---
    SeekIntentHandler,
    // --- general handlers ---
    LaunchRequestHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    FallbackIntentHandler,
    SessionEndedRequestHandler,
    IntentReflectorHandler)
  .addErrorHandlers(
    NoTokenErrorHandler,
    ReasonedPlayerErrorHandler,
    ErrorHandler)
  .addRequestInterceptors(LocalisationRequestInterceptor)
  .withApiClient(new Alexa.DefaultApiClient())
  .withCustomUserAgent('sample/hello-world/v1.2');
