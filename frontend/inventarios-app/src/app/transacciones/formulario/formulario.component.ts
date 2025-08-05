import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransaccionService } from '../servicios/transaccion.service';
import { ProductoService, Producto } from '../../productos/servicios/producto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario-transaccion',
  standalone: false,
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioTransaccionComponent implements OnInit {
  transaccionForm!: FormGroup;
  productos: Producto[] = [];
  mensaje = '';
  error = '';

  constructor(
    private fb: FormBuilder,
    private transaccionService: TransaccionService,
    private productoService: ProductoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.transaccionForm = this.fb.group({
      tipo: ['venta', Validators.required],
      productoId: ['', Validators.required],
      cantidad: [0, [Validators.required, Validators.min(1)]],
      precioUnitario: [0, [Validators.required, Validators.min(0.01)]],
      detalle: ['']
    });

    this.productoService.listar().subscribe({
      next: (res) => this.productos = res,
      error: () => this.error = 'Error al cargar productos'
    });
  }

  onSubmit(): void {
    if (this.transaccionForm.invalid) return;

    const transaccion = {
      ...this.transaccionForm.value,
      fecha: new Date()
    };

    this.transaccionService.registrar(transaccion).subscribe({
      next: () => {
        this.mensaje = 'Transacción registrada correctamente';
        this.router.navigate(['/transacciones']);
      },
      error: () => this.error = 'Error al registrar transacción'
    });
  }
}
