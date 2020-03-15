import {Controller, Get} from '@nestjs/common';
import {DevicesService} from './devices.service';

@Controller('devices')
export class DevicesController {
    constructor(private readonly deviceService: DevicesService) {}

    @Get('list')
    getList(): object[] {
        return this.deviceService.findAll();
    }
}
