const Alexa = require('ask-sdk-core');

exports.escapeContent = function(c) {
  let withoutUrls = c.replace(/https*:\/\/\S+?\s\((.+?)\)/g, "$1");
  return Alexa.escapeXmlCharacters(withoutUrls);
}

exports.canHandleIntent = function(...handleableIntentNames) {
  return function(handlerInput) {
    if (Alexa.getRequestType(handlerInput.requestEnvelope) !== 'IntentRequest') return false;
    let receivedIntentName = Alexa.getIntentName(handlerInput.requestEnvelope);
    return handleableIntentNames.some(h => h === receivedIntentName);
  }
}
