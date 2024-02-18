import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useGeneralStore } from './general'
import { useUsersStore } from './users'
import authOperations from './helpers/GoogleAuthOperations.js'

export const useAuthStore = defineStore('auth', () => {
  const generalStore = useGeneralStore()
  const usersStore = useUsersStore()
  const { generalApiOperation } = generalStore

  const user = ref(null)

  const getUser = computed(() => user.value)

  function loginWithGoogleAccount() {
    return new Promise((resolve, reject) => {
      generalApiOperation({
        operation: () => authOperations.loginWithGoogleAccountPopup()
      })
        .then((res) => {
          user.value = res

          usersStore
            .addUserWithCustomId({
              id: user?.value?.id,
              data: {
                email: user?.value?.email,
                permissions: {
                  create: false,
                  read: true,
                  update: false,
                  delete: true
                }
              }
            })
            .then(() => {
              usersStore.loadUserById(user.value.id).then(() => {
                resolve(res)
              })
            })
        })
        .catch((error) => reject(error))
    })
  }

  function logOut() {
    generalApiOperation({
      operation: () => authOperations.logout()
    })
    usersStore.currentUser = null
    user.value = null
  }

  async function getAuthData() {
    return user.value
  }

  return {
    loginWithGoogleAccount,
    logOut,
    getUser,
    getAuthData
  }
})
