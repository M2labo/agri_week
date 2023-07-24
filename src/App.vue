<template>
  <div>
    <h1>Camera</h1>
  </div>
  <h1>Controller</h1>
  <div class="controller">
    <div class="accelerator">
      <Accelerator />
    </div>
    <div class="handle">
      <Handle />
    </div>
    
  </div>

  <h1>Mobile Mover</h1>
  <div class="mobilemover">
    <div class="speed">
      <Speed />
    </div>
    <div class="direction">
      <Direction />
    </div>
  </div>
  
  
</template>

<script>
import Speed from './components/Speed.vue'
import Accelerator from './components/Accelerator.vue'
import Handle from './components/Handle.vue'
import Direction from './components/Direction.vue'

export default {
  name: 'App',
  components: {
    Speed,
    Handle,
    Accelerator,
    Direction
  }
}
</script>

<style scoped>

.controller {
  display: flex;
  justify-content: center;
  align-items: center;
}

.mobilemover {
  display: flex;
  justify-content: center;
  align-items: center;
}
.accelerator{
  width: 20%;
  margin: auto 10%;
}

.speed{
  width: 20%;
  margin: auto 10%;
}

.handle {
  width: 20%;
  margin: auto 10%;
}
.direction {
  width: 20%;
  margin: auto 10%;
}
</style>