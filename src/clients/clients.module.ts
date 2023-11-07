// clients.module.ts

import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Global()
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
      {
        name: 'PALLET_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3200,
        },
      },
      {
        name: 'HPM_DLV_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3300,
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class ClientsGlobalModule {}
