<script setup>
import { onMounted, reactive, ref, watch } from 'vue'
import TextField from '@/components/TextField.vue'
import Card from '@/components/Card.vue'
import TextItem from './TextItem.vue'
import AccountArrowRightOutline from './Icons/AccountArrowRightOutline.vue'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  rooms: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:modelValue', 'join', 'mounted'])

const internalFormData = reactive(props.modelValue)

watch(internalFormData, (changes) => emit('update:modelValue', changes), { deep: true })

onMounted(() => emit('mounted'))

</script>

<template>
  <Card no-scroll flat>
    <form class="flex flex-col gap-y-4" v-on="$listeners">
      <TextField 
        v-model="internalFormData.roomName" 
        label="ID ou Nome da Sala" 
        :disabled="loading"
      />

      <Card class="bg-secondary h-[200px]" flat>
        <div 
          class="flex flex-col gap-y-4 first:mt-0 last:mb-0 my-2" 
          v-for="room in rooms" 
          :key="room.id"
        >
          <TextItem @click="emit('join', room)">
            <span>
              {{ room.name }}
            </span>

            <template #append>
              <AccountArrowRightOutline class="text-primary w-5 h-5" />
            </template>
          </TextItem>
        </div>
      </Card>
    </form>
  </Card>
</template>