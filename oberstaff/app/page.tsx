'use client';

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Package, Tag, TrendingUp } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { CategoryCard } from "@/components/CategoryCard";
import { ProductForm } from "@/components/ProductForm";
import { CategoryForm } from "@/components/CategoryForm";
import { ProductDetail } from "@/components/ProductDetail";
import { ApiService } from "@/services/api";
import { Producto, Categoria } from "@/types";
import { toast } from "sonner";

export default function Home() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal states
  const [productFormOpen, setProductFormOpen] = useState(false);
  const [categoryFormOpen, setCategoryFormOpen] = useState(false);
  const [productDetailOpen, setProductDetailOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Producto | undefined>();
  const [editingCategory, setEditingCategory] = useState<Categoria | undefined>();
  const [selectedProduct, setSelectedProduct] = useState<Producto | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [productosData, categoriasData] = await Promise.all([
        ApiService.getProductos(),
        ApiService.getCategorias()
      ]);
      setProductos(productosData);
      setCategorias(categoriasData);
    } catch (error) {
      toast.error('Error al cargar los datos');
    } finally {
      setLoading(false);
    }
  };

  // Product handlers
  const handleCreateProduct = async (productoData: Omit<Producto, 'id'>) => {
    try {
      await ApiService.createProducto(productoData);
      toast.success('Producto creado exitosamente');
      loadData();
    } catch (error) {
      toast.error('Error al crear el producto');
    }
  };

  const handleUpdateProduct = async (productoData: Omit<Producto, 'id'>) => {
    if (!editingProduct?.id) return;
    try {
      await ApiService.updateProducto(editingProduct.id, productoData);
      toast.success('Producto actualizado exitosamente');
      loadData();
    } catch (error) {
      toast.error('Error al actualizar el producto');
    }
  };

  const handleDeleteProduct = async (id: number) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      try {
        await ApiService.deleteProducto(id);
        toast.success('Producto eliminado exitosamente');
        loadData();
      } catch (error) {
        toast.error('Error al eliminar el producto');
      }
    }
  };

  // Category handlers
  const handleCreateCategory = async (categoriaData: Omit<Categoria, 'id'>) => {
    try {
      await ApiService.createCategoria(categoriaData);
      toast.success('Categoría creada exitosamente');
      loadData();
    } catch (error) {
      toast.error('Error al crear la categoría');
    }
  };

  const handleUpdateCategory = async (categoriaData: Omit<Categoria, 'id'>) => {
    if (!editingCategory?.id) return;
    try {
      await ApiService.updateCategoria(editingCategory.id, categoriaData);
      toast.success('Categoría actualizada exitosamente');
      loadData();
    } catch (error) {
      toast.error('Error al actualizar la categoría');
    }
  };

  const handleDeleteCategory = async (id: number) => {
    const productCount = productos.filter(p => p.categoria_id === id).length;
    if (productCount > 0) {
      toast.error('No se puede eliminar una categoría que tiene productos asociados');
      return;
    }

    if (window.confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
      try {
        await ApiService.deleteCategoria(id);
        toast.success('Categoría eliminada exitosamente');
        loadData();
      } catch (error) {
        toast.error('Error al eliminar la categoría');
      }
    }
  };

  // Modal handlers
  const openProductForm = (producto?: Producto) => {
    setEditingProduct(producto);
    setProductFormOpen(true);
  };

  const openCategoryForm = (categoria?: Categoria) => {
    setEditingCategory(categoria);
    setCategoryFormOpen(true);
  };

  const openProductDetail = (producto: Producto) => {
    setSelectedProduct(producto);
    setProductDetailOpen(true);
  };

  // Filter functions
  const filteredProducts = productos.filter(producto =>
    producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    producto.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCategories = categorias.filter(categoria =>
    categoria.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getProductCountByCategory = (categoriaId: number) => {
    return productos.filter(p => p.categoria_id === categoriaId).length;
  };

  const totalProducts = productos.length;
  const totalCategories = categorias.length;
  const totalValue = productos.reduce((sum, p) => sum + (p.precio * p.stock), 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando inventario...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Sistema de Inventario
          </h1>
          <p className="text-gray-600">
            Gestiona tus productos y categorías de manera eficiente
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border-0">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Productos</p>
                <p className="text-2xl font-bold text-gray-900">{totalProducts}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border-0">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <Tag className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Categorías</p>
                <p className="text-2xl font-bold text-gray-900">{totalCategories}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border-0">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-orange-100 rounded-xl">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Valor Total</p>
                <p className="text-2xl font-bold text-gray-900">${totalValue.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar productos o categorías..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/80 backdrop-blur-sm border-0 shadow-sm"
            />
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="productos" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-white/80 backdrop-blur-sm">
            <TabsTrigger value="productos" className="text-sm font-medium">
              Productos ({filteredProducts.length})
            </TabsTrigger>
            <TabsTrigger value="categorias" className="text-sm font-medium">
              Categorías ({filteredCategories.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="productos" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-900">Productos</h2>
              <Button
                onClick={() => openProductForm()}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Nuevo Producto
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((producto) => (
                <ProductCard
                  key={producto.id}
                  producto={producto}
                  categorias={categorias}
                  onView={openProductDetail}
                  onEdit={openProductForm}
                  onDelete={handleDeleteProduct}
                />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No se encontraron productos</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="categorias" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-900">Categorías</h2>
              <Button
                onClick={() => openCategoryForm()}
                className="bg-green-600 hover:bg-green-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Nueva Categoría
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCategories.map((categoria) => (
                <CategoryCard
                  key={categoria.id}
                  categoria={categoria}
                  productCount={getProductCountByCategory(categoria.id!)}
                  onEdit={openCategoryForm}
                  onDelete={handleDeleteCategory}
                />
              ))}
            </div>

            {filteredCategories.length === 0 && (
              <div className="text-center py-12">
                <Tag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No se encontraron categorías</p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Modals */}
        <ProductForm
          isOpen={productFormOpen}
          onClose={() => {
            setProductFormOpen(false);
            setEditingProduct(undefined);
          }}
          onSubmit={editingProduct ? handleUpdateProduct : handleCreateProduct}
          producto={editingProduct}
          categorias={categorias}
          title={editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
        />

        <CategoryForm
          isOpen={categoryFormOpen}
          onClose={() => {
            setCategoryFormOpen(false);
            setEditingCategory(undefined);
          }}
          onSubmit={editingCategory ? handleUpdateCategory : handleCreateCategory}
          categoria={editingCategory}
          title={editingCategory ? 'Editar Categoría' : 'Nueva Categoría'}
        />

        <ProductDetail
          isOpen={productDetailOpen}
          onClose={() => {
            setProductDetailOpen(false);
            setSelectedProduct(null);
          }}
          producto={selectedProduct}
          categorias={categorias}
        />
      </div>
    </div>
  );
}