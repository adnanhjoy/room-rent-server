import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Test, TestDocument } from './test.schema';
import { CreateTestDto } from './dto/test.dto';

@Injectable()
export class TestService {
  constructor(@InjectModel(Test.name) private testModel: Model<TestDocument>) {}

  getTest(): string {
    return 'Hello !!! Baby Programmer !!!';
  }

  async createTest(createTestDto: CreateTestDto): Promise<Test> {
    const createdTest = new this.testModel(createTestDto);
    return await createdTest.save();
  }

  async getAllTests(): Promise<Test[]> {
    return this.testModel
      .find()
      .select('-__v')
      .sort({ createdAt: -1 })
      .populate('userId', 'name email');
  }

  async getTestById(id: string): Promise<Test> {
    const test = await this.testModel.findById(id).exec();
    if (!test) throw new NotFoundException('Test not found');
    return test;
  }

  async updateTest(
    id: string,
    updateData: Partial<CreateTestDto>,
  ): Promise<Test> {
    const updated = await this.testModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
    if (!updated) throw new NotFoundException('Test not found to update');
    return updated;
  }

  async deleteTest(id: string): Promise<{ deleted: boolean }> {
    const result = await this.testModel.findByIdAndDelete(id).exec();
    return { deleted: !!result };
  }
}
