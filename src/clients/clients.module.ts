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
          host: '192.168.1.15',
          port: 3100,
        },
      },
      {
        name: 'PALLET_SERVICE',
        transport: Transport.TCP,
        options: {
          host: '192.168.1.15',
          port: 3200,
        },
      },
      {
        name: 'HPM_DLV_SERVICE',
        transport: Transport.TCP,
        options: {
          host: '192.168.1.15',
          port: 3300,
        },
      },
      {
        name: 'ANSEI_SERVICE',
        transport: Transport.TCP,
        options: {
          host: '192.168.1.15',
          port: 3400,
        },
      },
      {
        name: 'SEWING_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3500,
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class ClientsGlobalModule {}
