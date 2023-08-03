import { Injectable, Logger } from '@nestjs/common';
import * as amqp from 'amqplib';
import * as fs from 'fs';

@Injectable()
export class RabbitMQService {
    private readonly logger = new Logger(RabbitMQService.name);
    private readonly QUEUE_NAME = 'logs_queue';
    private readonly logFilePath = 'logs.txt';
    private channel: amqp.Channel;


    async sendMessage(message: string): Promise<void> {
        const connection = await amqp.connect('amqp://guest:guest@rabbitmq:5672/');
        const channel = await connection.createChannel();
        await channel.assertQueue(this.QUEUE_NAME);
        await channel.sendToQueue(this.QUEUE_NAME, Buffer.from(message));
        await channel.close();
        await connection.close();
    }
    // --------------------------

    async onModuleInit() {
        try {
            const connection = await amqp.connect('amqp://guest:guest@rabbitmq:5672/');
            this.channel = await connection.createChannel();

            const queueName = 'logs_queue';

            await this.channel.assertQueue(queueName);

            this.logger.log('Consumer started. Waiting for logs...');

            this.channel.consume(
                queueName,
                (message) => {
                    const logMessage = message.content.toString();
                    this.logger.log('Received log:', logMessage);
                    fs.appendFileSync(this.logFilePath, logMessage + '\n');
                },
                { noAck: true }
            );
        } catch (error) {
            this.logger.error('Error in RabbitMQ consumer:', error);
        }
    }

    async onModuleDestroy() {
        if (this.channel) {
            await this.channel.close();
        }
    }



}
