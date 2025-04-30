import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateTestDto{
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsOptional()
    @IsNumber()
    age?: number;
}