<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tbl_character', function (Blueprint $table) {
            $table->increments('character_id');
            $table->string('nama_character', 50)->unique();
            $table->integer('strength_power');

            $table->timestamp('create', 0)->nullable();
            $table->timestamp('update', 0)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tbl_character');
    }
};
