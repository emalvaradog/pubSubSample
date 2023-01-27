const { PubSub } = require("@google-cloud/pubsub");
const { Storage } = require("@google-cloud/storage");
 
const SUBSCRIPTION_NAME = "";

const pubSub = new PubSub();
const gStorage = new Storage();

function listenForMessages() {
  const subscription = pubSub.subscription(SUBSCRIPTION_NAME);
  console.log(__dirname);
  let messageCount = 0;
  const messageHandler = (message) => {
    let { name, bucket } = JSON.parse(message.data.toString());
    console.log("Received message");
    message.ack();
    downloadFile(name, bucket);
  };

  subscription.on("message", messageHandler);
}

async function downloadFile(name, bucket) {
  try {
    console.log("downloading file");
    const res = await gStorage
      .bucket(bucket)
      .file(name)
      .download({ destination: `${__dirname}/${name}` });
    console.log("done downloading file");
  } catch (err) {
    console.log(err);
  }
}

listenForMessages();
