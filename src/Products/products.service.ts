import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './product.model';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Product)
        private productModel: typeof Product,
        private sequelize: Sequelize
    ) {}

    async findAll(): Promise<Product[]> {

        // try {
        //     await this.sequelize.transaction(async t => {
        //         const transactionHost = { transaction: t };
        //
        //         await this.productModel.create(
        //             { name: 'MOP1'},
        //             transactionHost,
        //         );
        //     });
        // } catch (err) {
        //     console.log(err);
        // }

        return this.productModel.findAll();
    }
}