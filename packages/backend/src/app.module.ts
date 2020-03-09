import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DevicesController } from './devices/devices.controller';

@Module({
  imports: [],
  controllers: [AppController, DevicesController],
  providers: [AppService],
})
export class AppModule {}
