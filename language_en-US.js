module.exports = {
  translation: {
    WELCOME: "Welcome to “Playback control”, the unofficial remote for Spotify. What would you like to do?",
    WELCOME_NO_TOKEN: "Welcome to “Playback control”, the unofficial remote for Spotify. In order to use this skill, you need to link your Spotify account. To do this just open the Alexa app and follow the instructions.",
    WELCOME_REPROMPT: "What would you like to do? If you need help, just say “help”.",
    HELP: "Here is a short introduction of “Playback control”. It enables you to control playback on Spotify, even if it's not currently playing on an Alexa device. The following features are available: Playback on a specific device, pause, changing volume, skipping to the next or previous song, seeking in the currently playing track, and toggling shuffle. You can also ask me what song is currently playing. How can I help you now?",
    HELP_REPROMPT: "If you need further assistance, take a look at the skill's description in the Alexa app. How can I help you now?",
    GOODBYE: "Goodbye!",
    GOODBYE_THANKS: "Goodbye and thanks for using “Playback control”.",
    REFLECTOR: "You just triggered {{intentName}}.",
    FALLBACK: "I don't know how to help you with that. Try rephrasing your question.",
    ERROR: "Sorry, that didn't work. Please try again.",
    ERROR_REPROMPT: "Please try again. For further assistance, take a look at the skill's description in the Alexa app.",

    GET_CURRENTLY_PLAYING: "This is “{{itemName}}” by “{{artists}}”, playing on “{{deviceName}}”.",
    NOTHING_PLAYING: "There is no playback at the moment.",

    PLAY_SUCCESS: "Okay, playing.",
    PLAY_ERROR: "That didn't work. Maybe playback is already running?",

    PLAYONDEVICE_SUCCESS: "Okay, playing on {{deviceName}}",
    PLAYONDEVICE_NO_MATCH: "I was unable to find a matching device. Please try it again.",
    PLAYONDEVICE_NO_MATCH_REPROMPT: "Please try it again. Give me the name of the device you would like to play music on.",

    PAUSE_SUCCESS: "Okay, pausing.",
    PAUSE_ERROR: "That didn't work. Is playback already paused?",

    NEXTSONG_SUCCESS: "Okay, next song.",

    PREVIOUSSONG_SUCCESS: "Okay, previous song.",

    SETVOLUME_SUCCESS: "Okay, setting volume to {{volume}}%.",

    TOGGLESHUFFLE_ON: "Okay, shuffle is now on.",
    TOGGLESHUFFLE_OFF: "Okay, shuffle is now off.",

    SEEK_SUCCESS: "Okay.",

    ERR_NO_TOKEN: "You haven't linked this skill to your Spotify account yet. In order to do that, open the Alexa app and follow the instructions.",
    ERR_UNKNOWN: "An unknown error occured.",

    // https://developer.spotify.com/documentation/web-api/reference/object-model/#player-error-object
    ERR_REASON: {
      NO_PREV_TRACK: "This command requires a previous track, but there is none in the context.",
      NO_NEXT_TRACK: "This command requires a next track, but there is none in the context.",
      // NO_SPECIFIC_TRACK: "The requested track does not exist.",
      ALREADY_PAUSED: "This command requires playback to not be paused.",
      NOT_PAUSED: "This command requires playback to be paused.",
      // NOT_PLAYING_LOCALLY: "This command requires playback on the local device.",
      NOT_PLAYING_TRACK: "This command requires that a track is currently playing.",
      NOT_PLAYING_CONTEXT: "This command requires that a context is currently playing.",
      ENDLESS_CONTEXT: "The shuffle command cannot be applied on an endless context.",
      CONTEXT_DISALLOW: "This command could not be performed on the context.",
      // ALREADY_PLAYING: "The track should not be restarted if the same track and context is already playing, and there is a resume point.",
      // RATE_LIMITED: "You are currently rate limited due to too frequent track play, also known as cat-on-the-keyboard spamming.",
      REMOTE_CONTROL_DISALLOW: "The context cannot be remote-controlled.",
      DEVICE_NOT_CONTROLLABLE: "It's not possible to remote control the device.",
      VOLUME_CONTROL_DISALLOW: "It's not possible to remote control the device’s volume.",
      NO_ACTIVE_DEVICE: "I don't see an active device to perform this action on.",
      PREMIUM_REQUIRED: "Unfortunately, you need a Spotify Premium account to do this.",
      UNKNOWN: "Hm, that didn't work out. Maybe you've tried something like starting playback while it's already playing.",
    }
  },
};
