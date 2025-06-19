'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Package, Tag, DollarSign, Archive } from "lucide-react";
import { Producto, Categoria } from "@/types";

interface ProductDetailProps {
  isOpen: boolean;
  onClose: () => void;
  producto: Producto | null;
  categorias: Categoria[];
}

export function ProductDetail({ isOpen, onClose, producto, categorias }: ProductDetailProps) {
  if (!producto) return null;

  const categoria = categorias.find(c => c.id === producto.categoria_id);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Detalles del Producto
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-blue-100 rounded-xl">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-1">
                {producto.nombre}
              </h3>
              {categoria && (
                <Badge variant="secondary" className="mb-2">
                  <Tag className="h-3 w-3 mr-1" />
                  {categoria.nombre}
                </Badge>
              )}
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="font-medium text-gray-900 mb-2">Descripción</h4>
            <p className="text-gray-600 leading-relaxed">
              {producto.descripcion}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <DollarSign className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Precio</p>
                  <p className="text-lg font-semibold text-green-600">
                    ${producto.precio.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Archive className="h-4 w-4 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Stock Disponible</p>
                  <p className={`text-lg font-semibold ${producto.stock < 10 ? 'text-red-600' : 'text-gray-900'}`}>
                    {producto.stock} unidades
                  </p>
                  {producto.stock < 10 && (
                    <Badge variant="destructive" className="text-xs mt-1">
                      Stock Bajo
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Información Adicional</h4>
            <div className="text-sm text-gray-600 space-y-1">
              <p>• ID del Producto: #{producto.id}</p>
              <p>• Valor Total en Stock: ${(producto.precio * producto.stock).toLocaleString()}</p>
              <p>• Estado: {producto.stock > 0 ? 'Disponible' : 'Agotado'}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}