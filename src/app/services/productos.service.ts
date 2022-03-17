import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../Interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  url: string = 'https://angular-html-675d1-default-rtdb.firebaseio.com/';

  cargando = true;

  productos: Producto[] = [];

  constructor(private http: HttpClient) { 

    this.cargarProductos();

  }

  private cargarProductos() {

    this.http.get(this.url+'productos_idx.json')
    .subscribe(( resp: any) => {
      this.productos = resp;
      this.cargando = false;
    });

  }

}
