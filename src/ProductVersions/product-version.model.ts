import {Column, Model, Table, DataType, ForeignKey} from 'sequelize-typescript';
import {Product} from "../Products/product.model";
import {Location} from "../Locations/location.model";

@Table
export class ProductVersion extends Model {
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV1,
    })
    id: string;

    @Column
    effectiveAt: Date;

    @ForeignKey(() => Location)
    @Column
    locationId: string;

    @ForeignKey(() => Product)
    @Column
    productId: string;
}