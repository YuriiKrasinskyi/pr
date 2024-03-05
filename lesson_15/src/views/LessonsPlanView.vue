<template>
   <lessons-pair-view v-for="lessonPairIds in lessonsIdsPairs" :key="lessonPairIds" :lesson-pair="lessonPairIds" />
</template>

<script setup>
import LessonsPairView from '@/components/LessonsPairView.vue';


const props = defineProps({
   lessonsIdsPairs: {
      type: Array,
      default: () => []
   }
})
</script>

<style lang="scss" scoped></style>