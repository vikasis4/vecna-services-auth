import amqp, { Connection, Channel } from "amqplib/callback_api";

const RabbitMqURL = process.env.RABBIT_MQ_URL || "";

const publishRabbitMq = (queue: string, msg: string): void => {
  amqp.connect(RabbitMqURL, (err: Error, connection: Connection) => {
    if (err) {
      console.error("Failed to connect to RabbitMQ:", err);
      return;
    }

    connection.createChannel((err: Error, channel: Channel) => {
      if (err) {
        console.error("Failed to create channel:", err);
        return;
      }

      channel.assertQueue(queue, { durable: true });

      channel.sendToQueue(queue, Buffer.from(msg));

      setTimeout(() => {
        connection.close();
      }, 500);
    });
  });
};

export default publishRabbitMq;
