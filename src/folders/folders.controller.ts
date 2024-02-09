import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {FoldersService} from "./folders.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Folder} from "./folders.model";

@ApiTags('Работа с папками')
@Controller('folders')
export class FoldersController {

    constructor(private folderService: FoldersService) {}

    @ApiOperation({ summary: 'Создать папку' })
    @ApiResponse({ status: 200, type: Folder })
    @Post(':userId/folders') //создание папок
    async createFolder(
        @Param('userId') userId: number,
        @Body('name') name: string,
        @Body('parentId') parentId: number,
    ) {
        return this.folderService.createFolder(userId, name, parentId);
    }

    @ApiOperation({ summary: 'Смена названия папки' })
    @ApiResponse({ status: 200, type: Folder })
    @Patch('folders/:folderId') // смена названия папки
    async updateFolderName(
        @Param('folderId') folderId: number,
        @Body('name') newName: string,
    ) {
        return this.folderService.updateFolderName(folderId, newName);
    }

    @ApiOperation({ summary: 'Перенос папки' })
    @ApiResponse({ status: 200, type: Folder })
    @Patch('folders/:folderId/parent') //перенос папки
    async updateFolderParent(
        @Param('folderId') folderId: number,
        @Body('parentId') newParentId: number,
    ) {
        return this.folderService.updateFolderParent(folderId, newParentId);
    }

    @ApiOperation({ summary: 'Удалить папку и её содержимое' })
    @ApiResponse({ status: 200, type: Folder })
    @Delete('folders/:folderId') //удаление папки и её содержимого
    async deleteFolder(
        @Param('folderId') folderId: number,
    ) {
        return this.folderService.deleteFolder(folderId);
    }

    @ApiOperation({ summary: 'Получить папки пользователя' })
    @ApiResponse({ status: 200, type: Folder })
    @Get(':userId/folders') // получение папок пользователя
    async getFoldersByUserId(@Param('userId') userId: number) {
        return this.folderService.getFoldersByUserId(userId);
    }
}
