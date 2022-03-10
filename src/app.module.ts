import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './Products/product.model';
import { Location } from './Locations/location.model';
import {ProductsModule} from "./Products/products.module";
import {LocationsModule} from "./Locations/locations.module";
import {ProductVersionsModule} from "./ProductVersions/product-versions.module";
import { ProductsService} from "./Products/products.service";
import { LocationsService} from "./Locations/locations.service";
import {ProductVersionsService} from "./ProductVersions/product-versions.service";
import {ProductVersion} from "./ProductVersions/product-version.model";

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 7432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      autoLoadModels: true,
      synchronize: true,
      models: [Product, Location, ProductVersion],
    }),
    LocationsModule,
    ProductsModule,
    ProductVersionsModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ProductsService,
    LocationsService,
    ProductVersionsService
  ],
  exports: [ProductsModule, LocationsModule, ProductVersionsModule]
})
export class AppModule {}
