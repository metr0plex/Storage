import {Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import {User} from "../users/users.model";
import {File} from "../files/files.model";

@Table({ tableName: 'folders' })
export class Folder extends Model<Folder> {

    @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: 'My Folder', description: 'Название папки' })
    @Column({ type: DataType.STRING, allowNull: false })
    name: string;

    @ForeignKey(() => User)
    @ApiProperty({ example: '1', description: 'Уникальный идентификатор пользователя' })
    @Column({ type: DataType.INTEGER })
    userId: number;

    @ForeignKey(() => Folder)
    @ApiProperty({ example: '1', description: 'Уникальный идентификатор родительской папки' })
    @Column({ type: DataType.INTEGER, allowNull: true })
    parentId: number;

    @HasMany(() => File)
    files: File[];
}
