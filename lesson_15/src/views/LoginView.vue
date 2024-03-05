<template>
   <layout-auth-view>
      <div>
         <label>
            User name
            <input v-model="userName" type="text">
         </label>
      </div>
      <div>
         <label>
            Password
            <input v-model="password" type="password">
         </label>
      </div>
      <button :disabled="!userName || !password" @click="onLogin">Login</button>
   </layout-auth-view>
</template>

<script setup>

import { ref } from 'vue';
import LayoutAuthView from '../components/layouts//LayoutAuthView.vue'
import { useRouter } from 'vue-router';
const router = useRouter()

const userName = ref(null)
const password = ref(null)

function onLogin() {
   localStorage.setItem('authParams',
      JSON.stringify({
         userName: userName.value,
         token: 'testToken'
      })
   )
   router.push({
      name: 'home'
   })
}

</script>

<style lang="scss" scoped></style>