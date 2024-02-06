import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Server } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { SocketService } from './socket.service';

@WebSocketGateway({ cors: true })
export class WebsocketsGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  constructor(private readonly socketService: SocketService) {}
  afterInit(server: any) {
    try {
      Logger.log('Socket server initialized');
    } catch (e) {
      Logger.error(e);
    }
  }
  @WebSocketServer()
  server: Server;
  wsClients = [];
  async handleConnection(client: any) {
    try {
      // Handle connection event
      Logger.log('Client connected');
      const [data] = await Promise.all([this.socketService.dashboard()]);
      client.emit('message', data);
      this.wsClients.push(client);
    } catch (error) {
      Logger.error(`Error occurred in handleConnection: ${error}`);
      // Handle error as needed
    }
  }
  handleDisconnect(client: any) {
    // Handle disconnection event
    Logger.log('Client disconnected');
    for (let i = 0; i < this.wsClients.length; i++) {
      if (this.wsClients[i] === client) {
        this.wsClients.splice(i, 1);
        break;
      }
    }
  }

  async broadcast() {
    const [data] = await Promise.all([this.socketService.dashboard()]);
    for (let c of this.wsClients) {
      c.send('message', data);
    }
  }

  @SubscribeMessage('message')
  handleMessage(@ConnectedSocket() client: Socket) {
    const data = this.socketService.dashboard();
    client.emit('response', data);
    // client.emit('response', 'Hello from server');
  }
}
