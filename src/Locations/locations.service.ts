import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Location } from './location.model';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class LocationsService {
    constructor(
        @InjectModel(Location)
        private locationModel: typeof Location,
        private sequelize: Sequelize
    ) {}

    async findAll(): Promise<Location[]> {
        return this.locationModel.findAll();
    }

    async createLocation(): Promise<void> {
        try {
            await this.sequelize.transaction(async t => {
                const transactionHost = { transaction: t };

                await this.locationModel.create(
                    { name: 'NY'},
                    transactionHost,
                );
            });
        } catch (err) {
            console.log(err);
        }
    }
}