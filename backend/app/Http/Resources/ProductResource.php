<?php

namespace App\Http\Resources;

use App\Entities\Product;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->resource->getId(),
            'name' => $this->resource->getName(),
            'description' => $this->resource->getDescription(),
            'sku' => $this->resource->getSku(),
            'price' => $this->resource->getPrice(),
            'stock' => $this->resource->getStock(),
            'is_active' => $this->resource->getIsActive(),
            'created_at' => $this->resource->getCreatedAt()->format('Y-m-d H:i:s'),
            'updated_at' => $this->resource->getUpdatedAt() ? $this->resource->getUpdatedAt()->format('Y-m-d H:i:s') : null,
        ];
    }
}
