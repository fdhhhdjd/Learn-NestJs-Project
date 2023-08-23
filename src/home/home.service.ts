//* NESTJS
import { Injectable, NotFoundException } from '@nestjs/common';

//* LIBRARY
import { PropertyType } from '@prisma/client';

//* SERVICES
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { PrismaService } from 'src/prisma/prisma.service';
import { HomeResponseDto } from './dtos/home.dto';

interface GetHomeParam {
  city?: string;
  price?: {
    gte?: number;
    lte?: number;
  };
  property_type?: PropertyType;
}

interface createParams {
  address: string;
  number_of_bedrooms: number;
  number_of_bathrooms: number;
  city: string;
  price: number;
  land_size: number;
  property_type: PropertyType;
  image?: {
    url: string;
  }[];
}

interface updateParams {
  address?: string;
  number_of_bedrooms?: number;
  number_of_bathrooms?: number;
  city?: string;
  price?: number;
  land_size?: number;
  property_type?: PropertyType;
}

const homeSelect = {
  id: true,
  address: true,
  city: true,
  price: true,
  property_type: true,
  number_of_bathrooms: true,
  number_of_bedrooms: true,
};

@Injectable()
export class HomeService {
  constructor(private readonly PrismaService: PrismaService) {}

  async getHomes(filter: GetHomeParam): Promise<HomeResponseDto[]> {
    const homes = await this.PrismaService.home.findMany({
      select: {
        ...homeSelect,
        images: {
          select: {
            url: true,
          },
          take: 1,
        },
      },
      where: {
        ...filter,
      },
    });

    if (!homes.length) {
      throw new NotFoundException();
    }

    return homes.map((home) => {
      const fetchHome = {
        ...home,
        image: home.images[0].url,
      };
      delete fetchHome.images;

      return new HomeResponseDto(fetchHome);
    });
  }

  async getHomeId(id: number): Promise<HomeResponseDto> {
    const homeDetail = await this.PrismaService.home.findUnique({
      where: {
        id,
      },
      select: {
        ...homeSelect,
        images: {
          select: {
            url: true,
          },
        },
        realtor: {
          select: {
            name: true,
            email: true,
            phone: true,
          },
        },
      },
    });

    if (!homeDetail) {
      throw new NotFoundException();
    }

    return new HomeResponseDto(homeDetail);
  }

  async createHome(
    {
      address,
      number_of_bedrooms,
      number_of_bathrooms,
      city,
      land_size,
      price,
      property_type,
      image,
    }: createParams,
    userId: number,
  ): Promise<HomeResponseDto> {
    const home = await this.PrismaService.home.create({
      data: {
        address,
        number_of_bedrooms,
        number_of_bathrooms,
        city,
        land_size,
        price,
        property_type,
        realtor_id: userId,
      },
    });

    const homeImages = image.map((image) => {
      return { ...image, home_id: home.id };
    });

    await this.PrismaService.image.createMany({
      data: homeImages,
    });

    return new HomeResponseDto(home);
  }

  async updateHome(id: number, data: updateParams): Promise<HomeResponseDto> {
    const foundHome = await this.PrismaService.home.findUnique({
      where: {
        id,
      },
    });

    if (!foundHome) {
      throw new NotFoundException();
    }

    const updateHome = await this.PrismaService.home.update({
      where: {
        id,
      },
      data,
    });
    return new HomeResponseDto(updateHome);
  }

  async deleteHome(id: number): Promise<HomeResponseDto> {
    const foundHome = await this.PrismaService.home.findUnique({
      where: {
        id,
      },
    });

    if (!foundHome) {
      throw new NotFoundException();
    }

    await this.PrismaService.image.deleteMany({
      where: {
        home_id: id,
      },
    });

    const deleteHome = await this.PrismaService.home.delete({
      where: {
        id,
      },
    });

    return new HomeResponseDto(deleteHome);
  }

  async getRealtorByHomeId(id: number) {
    const realtor = await this.PrismaService.home.findUnique({
      where: {
        id,
      },
      select: {
        realtor: {
          select: {
            name: true,
            id: true,
            email: true,
            phone: true,
          },
        },
      },
    });

    if (!realtor) {
      throw new NotFoundException();
    }

    return realtor.realtor;
  }
}
