import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma.service';
import { Order } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private prismaService: PrismaService) {}

  public getOrders(): Promise<Order[]> {
    return this.prismaService.order.findMany();
  }

  public getOrder(id: Order['id']): Promise<Order | null> {
    return this.prismaService.order.findUnique({ where: { id } });
  }

  public deleteOrder(id: Order['id']): Promise<Order> {
    return this.prismaService.order.delete({ where: { id } });
  }

  public addOrder(order: Order): Promise<Order> {
    return this.prismaService.order.create({ data: order });
  }

  public updateOrder(id: string, body: Order): Promise<Order> {
    return this.prismaService.order.update({ where: { id }, data: body });
  }
}
