import projectsJson from 'src/app/dados/projects-api.json';
import { Injectable } from '@angular/core';
import { ProjetoDto } from '../dados/project-DTO';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  listProjects: any[] = projectsJson;
  constructor() {}

  getProjects(): ProjetoDto[] {
    return this.listProjects;
  }

  getProjectById(projectId: string): ProjetoDto | undefined {
    return this.listProjects.find((project) => project.projectId === projectId);
  }

  createProject(project: ProjetoDto): void {
    this.listProjects.push(project);
  }

  updateProject(projectId: string, updatedProject: ProjetoDto): void {
    const index = this.listProjects.findIndex(
      (project) => project.projectId === projectId
    );
    if (index !== -1) {
      this.listProjects[index] = {
        ...this.listProjects[index],
        ...updatedProject,
      };
    }
  }

  deleteProject(projectId: string): void {
    this.listProjects = this.listProjects.filter(
      (project) => project.projectId !== projectId
    );
  }
}

// EXEMPLO DE USO DO HTTP (SE TIVESSE UMA API)
//  constructor(private http: HttpClient) {}

//   getProjetos(page: number, limit: number): Observable<ProjetoDto[]> {
//     return this.http.get<ProjetoDto[]>(`${this.URI}?page=${page}&limit=${limit}`);
//   }

//   create(projeto: ProjetoDto): Observable<any> {
//     return this.http.post<ProjetoDto>(`${this.URI}`, projeto);
//   }

//   getById(projetoId: any): Observable<ProjetoDto> {
//     return this.http.get<ProjetoDto>(`${this.URI}/${projetoId}`);
//   }

//   delete(projetoId: any): Observable<ProjetoDto> {
//     return this.http.delete<ProjetoDto>(`${this.URI}/${projetoId}`);
//   }

//   update(projetoId: any, projeto: ProjetoDto): Observable<ProjetoDto> {
//     return this.http.patch<ProjetoDto>(`${this.URI}/${projetoId}`, projeto);
//   }
