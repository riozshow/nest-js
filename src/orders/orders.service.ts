import { Injectable } from '@nestjs/common';
import { Order, db } from 'src/db';

@Injectable()
export class OrdersService {
  getOrders() {
    return db.orders;
  }

  getOrder(id: Order['id']): Order | null {
    return db.orders.find((order) => order.id === id);
  }
}
