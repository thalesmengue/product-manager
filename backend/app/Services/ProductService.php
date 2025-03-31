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

    private function setData(Product $product, array $data): Product
    {
        $product->setName($data['name']);
        $product->setDescription($data['description'] ?? null);
        $product->setSku($data['sku']);
        $product->setPrice($data['price']);
        $product->setCategory($data['category']);
        $product->setIsActive($data['is_active'] ?? true);
        $product->setCreatedAt(now());
        $product->setUpdatedAt(now());

        return $product;
    }

    public function store(array $data): Product
    {
        $product = new Product();

        $product = $this->setData($product, $data);

        $this->repository->save($product);

        return $product;
    }

    public function update(array $data, int $id): Product
    {
        $product = $this->repository->findById($id);

        $product = $this->setData($product, $data);

        $this->repository->save($product);

        return $product;
    }
}
