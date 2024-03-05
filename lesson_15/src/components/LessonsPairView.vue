<template>
   <div>
      {{ subjectTitle }} - {{ teacherName }}
   </div>
</template>

<script setup>
import { computed } from 'vue';
import { storeToRefs } from 'pinia';

import { useTeachersStore } from '@/stores/teachers';
const teachersStore = useTeachersStore()
const { getTeacherById } = storeToRefs(teachersStore)

import { useSubjectsStore } from '@/stores/subjects';
const subjectsStore = useSubjectsStore()
const { getSubjectById } = storeToRefs(subjectsStore)

const props = defineProps({
   lessonPair: {
      type: String,
      required: true
   }
})

console.log(typeof (props.lessonPair));

const subjectId = computed(() => {
   return props.lessonPair.toString().split('-')[0]
})
const teacherId = computed(() => {
   return props.lessonPair.toString().split('-')[1]
})

const subjectTitle = computed(() => {
   return getSubjectById.value(parseInt(subjectId.value))?.title
})

const teacherName = computed(() => {
   return getTeacherById.value(parseInt(teacherId.value))?.name
})
</script>

<style lang="scss" scoped></style>