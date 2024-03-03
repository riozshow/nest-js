import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma.service';
import { Product } from '@prisma/client';
import { CreateProductDTO } from './dtos/create-product.dto';
import { UpdateProductDTO } from './dtos/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) {}

  public getAll(): Promise<Product[]> {
    return this.prismaService.product.findMany();
  }

  public getProduct(id: Product['id']): Promise<Product | null> {
    return this.prismaService.product.findUnique({ where: { id } });
  }

  public deleteProduct(id: Product['id']): Promise<Product> {
    return this.prismaService.product.delete({ where: { id } });
  }

  public addProduct(product: CreateProductDTO): Promise<Product> {
    return this.prismaService.product.create({ data: product });
  }

  public updateProduct(id: string, body: UpdateProductDTO): Promise<Product> {
    return this.prismaService.product.update({ where: { id }, data: body });
  }
}
