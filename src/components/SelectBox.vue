<script setup lang="js">
import { ref, watch } from 'vue'

const props = defineProps({
  label: {
    type: String,
    required: true,
    default: 'Campo'
  },
  modelValue: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const inputValue = ref(props.modelValue)

watch(inputValue, (str) => {
  emit('update:modelValue', str)
})

</script>

<template>
  <div class="flex items-center gap-x-2">
    <input 
      id="select-box" 
      checked
      v-model="inputValue" 
      type="checkbox" 
      class="h-4 w-4 text-primary border-secondary rounded focus:ring-primary checked:bg-primary"
    />
    <label for="select-box" class="flex items-center space-x-2 text-sm font-medium">{{ props.label }}</label>
  </div>
</template>