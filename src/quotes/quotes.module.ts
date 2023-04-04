import {Module} from '@nestjs/common';
import {QuotesService} from './quotes.service';
import {QuotesController} from './quotes.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../users/users.model";
import {Quote} from "./quotes.model";
import {FilesModule} from "../files/files.module";
import {AuthModule} from "../auth/auth.module";

@Module({
    providers: [QuotesService],
    controllers: [QuotesController],
    imports: [
        SequelizeModule.forFeature([User, Quote]),
        FilesModule,
        AuthModule
    ]
})
export class QuotesModule {
}
