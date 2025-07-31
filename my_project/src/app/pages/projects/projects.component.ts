import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProjetoDto } from 'src/app/dados/project-DTO';
import projectsJson from 'src/app/dados/projects-api.json';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  today: Date = new Date();
  viewTaks: boolean = false;
  meuFormulario = new FormGroup({
    nome: new FormControl(''),
    descricao: new FormControl(''),
  });
  viewModal: boolean = false;
  listProjects: any[] = [];
  constructor() {}
  ngOnInit() {
    this.listProjects = projectsJson;
  }
  viewTaskEmit() {
    this.viewTaks = this.viewTaks ? false : true;
  }

  viewModalEmit() {
    this.viewModal = this.viewModal ? false : true;
  }

  close() {
    this.viewModal = this.viewModal ? false : true;
  }

  onSubmit() {
    console.log(this.meuFormulario.value);
  }
}
