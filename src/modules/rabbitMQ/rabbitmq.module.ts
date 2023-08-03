import { Module } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq.service';
import { TypeOrmModule } from '@nestjs/typeorm';



@Module({
    imports: [TypeOrmModule.forFeature([])],
    controllers: [],
    providers: [RabbitMQService],
    exports: [],
})
export class RabbitMQModule { }