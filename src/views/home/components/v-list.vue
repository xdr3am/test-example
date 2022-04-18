<template>
  <div>
    <ul v-if="cards.length" class="list">
      <li class="item card" v-for="card in cards" :key="card.id">
        <div class="item-header">
          <h2>{{ card.title }}</h2>
          <button @click="$emit('handleRemove', card.id)">Удалить</button>
        </div>
        <div class="item-body">
          <p>{{ card.text }}</p>
          <span>{{ numberWithSpaces(card.number) }} ₽</span>
        </div>
      </li>
    </ul>

    <div v-else class="card">
      <h2 class="placeholder">Список карточек пуст</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VList',

  props: {
    cards: {
      type: Array,
      default: () => []
    }
  },

  methods: {
    numberWithSpaces (num) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
  }
}
</script>