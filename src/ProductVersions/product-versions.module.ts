import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductVersion } from './product-version.model';
import {ProductVersionsService} from "./product-versions.service";
import { ProductsService } from '../Products/products.service'
import {ProductsModule} from "../Products/products.module";
import {LocationsModule} from "../Locations/locations.module";
import {LocationsService} from "../Locations/locations.service";
@Module({
    imports: [
        SequelizeModule.forFeature([ProductVersion]),
        ProductsModule,
        LocationsModule
    ],
    providers: [ProductVersionsService, ProductsService, LocationsService],
    controllers: [],
    exports: [SequelizeModule]
})
export class ProductVersionsModule {}