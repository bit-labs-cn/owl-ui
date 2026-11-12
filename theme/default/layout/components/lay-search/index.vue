<script setup lang="ts">
import { BooleanFlag } from "../../hooks/boolean-flag";
import SearchModal from "./components/SearchModal.vue";

const searchVisible = new BooleanFlag();
const show = searchVisible.value;
function handleSearch() {
  searchVisible.toggle();
}
</script>

<template>
  <div>
    <div
      class="search-container w-[40px] h-(--owl-header-height) flex-c cursor-pointer navbar-bg-hover"
      @click="handleSearch"
    >
      <IconifyIconOffline icon="ri:search-line" />
    </div>
    <SearchModal v-model:value="show" />
  </div>
</template>
