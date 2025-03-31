<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Product\IndexRequest;
use App\Http\Resources\ProductResource;
use App\Repositories\ProductRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ProductController extends Controller
{
    public function index(IndexRequest $request, ProductRepository $repository): AnonymousResourceCollection
    {
        $products = $repository->all(
            $request->input('page', 1),
            $request->input('per_page', 15),
            $request->input('search')
        );

        return ProductResource::collection($products);
    }
}
