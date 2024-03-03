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
import { OrdersService } from './orders.service';
import { Order } from 'src/db';
import { CreateOrderDTO } from './dtos/create-order.dto';
import { UpdateOrderDTO } from './dtos/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get('/')
  getOrders(): Order[] {
    return this.ordersService.getOrders();
  }

  @Get('/:id')
  getOrder(@Param('id') id: string) {
    return this.ordersService.getOrder(id);
  }

  @Post('/')
  addOrder(@Body() orderData: CreateOrderDTO): Order {
    return this.ordersService.addOrder(orderData);
  }

  @Put('/:id')
  updateOrder(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() orderData: UpdateOrderDTO,
  ) {
    if (!this.ordersService.getOrder(id)) {
      throw new NotFoundException('Order not found');
    }
    return this.ordersService.updateOrder(id, orderData);
  }

  @Delete('/:id')
  deleteOrder(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!this.ordersService.getOrder(id)) {
      throw new NotFoundException('Order not found');
    }
    this.ordersService.deleteOrder(id);
    return { message: 'Success' };
  }
}
