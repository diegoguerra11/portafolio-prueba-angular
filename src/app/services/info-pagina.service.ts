import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InfoPagina } from '../Interfaces/info-pagina.interface';
import { InfoEquipo } from '../Interfaces/info-equipo.interface';
import { toArray } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {};
  cargada = false;

  equipo: InfoEquipo[] = [];

  constructor(private http: HttpClient) {

    //leer archivo json

    this.cargarInfo();

    this.cargarEquipo();

  }

  private cargarInfo() 
  {
    this.http.get('assets/data/data-paginate.json')
    .subscribe((resp : InfoPagina ) => {     
      this.cargada = true;
      this.info = resp;
    });
  }

  private cargarEquipo() 
  {
    this.http.get('https://angular-html-675d1-default-rtdb.firebaseio.com/equipo.json')
    .subscribe((resp: any) => {
      this.equipo = resp;
    });
  }
}
