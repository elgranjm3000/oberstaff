'use client';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Edit, Trash2, Package } from "lucide-react";
import { Producto, Categoria } from "@/types";

interface ProductCardProps {
  producto: Producto;
  categorias: Categoria[];
  onView: (producto: Producto) => void;
  onEdit: (producto: Producto) => void;
  onDelete: (id: number) => void;
}

export function ProductCard({ producto, categorias, onView, onEdit, onDelete }: ProductCardProps) {
  const categoria = categorias.find(c => c.id === producto.categoria_id);
  
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-sm bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Package className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {producto.nombre}
              </CardTitle>
              {categoria && (
                <Badge variant="secondary" className="mt-1 text-xs">
                  {categoria.nombre}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-4">
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {producto.descripcion}
        </p>
        
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <div className="text-2xl font-bold text-green-600">
              ${producto.precio.toLocaleString()}
            </div>
            <div className="text-sm text-gray-500">
              Stock: <span className={`font-medium ${producto.stock < 10 ? 'text-red-500' : 'text-gray-700'}`}>
                {producto.stock}
              </span>
            </div>
          </div>
          
          {producto.stock < 10 && (
            <Badge variant="destructive" className="text-xs">
              Stock Bajo
            </Badge>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        <div className="flex space-x-2 w-full">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onView(producto)}
            className="flex-1 hover:bg-blue-50 hover:border-blue-200"
          >
            <Eye className="h-4 w-4 mr-1" />
            Ver
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(producto)}
            className="flex-1 hover:bg-orange-50 hover:border-orange-200"
          >
            <Edit className="h-4 w-4 mr-1" />
            Editar
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(producto.id!)}
            className="hover:bg-red-50 hover:border-red-200 hover:text-red-600"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}