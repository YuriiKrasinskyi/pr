<template>
   <header class="header">
      <div>
         <nav class="nav">
            <RouterLink to="/">Головна</RouterLink>
            <RouterLink :to="{ name: 'lessons-select' }">Уроки</RouterLink>
            <RouterLink :to="{ name: 'teachers' }">Вчителі</RouterLink>
         </nav>
      </div>
      <div v-if="authParams">
         <span>{{ userName }}</span>
         <button @click="onLogout">Logout</button>
      </div>
      <div v-else>
         <button @click="onLogin">Login</button>
      </div>
   </header>
   <slot></slot>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()

const authParams = computed(() => {
   const params = localStorage.getItem('authParams')
   return params ? JSON.parse(params) : null
})

const userName = computed(() => {
   return authParams.value?.userName
})


function onLogout() {
   localStorage.removeItem('authParams')
   router.push({
      name: 'login'
   })
}
function onLogin() {
   router.push({
      name: 'login'
   })
}
</script>

<style lang="scss" scoped>
.header {
   display: flex;
   align-items: center;
   justify-content: space-between;
   margin-bottom: 50px;
}

.nav {
   display: flex;
   flex-wrap: wrap;
   gap: 20px;
}
</style>