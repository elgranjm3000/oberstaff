'use client';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Tag } from "lucide-react";
import { Categoria } from "@/types";

interface CategoryCardProps {
  categoria: Categoria;
  productCount: number;
  onEdit: (categoria: Categoria) => void;
  onDelete: (id: number) => void;
}

export function CategoryCard({ categoria, productCount, onEdit, onDelete }: CategoryCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-sm bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <Tag className="h-4 w-4 text-green-600" />
          </div>
          <div>
            <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
              {categoria.nombre}
            </CardTitle>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-4">
        <div className="text-sm text-gray-600">
          <span className="font-medium">{productCount}</span> productos en esta categoría
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        <div className="flex space-x-2 w-full">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(categoria)}
            className="flex-1 hover:bg-orange-50 hover:border-orange-200"
          >
            <Edit className="h-4 w-4 mr-1" />
            Editar
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(categoria.id!)}
            className="hover:bg-red-50 hover:border-red-200 hover:text-red-600"
            disabled={productCount > 0}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}