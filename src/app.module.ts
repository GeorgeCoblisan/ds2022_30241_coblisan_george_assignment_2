import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ENERGY_PRODUCER',
        transport: Transport.RMQ,
        options: {
          urls: ['amqps://rvqpjusb:xIeU0SIXUZWkd4ocDVg3X7nA1f_qpxIb@sparrow.rmq.cloudamqp.com/rvqpjusb'],
          queue: 'energy-queue',
          queueOptions: {
            durable: true
          },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
