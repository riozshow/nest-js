import { Injectable } from '@nestjs/common';
import { Order, db } from 'src/db';
import { v4 } from 'uuid';
import { UpdateOrderDTO } from './dtos/update-order.dto';
import { CreateOrderDTO } from './dtos/create-order.dto';

@Injectable()
export class OrdersService {
  getOrders() {
    return db.orders;
  }

  getOrder(id: Order['id']): Order | null {
    return db.orders.find((order) => order.id === id);
  }

  public deleteOrder(id: Order['id']): void {
    db.orders = db.orders.filter((order) => order.id !== id);
  }

  public addOrder(order: CreateOrderDTO): Order {
    const newOrder: Order = { ...order, id: v4() };
    db.orders.push(newOrder);
    return newOrder;
  }

  public updateOrder(id: string, body: UpdateOrderDTO): Order {
    this.deleteOrder(id);
    const updatedOrder: Order = { id, ...body };
    db.orders.push(updatedOrder);
    return updatedOrder;
  }
}
