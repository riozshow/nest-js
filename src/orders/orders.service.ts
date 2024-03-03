import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma.service';
import { Order } from '@prisma/client';
import { CreateOrderDTO } from './dtos/create-order.dto';
import { UpdateOrderDTO } from './dtos/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(private prismaService: PrismaService) {}

  public getOrders(): Promise<Order[]> {
    return this.prismaService.order.findMany();
  }

  public getExtendedOrders(): Promise<Order[]> {
    return this.prismaService.order.findMany({
      include: { product: true, client: true },
    });
  }

  public getOrder(id: Order['id']): Promise<Order | null> {
    return this.prismaService.order.findUnique({ where: { id } });
  }

  public getExtendedOrder(id: Order['id']): Promise<Order | null> {
    return this.prismaService.order.findUnique({
      where: { id },
      include: { product: true, client: true },
    });
  }

  public deleteOrder(id: Order['id']): Promise<Order> {
    return this.prismaService.order.delete({ where: { id } });
  }

  public async addOrder(order: CreateOrderDTO): Promise<Order> {
    const { productId, clientId, ...otherData } = order;
    try {
      return await this.prismaService.order.create({
        data: {
          ...otherData,
          product: {
            connect: { id: productId },
          },
          client: {
            connect: { id: clientId },
          },
        },
      });
    } catch (error) {
      if (error.code === 'P2025')
        throw new BadRequestException("Product doesn't exist");
      throw error;
    }
  }

  public updateOrder(id: string, body: UpdateOrderDTO): Promise<Order> {
    const { productId, clientId, ...otherData } = body;
    return this.prismaService.order.update({
      where: { id },
      data: {
        ...otherData,
        product: {
          connect: { id: productId },
        },
        client: {
          connect: { id: clientId },
        },
      },
    });
  }
}
