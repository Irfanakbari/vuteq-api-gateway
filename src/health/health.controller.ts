import { Controller, Get, Res } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  MicroserviceHealthIndicator,
} from '@nestjs/terminus';
import { TcpClientOptions, Transport } from '@nestjs/microservices';
import { Response } from 'express';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private microservice: MicroserviceHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  async check(@Res() res: Response) {
    const result = await this.health.check([
      async () =>
        this.microservice.pingCheck<TcpClientOptions>('AUTH_APP', {
          transport: Transport.TCP,
          options: { host: 'localhost', port: 3100 },
        }),
      async () =>
        this.microservice.pingCheck<TcpClientOptions>('PALLET_APP', {
          transport: Transport.TCP,
          options: { host: 'localhost', port: 3300 },
        }),
    ]);
    return res.status(200).send(result.status);
  }
}
