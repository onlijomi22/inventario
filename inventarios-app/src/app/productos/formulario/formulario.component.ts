import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService, Producto } from '../servicios/producto.service';

@Component({
  selector: 'app-formulario',
  standalone: false,
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioProductoComponent implements OnInit {
  productoForm!: FormGroup;
  mensaje = '';
  error = '';
  esEdicion = false;
  idProducto!: number;
  imagenBase64: string = '';
  imagenPreview: string | ArrayBuffer | null = null;


  constructor(
    private fb: FormBuilder,
    private productoService: ProductoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      categoria: [''],
      imagen: [''],
      precio: [0, [Validators.required, Validators.min(0.01)]],
      stock: [0, [Validators.required, Validators.min(0)]]
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.esEdicion = true;
        this.idProducto = parseInt(id, 10);
        this.cargarProducto(this.idProducto);
      }
    });
  }

  cargarProducto(id: number): void {
    this.productoService.obtenerPorId(id).subscribe({
      next: (producto) => this.productoForm.patchValue(producto),
      error: () => this.error = 'Error al cargar el producto'
    });
  }

  imagenSeleccionada(event: Event): void {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagenPreview = reader.result;
      this.imagenBase64 = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}


  onSubmit(): void {
    if (this.productoForm.invalid) return;

    const nuevoProducto: Producto = {
      ...this.productoForm.value,
      imagen: this.imagenBase64
    };


    if (this.esEdicion) {
      this.productoService.actualizar(this.idProducto, nuevoProducto).subscribe({
        next: () => {
          this.mensaje = 'Producto actualizado correctamente';
          this.router.navigate(['/productos']);
        },
        error: () => this.error = 'Error al actualizar producto'
      });
    } else {
      this.productoService.guardar(nuevoProducto).subscribe({
        next: () => {
          this.mensaje = 'Producto registrado correctamente';
          this.router.navigate(['/productos']);
        },
        error: () => this.error = 'Error al registrar producto'
      });
    }
  }
}
