import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "../users/users.model";

interface QuoteCreationAttrs {
    teacher:string;
    faculty:string;
    content: string;
    userId: number;
}

@Table({tableName: 'quotes'})
export class Quote extends Model<Quote, QuoteCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    content: string;

    @Column({type: DataType.STRING, allowNull: false})
    teacher: string;

    @Column({type: DataType.STRING, allowNull: false})
    faculty: string;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

    @BelongsTo(() => User)
    author: User

}
