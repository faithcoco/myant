<template>
  <a-mentions v-model:value="value" :loading="loading" @search="onSearch" @change="onChange" @select="onSelect" >
    <a-mentions-option v-for="{ login, avatar_url: avatar } in users" :key="login" :value="login">
      <img :src="avatar" :alt="login" style="width: 20px; margin-right: 8px" />
      <span>{{ login }}</span>
    </a-mentions-option>
  </a-mentions>
</template>

<script>
import Vue from 'vue'
import debounce from 'lodash/debounce'
import { Mentions } from 'ant-design-vue'
Vue.use(Mentions)
export default {
  data() {
    return {
      value: '',
      loading: false,
      users: [],
    }
  },
  mounted() {
    this.loadGithubUsers = debounce(this.loadGithubUsers, 800)
  },
  methods: {
     onSelect(option) {
      console.log('select', option);
    },
    onChange(value) {
      console.log('Change:', value);
    },
    onSearch(search) {
      this.search = search
      this.loading = !!search
      console.log(!!search)
      this.users = []
      console.log('Search:', search)
      this.loadGithubUsers(search)
    },
    loadGithubUsers(key) {
      if (!key) {
        this.users = []
        return
      }
      fetch(`https://api.github.com/search/users?q=${key}`)
        .then((res) => res.json())
        .then(({ items = [] }) => {
          const { search } = this
          if (search !== key) return

          this.users = items.slice(0, 10)
          this.loading = false
        })
    },
  },
}
</script>
