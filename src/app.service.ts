import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Prisma, Chat } from '@prisma/client';

@Injectable()
export class AppService {
	constructor(private readonly prismaService: PrismaService) {}

	async createMessage(data: Prisma.ChatCreateInput): Promise<Chat> {
		return this.prismaService.chat.create({ data });
	}

	async getMessages(): Promise<Chat[]> {
		return this.prismaService.chat.findMany();
	}
}
