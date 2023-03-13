import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactInfo } from './contact-info.entity';
import { Employee } from './employee.entity';
import { Meeting } from './meeting.entity';
import { Task } from './task.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Employee) private employeeRepo: Repository<Employee>,
    @InjectRepository(ContactInfo) private contactRepo: Repository<ContactInfo>,
    @InjectRepository(Task) private taskRepo: Repository<Task>,
    @InjectRepository(Meeting) private meetingRepo: Repository<Meeting>
  ){}

  async seed(){
    const ceo= this.employeeRepo.create({name: 'Miss. Puja'})
    await this.employeeRepo.save(ceo);

    const ceoContactInfo = this.contactRepo.create({email: "ceo@gmail.com"})
    ceoContactInfo.employee= ceo;
    await this.contactRepo.save(ceoContactInfo);

    const manager= this.employeeRepo.create({name: 'Aditya', manager: ceo});
    
    const task1=this.taskRepo.create({name:"Hire engineer"})
    await this.taskRepo.save(task1);

    const task2=this.taskRepo.create({name:"Present to Academy"})
    await this.taskRepo.save(task2);

    //assign task to mnager
    manager.tasks=[task1,task2]

    const meet1= this.meetingRepo.create({zoomURL:"localhost:8000"})
    meet1.attendees=[ceo]
    this.meetingRepo.save(meet1);

    //assign meeting to mnager
    manager.meetings=[meet1];
    this.employeeRepo.save(manager);
  }

  async getEmployeeById(id: number){
    return await this.employeeRepo.findOne({where:{id: id}, 
      relations: ['manager','tasks','contactInfo','meetings']
    });
  }

  deleteEmployee(id: number){
    return this.employeeRepo.delete(id);
  }

  getHello(): string {
    return 'Hello World!';
  }
}
