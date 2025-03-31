<?php

use Database\Seeders\ProductSeeder;
use Doctrine\ORM\EntityManagerInterface;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->string('sku')->unique();
            $table->decimal('price', 10);
            $table->string('category');
            $table->boolean('is_active');
            $table->timestamps();
        });

        $this->seedProducts();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }

    private function seedProducts(): void
    {
        $entityManager = app(EntityManagerInterface::class);

        $seeder = new ProductSeeder($entityManager);
        $seeder->run();
    }
};
