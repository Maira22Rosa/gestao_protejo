import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProjectService } from 'src/app/services/project-service';

@Component({
  selector: 'app-project-modal',
  templateUrl: './project-modal.component.html',
  styleUrls: ['./project-modal.component.scss'],
})
export class ProjectModalComponent {
  @Output() close = new EventEmitter<void>();
  @Input() projectForm = new FormGroup({
    nome: new FormControl(''),
    descricao: new FormControl(''),
  });
  @Input() project?: any;
  @Input() isEditing: boolean = false;

  constructor(private projectService: ProjectService) {}

  closeModal() {
    this.projectForm.reset();
    this.close.emit();
  }
  enviar() {
    if (this.isEditing && this.project) {
      const updatedProject = {
        projectId: this.project.projectId,
        name: this.projectForm.value.nome || '',
        description: this.projectForm.value.descricao || '',
        dateCreate: new Date().toISOString(),
        dateUpdate: new Date().toISOString(),
        tasks: this.project.tasks || [],
      };
      this.projectService.updateProject(this.project.projectId, updatedProject);
    } else {
      this.projectService.createProject({
        projectId: this.projectForm.value.nome + '001',
        name: this.projectForm.value.nome || '',
        description: this.projectForm.value.descricao || '',
        dateCreate: new Date().toISOString(),
        dateUpdate: new Date().toISOString(),
        tasks: [],
      });
    }

    this.close.emit();
    this.projectForm.reset();
  }
}
