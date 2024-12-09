<script setup lang="js">
import LoadingCircle from './Icons/LoadingCircle.vue';

const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
})


</script>

<template>
  <button 
    v-on="$listeners"
    :disabled="props.disabled"
    class="
      bg-primary w-full text-text py-2 rounded-md cursor-pointer
      hover:bg-primary-dark
      focus:outline-none focus:ring-2 focus:ring-primary 
      disabled:opacity-50
    "
    :class="{
      'flex justify-center cursor-wait': props.loading,
      'cursor-not-allowed': props.disabled
    }"
  >
    <slot v-if="!props.loading" />
    <LoadingCircle v-else class="animate-spin h-5 w-5 text-secondary" />
  </button>
</template>