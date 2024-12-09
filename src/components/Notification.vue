<script setup lang="ts">
import { watch } from 'vue';
import Card from './Card.vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  autoClose: {
    type: [Boolean, Number, String],
    default: true
  }
})

const emit = defineEmits(['update:modelValue'])

watch(() => props.modelValue, (state) => {
  emit('update:modelValue', state)

  if (state === false || props.autoClose === false) return;

  switch (typeof props.autoClose) {
    case 'boolean':
      setTimeout(() => emit('update:modelValue', false), 3000)    
      break;
    case 'number':
    case 'string':
      setTimeout(() => emit('update:modelValue', false), Number(props.autoClose))
  }

  
})
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <Card
        v-bind="$attrs"
        v-if="props.modelValue"
        class="absolute z-50 top-2 right-2 !w-[250px] !max-h-[150px]"
      >
        <template #title>
          Notificação
        </template>
    
        <div class="pt-4">
          <slot>
            Conteúdo
          </slot>
        </div>
      </Card>
    </Transition>
  </Teleport>
</template>

<style scoped lang="css">
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>