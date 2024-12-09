<template>
  <div class="
    flex items-center bg-white justify-between py-2 px-4 border border-secondary rounded-lg
  hover:text-primary hover:cursor-pointer hover:border-primary
  ">
    <div>
      <slot />
    </div>
    <div>
      <slot name="append" />
    </div>
  </div>
</template>