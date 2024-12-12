<script setup lang="js">
const props = defineProps({
  name: {
    type: String,
    required: false,
    default: '???'
  },
  issuedBy: {
    type: String,
    required: false
  },
  content: {
    type: String,
    required: true
  },
  isOwner: {
    type: String,
    required: true
  },
})

</script>

<template>
  <div class="flex flex-col gap-y-2">
    <span :class="{
      'self-center': props.isOwner
    }">
      {{ props.name }} {{ issuedBy }}
    </span>

    <span class="bg-white rounded p-4 pt-2" :class="{
      '!bg-secondary': props.isOwner
    }">
      {{ props.content }}
    </span>
  </div>
</template>