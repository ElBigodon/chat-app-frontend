<script setup lang="js">
import { ref, watch } from 'vue'
import LoadingCircle from './Icons/LoadingCircle.vue';

const props = defineProps({
  label: {
    type: [String, Boolean],
    required: false,
    default: 'Campo'
  },
  modelValue: {
    type: String,
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  placeholder: {
    type: String,
    default: 'Digite aqui'
  }
})

const emit = defineEmits(['update:modelValue'])

const inputValue = ref(props.modelValue)

watch(inputValue, (str) => {
  emit('update:modelValue', str)
})

</script>

<template>
  <div class="space-y-2">
    <label 
      v-if="label !== false"
      for="text-field" 
      class="
        block text-sm font-medium 
        after:content-['*'] after:ml-0.5 after:text-error
      "
      :class="{ 'after:content-[\'\']': props.required === false }"
    >
      {{ props.label }}
    </label>
    <div class="relative">
      <input 
        v-bind="$attrs"
        id="text-field" 
        v-model="inputValue" 
        type="text" 
        :disabled="props.disabled"
        :placeholder="props.placeholder" 
        class="
          w-full px-3 py-2 border border-secondary rounded-md 
          focus:outline-none focus:ring-2 focus:ring-primary
        "
        :class="{
          'cursor-not-allowed': props.disabled
        }"
      />
  
      <LoadingCircle 
        v-if="props.loading" 
        class="
          animate-spin h-5 w-5 text-primary
          absolute top-1/2 right-4 -my-2
        " 
      />
    </div>
  </div>
</template>