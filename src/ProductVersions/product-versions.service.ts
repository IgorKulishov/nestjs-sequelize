import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProductVersion } from './product-version.model';
import { Sequelize } from 'sequelize-typescript';
import { ProductsService } from '../Products/products.service'
import { LocationsService } from '../Locations/locations.service';
import {Op} from "sequelize";

@Injectable()
export class ProductVersionsService {
    constructor(
        @InjectModel(ProductVersion)
        private productVersionModel: typeof ProductVersion,
        private sequelize: Sequelize,
        private productsService: ProductsService,
        private locationsService: LocationsService,
    ) {}

    async findAll(): Promise<ProductVersion[]> {
        return this.productVersionModel.findAll();
    }

    async findEffectiveProductAtLocation(locationId: string, effectiveAt?: Date): Promise<any> {
        effectiveAt = effectiveAt || new Date();
        return this.productVersionModel.findAll({
                where: {
                    locationId: locationId,
                    effectiveAt: {
                        [Op.lte]: effectiveAt
                    }
                }
            }
        )
    }

    async createProductVersions(): Promise<void> {
        let product_0, product_1, product_2;
        let location_0, location_1, location_2;
        try {
            const products = await this.productsService.findAll();
            product_0 = products[0];
            // product_1 = products[1];
            // product_2 = products[2];
        } catch (err) {
            console.log(`Failed to fetch Products: ${err}`)
        }

        try {
            const locations = await this.locationsService.findAll();
            location_0 = locations[0];
            // location_1 = locations[1];
            // location_2 = locations[2];
        } catch (err) {
            console.log(`Failed to fetch Locations: ${err}`)
        }

        try {
            await this.sequelize.transaction(async t => {
                const transactionHost = { transaction: t };
                const effectiveDate = Date.now()-60*60*1000*24*30;
                await this.productVersionModel.create(
                    {
                        effectiveAt: new Date(effectiveDate),
                        locationId: location_0.id,
                        productId: product_0.id
                    },
                    transactionHost,
                );
            });
        } catch (err) {
            console.log(err);
        }
    }
}