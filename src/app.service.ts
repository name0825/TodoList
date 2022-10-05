import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/User.entity';
import { Todo } from './entities/Todo.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  getAllTodoLists(userSeq: number): Promise<Todo[]> {
    return this.todoRepository.findBy({ userSeq });
  }

  writeTodoList(userData: any, todo: string, targetDate: Date) {
    const todoData = new Todo();
    todoData.userSeq = userData.userSeq;
    todoData.todo = todo;
    todoData.targetDate = targetDate;
    return this.todoRepository.save(todoData);
  }
}
