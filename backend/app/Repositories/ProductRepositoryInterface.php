<?php

namespace App\Repositories;

use App\Entities\Product;
use Illuminate\Pagination\LengthAwarePaginator;

interface ProductRepositoryInterface
{
    public function all(int $page = 1, int $perPage = 15, ?string $search = null): LengthAwarePaginator;
    public function findById(int $id): ?Product;
    public function save(Product $product): void;
    public function delete(Product $product): void;
}
