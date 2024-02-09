import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Folder} from "./folders.model";

@Injectable()
export class FoldersService {

    constructor(@InjectModel(Folder) private folderRepository: typeof Folder,) {}

    async createFolder(userId: number, name: string, parentId: number) {
        const folder = await this.folderRepository.create({
            name,
            userId,
            parentId,
        });
        return folder;
    }

    async updateFolderName(folderId: number, newName: string) {
        const folder = await this.folderRepository.findByPk(folderId);
        if (!folder) {
            throw new Error('Папка не найдена');
        }
        if (folder.name === 'root') {
            throw new Error('Нельзя изменять имя root папки');
        }
        folder.name = newName;
        await folder.save();
        return folder;
    }

    async updateFolderParent(folderId: number, newParentId: number) {
        const folder = await this.folderRepository.findByPk(folderId);
        if (!folder) {
            throw new Error('Папка не найдена');
        }
        folder.parentId = newParentId;
        await folder.save();
        return folder;
    }

    async deleteFolder(folderId: number) {
        const folder = await this.folderRepository.findByPk(folderId);
        if (!folder) {
            throw new Error('Папка не найдена');
        }
        // Запрет на удаление root папки
        if (folder.name === 'root') {
            throw new Error('Нельзя удалять root папку');
        }
        await folder.destroy();
        return folder;
    }

    async getFoldersByUserId(userId: number) {
        const folders = await this.folderRepository.findAll({ where: { userId } });
        return folders;
    }
}
