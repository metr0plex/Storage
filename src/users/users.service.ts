import { Injectable } from '@nestjs/common';
import {User} from "./users.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateUserDto} from "./dto/create-user.dto";
import {Folder} from "../folders/folders.model";

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User,
                @InjectModel(Folder) private folderRepository: typeof Folder,) {}

    async createUser(dto: CreateUserDto){
        const user = await this.userRepository.create(dto)
        await this.folderRepository.create({
            name: 'root',
            userId: user.id,
            parentId: null,
        });
        return user
    }

    async getAllUsers(){
        const users = await this.userRepository.findAll()
        return users
    }

    async getUserByLogin(login: string){
        const user = await this.userRepository.findOne({where:{login}})
        return user
    }
}
