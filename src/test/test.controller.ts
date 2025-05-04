import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Res,
  UseGuards,
  Version,
} from '@nestjs/common';
import { TestService } from './test.service';
import { CreateTestDto } from './dto/test.dto';
import { Response } from 'express';
import { UserGuardGuard } from 'src/common/guard/user.guard/user.guard.guard';
import { ApiBearerAuth, ApiSecurity } from '@nestjs/swagger';

@Controller('/test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Get('/')
  @Version('1')
  @UseGuards(UserGuardGuard)
  // @ApiBearerAuth('access-token')
  @ApiSecurity('api-key')
  getWelcome(@Res() res: Response) {
    return res.status(200).send({
      message: 'OK',
      data: this.testService.getTest(),
    });
  }

  @Post('/add')
  @Version('1')
  async addTest(@Body() payload: CreateTestDto, @Res() res: Response) {
    const newTest = await this.testService.createTest(payload);
    return res.status(201).json(newTest);
  }

  @Get('/all')
  @Version('1')
  async getAll(@Res() res: Response) {
    const data = await this.testService.getAllTests();
    return res.status(200).json(data);
  }

  @Get('/:id')
  @Version('1')
  async getOne(@Param('id') id: string, @Res() res: Response) {
    const test = await this.testService.getTestById(id);
    return res.status(200).json(test);
  }

  @Put('/:id')
  @Version('1')
  async update(
    @Param('id') id: string,
    @Body() body: Partial<CreateTestDto>,
    @Res() res: Response,
  ) {
    const updated = await this.testService.updateTest(id, body);
    return res.status(200).json(updated);
  }

  @Delete('/:id')
  @Version('1')
  async delete(@Param('id') id: string, @Res() res: Response) {
    const result = await this.testService.deleteTest(id);
    return res.status(200).json(result);
  }
}
