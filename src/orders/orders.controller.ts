import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ParseUUIDPipe,
  NotFoundException,
} from '@nestjs/common';
import { Order } from '@prisma/client';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get('/')
  getOrders(): Promise<Order[]> {
    return this.ordersService.getOrders();
  }

  @Get('/:id')
  async getOrder(@Param('id') id: string) {
    const order = await this.ordersService.getOrder(id);
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  @Post('/')
  addOrder(@Body() orderData: Order): Promise<Order> {
    return this.ordersService.addOrder(orderData);
  }

  @Put('/:id')
  async updateOrder(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() orderData: Order,
  ) {
    if (!(await this.ordersService.getOrder(id))) {
      throw new NotFoundException('Order not found');
    }
    return this.ordersService.updateOrder(id, orderData);
  }

  @Delete('/:id')
  async deleteOrder(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!(await this.ordersService.getOrder(id))) {
      throw new NotFoundException('Order not found');
    }
    this.ordersService.deleteOrder(id);
    return { message: 'Success' };
  }
}
