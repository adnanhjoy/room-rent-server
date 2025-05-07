import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class ApartmentDto {
    @ApiProperty({ required: true, description: 'name' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ required: true, description: 'description' })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ required: true, description: 'location' })
    @IsString()
    @IsNotEmpty()
    address: string;


    @ApiProperty({ required: true, description: 'apartmentType' })
    @IsString()
    @IsNotEmpty()
    apartmentType: string;


    @ApiProperty({ required: true, description: 'facilities' })
    @IsArray()
    @IsString({ each: true })
    facilities: string[];
}