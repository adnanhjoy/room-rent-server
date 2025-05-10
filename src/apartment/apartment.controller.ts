import { Body, Controller, Get, HttpStatus, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { ApartmentService } from './apartment.service';
import { sendResponse } from 'src/utils/sendResponse';
import { ApartmentDto } from './dto/apartment.dto';
import { Request, Response } from 'express';
import { UserGuardGuard } from 'src/common/guard/user.guard/user.guard.guard';

@Controller('apartment')
export class ApartmentController {
    constructor(private readonly apartmentService: ApartmentService) { }

    // add apartment 
    @Post('/')
    async addProperty(@Body() payload: ApartmentDto, @Res() res: Response) {
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



    // update apartment 
    @UseGuards(UserGuardGuard)
    @Put('/update/:id')
    async updateApartment(
        @Body() body: Partial<ApartmentDto>,
        @Req() req: Request<{ id: string }> & { role?: string; email?: string },
        @Res() res: Response
    ) {
        const role = req.role;
        const id = req.params.id;

        if (!role) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                success: false,
                message: "Role is missing from token",
            });
        }

        const result = await this.apartmentService.updateApartment(role, id, body);
console.log(result);
        sendResponse(res, {
            success: true,
            statusCode: HttpStatus.OK,
            message: "Apartment update successful",
            data: result,
        });
    }

}
