import {
  Controller,
  Get,
  Post,
  Body,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { QueryFailedError } from 'typeorm';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.userService.create(createUserDto);
    } catch (error) {
      console.error(error);
      if (
        error instanceof QueryFailedError &&
        error.message.includes('UNIQUE constraint')
      ) {
        throw new BadRequestException('User already exists');
      } else {
        throw new InternalServerErrorException('Failed to create user');
      }
    }
  }
}
