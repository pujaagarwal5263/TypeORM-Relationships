import { Controller, Get, Param , ParseIntPipe} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('seed')
  async seedDB(): Promise<any>{
    await this.appService.seed();
    return 'DB seeding done!'
  }

  @Get(':id')
  async getEmployeeById(@Param('id', ParseIntPipe) id: number){
    return this.appService.getEmployeeById(id);
  }
}
