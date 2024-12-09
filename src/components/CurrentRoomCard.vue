<script setup lang="js">
import Button from './Button.vue';
import Card from './Card.vue';
import ArrowLeft from './Icons/ArrowLeft.vue';
import MessageBox from './MessageBox.vue';
import TextField from './TextField.vue';

const props = defineProps({
  room: {
    type: Object,
    required: true,
  }
})

const emit = defineEmits(['goBack'])

</script>

<template>
  <Card>
    <div class="flex flex-col gap-y-4">
      <div class="w-full flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <ArrowLeft @click="emit('goBack')" class="text-primary cursor-pointer w-5 h-5" />
          <span>ID: {{ Math.random().toString(36).substring(2, 9) }}</span>
        </div>
        
        <h3 class="text-2xl font-medium">
          Sala {{ props.room.name }}
        </h3>
      </div>

      <div class="flex flex-col gap-y-2">
        <Card class="bg-secondary h-[300px]">
          <div class="space-y-2" v-for="i in 20" :key="i">
            <MessageBox 
              name="nhac"
              :issued-by="new Date().toLocaleString('pt-BR')"
              content="
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos ipsum vitae sunt impedit. Saepe
                cupiditate ducimus
                reprehenderit illo iure deleniti, vitae labore ipsam sequi dolore earum, odio, eveniet excepturi atque!"
              />
          </div>
        </Card>

        <Transition>
          <div class="w-full pt-2">
            alexandre está digitando ...
          </div>
        </Transition>

        <div class="w-full flex gap-x-4">
          <TextField :label="false" class="flex-1" />
          <Button class="basis-1/4">
            Enviar
          </Button>
        </div>
      </div>
    </div>
  </Card>
</template>

<style lang="css" scoped>
.v-enter-active,
.v-leave-active {
  transition: transform 200ms ease-in-out;
}

.v-enter-from,
.v-leave-to {
  transform: translateX(-100%);
}
</style>