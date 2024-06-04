import { UserService } from './../../services/User.service';
import { BandeiraTelefone, User } from './../../models/User';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { FilterMetadata } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-pagina-inicial',
  templateUrl: './pagina-inicial.component.html',
  styleUrls: ['./pagina-inicial.component.scss'],
  providers: [DatePipe]
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
  submitted = false;
  conviteSucess: boolean = false;
  bandeirasTel: BandeiraTelefone[];

  @ViewChild('dt') dt: Table | undefined;

  constructor(private userService: UserService, private fb: FormBuilder, private datePipe: DatePipe) {
    this.opcoesStatus = [
      { label: 'Filtrar', value: null },
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

    this.bandeirasTel = [
      { name: 'BRA', code: '55', flagImagePath: '../../../assets/brasil-icon.png' },
      { name: 'EUA', code: '01', flagImagePath: '../../../assets/eua-icon.png' },
      { name: 'ESP', code: '34', flagImagePath: '../../../assets/espanha-icon.png' },
      { name: 'ARG', code: '54', flagImagePath: '../../../assets/arg-icon.png' },
      { name: 'FRA', code: '33', flagImagePath: '../../../assets/fran-icon.png' }
    ];
  }

  ngOnInit() {
    this.buscarUsuarios();
    this.montaForm();

    this.userForm.get('pais')?.valueChanges.subscribe(() => {
      const paisCode = this.userForm.get('pais')?.value?.code || '';
      this.userForm.get('telefone')?.setValue(paisCode);
    });
  }

  buscarUsuarios() {
    this.usuarios = [];
    this.userService.getUsers().subscribe(users => {
      this.usuarios = users;
    });
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

  montaForm(): void {
    this.userForm = this.fb.group({
      nome: ['', [Validators.required]],
      sobrenome: ['', [Validators.required]],
      telefone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      perfilAcesso: [[], [Validators.required]],
      idioma: ['', [Validators.required]],
      contato: ['', [Validators.required]],
      status: ['ativo'],
      dataCriacao: [new Date()],
      ultimoAcesso: [new Date()],
      pais: [null, [Validators.required]]
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.userForm.valid) {
      const user = { ...this.userForm.value, dataCriacao: new Date(), ultimoAcesso: new Date(), status: 'ativo' };
      this.userService.saveUsers(user).subscribe(response => {
        this.buscarUsuarios();
        this.visible = false;
        this.resetForm();
        this.conviteSucess = true;
      });
    } else {
      this.submitted = true;
    }
  }

  resetForm() {
    this.userForm.reset({
      nome: '',
      sobrenome: '',
      telefone: '',
      email: '',
      perfilAcesso: [],
      idioma: '',
      contato: '',
      status: 'ativo',
      dataCriacao: new Date(),
      ultimoAcesso: new Date(),
      pais: null
    });
    this.submitted = false;
    this.conviteSucess = false;
  }

  formatDataCriacao(date: string): string | null {
    return this.datePipe.transform(date, 'dd/MM/yyyy');
  }

  formatUltimoAcesso(date: string): string | null {
    const formattedDate = this.datePipe.transform(date, 'dd/MM/yyyy') ?? '';
    const formattedTime = this.datePipe.transform(date, 'HH:mm') ?? '';
    return `${formattedDate} às ${formattedTime}h`;
  }

  showDialog() {
    this.resetForm();
    this.visible = true;
  }

  fecharDialog(): void {
    if (this.userForm.dirty) {
      const confirmacao = confirm('Deseja sair sem Salvar?');
      if (confirmacao) {
        this.userForm.reset();
        this.visible = false;
        this.submitted = false;
        this.conviteSucess = false;
      }
    } else {
      this.visible = false;
      this.submitted = false;
    }
  }

}
