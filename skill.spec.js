const nock = require('nock');
const rh = require('./lambda.js').handler;

function myNock() {
  return nock('https://api.spotify.com', {
    reqheaders: {
      "Authorization": "Bearer PLACEHOLDER" //TODO
    }
  });
}

function generateRequest(intentName, o = {}) {
  return {
    version: '1.0',
    session: {
      new: o.newSession || false,
      sessionId: 'PLACEHOLDER',
      application: {
        applicationId: 'PLACEHOLDER'
      },
      user: {
        userId: 'PLACEHOLDER',
        accessToken: o.accessToken !== undefined ? o.accessToken : 'PLACEHOLDER' //TODO muss das so?
      }
    },
    context: {
      System: {
        application: {
          applicationId: 'PLACEHOLDER'
        },
        user: {
          userId: 'PLACEHOLDER',
          accessToken: o.accessToken !== undefined ? o.accessToken : 'PLACEHOLDER' //TODO muss das so?
        },
        device: {
          deviceId: 'PLACEHOLDER',
          supportedInterfaces: {}
        },
        apiEndpoint: 'https://api.eu.amazonalexa.com',
        apiAccessToken: 'PLACEHOLDER'
      }
    },
    request: {
      type: 'IntentRequest',
      requestId: 'PLACEHOLDER',
      locale: 'de-DE',
      timestamp: 'PLACEHOLDER',
      intent: {
        name: intentName,
        confirmationStatus: 'NONE',
        slots: makeSlots(o.slots)
      }
    }
  };
}

function makeSlots(slots) {
  if (!slots || slots.length === 0) return undefined;
  let slotsOut = {};
  for (let slotName in slots) {
    slotsOut[slotName] = {
      name: slotName,
      confirmationStatus: 'NONE',
      source: 'USER',
      value: slots[slotName]
    }
  }
  return slotsOut;
}

async function doRequest(...args) {
  return new Promise(function(resolve, reject) {
    rh(generateRequest(...args), {}, (err, resp) => {
      err ? reject(err) : resolve(convertResponse(resp))
    });
  });
}

function convertResponse(r) {
  // console.warn(r);
  return {
    speak: r.response.outputSpeech.ssml.replace(/<\/?speak>/g, ''),
    reprompt: r.response.reprompt ? r.response.reprompt.outputSpeech.ssml.replace(/<\/?speak>/g, '') : null,
    shouldEndSession: r.response.shouldEndSession,
    sessionAttributes: r.sessionAttributes,
  };
}

// ---------

describe('GetCurrentlyPlayingIntent', () => {
  it("fetches and announces current song, artists and device", async () => {
    const mock = myNock()
      .get(`/v1/me/player`)
      .reply(200, {
        item: {
          artists: [{
            name: 'ARTIST1',
          }, {
            name: 'ARTIST2',
          }],
          name: 'SONG1',
        },
        device: {
          name: 'DEVICE1',
        },
      });
    const response = await doRequest('GetCurrentlyPlayingIntent');
    expect(response.speak).toBe("Es spielt gerade „SONG1“ von „ARTIST1, ARTIST2“ auf „DEVICE1“.");
    expect(mock.isDone()).toBe(true);
  });
  it("gives an error message when nothing plays", async () => {
    const mock = myNock()
      .get(`/v1/me/player`)
      .reply(200, {});
    const response = await doRequest('GetCurrentlyPlayingIntent');
    expect(response.speak).toBe("Gerade wird nichts wiedergegeben.");
    expect(mock.isDone()).toBe(true);
  });
});

// PlayIntent

describe('PlayOnDeviceIntent', () => {
  describe('device name matching', () => {
    const variants = [{
        name: "exact (case-insensitive)",
        deviceName: "Schlafzimmer",
        queryName: "schlafzimmer",
        shouldMatch: true,
        deviceNames: ["Schlafzimmer", "Linux"],
      },
      {
        name: "fuzzy, match first",
        deviceName: "Schlafzimmer",
        queryName: "schafzimmer",
        shouldMatch: true,
        deviceNames: ["Schlafzimmer", "Linux", "Küche"],
      },
      {
        name: "fuzzy, match third",
        deviceName: "Küche",
        queryName: "kochen",
        shouldMatch: true,
        deviceNames: ["Schlafzimmer", "Linux", "Küche"],
      },
    ]
    for (let v of variants) {
      it(`${v.name}: ${v.queryName} → ${v.deviceName}`, async () => {
        const mock = myNock()
          .get(`/v1/me/player/devices`)
          .reply(200, {
            devices: v.deviceNames.map(name => {
              return {
                name,
                id: name + '-id'
              };
            })
          })
          .put(`/v1/me/player`)
          .reply(204);
        const response = await doRequest('PlayOnDeviceIntent', {
          slots: {
            Device: v.queryName
          }
        });
        expect(response.speak).toBe(`Okay, spiele auf ${v.deviceName}`);
        expect(mock.isDone()).toBe(true);
      });
    }

    it("gives an error message when no matching device is found", async () => {
      const mock = myNock()
        .get(`/v1/me/player/devices`)
        .reply(200, {
          devices: [{
            name: 'Schlafzimmer',
            id: 'device1-id'
          }]
        });
      const response = await doRequest('PlayOnDeviceIntent', {
        slots: {
          Device: "küche"
        }
      });
      expect(response.speak).toBe("Ich habe kein passendes Gerät gefunden. Versuche es bitte noch einmal.");
      expect(mock.isDone()).toBe(true);
    });

    it("gives an error message when no device is found at all", async () => {
      const mock = myNock()
        .get(`/v1/me/player/devices`)
        .reply(200, {
          devices: []
        });
      const response = await doRequest('PlayOnDeviceIntent', {
        slots: {
          Device: "Device"
        }
      });
      expect(response.speak).toBe("Dazu wird ein Gerät benötigt, auf dem Spotify aktiv ist.");
      expect(mock.isDone()).toBe(true);
    });

  });
});

