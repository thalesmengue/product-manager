<?php

namespace App\Repositories;

use App\Entities\Product;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query;
use Illuminate\Pagination\LengthAwarePaginator;

class ProductRepository implements ProductRepositoryInterface
{
    private EntityManagerInterface $entityManager;
    private EntityRepository $repository;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
        $this->repository = $entityManager->getRepository(Product::class);
    }

    public function all(int $page = 1, int $perPage = 15, ?string $search = null): LengthAwarePaginator
    {
        $page = max(1, $page);
        $offset = ($page - 1) * $perPage;

        $queryBuilder = $this->repository->createQueryBuilder('p');

        if ($search) {
            $queryBuilder->where('p.name LIKE :search')
                ->setParameter('searchTerm', '%' . $search . '%');
        }

        $countQueryBuilder = clone $queryBuilder;
        $countQueryBuilder->select('COUNT(p.id)');

        $totalItems = $countQueryBuilder->getQuery()->getSingleScalarResult();

        $queryBuilder->orderBy('p.id', 'ASC')
            ->setFirstResult($offset)
            ->setMaxResults($perPage);

        $results = $queryBuilder->getQuery()->getResult();

        return new LengthAwarePaginator(
            $results,
            $totalItems,
            $perPage,
            $page,
            [
                'path' => request()->url(),
                'query' => request()->query()
            ]
        );
    }

    public function findById(int $id): ?Product
    {
        return $this->repository->find($id);
    }

    public function save(Product $product): void
    {
        $this->entityManager->persist($product);
        $this->entityManager->flush();
    }
}
