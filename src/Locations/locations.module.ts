import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { LocationsService } from './locations.service';
import { Location } from './location.model';

@Module({
    imports: [SequelizeModule.forFeature([Location])],
    providers: [LocationsService],
    controllers: [],
    exports: [SequelizeModule]
})
export class LocationsModule {}