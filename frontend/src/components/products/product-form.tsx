import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Product, ProductFormData } from "@/types/product.ts";
import { useProducts } from "@/hooks/use-products";

const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    description: z.string().min(2, "Description must be at least 2 characters"),
    sku: z.string().min(2, "SKU must be at least 2 characters"),
    price: z.coerce.number().min(0, "Price must be positive"),
    category: z.string().min(1, "Category is required"),
    is_active: z.boolean().default(true),
});

interface ProductFormProps {
    product: Product | null;
    onSubmitSuccess: () => void;
}

export function ProductForm({ product, onSubmitSuccess }: ProductFormProps) {
    const { createProductMutation, updateProductMutation } = useProducts();

    const defaultValues: Partial<ProductFormData> = product
        ? {
            name: product.name,
            description: product.description,
            sku: product.sku,
            price: product.price,
            category: product.category,
            is_active: product.is_active,
        }
        : {
            name: "",
            description: "",
            sku: "",
            price: 0,
            category: "",
            is_active: true,
        };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues,
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        if (product) {
            updateProductMutation.mutate(
                { id: product.id, data: values },
                {
                    onSuccess: () => {
                        onSubmitSuccess();
                    },
                    onError: (error) => {
                        if (error.response?.status === 422) {
                            const serverErrors = error.response.data.errors;
                            Object.keys(serverErrors).forEach(field => {
                                form.setError(field as any, {
                                    type: 'server',
                                    message: serverErrors[field][0]
                                });
                            });
                        }
                    }
                }
            );
        } else {
            createProductMutation.mutate(values as ProductFormData, {
                onSuccess: () => {
                    onSubmitSuccess();
                },
            });
        }
    };

    const isSubmitting = createProductMutation.isPending || updateProductMutation.isPending;

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    {...field}
                                    value={field.value || ''}
                                    onChange={(e) => field.onChange(e.target.value || null)}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="sku"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>SKU</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Price</FormLabel>
                                <FormControl>
                                    <Input type="number" step="0.01" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <FormControl>
                                    <Input type="text" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="is_active"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <FormLabel className="text-base">Active</FormLabel>
                                <div className="text-sm text-muted-foreground">
                                    Set product availability status
                                </div>
                            </div>
                            <FormControl>
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <div className="flex justify-end space-x-2">
                    <Button variant="outline" type="button" onClick={onSubmitSuccess}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Saving..." : product ? "Update Product" : "Create Product"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}