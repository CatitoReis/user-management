import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {PaginaInicialComponent} from './pagina-inicial/pagina-inicial/pagina-inicial.component';
import {MatDialogModule} from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field';
import { InputTextModule } from 'primeng/inputtext';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './services/User.service';
import { DialogModule } from 'primeng/dialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MultiSelectModule } from 'primeng/multiselect';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { InputMaskModule } from 'primeng/inputmask';
import { ListboxModule } from 'primeng/listbox';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    PaginaInicialComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    InputTextModule,
    SplitButtonModule,
    TableModule,
    TagModule,
    DropdownModule,
    MatSelectModule,
    HttpClientModule,
    DialogModule,
    RadioButtonModule,
    MultiSelectModule,
    ReactiveFormsModule,
    InputMaskModule,
    ListboxModule,
    FormsModule,

  ],
  providers: [UserService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
