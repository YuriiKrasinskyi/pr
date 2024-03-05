<template>
   <h2>Виберіть уроки:</h2>
   <div v-for="subject in subjectsList" :key="subject.id">
      <label>
         {{ subject.title }}
         <input v-model="selectedSubjects" :value="subject.id" type="checkbox">
      </label>
   </div>
   <button :disabled="noSelection" @click="onSelect">Вибрати вчителів</button>
</template>

<script setup>
import { useSubjectsStore } from '@/stores/subjects'
import { storeToRefs } from 'pinia';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()

const subjectsStore = useSubjectsStore()
const { subjectsList } = storeToRefs(subjectsStore)

const selectedSubjects = ref([])

const noSelection = computed(() => {
   return !selectedSubjects.value.length
})

function onSelect() {
   router.push({
      name: 'teachers-select',
      params: {
         subjectsId: selectedSubjects.value
      }
   })
}

</script>

<style lang="scss" scoped></style>