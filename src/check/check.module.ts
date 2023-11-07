import { Module } from '@nestjs/common';
import { CheckController } from './check.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3100,
        },
      },
    ]),
  ],
  controllers: [CheckController],
})
export class CheckModule {}
