<template>
  <form class="validate-form-container">
    <slot name="default"></slot>
    <div class="submit-area" @click.prevent="submitForm">
      <slot name="submit">
        <button type="submit" class="btn btn-primary">提交</button>
      </slot>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from 'vue'
import mitt from 'mitt'

type ValidateFunc = () => boolean
// 实例化mitt
export const emitter = mitt()

export default defineComponent({
  emits: ['form-submit'],
  setup (props, context) {
    let funcArr: ValidateFunc[] = []
    const submitForm = () => {
      // 循环执行数组
      const result = funcArr.map(func => func()).every(result => result)
      context.emit('form-submit', result)
    }
    const cb = (func: ValidateFunc) => {
      funcArr.push(func)
    }
    // 事件监听
    emitter.on('form-item-created', cb)
    onUnmounted(() => {
      emitter.off('form-item-created', cb)
      funcArr = []
    })
    return {
      submitForm
    }
  }
})
</script>
