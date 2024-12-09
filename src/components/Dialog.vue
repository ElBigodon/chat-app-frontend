<script setup lang="ts">
import Card from './Card.vue';
import Close from './Icons/Close.vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  closeOutsideClick: {
    type: Boolean,
    default: true
  }
});
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div 
        @click="props.closeOutsideClick && $emit('update:modelValue', false)" 
        class="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center" 
        v-if="props.modelValue"
      >
        <Card 
          @click.stop 
          v-bind="$attrs" 
          class="w-[300px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" 
        >
          <template #title>
            <div class="w-full flex items-center justify-between">
              <slot name="title">
                Informação
              </slot>
              <Close @click="$emit('update:modelValue', false)" class="text-error hover:cursor-pointer" />
            </div>
          </template>
          <slot />
        </Card>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="css" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active .card,
.fade-leave-active .card {
  transition: transform 0.5s ease, opacity 0.5s ease;
}

.fade-enter-from .card,
.fade-leave-to .card {
  opacity: 0;
  transform: scale(0.9);
}
</style>