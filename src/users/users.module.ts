import {forwardRef, Module} from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./users.model";
import {AuthModule} from "../auth/auth.module";
import {Folder} from "../folders/folders.model";
import {FoldersService} from "../folders/folders.service";

@Module({
  controllers: [UsersController],
  providers: [UsersService, FoldersService],
  imports: [
      SequelizeModule.forFeature([User, Folder]),
      forwardRef(()=>AuthModule),

  ],
    exports:[
        UsersService,
    ]
})

export class UsersModule {}
