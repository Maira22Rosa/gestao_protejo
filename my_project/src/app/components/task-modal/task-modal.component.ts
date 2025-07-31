import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TarefaDto } from 'src/app/dados/project-DTO';

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
  });
  @Input() task: TarefaDto = {
    titulo: '',
    descricao: '',
    status: 'PENDENTE',
    dataVencimento: '',
    projetoId: '',
    dataCriacao: '',
    dataAtualizacao: '',
  };
}
