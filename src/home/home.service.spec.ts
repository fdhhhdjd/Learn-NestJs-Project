//* NESTJS
import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

//* LIBRARY
import { PropertyType } from '@prisma/client';

//* PRISMA
import { PrismaService } from 'src/prisma/prisma.service';

//* HOME
import { HomeService, homeSelect } from './home.service';

//Todo: Data Dummy
const mockGetHomes = [
  {
    id: 1,
    address: '123 Cao Van Be',
    city: 'Nha Trang',
    price: 1500000,
    property_type: PropertyType.RESIDENTIAL,
    image: 'img1',
    numberOfBedrooms: 3,
    numberOfBathrooms: 2.5,
    images: [
      {
        url: 'img1',
      },
      {
        url: 'img2',
      },
    ],
  },
];

const mockHome = {
  id: 1,
  address: 'nano',
  number_of_bedrooms: 1,
  number_of_bathrooms: 1,
  city: 'Khanh Hoa',
  land_size: 3318,
  price: 1700000,
  property_type: PropertyType.CONDO,
  image: 'img1',
};

const mockImages = [
  {
    id: 1,
    url: 'img5',
  },
];

describe('HomeService', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let service: HomeService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HomeService,
        {
          provide: PrismaService,
          useValue: {
            home: {
              findMany: jest.fn().mockReturnValue(mockGetHomes),
              create: jest.fn().mockReturnValue(mockHome),
            },
            image: {
              createMany: jest.fn().mockReturnValue(mockImages),
            },
          },
        },
      ],
    }).compile();

    service = module.get<HomeService>(HomeService);
    prismaService = module.get<PrismaService>(PrismaService);
  });
  describe('getHome', () => {
    const fillers = {
      city: 'Nha Trang',
      price: {
        gte: 1000000,
        lte: 1500000,
      },
      property_type: PropertyType.RESIDENTIAL,
    };
    it('should call prisma home.findMany with correct params', async () => {
      const mockPrismaFindManyHomes = jest.fn().mockReturnValue(mockGetHomes);

      jest
        .spyOn(prismaService.home, 'findMany')
        .mockImplementation(mockPrismaFindManyHomes);

      await service.getHomes(fillers);

      expect(mockPrismaFindManyHomes).toBeCalledWith({
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
          ...fillers,
        },
      });
    });

    it('should throw not found exception if not home are found', async () => {
      const mockPrismaFindManyHomes = jest.fn().mockReturnValue([]);

      jest
        .spyOn(prismaService.home, 'findMany')
        .mockImplementation(mockPrismaFindManyHomes);

      await expect(service.getHomes(fillers)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });

  describe('createMany', () => {
    const mockCreateHomeParams = {
      address: 'xiu cau',
      number_of_bedrooms: 1,
      number_of_bathrooms: 1,
      city: 'Khanh Hoa',
      land_size: 3318,
      price: 1700000,
      property_type: PropertyType.CONDO,
      image: [
        {
          url: 'img5',
        },
      ],
    };
    it('should call prisma home.create with correct payload', async () => {
      const mockCreateHome = jest.fn().mockReturnValue(mockHome);

      jest
        .spyOn(prismaService.home, 'create')
        .mockImplementation(mockCreateHome);

      await service.createHome(mockCreateHomeParams, 1);

      expect(mockCreateHome).toBeCalledWith({
        data: {
          address: 'xiu cau',
          number_of_bedrooms: 1,
          number_of_bathrooms: 1,
          city: 'Khanh Hoa',
          land_size: 3318,
          price: 1700000,
          property_type: 'CONDO',
          realtor_id: 1,
        },
      });
    });

    it('should call prisma image.createmany with correct payload', async () => {
      const mockCreateManyImage = jest.fn().mockReturnValue(mockImages);

      jest
        .spyOn(prismaService.image, 'createMany')
        .mockImplementation(mockCreateManyImage);

      await service.createHome(mockCreateHomeParams, 1);
      expect(mockCreateManyImage).toBeCalledWith({
        data: [
          {
            home_id: 1,
            url: 'img5',
          },
        ],
      });
    });
  });
});
