<?php

namespace App\Repositories;

use Illuminate\Pagination\LengthAwarePaginator;

interface ProductRepositoryInterface
{
    public function all(int $page = 1, int $perPage = 15): LengthAwarePaginator;
}
