import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { LocationsService } from "./Locations/locations.service";
import { ProductVersionsService } from "./ProductVersions/product-versions.service";
import { Product } from './Products/product.model'
import { Location } from './Locations/location.model'
import { ProductVersion } from './ProductVersions/product-version.model'
@Controller()
export class AppController {
  constructor(
      private readonly appService: AppService,
      private productVersionsService: ProductVersionsService
      // private locationsService: LocationsService
      // private locationsService: LocationsService
              ) {}

  @Get()
  async getHello(): Promise<ProductVersion[]> {
    try {
      return this.productVersionsService.findEffectiveProductAtLocation('2d8c0200-a079-11ec-a736-e90c2dc06d19', new Date("2022-02-28T14:56:48.694Z"))
    } catch (err) {
      console.log(err);
    }
  }
}
