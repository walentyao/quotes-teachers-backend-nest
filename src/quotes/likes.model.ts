import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Quote} from "./quotes.model";
import {User} from "../users/users.model";


@Table({tableName: 'likes', createdAt: false, updatedAt: false})
export class Likes extends Model<Likes> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

    @ForeignKey(() => Quote)
    @Column({type: DataType.INTEGER})
    quoteId: number;


}