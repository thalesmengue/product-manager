<?php

namespace Database\Seeders;

use App\Entities\Product;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Faker\Factory;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * @var EntityManagerInterface
     */
    private EntityManagerInterface $entityManager;

    /**
     * ProductSeeder constructor.
     *
     * @param EntityManagerInterface $entityManager
     */
    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Factory::create();

        $productCount = 50;

        $now = now();

        for ($i = 0; $i < $productCount; $i++) {
            $product = new Product();

            $productName = $faker->words(rand(1, 3), true);
            $productName = ucfirst($productName);

            $product->setName($productName);
            $product->setDescription($faker->paragraph(rand(2, 5)));

            $sku = strtoupper(substr(str_replace(' ', '', $productName), 0, 3)) .
                '-' . $faker->unique()->numberBetween(1000, 9999);
            $product->setSku($sku);

            $product->setPrice($faker->randomFloat(2, 5, 2000));

            $product->setStock($faker->numberBetween(0, 1000));

            $product->setIsActive($faker->boolean(80));

            $product->setCreatedAt($now);
            $product->setUpdatedAt($now);

            $this->entityManager->persist($product);
        }

        $this->entityManager->flush();
    }
}
