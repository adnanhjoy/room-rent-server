import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Res,
} from '@nestjs/common';
import { TestService } from './test.service';
import { CreateTestDto } from './dto/test.dto';
import { Response } from 'express';

@Controller('/test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Get('/')
  getWelcome(@Res() res: Response) {
    return res.status(200).send({
      message: 'OK',
      data: this.testService.getTest(),
    });
  }

  @Post('/add')
  async addTest(@Body() payload: CreateTestDto, @Res() res: Response) {
    const newTest = await this.testService.createTest(payload);
    return res.status(201).json(newTest);
  }

  @Get('/all')
  async getAll(@Res() res: Response) {
    const data = await this.testService.getAllTests();
    return res.status(200).json(data);
  }

  @Get('/:id')
  async getOne(@Param('id') id: string, @Res() res: Response) {
    const test = await this.testService.getTestById(id);
    return res.status(200).json(test);
  }

  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() body: Partial<CreateTestDto>,
    @Res() res: Response,
  ) {
    const updated = await this.testService.updateTest(id, body);
    return res.status(200).json(updated);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    const result = await this.testService.deleteTest(id);
    return res.status(200).json(result);
  }
}
