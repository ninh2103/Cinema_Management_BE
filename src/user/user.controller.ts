import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public, ResponseMessage } from 'src/decorator/costomize';
import { ChangePasswordBodyType, FilterType } from 'src/constants/type';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ResponseMessage('Create Employee Success')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ResponseMessage('Get All Employee Success')
  @Public()
  findAll(@Query() param: FilterType) {
    return this.userService.findAll(param);
  }

  @Get(':id')
  @ResponseMessage('Get Employee Success')
  @Public()
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @ResponseMessage('Update Employee Success')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ResponseMessage('Delete Employee Success')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @Get('customer/filter-by-date')
  @ResponseMessage('Get Customers by Date Range Success')
  @Public()
  getCustomersByDate(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Query() param: FilterType,
  ) {
    return this.userService.findCustomersByDate(startDate, endDate, param);
  }

  @Patch(':id/change-password')
  @ResponseMessage('Password changed successfully')
  async changePassword(
    @Param('id') userId: string,
    @Body() body: ChangePasswordBodyType,
  ) {
    // Gọi service xử lý
    return await this.userService.changePassword(userId, body);
  }
}
