const { Kafka } = require("kafkajs");

const kafka = new Kafka({
    clientId: "producer1",
    brokers: ["my-cluster-kafka-bootstrap.kafka:9092"],
    sasl: {
      mechanism: "scram-sha-512",
      username: "my-connect-user",
      password: "eWKhGtJJ16Fo9svPInU8Osw99zEZ44wt",
    },
  });

const producer = kafka.producer();

// Generate random data for topic1
const getRandomUserData = () => ({
  id: Math.floor(Math.random() * 1000),
  name: `User${Math.floor(Math.random() * 100)}`,
  timestamp: new Date().toISOString(),
});

// Generate random data for topic2
const getRandomOrderData = () => ({
  orderId: Math.floor(Math.random() * 5000),
  amount: Math.floor(Math.random() * 500),
  status: ["pending", "completed", "shipped"][Math.floor(Math.random() * 3)],
  timestamp: new Date().toISOString(),
});

const sendMessages = async () => {
  await producer.connect();

  // Send messages to topic1
  setInterval(async () => {
    const userMessage = getRandomUserData();
    await producer.send({
      topic: "topic1",
      messages: [{ value: JSON.stringify(userMessage) }],
    });
    console.log("Sent to topic1:", userMessage);
  }, 2000);

  // Send messages to topic2
  setInterval(async () => {
    const orderMessage = getRandomOrderData();
    await producer.send({
      topic: "topic2",
      messages: [{ value: JSON.stringify(orderMessage) }],
    });
    console.log("Sent to topic2:", orderMessage);
  }, 3000); // Different interval to avoid concurrent sends
};

sendMessages().catch(console.error);