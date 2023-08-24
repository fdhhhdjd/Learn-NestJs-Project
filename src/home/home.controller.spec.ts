import { Test, TestingModule } from '@nestjs/testing';
import { HomeController } from './home.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { HomeService } from './home.service';
import { PropertyType } from '@prisma/client';
import { UnauthorizedException } from '@nestjs/common';

const mockUser = {
  id: 53,
  name: 'Tai Dev',
  email: 'nguyentientai@gmail.com',
  phone: '0912741273',
};

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

describe('HomeController', () => {
  let controller: HomeController;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let homeService: HomeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HomeController],
      providers: [
        {
          provide: HomeService,
          useValue: {
            getHomes: jest.fn().mockReturnValue([]),
            getRealtorByHomeId: jest.fn().mockReturnValue(mockUser),
            updateHomeId: jest.fn().mockReturnValue(mockHome),
          },
        },
        PrismaService,
      ],
    }).compile();

    controller = module.get<HomeController>(HomeController);
    homeService = module.get<HomeService>(HomeService);
  });

  describe('getHomes', () => {
    const fillers = {
      city: 'Nha Trang',
      price: {
        gte: 1000000,
        lte: 1500000,
      },
      property_type: PropertyType.RESIDENTIAL,
    };
    it('should construct filter objects correctly', async () => {
      const mockGetHomes = jest.fn().mockReturnValue([]);

      jest.spyOn(homeService, 'getHomes').mockImplementation(mockGetHomes);

      await controller.getHome(
        'Nha Trang',
        '1000000',
        '1500000',
        PropertyType.RESIDENTIAL,
      );
      expect(mockGetHomes).toBeCalledWith(fillers);
    });
  });

  describe('updateHome', () => {
    const mockUserInfo = {
      name: 'Tai Dev',
      id: 4,
      iat: 1,
      exp: 2,
    };

    const mockCreateHomeParams = {
      address: 'xiu cau',
      number_of_bedrooms: 1,
      number_of_bathrooms: 1,
      city: 'Khanh Hoa',
      land_size: 3318,
      price: 1700000,
      property_type: PropertyType.CONDO,
    };
    it('should throw error if realtor did not create home', async () => {
      expect(
        controller.updateHome(3, mockCreateHomeParams, mockUserInfo),
      ).rejects.toThrowError(UnauthorizedException);
    });
  });
});
