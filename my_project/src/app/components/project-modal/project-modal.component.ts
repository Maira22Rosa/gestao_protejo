import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

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
}
