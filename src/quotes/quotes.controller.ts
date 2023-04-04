import {Body, Controller, Get, Param, Post, Req, UseGuards} from '@nestjs/common';
import {CreateQuotesDto} from "./dto/create-quotes.dto";
import {QuotesService} from "./quotes.service";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@Controller('quotes')
export class QuotesController {

    constructor(private quoteService: QuotesService) {
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    createQuote(@Req() req,@Body() dto: CreateQuotesDto) {
        return this.quoteService.create(dto,req.user.id)
    }

    @Get(':id')
    getQuote(@Param('id') id: number) {
        return this.quoteService.getQuoteById(id);
    }

    @Get()
    getAllQuotes() {
        return this.quoteService.getAllQuotes();
    }

}
