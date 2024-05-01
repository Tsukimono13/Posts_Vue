<template>
    <input 
    type="text" 
    class="input" 
    :value="modelValue" 
    @input="updateInput" />
</template>


<script>
export default {
    name: "my-input",
    props: {
        modelValue: [String, Number]
    },
    methods: {
        updateInput(event) {
            this.$emit('update:modelValue', event.target.value)
        }
    }
}
</script>


<style scoped>
.input {
    width: 100%;
    border: 2px solid rgb(36, 193, 162);
    padding: 10px 15px;
}
</style>