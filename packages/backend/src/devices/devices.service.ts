import { Injectable } from '@nestjs/common';

import * as devices from './devices.json';

@Injectable()
export class DevicesService {
  findAll(): object[] {
    return devices;
  }
}
