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

  productoFiltrado: Producto[] = [];

  constructor(private http: HttpClient) { 

    this.cargarProductos();

  }

  private cargarProductos() {

    return new Promise((resolve, reject) => {
      this.http.get(this.url+'productos_idx.json')
      .subscribe(( resp: any) => {
        this.productos = resp;
        this.cargando = false;
        resolve;
      });
    });

  }

  getProductos(id: string){

    return this.http.get(`https://angular-html-675d1-default-rtdb.firebaseio.com/productos/${id}.json`)

  }

  buscarProducto(termino: string) {

    if(this.productos.length === 0) {
      
      this.cargarProductos().then( () => {
        this.filtrarProducto(termino);
      });

    }
    else{
      this.filtrarProducto(termino);
    } 

  }

  filtrarProducto(termino: string){

    this.productoFiltrado = [];

    termino = termino.toLocaleLowerCase();

    this.productos.forEach( prod => {

      const tituloLower = prod.titulo.toLocaleLowerCase(); 

      if(prod.categoria.indexOf(termino) >= 0 || tituloLower.indexOf(termino) >= 0){
        this.productoFiltrado.push(prod);
      }

    });

  }

}
