<template>
    <button class="btn">
        <slot></slot>
    </button>
</template>


<script>
export default {
    name: 'my-button'
}
</script>


<style scoped>
   .btn {
    background-color: rgb(30, 185, 149);
    padding: 10px 15px;
    border: none;
    cursor: pointer;
} 
</style>