import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsMongoId, IsNotEmpty, IsString } from "class-validator";

export class PropertyDto {
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
    location: string;


    @ApiProperty({ required: true, description: 'propertyType' })
    @IsString()
    @IsNotEmpty()
    propertyType: string;


    @ApiProperty({ required: true, description: 'amenities' })
    @IsArray()
    @IsString({ each: true })
    amenities: string[];


    @ApiProperty({ required: true, description: 'owner' })
    @IsMongoId()
    @IsNotEmpty()
    owner: string;
}