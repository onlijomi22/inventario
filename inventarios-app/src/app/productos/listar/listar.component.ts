import { Component, OnInit } from '@angular/core';
import { ProductoService, Producto } from '../servicios/producto.service';

@Component({
  selector: 'app-listar',
  standalone: false,
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarProductosComponent implements OnInit {
  productos: Producto[] = [];
  productosPaginados: Producto[] = [];

  paginaActual = 1;
  elementosPorPagina = 5;
  totalPaginas = 0;

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos(): void {
    this.productoService.listar().subscribe({
      next: (res) => {
        this.productos = res;
        this.totalPaginas = Math.ceil(this.productos.length / this.elementosPorPagina);
        this.cambiarPagina(1);
      },
      error: (err) => console.error('Error al cargar productos', err)
    });
  }

  eliminar(id: number): void {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.productoService.eliminar(id).subscribe({
        next: () => this.obtenerProductos(),
        error: (err) => console.error('Error al eliminar', err)
      });
    }
  }

  cambiarPagina(pagina: number): void {
    this.paginaActual = pagina;
    const inicio = (pagina - 1) * this.elementosPorPagina;
    const fin = inicio + this.elementosPorPagina;
    this.productosPaginados = this.productos.slice(inicio, fin);
  }

}
