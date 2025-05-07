import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { ApartmentService } from './apartment.service';
import { sendResponse } from 'src/utils/sendResponse';
import { ApartmentDto } from './dto/apartment.dto';
import { Response } from 'express';

@Controller('apartment')
export class ApartmentController {
    constructor(private readonly apartmentService: ApartmentService) { }

    // add apartment 
    @Post('/')
    async addProperty(@Body() payload: ApartmentDto, res: Response) {
        const result = await this.apartmentService.addApartment(payload)

        sendResponse(res, {
            success: true,
            statusCode: HttpStatus.OK,
            message: "Apartment Add Successfull",
            data: result
        })
    }


    // get all apartment list 
    @Get('/')
    async getAllApartment(@Res() res: Response) {
        const result = await this.apartmentService.getAllApartment();

        sendResponse(res, {
            success: true,
            statusCode: HttpStatus.OK,
            message: "All apartment get successful",
            data: result
        })
    }
}
