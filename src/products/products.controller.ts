import { Controller, Delete, Get, Post, Param, Body } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDTO } from './dtos/create-product.dto';
import { Product } from 'src/db';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get('/')
  getProducts(): Product[] {
    return this.productsService.getAll();
  }

  @Get('/:id')
  getProduct(@Param('id') id: string) {
    return this.productsService.getProduct(id);
  }

  @Post('/')
  addProduct(@Body() productData: CreateProductDTO): Product {
    return this.productsService.addProduct(productData);
  }

  @Delete('/:id')
  deleteProduct(@Param('id') id: string) {
    this.deleteProduct(id);
    return { message: 'Success' };
  }
}
