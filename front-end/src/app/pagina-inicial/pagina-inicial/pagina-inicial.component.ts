import { UserService } from './../../services/User.service';
import { User } from './../../models/User';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { FilterMetadata } from 'primeng/api';

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
  visible: boolean = false;
  @ViewChild('dt') dt: Table | undefined;

  constructor(private userService: UserService) {
    this.opcoesStatus = [
      { label: 'Todos', value: null },
      { label: 'Ativo', value: 'ativo' },
      { label: 'Pendente', value: 'pendente' },
      { label: 'Bloqueado', value: 'bloqueado' }
    ];
   }

  ngOnInit() {
   this.userService.getUsers().subscribe(Object => {this.usuarios = Object
    console.log('aqui', this.usuarios)
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

showDialog() {
  this.visible = true;
}
}
