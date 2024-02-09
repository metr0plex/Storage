import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { File } from './files.model';
import { FileController } from './files.controller';
import { FileService } from './files.service';
import {Folder} from "../folders/folders.model";

@Module({
    imports: [SequelizeModule.forFeature([File, Folder])],
    controllers: [FileController],
    providers: [FileService],
})

export class FileModule {}