import CategoryForm from "./CategoryForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../GUI/Dialog";
import React, { ReactNode } from "react";

interface CategoryDialogProps {
  children: ReactNode;
}

const CategoryDialog: React.FC<CategoryDialogProps> = ({ children }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Category</DialogTitle>
        </DialogHeader>
        <CategoryForm />
      </DialogContent>
    </Dialog>
  );
};

export default CategoryDialog;
