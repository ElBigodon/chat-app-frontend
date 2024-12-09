<script setup lang="js">
const props = defineProps({
  flat: {
    type: Boolean,
    default: false
  },
  noScroll: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div 
    class="bg-white rounded-lg p-6 overflow-x-hidden"
    :class="{
      'shadow-lg': props.flat === false,
      'overflow-y-hidden': props.noScroll,
      'overflow-y-auto': props.noScroll === false
    }"  
  >
    <h2 class="text-2xl font-bold text-center text-vanta-black">
      <slot name="title" />
    </h2>
    
    <slot />
  </div>  
</template>