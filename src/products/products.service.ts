import { Injectable } from '@nestjs/common';
import { Product, db } from 'src/db';
import { v4 } from 'uuid';
import { UpdateProductDTO } from './dtos/update-product.dto';
import { CreateProductDTO } from './dtos/create-product.dto';

@Injectable()
export class ProductsService {
  public getAll(): Product[] {
    return db.products;
  }

  public getProduct(id: Product['id']): Product | null {
    return db.products.find((product) => product.id === id);
  }

  public deleteProduct(id: Product['id']): void {
    db.products = db.products.filter((product) => product.id !== id);
  }

  public addProduct(product: CreateProductDTO): Product {
    const newProduct: Product = { ...product, id: v4() };
    db.products.push(newProduct);
    return newProduct;
  }

  public updateProduct(id: string, body: UpdateProductDTO): Product {
    this.deleteProduct(id);
    const updatedProduct: Product = { id, ...body };
    db.products.push(updatedProduct);
    return updatedProduct;
  }
}
