import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductsService } from './products.service';
import { Product } from './product.model';

@Module({
    imports: [SequelizeModule.forFeature([Product])],
    providers: [ProductsService],
    controllers: [],
    exports: [SequelizeModule]
})
export class ProductsModule {}