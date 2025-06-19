export interface Producto {
  id?: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  categoria_id: number;
}

export interface Categoria {
  id?: number;
  nombre: string;
}

export interface ProductoDetalle extends Producto {
  categoria?: Categoria;
}