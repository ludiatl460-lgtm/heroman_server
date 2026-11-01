import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createUser(@Body() dto: UserDto) {
    return this.userService.createUserService(dto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAllUser() {
    return this.userService.findAllUserService();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findUserById(@Param('id') id: string) {
    return this.userService.findUserByIdService(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  updateUser(@Param('id') id: string, @Body() dto: Partial<UserDto>) {
    return this.userService.updateUserService(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUserService(id);
  }
}
