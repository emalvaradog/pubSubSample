const { PubSub } = require("@google-cloud/pubsub");

const pubSub = new PubSub();
const TOPIC_NAME = "pubSubFiles";
const topicPublisher = pubSub.topic(TOPIC_NAME);

async function publishMessage(messageJSON) {
  const messageBuffer = Buffer.from(JSON.stringify(messageJSON));

  try {
    const messageId = await topicPublisher.publishMessage({
      data: messageBuffer,
    });
    console.log(`Message ${messageId} published`);
  } catch (e) {
    console.error(e);
  }
}

exports.pubSubFunc = (event, context) => {
  const { name, bucket } = event;
  publishMessage({ name, bucket });
};
