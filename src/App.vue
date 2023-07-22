<template>
  <div>
    <h1>Camera</h1>
  </div>
  <div>
    <h1>Controller</h1>
    <div class="accelerator">
      <Accelerator />
    </div>
  </div>
  <div>
    <h1>Car</h1>
    <div class="speed">
      <Speed />
    </div>
  </div>
  
  
</template>

<script>
import Speed from './components/Speed.vue'
import Accelerator from './components/Accelerator.vue'

export default {
  name: 'App',
  components: {
    Speed,
    Accelerator
  }
}
</script>

<style scoped>
.accelerator{
  width: 40%;
}

.speed{
  width: 40%;
}
</style>