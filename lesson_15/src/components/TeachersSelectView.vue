<template>
   <div>
      <subject-teachers-selector v-for="subjectId in subjectsIds" :key="subjectId" :subjects-id="subjectId"
         @teacher-selected="onTeacherSelect(subjectId, $event)" />
   </div>
   <button @click="onStart">Розпочати навчання</button>
</template>

<script setup>

import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import SubjectTeachersSelector from './SubjectTeachersSelector.vue';
const route = useRoute()
const router = useRouter()

const lessons = ref({})

const subjectsIds = computed(() => {
   return route.params.subjectsId
})

function onTeacherSelect(subjectId, teacherId) {
   lessons.value[subjectId] = teacherId
}

function onStart() {
   const lessonsIdsPairs = []
   for (const subjectId in lessons.value) {
      lessonsIdsPairs.push(`${subjectId} - ${lessons.value[subjectId]}`)
   }
   router.push({
      name: 'study-select',
      params: {
         lessonsIdsPairs
      }
   })
}
</script>

<style lang="scss" scoped></style>
