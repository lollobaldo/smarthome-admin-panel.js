import { connect } from 'mqtt';

import appConfig from '../mqtt-credentials';

const { server, ...credentials } = appConfig.mqttCredentials;

let callbacks;
let client;

export const startMqtt = (cbs) => {
  callbacks = cbs;

  const credentialsWithID = {
    clientId: `SAP--${Math.random().toString(16).substr(2, 8)}`,
    ...credentials,
  };

  console.log('connecting', server);
  client = connect(server, credentialsWithID);

  client.on('connect', () => {
    console.log('connected');
    callbacks.onConnect().forEach((topic) => {
      // console.log(`Subscribing to ${topic}`);
      client.subscribe(topic, (err) => {
        if (err) console.error(err);
      });
    });
  });

  client.on('message', (topic, message) => {
    const stringMessage = message.toString();
    console.log(`New message on topic ${topic}: ${stringMessage}`);
    callbacks.onMessage(topic, stringMessage);
  });
};

export const safePublish = (topic, message, options) => {
  const t = topic;
  const m = (typeof message === 'string') ? message : JSON.stringify(message);
  const o = { retain: true, ...options };
  client.publish(t, m, o);
  console.log(`Published '${message}' to ${topic}`);
};
