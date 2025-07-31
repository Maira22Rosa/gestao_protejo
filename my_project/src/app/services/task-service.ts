import projectsJson from 'src/app/dados/projects-api.json';
import { Injectable } from '@angular/core';
import { TarefaDto } from '../dados/project-DTO';
import { ProjectService } from './project-service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  listTasks: TarefaDto[] = projectsJson
    .map((project) =>
      project.tasks.map(
        (task) =>
          ({
            ...task,
            status:
              task.status === 'CONCLUIDA'
                ? 'CONCLUIDA'
                : task.status === 'EM_ANDAMENTO'
                ? 'EM_ANDAMENTO'
                : 'PENDENTE',
          } as TarefaDto)
      )
    )
    .flat();
  constructor(private projectService: ProjectService) {}

  getTaskById(projectId: string, taskId: string): TarefaDto | undefined {
    const project = this.projectService.getProjectById(projectId);
    return project?.tasks.find((task: TarefaDto) => task.taskId === taskId);
  }

  createTask(projectId: string, newTask: TarefaDto): void {
    const project = this.projectService.getProjectById(projectId);
    if (project) {
      project.tasks.push(newTask);
    }
  }

  updateTask(projectId: string, updatedTask: TarefaDto): void {
    const project = this.projectService.getProjectById(projectId);
    if (project) {
      const index = project.tasks.findIndex(
        (t) => t.taskId === updatedTask.taskId
      );
      if (index !== -1) {
        project.tasks[index] = { ...updatedTask };
      }
    }
  }

  deleteTask(projectId: string, taskId: string): void {
    const project = this.projectService.getProjectById(projectId);
    console.log(project?.tasks);

    if (project) {
      console.log('Deleting task:', taskId);
      project.tasks = project.tasks.filter((task) => task.taskId !== taskId);
    }

    console.log(project?.tasks);
  }
}
