import { ProjectService } from './../../services/project-service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProjetoDto, TarefaDto } from 'src/app/dados/project-DTO';
import projectsJson from 'src/app/dados/projects-api.json';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  viewTaksProjectId: string | null = null;
  viewTaks: boolean = false;
  isEditing: boolean = false;
  isEditingTask: boolean = false;

  projectForm = new FormGroup({
    nome: new FormControl(''),
    descricao: new FormControl(''),
  });
  project: any;
  projectId?: string;
  viewModal: boolean = false;
  viewModalTask: boolean = false;
  listProjects: any[] = [];
  task: TarefaDto = {
    titulo: '',
    status: 'CONCLUIDA',
    projetoId: '',
    dataCriacao: '',
    dataAtualizacao: '',
  };

  taskForm = new FormGroup({
    titulo: new FormControl(''),
    descricao: new FormControl(''),
    dataVencimento: new FormControl(''),
    projetoId: new FormControl(''),
    dataCriacao: new FormControl(''),
    dataAtualizacao: new FormControl(''),
  });

  constructor(private projectService: ProjectService) {}
  ngOnInit() {
    this.listProjects = projectsJson;
  }

  viewTaskEmit(projectId: string) {
    this.viewTaksProjectId =
      this.viewTaksProjectId === projectId ? null : projectId;
  }

  viewModalEmit() {
    this.viewModal = this.viewModal ? false : true;
    this.isEditing = false;
  }

  delete(projectId: string) {
    this.projectService.deleteProject(projectId);
    this.listProjects = this.projectService.getProjects();
  }

  editProject(project: ProjetoDto) {
    this.viewModalEmit();
    this.projectForm.patchValue({
      nome: project.name,
      descricao: project.description || '',
    });
    this.isEditing = true;
    this.project = project;
  }

  addTask() {
    this.viewModalTask = true;
    this.isEditingTask = false;
  }

  showDadosTask(taskId: string, projectId: string) {
    const projetoSelecionado = this.listProjects.find(
      (project) => project.projectId === projectId
    );

    this.projectId = projectId;

    if (!projetoSelecionado) {
      console.error('Projeto não encontrado');
      return;
    }

    const tarefaSelecionada = projetoSelecionado.tasks.find(
      (task: TarefaDto) => task.taskId === taskId
    );

    if (!tarefaSelecionada) {
      console.error('Tarefa não encontrada');
      return;
    }

    this.task = tarefaSelecionada;
    this.viewModalTask = true;
    this.isEditingTask = true;

    this.taskForm.patchValue({
      titulo: this.task.titulo,
      descricao: this.task.descricao || '',
      dataVencimento: this.formatDateToBR(
        this.task.dataVencimento || '00/00/0000'
      ),
      dataCriacao: this.formatDateToBR(this.task.dataCriacao),
      dataAtualizacao: this.formatDateToBR(this.task.dataAtualizacao),
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
