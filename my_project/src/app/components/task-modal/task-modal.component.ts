import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TarefaDto } from 'src/app/dados/project-DTO';
import { TaskService } from 'src/app/services/task-service';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss'],
})
export class TaskModalComponent {
  @Output() close = new EventEmitter<void>();
  @Input() taskForm = new FormGroup({
    titulo: new FormControl(''),
    descricao: new FormControl(''),
    dataVencimento: new FormControl(''),
    projetoId: new FormControl(''),
    dataCriacao: new FormControl(''),
    dataAtualizacao: new FormControl(''),
    status: new FormControl(''),
  });
  @Input() task: TarefaDto = {
    taskId: '',
    titulo: '',
    descricao: '',
    status: 'PENDENTE',
    dataVencimento: '',
    projetoId: '',
    dataCriacao: '',
    dataAtualizacao: '',
  };
  @Input() isEditing: boolean = false;
  @Input() projectId?: string;

  constructor(private taskService: TaskService) {}

  closeModal() {
    this.taskForm.reset();
    this.close.emit();
  }

  excluir() {
    console.log(this.task);
    this.taskService.deleteTask(this.projectId!, this.task.taskId!);
    this.close.emit();
  }

  enviar() {
    console.log(this.task, this.isEditing);
    const now = new Date().toISOString();
    if (this.isEditing) {
      const updatedTask = {
        taskId: this.task.taskId,
        titulo: this.taskForm.value.titulo || '',
        descricao: this.taskForm.value.descricao || '',
        status:
          (this.taskForm.value.status as
            | 'PENDENTE'
            | 'EM_ANDAMENTO'
            | 'CONCLUIDA') || 'PENDENTE',
        dataVencimento: this.taskForm.value.dataVencimento || '',
        projetoId: this.projectId!,
        dataCriacao: this.task.dataCriacao,
        dataAtualizacao: now,
      };
      this.taskService.updateTask(this.projectId!, updatedTask);
    } else {
      const newTask: TarefaDto = {
        taskId: this.taskForm.value.titulo + '001',
        titulo: this.taskForm.value.titulo || '',
        descricao: this.taskForm.value.descricao || '',
        status: 'PENDENTE',
        dataVencimento: this.taskForm.value.dataVencimento || '',
        projetoId: this.projectId!,
        dataCriacao: now,
        dataAtualizacao: now,
      };
      this.taskService.createTask(this.projectId!, newTask);
    }

    this.close.emit();
    this.taskForm.reset();
  }
}
