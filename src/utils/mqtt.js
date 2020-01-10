import { connect } from 'mqtt';

import appConfig from '../mqtt-credentials';

const { server, ...credentials } = appConfig.mqttCredentials;

console.log('connecting', server, credentials);
const client = connect(server, credentials);

// export const startMqtt = () => {

// };

export const safePublish = (topic, message, options) => {
  const t = topic;
  const m = (typeof message === 'string') ? message : JSON.stringify(message);
  client.publish(t, m, options);
};

client.on('connect', () => {
  console.log('connected');
  client.subscribe("light", (err) => {
    if (err) console.error(err);
  });
});

client.on('message', (topic, message) => {
  console.log(`New message on topic ${topic}: ${message.toString()}`);
  // modules[topic].callbacks.onMessage(topic, message);
});
