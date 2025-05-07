import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { PropertyService } from './property.service';
import { sendResponse } from 'src/utils/sendResponse';
import { Response } from 'express';
import { PropertyDto } from './dto/property.dto';

@Controller('property')
export class PropertyController {
    constructor(private readonly propertyService: PropertyService) { }

    // add property 
    @Post('/')
    async addProperty(@Body() payload: PropertyDto, res: Response) {
        const result = await this.propertyService.addProperty(payload)

        sendResponse(res, {
            success: true,
            statusCode: HttpStatus.OK,
            message: "Property Add Successfull",
            data: result
        })
    }


    // get all property list 
    @Get('/')
    async getAllProperty(@Res() res: Response) {
        const result = await this.propertyService.getAllProperty();

        sendResponse(res, {
            success: true,
            statusCode: HttpStatus.OK,
            message: "All user get successful",
            data: result
        })
    }
}
