import { Global, Module } from '@nestjs/common';
import { WebsocketsGateway } from './socket.gateway';
import { SocketService } from './socket.service';

@Global()
@Module({
  providers: [WebsocketsGateway, SocketService],
  exports: [WebsocketsGateway],
})
export class WebsocketsModule {}
