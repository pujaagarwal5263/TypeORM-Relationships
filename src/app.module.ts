import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactInfo } from './contact-info.entity';
import { Employee } from './employee.entity';
import { Task } from './task.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
       type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'test',
      entities: [Employee, ContactInfo, Task],
      synchronize: true,
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
