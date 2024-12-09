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
  }
})

</script>

<template>
  <div class="flex flex-col gap-y-2">
    <span>
      {{ props.name }} {{ issuedBy }}
    </span>

    <span class="bg-white rounded p-4">
      {{ props.content }}
    </span>
  </div>
</template>