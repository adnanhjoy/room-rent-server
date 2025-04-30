import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type TestDocument = HydratedDocument<Test>;

@Schema()
export class Test{
    @Prop({
        required: true
    })
    name: string;
    @Prop()
    age: number;
}

export const TestSchema = SchemaFactory.createForClass(Test);