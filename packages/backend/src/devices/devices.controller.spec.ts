import {Test, TestingModule} from '@nestjs/testing';
import {DevicesController} from './devices.controller';
import {DevicesService} from './devices.service';

describe('Items Controller', () => {
  let controller: DevicesController;
  let service: DevicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DevicesController],
      providers: [DevicesService],
    }).compile();

    controller = module.get<DevicesController>(DevicesController);
    service = module.get<DevicesService>(DevicesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('get devices', () => {
    it('should return an array of devices', async () => {
      const result = [{name: 'test'}];
      jest.spyOn(service, 'findAll').mockImplementation(() => result);

      expect(await controller.getList()).toBe(result);
    });
  });
});
