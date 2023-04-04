import {Injectable} from '@nestjs/common';
import {CreateQuotesDto} from "./dto/create-quotes.dto";
import {InjectModel} from "@nestjs/sequelize";
import {Quote} from "./quotes.model";

@Injectable()
export class QuotesService {

    constructor(@InjectModel(Quote) private quoteRepository: typeof Quote) {
    }

    async create(dto: CreateQuotesDto, id: number) {
        return await this.quoteRepository.create({...dto, userId: id});
    }

    async getQuoteById(id: number) {
        return await this.quoteRepository.findOne({where: {id}, include: {all: true}});
    }

    async getAllQuotes() {
        return await this.quoteRepository.findAll({include: {all: true}});
    }
}
