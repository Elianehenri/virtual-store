
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './schema/product.schema';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private productModel: Model<Product>) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  // async findOne(id: string): Promise<Product> {
  //   return this.productModel.findById(id).exec();
  // }
  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`Produto com ID ${id} nao encontrado!`);
    }
    return product;
  }
  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    const existingProduct = await this.productModel.findById(id).exec();
    if (!existingProduct) {
      throw new NotFoundException(`Produto com  ID ${id} nao encontrado`);
    }
  
    // Atualiza apenas os campos fornecidos no DTO de atualização
    if (updateProductDto.name !== undefined) {
      existingProduct.name = updateProductDto.name;
    }
    if (updateProductDto.description !== undefined) {
      existingProduct.description = updateProductDto.description;
    }
    if (updateProductDto.price !== undefined) {
      existingProduct.price = updateProductDto.price;
    }
  
    return existingProduct.save();
  }
  
  
  async remove(id: string): Promise<Product> {
    const productToDelete = await this.productModel.findById(id).exec();
    if (!productToDelete) {
      throw new NotFoundException(`Produto com ID ${id} nao encontrado`);
    }
    await this.productModel.deleteOne({ _id: id }).exec();
    return productToDelete;
  }
}
