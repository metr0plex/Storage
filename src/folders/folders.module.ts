import {Module} from '@nestjs/common';
import { FoldersController } from './folders.controller';
import {FoldersService} from "./folders.service";
import {SequelizeModule} from "@nestjs/sequelize";
import {Folder} from "./folders.model";

@Module({
  providers: [FoldersService],
  controllers: [FoldersController],
  imports: [
    SequelizeModule.forFeature([Folder]),
  ],
  exports:[
    FoldersService,
  ]
})

export class FoldersModule {}
