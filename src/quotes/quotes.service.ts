import {Injectable} from '@nestjs/common';
import {CreateQuotesDto} from "./dto/create-quotes.dto";
import {InjectModel} from "@nestjs/sequelize";
import {Quote} from "./quotes.model";
import {Likes} from "./likes.model";

@Injectable()
export class QuotesService {

    constructor(@InjectModel(Quote) private quoteRepository: typeof Quote,
                @InjectModel(Likes) private likesRepository: typeof Likes) {
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

    async getFixedQuotes(pack: number, limit: number) {
        const quotes = await this.quoteRepository.findAll({include: Likes});
        const countQuotes = quotes.length;
        const packQuotes = [];
        quotes.forEach((value, index) => {
            if ((pack * limit) > index && (pack * limit - 10) <= index) {
                packQuotes.push({...value.dataValues, likes: value.dataValues.likes.length});
            }
        })
        return {packQuotes, countQuotes}
    }

    async createLike(userId: number, quoteId: number) {
        const likes = await this.likesRepository.findAll({
            where: {
                userId,
                quoteId
            }
        });
        if (likes.length > 0)
            return {liked: true};
        await this.likesRepository.create({userId, quoteId});
        return {liked: true};
    }

    async deleteLike(userId: number, quoteId: number) {
        await this.likesRepository.destroy({
            where: {
                userId,
                quoteId
            }
        });
        return {liked:false}
    }

    async checkLike(userId: number, quoteId: number) {
        return this.likesRepository.findAll({
            where: {
                userId,
                quoteId
            }
        })
    }
}
