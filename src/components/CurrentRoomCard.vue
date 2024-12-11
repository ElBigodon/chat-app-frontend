<script setup lang="js">
import { onMounted, ref } from 'vue';
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

const message = ref('')

const emit = defineEmits(['goBack', 'sendMessage', 'mounted'])

onMounted(() => emit('mounted'))

</script>

<template>
  <Card>
    <div class="flex flex-col gap-y-4">
      <div class="w-full flex gap-x-4 items-center">
        <ArrowLeft @click="emit('goBack')" class="text-primary cursor-pointer w-5 h-5" />
        <span class="text-xl font-medium">Sala {{ props.room.name }}</span>
      </div>

      <div class="flex flex-col gap-y-2">
        <Card class="bg-secondary h-[300px]">
          <div class="space-y-2 first:mt-0" v-for="{ created_at, content, user, room } in room.messages || []" :key="i">
            <MessageBox 
              :name="user.name"
              class="mt-2"
              :issued-by="new Date(created_at).toLocaleTimeString('pt-BR')"
              :is-owner="user.id === room.owner.id"
              :content="content"
              />
          </div>
        </Card>

        <Transition>
          <div v-if="false" class="w-full pt-2">
            alexandre está digitando ...
          </div>
        </Transition>

        <form class="w-full flex gap-x-4" @submit.prevent="emit('sendMessage', message)">
          <TextField type="submit" v-model="message" :label="false" class="flex-1" />
          <Button type="submit" class="basis-1/4">
            Enviar
          </Button>
        </form>
      </div>

      <div>
        <span class="font-sm font-medium">
          ID Sala: {{ props.room.code }}
        </span>
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