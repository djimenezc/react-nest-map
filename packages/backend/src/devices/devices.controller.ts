import {Controller, Get} from '@nestjs/common';

const availableItems = [
    'milk',
    'pasta',
    'eggs',
    'meat',
    'bread',
    'coffee',
    'tea',
    'sugar',
    'rice',
    'oil',
    'salad',
    'soup',
    'cheese',
    'meat',
    'fish',
    'tomato',
    'tomato soup',
];

@Controller('devices')
export class DevicesController {

    @Get('list')
    getList(): string[] {
        return availableItems;
    }
}
