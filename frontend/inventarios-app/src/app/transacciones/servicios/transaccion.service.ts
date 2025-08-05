import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Transaccion {
  id?: number;
  fecha: Date;
  tipo: 'compra' | 'venta';
  productoId: number;
  cantidad: number;
  precioUnitario: number;
  precioTotal?: number;
  detalle: string;
}

@Injectable({
  providedIn: 'root'
})
export class TransaccionService {
  private baseUrl = 'http://localhost:5110/api/transacciones';

  constructor(private http: HttpClient) {}

 listar(filtros?: {
  productoId?: number;
  tipo?: string;
  desde?: Date;
  hasta?: Date;
}): Observable<Transaccion[]> {
  let params = new HttpParams();

  if (filtros?.productoId) {
    params = params.set('productoId', filtros.productoId.toString());
  }

  if (filtros?.tipo && filtros.tipo !== 'Todos') {
    params = params.set('tipo', filtros.tipo); // Solo si no es "todos"
  }

  if (filtros?.desde) {
    params = params.set('desde', filtros.desde.toISOString());
  }

  if (filtros?.hasta) {
    params = params.set('hasta', filtros.hasta.toISOString());
  }

  return this.http.get<Transaccion[]>(this.baseUrl, { params });
}

  registrar(transaccion: Transaccion): Observable<Transaccion> {
    return this.http.post<Transaccion>(this.baseUrl, transaccion);
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

}
