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
import { Product } from '@prisma/client';
import { CreateProductDTO } from './dtos/create-product.dto';
import { UpdateProductDTO } from './dtos/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get('/')
  getProducts() {
    return this.productsService.getAll();
  }

  @Get('/:id')
  async getProduct(@Param('id', new ParseUUIDPipe()) id: string) {
    const product = await this.productsService.getProduct(id);
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  @Post('/')
  addProduct(@Body() productData: CreateProductDTO) {
    return this.productsService.addProduct(productData);
  }

  @Put('/:id')
  async updateProduct(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() productData: UpdateProductDTO,
  ) {
    if (!(await this.productsService.getProduct(id))) {
      throw new NotFoundException('Product not found');
    }
    return await this.productsService.updateProduct(id, productData);
  }

  @Delete('/:id')
  async deleteProduct(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!(await this.productsService.getProduct(id))) {
      throw new NotFoundException('Product not found');
    }
    await this.productsService.deleteProduct(id);
    return { message: 'Success' };
  }
}
