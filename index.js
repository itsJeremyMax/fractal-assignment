const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://localhost:1883');

// Mock api request that returns child topics and parent topic
const getChildTopics = require('./mock-api/getChildTopics');
const getParentTopic = require('./mock-api/getParentTopic');

const childTopics = getChildTopics();
const parentTopic = getParentTopic();

client.on('connect', () => {
  console.log('Client connected');
  client.subscribe(childTopics);
  // Lets create an array that contains the status for all inverters in order
  // We default to them all returning the "correct" status
  let childTopicStates = new Array(childTopics.length).fill(1);
  client.on('message', (topic, message) => {
    // Find the index of the topic in the array
    const index = childTopics.indexOf(topic);
    // Set the value at that index position to either 0 or 1
    childTopicStates[index] = Number(message.toString());
    // Optional, Logging the current status state array
    console.log(childTopicStates);
    // We now check if there are any 0 values in the index
    const hasZero = childTopicStates.includes(0);
    // If there are, we return 0, otherwise we return 1
    const parentTopicState = hasZero ? 0 : 1;
    // We now publish the value to the parent topic above.
    client.publish(parentTopic, parentTopicState.toString());
  });
});
