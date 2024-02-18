<template>
   <div class="flex h-screen justify-center">
      <div class="bg-[#faf8f7] w-72 p-3 space-y-4">
         <div>
            <div class="flex flex-col items-start space-y-4">
               <div class="cursor-pointer">
                  <span :class="{
                     selected: locale == 'ua'
                  }" @click="setLocale('ua')">UA</span>
                  <span :class="{
                     selected: locale == 'en'
                  }" @click="setLocale('en')">
                     EN</span>
               </div>
               <div v-if="user" class="flex items-center space-x-2">
                  <img v-if="user.photoURL" :src="user.photoURL" class="h-10 rounded-2xl" />
                  <font-awesome-icon v-else :icon="['fas', 'user']" size="2x" class="" />
                  <span class="mr-2">{{ user.displayName ?? user.email }}</span>
                  <button class="" @click="onLogout">{{ $t('buttons.logout') }}</button>
               </div>
               <button v-else class="" @click="onLogin">
                  {{ $t('buttons.login') }}
                  <font-awesome-icon :icon="['fab', 'google']" color="red" />
               </button>
            </div>
         </div>
         <aside class="sidebar">
            <nav class="flex flex-col space-y-4">
               <div>
                  <div @click="toggleModal" class="flex flex-wrap cursor-pointer">
                     <div class="flex items-center justify-center w-6 h-6 bg-red-500 rounded-full">
                        <font-awesome-icon :icon="['fas', 'plus']" color="white" />
                     </div>
                     Add task
                  </div>
               </div>
               <RouterLink to="/tasks">Today</RouterLink>
            </nav>
         </aside>
      </div>
      <div class="flex-auto mt-40">
         <task-edit :modalActive="modalActive" @close-modal="toggleModal" class="mt"/>
         <slot></slot>
         <div class="main">
            <loading-page v-if="isLoading" />
            <error-page v-else-if="hasError" />
            <template v-if="!hasError">
               <!-- <slot></slot> -->
            </template>
         </div>
      </div>
   </div>
</template> 


<script setup>

import LoadingPage from '@/components/LoadingPage.vue'
import ErrorPage from '@/components/ErrorPage.vue'

import { onMounted, computed, ref } from 'vue'

import { useLocales } from '@/modulesHelpers/i18n.js'
const { locale, setLocale } = useLocales()

import { useGeneralStore } from '@/stores/general'
import { storeToRefs } from 'pinia'
const generalStore = useGeneralStore()

const { isLoading, hasError } = storeToRefs(generalStore)

import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()

const user = computed(() => authStore.getUser)


const modalActive = ref(null)
const toggleModal = () => {
   modalActive.value = !modalActive.value;
}


import TaskEdit from '@/views/tasks/TaskEdit.vue';

import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const currentRoute = computed(() => useRoute())

import { useTodoItemsStore } from '@/stores/todo'
const todoItemsStore = useTodoItemsStore()
const { loadItemsList, getItemsList } = todoItemsStore

function addTask() {
   // router.push({
   //    name: 'tasks-config'
   // })
   toggleModal
   console.log('hello')
}


function onLogin() {
   authStore.loginWithGoogleAccount()
}
function onLogout() {
   authStore.logOut()
}

onMounted(() => {
   loadItemsList()
})

</script>


<style lang="scss" scoped>
.selected {
   border: 2px solid green;
}
</style>
