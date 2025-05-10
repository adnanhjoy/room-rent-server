import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsMongoId, IsNotEmpty, IsString } from "class-validator";

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


    @ApiProperty({ required: true, description: 'owner' })
    @IsMongoId()
    @IsNotEmpty()
    owner: string;



    @ApiProperty({ required: true, description: 'property' })
    @IsMongoId()
    @IsNotEmpty()
    property: string;



    @IsString()
    status: string;
}