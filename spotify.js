const SpotifyWebApi = require('spotify-web-api-node');

exports.SpotifyClass = function(handlerInput) {
  const TOKEN = handlerInput.requestEnvelope.context.System.user.accessToken;
  if (!TOKEN) throw {
    name: 'NoTokenError'
  };
  
  let s = new SpotifyWebApi();
  s.setAccessToken(TOKEN);
  return s;
};
