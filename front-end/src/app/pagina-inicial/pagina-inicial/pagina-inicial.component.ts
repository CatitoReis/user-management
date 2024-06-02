import { UserService } from './../../services/User.service';
import { User } from './../../models/User';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { FilterMetadata } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-pagina-inicial',
  templateUrl: './pagina-inicial.component.html',
  styleUrls: ['./pagina-inicial.component.scss']
})
export class PaginaInicialComponent implements OnInit {
  usuarios!: User[];
  first = 0;
  rows = 10;
  opcoesStatus: any[];
  opcoesIdioma: any[];
  opcoesPerfilAcess: any[];
  userForm!: FormGroup;
  visible: boolean = false;

  @ViewChild('dt') dt: Table | undefined;

  constructor(private userService: UserService, private fb: FormBuilder) {
    this.opcoesStatus = [
      { label: 'Todos', value: null },
      { label: 'Ativo', value: 'ativo' },
      { label: 'Pendente', value: 'pendente' },
      { label: 'Bloqueado', value: 'bloqueado' }
    ];

    this.opcoesIdioma = [
      { label: 'Todos', value: null },
      { label: 'Português', value: 'pt-BR' },
      { label: 'Inglês', value: 'en-US' },
      { label: 'Espanhol', value: 'es-Es' }
    ];

    this.opcoesPerfilAcess = [
      { label: 'Supervisor', value: 'supervisor' },
      { label: 'Analista', value: 'analista' },
    ];
   }

  ngOnInit() {
   this. buscarUsuarios();
   this.montaForm();
  }

  buscarUsuarios() {
    this.usuarios = [];
    this.userService.getUsers().subscribe(Object => {this.usuarios = Object
    })
  }

  next() {
    this.first = this.first + this.rows;
}


  prev() {
    this.first = this.first - this.rows;
}


  reset() {
      this.first = 0;
  }


  pageChange(event: any) {
      this.first = event.first;
      this.rows = event.rows;
  }


  isLastPage(): boolean {
      return this.usuarios ? this.first === this.usuarios.length - this.rows : true;
  }


  isFirstPage(): boolean {
      return this.usuarios ? this.first === 0 : true;
  }


  clear(table: Table) {
    table.clear();
}


getFilterValue(filter: FilterMetadata | FilterMetadata[]): string {
  if (Array.isArray(filter)) {
    return filter.length > 0 ? filter[0].value : '';
  } else {
    return filter ? filter.value : '';
  }
}

montaForm(): void{
  this.userForm = this.fb.group({
    nome: ['', [Validators.required ]],
    sobrenome: ['', [Validators.required]],
    telefone: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    perfilAcesso: ['', [Validators.required]],
    idioma: ['', [Validators.required]],
    contato: ['', [Validators.required]],
    status: ['ativo'],
    dataCriacao: [new Date()],
    ultimoAcesso: [new Date()],
  });
}

onSubmit(): void {
  if (this.userForm.valid) {
    console.log(this.userForm.value);
    this.salvarUsuario();
  } else {
    console.log('Formulário inválido');
  }
}

salvarUsuario() {
var user: User = this.userForm.value;
this.montaForm();
this.userService.saveUsers(user).subscribe(response => {
  this.buscarUsuarios();
  this.visible = false
})}

showDialog() {
  this.visible = true;
}
}
