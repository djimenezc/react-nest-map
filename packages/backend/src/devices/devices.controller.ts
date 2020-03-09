import {Controller, Get} from '@nestjs/common';

import * as devices from './devices.json';

@Controller('devices')
export class DevicesController {

    @Get('list')
    getList(): object[] {
        return devices;
    }
}
