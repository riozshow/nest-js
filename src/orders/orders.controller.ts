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
import { UpdateOrderDTO } from './dtos/update-order.dto';
import { CreateOrderDTO } from './dtos/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get('/')
  getOrders(): Promise<Order[]> {
    return this.ordersService.getOrders();
  }

  @Get('/extended')
  async getExtendedOrders(@Param('id') id: string) {
    return this.ordersService.getExtendedOrders();
  }

  @Get('/:id')
  async getOrder(@Param('id') id: string) {
    const order = await this.ordersService.getOrder(id);
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  @Get('/extended/:id')
  async getExtendedOrder(@Param('id') id: string) {
    const order = await this.ordersService.getExtendedOrder(id);
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  @Post('/')
  addOrder(@Body() orderData: CreateOrderDTO): Promise<Order> {
    return this.ordersService.addOrder(orderData);
  }

  @Put('/:id')
  async updateOrder(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() orderData: UpdateOrderDTO,
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
