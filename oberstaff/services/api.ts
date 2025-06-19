const API_BASE_URL = '/api';

export class ApiService {
  // Categorías
  static async getCategorias(): Promise<any[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/categorias`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Error al obtener categorías');
      return await response.json();
    } catch (error) {
      console.error('Error fetching categorías:', error);
      return [];
    }
  }

  static async createCategoria(categoria: { nombre: string }): Promise<any> {
    try {
      const response = await fetch(`${API_BASE_URL}/categorias`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(categoria),
      });
      if (!response.ok) throw new Error('Error al crear categoría');
      return await response.json();
    } catch (error) {
      console.error('Error creating categoría:', error);
      throw error;
    }
  }

  static async updateCategoria(id: number, categoria: { nombre: string }): Promise<any> {
    try {
      const response = await fetch(`${API_BASE_URL}/categorias/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(categoria),
      });
      if (!response.ok) throw new Error('Error al actualizar categoría');
      return await response.json();
    } catch (error) {
      console.error('Error updating categoría:', error);
      throw error;
    }
  }

  static async deleteCategoria(id: number): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/categorias/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Error al eliminar categoría');
    } catch (error) {
      console.error('Error deleting categoría:', error);
      throw error;
    }
  }

  // Productos
  static async getProductos(): Promise<any[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/productos`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Error al obtener productos aqui');
      return await response.json();
    } catch (error) {
      console.error('Error fetching productos:', error);
      return [];
    }
  }

  static async getProducto(id: number): Promise<any> {
    try {
      const response = await fetch(`${API_BASE_URL}/productos/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Error al obtener producto');
      return await response.json();
    } catch (error) {
      console.error('Error fetching producto:', error);
      throw error;
    }
  }

  static async createProducto(producto: Omit<any, 'id'>): Promise<any> {
    try {
      const response = await fetch(`${API_BASE_URL}/productos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(producto),
      });
      if (!response.ok) throw new Error('Error al crear producto');
      return await response.json();
    } catch (error) {
      console.error('Error creating producto:', error);
      throw error;
    }
  }

  static async updateProducto(id: number, producto: Omit<any, 'id'>): Promise<any> {
    try {
      const response = await fetch(`${API_BASE_URL}/productos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(producto),
      });
      if (!response.ok) throw new Error('Error al actualizar producto');
      return await response.json();
    } catch (error) {
      console.error('Error updating producto:', error);
      throw error;
    }
  }

  static async deleteProducto(id: number): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/productos/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Error al eliminar producto');
    } catch (error) {
      console.error('Error deleting producto:', error);
      throw error;
    }
  }

  // Nuevo método para filtrar productos por nombre
  static async filtrarProductosPorNombre(nombre: string): Promise<any[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/productos/filtrar?name=${encodeURIComponent(nombre)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Error al filtrar productos');
      return await response.json();
    } catch (error) {
      console.error('Error filtering productos:', error);
      return [];
    }
  }
}