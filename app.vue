<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Barra de Navegación -->
    <nav class="bg-blue-600 p-4 text-white">
      <h1 class="text-2xl font-bold">Registro de Movimientos Financieros</h1>
    </nav>

    <div class="container mx-auto py-8">
      <!-- Formulario de Movimiento -->
      <div class="bg-white p-6 rounded shadow-md mb-8 max-w-md mx-auto">
        <h2 class="text-xl font-semibold mb-4">Agregar Nuevo Movimiento</h2>
        <form @submit.prevent="addMovement" class="space-y-4">
          <input 
            v-model="description" 
            placeholder="Descripción" 
            class="w-full p-2 border border-gray-300 rounded" 
            required 
          />
          <input 
            v-model.number="amount" 
            placeholder="Monto" 
            type="number" 
            class="w-full p-2 border border-gray-300 rounded" 
            required 
          />
          <select v-model="type" class="w-full p-2 border border-gray-300 rounded">
            <option value="ingreso">Ingreso</option>
            <option value="egreso">Egreso</option>
          </select>
          <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Agregar Movimiento
          </button>
        </form>
      </div>

      <!-- Capital Actual -->
      <div class="bg-white p-6 rounded shadow-md mb-8 max-w-md mx-auto">
        <h2 class="text-xl font-semibold">Capital Actual</h2>
        <p class="text-3xl font-bold mt-2 text-green-500">{{ capital }} USD</p>
      </div>

      <!-- Lista de Movimientos -->
      <div class="bg-white p-6 rounded shadow-md max-w-md mx-auto">
        <h2 class="text-xl font-semibold mb-4">Historial de Movimientos</h2>
        <ul class="space-y-4">
          <li 
            v-for="movement in movements" 
            :key="movement._id" 
            class="p-4 bg-gray-50 rounded border border-gray-200 flex justify-between items-center"
          >
            <div>
              <p class="font-semibold">{{ movement.description }}</p>
              <p class="text-sm text-gray-500">{{ movement.date }}</p>
            </div>
            <p :class="movement.amount > 0 ? 'text-green-500' : 'text-red-500'">
              {{ movement.amount }} USD
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      description: '',
      amount: null,
      type: 'ingreso',
      movements: [],
      capital: 0,
    };
  },
  methods: {
    async fetchData() {
      try {
        const response = await this.$axios.get('/movements');
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    },
    async addMovement() {
      const movement = {
        description: this.description,
        amount: this.amount * (this.type === 'egreso' ? -1 : 1),
        date: new Date().toISOString().slice(0, 10),  // Solo fecha
      };
      await this.$axios.post('/api/movements', movement);
      this.fetchMovements();
      this.description = '';
      this.amount = null;
      this.type = 'ingreso';
    },
    async fetchMovements() {
      const { data } = await this.$axios.get('/api/movements');
      this.movements = data.movements;
      this.capital = data.capital;
    },
  },
  mounted() {
    this.fetchMovements();
  },
};
</script>

<!-- Estilos de TailwindCSS -->
<style scoped>
@import 'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css';
</style>
