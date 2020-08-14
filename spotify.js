const SpotifyWebApi = require('spotify-web-api-node');

exports.SpotifyClass = function(handlerInput) {
  const TOKEN = handlerInput.requestEnvelope.context.System.user.accessToken;

  let s = new SpotifyWebApi();
  s.setAccessToken(TOKEN);
  return s;
};