// PauseIntent

// AMAZON.NextIntent

// AMAZON.PreviousIntent

// SetVolumeIntent

// ToggleShuffleIntent

describe('SeekIntent', () => {
  const times = {
    'PT2M': 120000,
    'PT1M10S': 70000,
    'PT10S': 10000,
  };
  for (let isoTime in times) {
    let msTime = times[isoTime];
    it(`calls API correctly and returns success message: ${isoTime}/${msTime}`, async () => {
      const mock = myNock()
        .put('/v1/me/player/seek')
        .query({
          position_ms: msTime
        })
        .reply(204);
      const response = await doRequest('SeekIntent', {
        slots: {
          Time: isoTime,
        }
      });
      expect(response.speak).toBe("Okay.");
      expect(mock.isDone()).toBe(true);
    });
  }
});

//LaunchRequest

//HelpIntent

describe('AMAZON.StopIntent', () => {
  it("exits the skill", async () => {
    const response = await doRequest('AMAZON.StopIntent'); //CancelAndStopIntent
    expect(response.reprompt).toBeFalsy();
  });
});

describe('AMAZON.CancelIntent', () => {
  it('exits the skill', async () => {
    const response = await doRequest('AMAZON.StopIntent'); //CancelAndStopIntent
    expect(response.reprompt).toBeFalsy();
  });
});

// FallbackIntent

// SessionEndedRequest

// IntentReflector

let apiTests = [{
    endpoint: '/v1/me/player/play',
    verb: 'put',
    intentName: 'PlayIntent',
    speak: "Okay, ich starte die Wiedergabe.",
  }, {
    endpoint: '/v1/me/player/next',
    verb: 'post',
    intentName: 'AMAZON.NextIntent',
    speak: "Okay, nächster Song.",
  },
  {
    endpoint: '/v1/me/player/previous',
    verb: 'post',
    intentName: 'AMAZON.PreviousIntent',
    speak: "Okay, vorheriger Song.",
  },
  {
    endpoint: '/v1/me/player/pause',
    verb: 'put',
    intentName: 'AMAZON.PauseIntent',
    speak: "Okay, pausiere.",
  },
  {
    endpoint: '/v1/me/player/shuffle?state=false', //TODO .query (oder einfach lassen…)
    verb: 'put',
    intentName: 'AMAZON.ShuffleOffIntent', //ToggleShuffleIntent
    speak: "Okay, Zufallswiedergabe ist jetzt aus.",
  },
  {
    endpoint: '/v1/me/player/shuffle?state=true',
    verb: 'put',
    intentName: 'AMAZON.ShuffleOnIntent', //ToggleShuffleIntent
    speak: "Okay, Zufallswiedergabe ist jetzt an.",
  },
  {
    endpoint: '/v1/me/player/volume?volume_percent=42',
    verb: 'put',
    intentName: 'SetVolumeIntent',
    speak: "Okay, setze Lautstärke auf 42%.",
    slots: {
      Volume: 42
    },
  },
];

for (let t of apiTests) {
  describe(t.intentName, () => {
    it('calls API correctly and returns success message', async () => {
      const mock = myNock()[t.verb](t.endpoint).reply(204);
      const response = await doRequest(t.intentName, {
        slots: t.slots
      });
      expect(response.speak).toBe(t.speak);
      expect(mock.isDone()).toBe(true);
    });
  });
}

describe('API error handling', () => {
  it("gives an error message when accessToken is not set", async () => {
    const response = await doRequest('PlayIntent', {
      accessToken: null,
    });
    expect(response.speak).toBe("Du hast den Skill noch nicht mit Spotify verknüpft. Öffne einfach die Alexa-App und führe die Kontoverknüpfung durch.");
  });

  it("gives an error message when Spotify returns 403 PREMIUM_REQUIRED", async () => {
    const mock = myNock().put('/v1/me/player/play').reply(403, {
      error: {
        message: 'PLACEHOLDER',
        status: 'PLACEHOLDER',
        reason: 'PREMIUM_REQUIRED',
      },
    });
    const response = await doRequest('PlayIntent');
    expect(response.speak).toBe("Für diesen Befehl benötigst du leider einen Spotify Premium Account.");
    expect(mock.isDone()).toBe(true);
  });
});
