import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table
export class Location extends Model {
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV1,
    })
    id: string;

    @Column
    name: string;
}