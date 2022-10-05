import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(readonly appService: AppService) {}

  @Get()
  getAllTodoList() {
    return this.appService.getAllTodoLists(1);
  }
}
