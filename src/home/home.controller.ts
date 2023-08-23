//* LIBRARY
import { PropertyType } from '@prisma/client';

//* DTOS
import { CreateHomeDto, HomeResponseDto, UpdateHomeDto } from './dtos/home.dto';

//* HOME
import { HomeService } from './home.service';

//* NESTJS
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UnauthorizedException,
} from '@nestjs/common';

//* DECORATOR
import { User, UserInfo } from 'src/user/decorators/user.decorator';

@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get()
  getHome(
    @Query('city') city?: string,
    @Query('minPrice') minPrice?: string,
    @Query('maxPrice') maxPrice?: string,
    @Query('propertyType') property_type?: PropertyType,
  ): Promise<HomeResponseDto[]> {
    const price =
      minPrice || maxPrice
        ? {
            ...(minPrice && { gte: parseFloat(minPrice) }),
            ...(maxPrice && { lte: parseFloat(maxPrice) }),
          }
        : undefined;

    const filter = {
      ...(city && { city }),
      ...(price && { price }),
      ...(property_type && { property_type }),
    };
    return this.homeService.getHomes(filter);
  }

  @Get(':id')
  getHomeId(@Param('id') id: number): Promise<HomeResponseDto> {
    return this.homeService.getHomeId(id);
  }

  @Post('create')
  createHome(
    @Body() body: CreateHomeDto,
    @User() user: UserInfo,
  ): Promise<HomeResponseDto> {
    return this.homeService.createHome(body, user.id);
  }

  @Put(':id')
  async updateHome(
    @Param('id') id: number,
    @Body() body: UpdateHomeDto,
    @User() user: UserInfo,
  ): Promise<HomeResponseDto> {
    const realtor = await this.homeService.getRealtorByHomeId(user.id);

    if (realtor.id !== user.id) {
      throw new UnauthorizedException();
    }

    return this.homeService.updateHome(id, body);
  }

  @Delete(':id')
  async deleteHome(
    @Param('id') id: number,
    @User() user: UserInfo,
  ): Promise<HomeResponseDto> {
    const realtor = await this.homeService.getRealtorByHomeId(user.id);

    if (realtor.id !== user.id) {
      throw new UnauthorizedException();
    }
    return this.homeService.deleteHome(id);
  }
}
