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
import { onMounted, reactive, ref } from 'vue';

const joinDialog = ref(false)

const currentRoom = reactive({
  id: 0,
  name: '???',
  messages: []
});

const userName = ref('')

const notification = ref(false)

const currentSelection = ref(0)

const rooms = ref([])

const notificationMessage = ref('')

const loading = ref(false)

const createRoomFormData = reactive({
  userName: '',
  roomName: '',
});

function handleCreateRoom() {
  switch (true) {
    case !createRoomFormData.userName:
      notificationMessage.value = 'Seu nome é obrigatório'
      break;
    case !createRoomFormData.roomName:
      notificationMessage.value = 'Nome da sala é obrigatório'
      break;
  }

  if (notificationMessage.value) {
    notification.value = true
    return
  }

  const { roomName: name, userName: owner } = createRoomFormData;

  $axios.post('/rooms/create', { name, owner }).then(({ data }) => {
    notification.value = true
    notificationMessage.value = 'Sala criada com sucesso'
    currentSelection.value = 2

    window.localStorage.setItem('user_data', JSON.stringify({
      userName: data.owner.name,
      userId: data.owner.id
    }))

    window.localStorage.setItem('current_room', JSON.stringify({
      id: data.id,
      roomName: data.name,
      code: data.code,
      userName: data.owner.name,
      userId: data.owner.id,
      isOwner: true,
    }));
  })
}

function handleFetchRooms() {
  $axios.get('/rooms').then(({ data }) => {
    rooms.value = data
  })
}

function getUserData() {
  return JSON.parse(window.localStorage.getItem('user_data'));
}

function getCurrentRoom() {
  return JSON.parse(window.localStorage.getItem('current_room'));
}

function handleJoinRoom({ id, name, owner, code }) {
  const userData = getUserData();

  Object.assign(currentRoom, {
    id: id,
    roomName: name,
    code: code
  });

  if (userData) {
    Object.assign(currentRoom, {
      ...userData,
      isOwner: owner.id === userData.userId
    });

    userName.value = userData.userName

    handleConfirmJoinRoom();
  } else {
    joinDialog.value = true
  }
  
}

function handleConfirmJoinRoom() {
  if (!userName.value.trim()) {
    notificationMessage.value = 'Seu nome é obrigatório'
    notification.value = true
    return
  }

  $axios.post(`/rooms/join/${currentRoom.id}`, { name: userName.value }).then(({ data }) => {
    const userData = getUserData();

    if (userData === null) {
      window.localStorage.setItem('user_data', JSON.stringify({
        userName: userName.value,
        userId: data.owner.id
      }));
    }

    window.localStorage.setItem('current_room', JSON.stringify(Object.assign(currentRoom, {
      userName: data.owner.name,
      userId: data.owner.id,
      isOwner: userData.userId === data.owner.id
    })));
  
    joinDialog.value = false
    currentSelection.value = 2
  })
}

function handleExitRoom() {
  currentSelection.value = 1

  window.localStorage.removeItem('current_room');
}

function handleSubmitMessage(content) {
  const userData = JSON.parse(window.localStorage.getItem('user_data'));
  
  $axios.post(`/rooms/message/${currentRoom.id}/${userData.userId}`, { content }).then(({ data }) => {
    currentRoom.messages.push(data)
  })
}

function handleFetchMessages() {
  $axios.get(`/rooms/messages/${currentRoom.id}`).then(({ data }) => {
    currentRoom.messages.push(...data)
  })
}

onMounted(() => {
  const rawCurrentRoom = window.localStorage.getItem('current_room');

  if (rawCurrentRoom !== null) {
    const { roomName, ...room } = JSON.parse(rawCurrentRoom);
    
    Object.assign(currentRoom, room, { name: roomName });

    currentSelection.value = 2

    window.Echo.private(`Message.Received.${currentRoom.id}.${currentRoom.userId}`).listen('message.received', ({ message }) => {
      console.log(message);
      
      currentRoom.messages.push(message)
    })

    return;
  }
});

</script>

<template>
  <div class="w-screen h-screen flex justify-center items-center bg-vanta-black">
    <Card no-scroll class="w-[400px] min-h-[300px] flex flex-col !h-auto">
      <div v-if="currentSelection !== 2" class="w-full flex items-center justify-between text-text space-x-2 mb-4">
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
          @submit.prevent="handleCreateRoom" 
        />

        <JoinRoomCard
          v-if="currentSelection === 1"
          v-model="createRoomFormData"
          :rooms="rooms"
          :disabled="loading"
          :loading="loading"
          @mounted="handleFetchRooms"
          @join="handleJoinRoom"
        />

        <CurrentRoomCard
          @mounted="handleFetchMessages"
          @send-message="handleSubmitMessage"
          @go-back="handleExitRoom"
          flat 
          :room="currentRoom"
          v-if="currentSelection === 2"
        />
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