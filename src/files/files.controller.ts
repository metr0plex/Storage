import { Controller, Post, Param, UploadedFile, UseInterceptors, Delete, NotFoundException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './files.service';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {File} from "./files.model";

@ApiTags('Работа с файлами')
@Controller('files')
export class FileController {

    constructor(private readonly fileService: FileService) {}

    @ApiOperation({ summary: 'Загрузить файл' })
    @ApiResponse({ status: 200, type: File })
    @Post(':folderId')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file, @Param('folderId') folderId: number) {
        const { originalname, filename } = file;
        const filepath = `./uploads/${filename}`;
        return await this.fileService.uploadFile(originalname, filepath, folderId);
    }

    @ApiOperation({ summary: 'Удалить файл' })
    @ApiResponse({ status: 200, type: File })
    @Delete(':id')
    async deleteFile(@Param('id') id: string) {
        try {
            await this.fileService.deleteFile(id);
            return { success: true, message: 'File deleted successfully' };
        } catch (error) {
            if (error instanceof NotFoundException) {
                return { success: false, message: error.message };
            } else {
                throw error;
            }
        }
    }
}
