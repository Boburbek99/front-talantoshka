<script setup>
const { type = 'text' } = defineProps({
    label: String,
    type: String,
    inputStyle: String,
    placeholder: String
})

const modelValue = defineModel()
</script>
<template>
    <div class="row mb-3">
        <div class="col-sm-4">
            <div class="input-group input-group-sm mb-3">
                <input :type="type" class="form-control" v-model="modelValue"
                    :placeholder="placeholder ? placeholder : label" :style="inputStyle">
            </div>
        </div>
    </div>
</template>