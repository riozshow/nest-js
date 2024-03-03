import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Param,
  Body,
  ParseUUIDPipe,
  NotFoundException,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDTO } from './dtos/create-product.dto';
import { Product } from 'src/db';
import { UpdateProductDTO } from './dtos/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get('/')
  getProducts(): Product[] {
    return this.productsService.getAll();
  }

  @Get('/:id')
  getProduct(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.productsService.getProduct(id);
  }

  @Post('/')
  addProduct(@Body() productData: CreateProductDTO): Product {
    return this.productsService.addProduct(productData);
  }

  @Put('/:id')
  updateProduct(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() productData: UpdateProductDTO,
  ) {
    if (!this.productsService.getProduct(id)) {
      throw new NotFoundException('Product not found');
    }
    return this.productsService.updateProduct(id, productData);
  }

  @Delete('/:id')
  deleteProduct(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!this.productsService.getProduct(id)) {
      throw new NotFoundException('Product not found');
    }
    this.productsService.deleteProduct(id);
    return { message: 'Success' };
  }
}
