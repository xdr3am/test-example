<template>
  <div class="container">

    <div class="card mb-2">
      <form @submit.prevent="submitForm">
        <h2 class="title">Создайте что нибудь</h2>

        <div class="input-box" :class="{ '_error': errors.title }">
          <label for="title">Введите название</label>
          <input type="text" id="title" v-model.trim="formData.title" placeholder="Первый плейсхолдер" :disabled="disabled">
          <span v-for="error in errors.title" :key="error">{{ error }}</span>
        </div>

        <div class="input-box" :class="{ '_error': errors.title }">
          <label for="number">Введите число</label>
          <input type="number" id="number" v-model.number="formData.number" placeholder="Второй плейсхолдер" :disabled="disabled">
          <span v-for="error in errors.number" :key="error">{{ error }}</span>
        </div>

        <div class="input-box">
          <label for="text">Введите необязательное поле</label>
          <input type="text" id="text" v-model="formData.text" placeholder="Третий плейсхолдер" :disabled="disabled">
        </div>

        <div class="input-checkbox">
          <label for="checkbox">
            <input type="checkbox" id="checkbox" v-model="formData.checkbox">
            Нажмите этот чекбокс
          </label>
          <span v-for="error in errors.checkbox" :key="error">{{ error }}</span>
        </div>

        <button type="submit" class="btn" :disabled="disabled">Создать что то</button>
      </form>
    </div>

    <VLoader
        v-if="loading"
    />

    <VList
        v-else
        :cards="cards"
        @handleRemove="removeCard"
    />

  </div>
</template>

<script>
import axios from 'axios'
import VLoader from '@/components/v-loader'
import VList from '@/views/home/components/v-list'

export default {
  name: 'HomePage',

  components: {
    VLoader,
    VList
  },

  data () {
    return {
      formData: {
        title: '',
        number: null,
        text: '',
        checkbox: false
      },

      errors: {
        title: null,
        number: null,
        text: null,
        checkbox: null
      },

      disabled: false,
      loading: false,
      cards: []
    }
  },

  computed: {
    validateTitle () {
      return this.formData.title.length
    },
    validateNumber () {
      return this.formData.number >= 100
    },
    validateCheckbox () {
      return this.formData.checkbox
    },
    validateForm () {
      return this.validateTitle && this.validateNumber && this.validateCheckbox
    }
  },

  watch: {
    'formData.title' () {
      this.errors.title = null
    },
    'formData.number' () {
      this.errors.number = null
    },
    'formData.checkbox' () {
      this.errors.checkbox = null
    }
  },

  mounted () {
    this.getCards()
  },

  methods: {
    async submitForm () {
      this.disabled = true
      if (!this.validateTitle) {
        this.errors.title = ['*Обязательное поле']
      }
      if (!this.validateNumber) {
        this.errors.number = ['*Постарайся чтобы было не меньше 100']
      }
      if (!this.validateCheckbox) {
        this.errors.checkbox = ['*Написано же нажать ну?']
      }
      if (this.validateForm) {
        await axios.post('https://form-example-test-default-rtdb.firebaseio.com/cards.json', this.formData)
            .then(() => {
              this.getCards()
              this.resetFormData()
              this.disabled = false
            })
            .catch(error => console.log(error))
      }
      this.disabled = false
    },

    async getCards () {
      this.loading = true
      try {
        const { data } = await axios.get('https://form-example-test-default-rtdb.firebaseio.com/cards.json')
        this.cards = Object.keys(data).map(key => {
          return {
            id: key,
            ...data[key]
          }
        })
      } catch (error) {
        this.cards = []
      }
      this.loading = false
    },

    async removeCard (id) {
      await axios.delete(`https://form-example-test-default-rtdb.firebaseio.com/cards/${id}.json`).then(() => {
        this.getCards()
      })
    },

    resetFormData () {
      this.formData = {
        title: '',
        number: null,
        text: '',
        checkbox: false
      }
      this.errors = {
        title: null,
        number: null,
        text: null,
        checkbox: null
      }
    }
  }
}
</script>
