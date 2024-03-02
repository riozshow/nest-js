import { Injectable } from '@nestjs/common';
import { Product, db } from 'src/db';
import { v4 } from 'uuid';

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

  public addProduct(product: Omit<Product, 'id'>): Product {
    const newProduct = { ...product, id: v4() };
    db.products.push(newProduct);
    return newProduct;
  }
}
