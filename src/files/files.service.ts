import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { File } from './files.model';
import * as fs from 'fs';

@Injectable()
export class FileService {

    constructor(
        @InjectModel(File)
        private readonly fileModel: typeof File,
    ) {}

    async uploadFile(name: string, filepath: string, folderId: number): Promise<File> {
        return await this.fileModel.create({ name, filepath, folderId });
    }

    async deleteFile(id: string): Promise<void> {
        const file = await this.fileModel.findByPk(id);
        if (!file) {
            throw new NotFoundException(`File with id ${id} not found`);
        }

// Удаление файла с сервера
        fs.unlinkSync(file.filepath);

        await file.destroy();
    }
}
