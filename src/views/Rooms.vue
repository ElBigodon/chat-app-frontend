<script setup lang="js">
import Button from '@/components/Button.vue';
import Card from '@/components/Card.vue';
import CreateRoomCard from '@/components/CreateRoomCard.vue';
import CurrentRoomCard from '@/components/CurrentRoomCard.vue';
import Dialog from '@/components/Dialog.vue';
import JoinRoomCard from '@/components/JoinRoomCard.vue';
import Notification from '@/components/Notification.vue';
import TextField from '@/components/TextField.vue';
import { $axios } from '@/config/axios';
import { reactive, ref } from 'vue';

const joinDialog = ref(false)

const currentRoom = reactive({
  id: 0,
  name: '???',
});

const userName = ref('')

const notification = ref(false)

const currentSelection = ref(2)

const notificationMessage = ref('')

const loading = ref(false)

const createRoomFormData = reactive({
  userName: '',
  roomName: '',
  roomPassword: '',
  isPrivate: false
});

function handleSubmit() {
  switch (true) {
    case !createRoomFormData.userName:
      notificationMessage.value = 'Seu nome é obrigatório'
      break;
    case !createRoomFormData.roomName:
      notificationMessage.value = 'Nome da sala é obrigatório'
      break;
    case createRoomFormData.isPrivate && !createRoomFormData.roomPassword:
      notificationMessage.value = 'Senha da sala é obrigatório'
      break;
  }

  if (notificationMessage.value) {
    notification.value = true
    return
  }

  $axios.get('/rooms').then(({ data }) => {
    console.log(data);
  })
}

function handleJoinRoom(room) {
  joinDialog.value = true

  Object.assign(currentRoom, room)
}

function handleConfirmJoinRoom() {
  if (!userName.value.trim()) {
    notificationMessage.value = 'Seu nome é obrigatório'
    notification.value = true
    return
  }
  
  joinDialog.value = false
  currentSelection.value = 2
}

</script>

<template>
  <div class="w-screen h-screen flex justify-center items-center bg-vanta-black">
    <Card no-scroll class="w-[400px] min-h-[300px] flex flex-col !h-auto">
      <div class="w-full flex items-center justify-between text-text space-x-2 mb-4">
        <Button @click="currentSelection = 0">
          Criar Sala
        </Button>
        <Button class="!bg-secondary text-vanta-black" @click="currentSelection = 1">
          Entrar em uma Sala
        </Button>
      </div>
      
      <TransitionGroup name="list">
        <CreateRoomCard
          v-if="currentSelection === 0" 
          v-model="createRoomFormData"
          :disabled="loading"
          :loading="loading"
          @submit.prevent="handleSubmit" 
        />

        <JoinRoomCard
          v-if="currentSelection === 1"
          v-model="createRoomFormData"
          :disabled="loading"
          :loading="loading"
          @join="handleJoinRoom"
        />

        <CurrentRoomCard
          @go-back="currentSelection = 1"
          flat 
          :room="currentRoom"
          v-if="currentSelection === 2"
        >

        </CurrentRoomCard>
      </TransitionGroup>
    </Card>
  </div>

  <Dialog no-scroll class="h-[232px]" v-model="joinDialog">
    <template #title>
      Sala #{{ currentRoom.id }}
    </template>

    <form 
      class="mt-4 flex flex-col gap-y-4" 
      @submit.prevent="handleConfirmJoinRoom()"
    >
      <TextField 
        label="Como posso te chamar?" 
        placeholder="Ex: Bigode"
        v-model="userName"
      />

      <Button type="submit">
        Confirmar
      </Button>
    </form>
  </Dialog>

  <Notification v-model="notification">
    {{ notificationMessage }}
  </Notification>
</template>

<style scoped lang="css">
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-active {
  position: absolute;
}
</style>