import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { RabbitMQService } from './rabbitmq.service';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
    constructor(private readonly rabbitMQService: RabbitMQService) { }

    use(req: Request, res: Response, next: Function) {
        // Log the request and response here
        console.log('statuscode', res)
        const logMessage = `Request: ${req.method} ${req.originalUrl}`;
        this.rabbitMQService.sendMessage(logMessage);
        next();
    }
}
