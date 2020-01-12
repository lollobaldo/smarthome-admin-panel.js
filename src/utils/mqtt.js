import { connect } from 'mqtt';

import appConfig from '../mqtt-credentials';

const { server, ...credentials } = appConfig.mqttCredentials;

// import Main from '../components/Main';


let callbacks;
let client;

export const startMqtt = (cbs) => {
  callbacks = cbs;

  console.log('connecting', server, credentials);
  client = connect(server, credentials);

  client.on('connect', () => {
    console.log('connected');
    callbacks.onConnect().forEach(topic => {
      console.log(`Subscribing to ${topic}`);
      client.subscribe(topic, (err) => {
        if (err) console.error(err);
      });
    });
  });

  client.on('message', (topic, message) => {
    message = message.toString();
    console.log(`New message on topic ${topic}: ${message}`);
    callbacks.onMessage(topic, message);
  });
}

export const safePublish = (topic, message, options) => {
  const t = topic;
  const m = (typeof message === 'string') ? message : JSON.stringify(message);
  client.publish(t, m, options);
  console.log(`Published '${message}' to ${topic}`);
};
