import {Body, Controller, Delete, Get, Header, Param, Post, Query, Req, Res, UseGuards} from '@nestjs/common';
import {CreateQuotesDto} from "./dto/create-quotes.dto";
import {QuotesService} from "./quotes.service";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {QueryEntities} from "./dto/query-entities";
import {Response} from "express";

@Controller('quotes')
export class QuotesController {

    constructor(private quoteService: QuotesService) {
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    createQuote(@Req() req, @Body() dto: CreateQuotesDto) {
        return this.quoteService.create(dto, req.user.id)
    }

    @Get('quote/:id')
    getQuote(@Param('id') id: number) {
        return this.quoteService.getQuoteById(id);
    }

    @Header('Access-Control-Expose-Headers', 'count-quotes')
    @Get('/fixed')
    async getFixedNumberQuote(@Query() query: QueryEntities, @Res() res: Response) {
        const {packQuotes, countQuotes} = await this.quoteService.getFixedQuotes(query.pack, query.limit);
        res.set({'count-quotes': countQuotes});
        return res.json(packQuotes);
    }

    @Get()
    getAllQuotes() {
        return this.quoteService.getAllQuotes();
    }

    @UseGuards(JwtAuthGuard)
    @Post('/likes')
    createLike(@Query() q, @Req() req) {
        return this.quoteService.createLike(req.user.id, q.quoteId);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/likes')
    deleteLike(@Query() q, @Req() req) {
        return this.quoteService.deleteLike(req.user.id, q.quoteId);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/likes')
    async checkLike(@Query() q, @Req() req) {
        const check = await this.quoteService.checkLike(req.user.id, q.quoteId);
        if (check.length > 0)
            return {liked: true}
        return {liked: false}
    }

}
