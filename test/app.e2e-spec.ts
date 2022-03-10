import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

import { SequelizeModule } from '@nestjs/sequelize';
import { ProductVersion } from '../src/ProductVersions/product-version.model';
import { Product } from '../src/Products/product.model';
import { Location } from '../src/Locations/location.model';
import {ProductVersionsService} from "../src/ProductVersions/product-versions.service";
import {ProductsModule} from "../src/Products/products.module";
import {LocationsModule} from "../src/Locations/locations.module";
import {ProductsService} from "../src/Products/products.service";
import {LocationsService} from "../src/Locations/locations.service";
import {Sequelize} from "sequelize-typescript";

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
          AppModule
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});

describe('ProductVersionsModule (e2e)', () => {
  let app: INestApplication;
  // let sequelize: Sequelize = new Sequelize();
  let productsService: ProductsService;
  // let locationsService: LocationsService = new LocationsService(Location, sequelize);
  // let productVersionsService: ProductVersionsService = new ProductVersionsService(ProductVersion, sequelize,productsService, locationsService);

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        SequelizeModule.forFeature([ProductVersion]),
        ProductsModule,
        LocationsModule
      ],
      providers: [ProductVersionsService, ProductsService, LocationsService],
      controllers: [],
      exports: [SequelizeModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('findEffectiveProductAtLocation', () => {
    productVersionsService.findEffectiveProductAtLocation('2d8c0200-a079-11ec-a736-e90c2dc06d19', new Date("2022-02-28T14:56:48.694Z"))
        .then((res: ProductVersion[]) => {
          console.log(`test >> ${res}`)
          expect(1).toBe(2)
        })
        .catch(err => console.error(err))
    });
    // return request(app.getHttpServer())
    //     .get('/')
    //     .expect(200)
    //     .expect('Hello World!');
});
