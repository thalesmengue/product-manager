<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Product\IndexRequest;
use App\Http\Requests\Api\Product\StoreRequest;
use App\Http\Requests\Api\Product\UpdateRequest;
use App\Http\Resources\ProductResource;
use App\Repositories\ProductRepository;
use App\Repositories\ProductRepositoryInterface;
use App\Services\ProductService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Symfony\Component\HttpFoundation\Response;

class ProductController extends Controller
{
    private ProductRepositoryInterface $repository;

    public function __construct(ProductRepositoryInterface $repository)
    {
        $this->repository = $repository;
    }

    public function index(IndexRequest $request): JsonResponse
    {
        $products = $this->repository->all(
            page: $request->input('page', 1),
            perPage: $request->input('per_page', 15),
            search: $request->input('search')
        );

        return (ProductResource::collection($products))
            ->response()
            ->setStatusCode(Response::HTTP_OK);
    }

    public function store(StoreRequest $request, ProductService $service): JsonResponse
    {
        $product = $service->store($request->validated());

        return (new ProductResource($product))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function update(UpdateRequest $request, ProductService $service, int $id): JsonResponse
    {
        $product = $service->update(
            data: $request->validated(),
            id: $id
        );

        return (new ProductResource($product))
            ->response()
            ->setStatusCode(Response::HTTP_OK);
    }

    public function destroy(ProductRepository $repository, int $id): Response
    {
        $product = $repository->findById($id);

        $this->repository->delete($product);

        return response()->noContent();
    }
}
