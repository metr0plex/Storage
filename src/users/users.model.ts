import {Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";

interface UserCreationAttrs{
    login:string;
    password:string;
}

@Table({tableName:'users'})
export class User extends Model<User,UserCreationAttrs>{

    @ApiProperty({example:'1',description:'Уникальный индентификатор'})
    @Column({type:DataType.INTEGER, unique:true, autoIncrement:true, primaryKey:true})
    id: number;

    @ApiProperty({example:'Denis',description:'Логин пользователя'})
    @Column({type:DataType.STRING, unique:true, allowNull:false})
    login:string;

    @ApiProperty({example:'Password123',description:'Пароль пользователя'})
    @Column({type:DataType.STRING, allowNull:false})
    password:string;
}