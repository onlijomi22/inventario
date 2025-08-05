import { Component, OnInit } from '@angular/core';
import { TransaccionService, Transaccion } from '../servicios/transaccion.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-listar-transacciones',
  standalone: false,
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {
  transacciones: Transaccion[] = [];
  transaccionesPaginadas: Transaccion[] = [];
  error = '';
  filtroForm!: FormGroup;
  paginaActual = 1;
  elementosPorPagina = 5;
  totalPaginas = 0;

  constructor(private transaccionService: TransaccionService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.filtroForm = this.fb.group({
      productoId: [''],
      tipo: [''],
      desde: [''],
      hasta: ['']
    });

    this.obtenerTransacciones();
  }

obtenerTransacciones(): void {
  const { productoId, tipo, desde, hasta } = this.filtroForm.value;

  this.transaccionService.listar({
    productoId,
    tipo,
    desde,
    hasta
  }).subscribe({
    next: (data) => {
      this.transacciones = data;
      this.totalPaginas = Math.ceil(this.transacciones.length / this.elementosPorPagina);
      this.cambiarPagina(1);
    },
    error: () => this.error = 'Error al obtener transacciones'
  });
}

  limpiar(): void {
    this.filtroForm.reset();
    this.obtenerTransacciones();
  }

  eliminar(id: number): void {
    if (confirm('¿Estás seguro de eliminar esta transacción?')) {
      this.transaccionService.eliminar(id).subscribe({
        next: () => this.obtenerTransacciones(),
        error: (err) => console.error('Error al eliminar', err)
      });
    }
  }

  cambiarPagina(pagina: number): void {
    if (pagina < 1 || pagina > this.totalPaginas) return;

    this.paginaActual = pagina;
    const inicio = (pagina - 1) * this.elementosPorPagina;
    const fin = inicio + this.elementosPorPagina;
    this.transaccionesPaginadas = this.transacciones.slice(inicio, fin);
  }

  paginas(): number[] {
    return Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
  }


}
