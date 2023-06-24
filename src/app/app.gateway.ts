import {
	OnGatewayConnection,
	OnGatewayDisconnect,
	OnGatewayInit,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AppService } from '../app.service';
import { Prisma } from '@prisma/client';

@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
	@WebSocketServer() server: Server;

	constructor(private readonly appService: AppService) {}

	@SubscribeMessage('sendMessage')
	async handleSendMessage(client: Socket, payload: Prisma.ChatCreateInput): Promise<void> {
		await this.appService.createMessage(payload);
		this.server.emit('recMessage', payload);
	}

	afterInit(server: any): any {
		console.log(server);
	}

	handleConnection(client: Socket): any {
		console.log(`Connected: ${client.id}`);
	}

	handleDisconnect(client: Socket): any {
		console.log(`Disconnected: ${client.id}`);
	}
}
