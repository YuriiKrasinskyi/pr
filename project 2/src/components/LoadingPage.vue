<script setup>
import SimpleMasterPage from '@/masterpages/SimpleMasterPage.vue'
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()


import { useRouter } from 'vue-router'
const router = useRouter()


const email = ref(null)
const password = ref(null)


const isDataValid = computed(() => {
   return email.value && password.value
})


const { signUpWithWithEmailAndPassword, signInWithWithEmailAndPassword, loginWithGoogleAccount } =
   authStore


function registerWithEmailAndPassword(email, password) {
   signUpWithWithEmailAndPassword(email, password).then(() => {
      router.push({
         name: 'home'
      })
   })
}


function loginWithEmailAndPassword(email, password) {
   signInWithWithEmailAndPassword(email, password).then(() => {
      router.push({
         name: 'home'
      })
   })
}


function loginWithGoogle() {
   loginWithGoogleAccount().then(() => {
      router.push({
         name: 'home'
      })
   })
}
</script>


<template>
   <simple-master-page>
      <div class="mt-16">
         Loading...
      </div>
   </simple-master-page>
</template>


<style lang="scss" scoped>
</style>