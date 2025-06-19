'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Categoria } from "@/types";

interface CategoryFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (categoria: Omit<Categoria, 'id'>) => void;
  categoria?: Categoria;
  title: string;
}

export function CategoryForm({ isOpen, onClose, onSubmit, categoria, title }: CategoryFormProps) {
  const [nombre, setNombre] = useState('');

  useEffect(() => {
    if (categoria) {
      setNombre(categoria.nombre);
    } else {
      setNombre('');
    }
  }, [categoria, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ nombre });
    onClose();
    setNombre('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">{title}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nombre">Nombre de la Categoría</Label>
            <Input
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ingrese el nombre de la categoría"
              required
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              {categoria ? 'Actualizar' : 'Crear'} Categoría
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}