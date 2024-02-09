import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto{
    @ApiProperty({example:'Denis',description:'Логин пользователя'})
    readonly login: string;

    @ApiProperty({example:'Password123',description:'Пароль пользователя'})
    readonly password: string;
}