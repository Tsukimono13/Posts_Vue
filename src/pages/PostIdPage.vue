<template>
    <div>
        <my-button @click="$router.back()"><=</my-button>
        <h2>Это страница поста с ID = {{ $route.params.id }} </h2>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped></style>