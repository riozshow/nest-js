import { Controller, Get, Param, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from 'src/db';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get('/')
  getOrders(): Order[] {
    return this.ordersService.getOrders();
  }

  @Get('/id')
  getOrder(@Param('id') id: string) {
    return this.ordersService.getOrder(id);
  }
}
