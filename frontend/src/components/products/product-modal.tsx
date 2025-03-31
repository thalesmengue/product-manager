import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Product } from "@/types/product.ts";
import { ProductForm } from "@/components/products/product-form";

interface ProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: Product | null;
}

export function ProductModal({ isOpen, onClose, product }: ProductModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>
                        {product ? `Edit Product: ${product.name}` : "Create New Product"}
                    </DialogTitle>
                </DialogHeader>
                <ProductForm product={product} onSubmitSuccess={onClose} />
            </DialogContent>
        </Dialog>
    );
}