import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get('name');

    if (!name) {
      return NextResponse.json(
        { error: 'El parámetro "name" es requerido' },
        { status: 400 }
      );
    }

    // Primero obtenemos todos los productos
    const response = await fetch(`${API_BASE_URL}/productos`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener productos');
    }

    const productos = await response.json();
    
    // Filtramos los productos por nombre (búsqueda insensible a mayúsculas/minúsculas)
    const productosFiltrados = productos.filter((producto: any) =>
      producto.nombre.toLowerCase().includes(name.toLowerCase())
    );

    return NextResponse.json(productosFiltrados);
  } catch (error) {
    console.error('Error filtering productos:', error);
    return NextResponse.json(
      { error: 'Error al filtrar productos' },
      { status: 500 }
    );
  }
}