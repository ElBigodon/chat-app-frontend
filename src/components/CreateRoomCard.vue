-<script setup>
import { reactive, watch } from 'vue'
import TextField from '@/components/TextField.vue'
import Card from '@/components/Card.vue'
import Button from '@/components/Button.vue'

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
  }
})

const emit = defineEmits(['update:modelValue'])

const internalFormData = reactive(props.modelValue)

watch(internalFormData, (changes) => emit('update:modelValue', changes), { deep: true })

</script>

<template>
  <Card no-scroll flat>
    <form class="flex flex-col gap-y-4" v-on="$listeners">
      <TextField 
        :loading="props.loading" 
        label="Seu Nome" 
        placeholder="Digite seu nome" 
        v-model="internalFormData.userName" 
      />
  
      <TextField 
        :loading="props.loading" 
        label="Nome da Sala" 
        placeholder="Digite o nome da sala" 
        v-model="internalFormData.roomName" 
      />
  
      <Button :disabled="props.disabled" type="submit">
        Confirmar
      </Button>
    </form>
    
  </Card>
</template>