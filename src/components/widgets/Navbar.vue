<template>
    <div class="navbar">
        <h1>Vue 3</h1>
        <div class="navbar__btns">
            <my-button @click="$router.push('/posts')">Посты</my-button>
            <my-button @click="$router.push('/about')">О сайте</my-button>
            <my-button @click="$router.push('/store')">store</my-button>
            <my-button @click="$router.push('/composition')">composition</my-button>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.navbar {
    height: 80px;
    background-color: rgba(218, 232, 229, 0.642);
    box-shadow: 2px 2px 4px grey;
    display: flex;
    align-items: center;
    padding: 0 15px;
    justify-content: space-between;
}
.navbar__btns {
    display: flex;
    gap: 20px;
}
</style>