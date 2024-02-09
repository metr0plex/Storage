import { Column, Model, Table, ForeignKey, DataType } from 'sequelize-typescript';
import { Folder } from "../folders/folders.model";

@Table
export class File extends Model<File> {
    @Column
    name: string;

    @Column
    filepath: string;

    @ForeignKey(() => Folder)
    @Column({ type: DataType.INTEGER })
    folderId: number;
}
