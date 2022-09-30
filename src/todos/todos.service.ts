import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { Todos } from './todos.entity';

@Injectable()
export class TodosService {
  constructor(@InjectRepository(Todos) private repo: Repository<Todos>) {}

  create(body: CreateTodoDto) {
    const todo = this.repo.create(body);
    return this.repo.save(todo);
  }

  find() {
    return this.repo.find();
  }

  findOne(id: string) {
    if (!id) return null;
    return this.repo.findOne(id);
  }

  deleteOne(id: string){
    if (!id) return null;
    return this.repo.delete(id);
  }

  async update(id: string) {
    const todo = await this.repo.findOne(id);
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }
    return this.repo.save({ ...todo, isCompleted: true });
  }
}
