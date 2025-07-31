import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TarefaDto } from 'src/app/dados/project-DTO';

@Component({
  selector: 'app-card-task',
  templateUrl: './card-task.component.html',
  styleUrls: ['./card-task.component.scss'],
})
export class CardTaskComponent implements OnInit {
  today: Date = new Date();
  viewModal: boolean = false;
  taskForm = new FormGroup({
    titulo: new FormControl(''),
    descricao: new FormControl(''),
    dataVencimento: new FormControl(''),
    projetoId: new FormControl(''),
    dataCriacao: new FormControl(''),
    dataAtualizacao: new FormControl(''),
  });
  @Input() tarefa: TarefaDto = {
    titulo: '',
    descricao: '',
    status: 'PENDENTE',
    dataVencimento: '',
    projetoId: '',
    dataCriacao: '',
    dataAtualizacao: '',
  };
  @Output() viewModalTask = new EventEmitter<{
    taskId: string;
    projetoId: string;
  }>();

  constructor() {}

  ngOnInit(): void {
    this.taskForm.patchValue({
      titulo: this.tarefa.titulo,
      descricao: this.tarefa.descricao || '',
      dataVencimento: this.formatDateToBR(
        this.tarefa.dataVencimento || '00/00/0000'
      ),
      dataCriacao: this.formatDateToBR(this.tarefa.dataCriacao),
      dataAtualizacao: this.formatDateToBR(this.tarefa.dataAtualizacao),
    });
  }

  formatDateToBR(isoDate: string): string {
    const date = new Date(isoDate);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`;
  }
}
