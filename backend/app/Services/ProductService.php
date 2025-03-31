<?php

namespace App\Services;

use App\Entities\Product;
use App\Repositories\ProductRepositoryInterface;

class ProductService
{
    private ProductRepositoryInterface $repository;

    public function __construct(ProductRepositoryInterface $repository)
    {
        $this->repository = $repository;
    }

    public function store(array $data): Product
    {
        $product = new Product();
        $product->setName($data['name']);
        $product->setDescription($data['description'] ?? null);
        $product->setSku($data['sku']);
        $product->setPrice($data['price']);
        $product->setStock($data['stock']);
        $product->setIsActive($data['is_active'] ?? true);
        $product->setCreatedAt(now());

        $this->repository->save($product);

        return $product;
    }
}
