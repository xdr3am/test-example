<template>
  <div class="container">
    <div class="card mb-2">
      <h1>Не главная</h1>
    </div>

    <div class="mb-2">
      <ul class="list">
        <li @click="currentUser = user" class="card btn-select" v-for="user in users" :key="user.id">
          <h3>{{ user.name }}</h3>
          <p>{{ user.email }}</p>
        </li>
      </ul>
    </div>

    <div class="card">
      <div v-if="currentUser">
        <h2>Посты пользователя: {{ currentUser.name }}</h2>
        <ul>
          <li v-for="post in currentUser.posts" :key="post.id">
            <h3>{{ post.title }}</h3>
            <p>{{ post.body }}</p>
          </li>
        </ul>
      </div>
      <h2 v-else>Выберите пользователя</h2>
    </div>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'NotHomePage',

  data () {
    return {
      currentUser: null,
      users: []
    }
  },

  async mounted () {
    await this.getUsers()
    await this.getUsersPosts(this.users)
  },

  methods: {
    async getUsers () {
      const { data } = await axios.get('https://jsonplaceholder.typicode.com/users?_limit=6')
      this.users = data
    },

    async getUsersPosts (users) {
      for (const user of users) {
        const { data } = await axios.get(`https://jsonplaceholder.typicode.com/users/${user.id}/posts`)
        user.posts = data
      }
    }
  }
}
</script>