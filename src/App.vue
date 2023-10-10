<template>
  <div>
    <h1>映像</h1>
    <div class="camera">
      <Video roomId="front_camera" data_flg="true"/>
      <!-- <Video roomId="back_camera" data_flg="false"/> -->
    </div>
  </div>
  <!-- <h1>Controller</h1>
  <div class="controller">
    <div class="accelerator">
      <Accelerator />
    </div>
    <div class="handle">
      <Handle />
    </div>
    <div class="work">
      <Work />
    </div>
    
  </div> -->
  
  <h1>Mobile Mover</h1>
  <div class="mobilemover">
    <div class="speed">
      <Speed />
    </div>
    <div class="direction">
      <Direction />
    </div>
    <div class="flow">
      <Flow />
    </div>
  </div>
  
  
</template>

<script>
import Speed from './components/Speed.vue'
import Accelerator from './components/Accelerator.vue'
import Handle from './components/Handle.vue'
import Direction from './components/Direction.vue'
import Work from './components/Work.vue'
import Flow from './components/Flow.vue'
import Video from './components/Video.vue'

export default {
  name: 'App',
  components: {
    Speed,
    Handle,
    Accelerator,
    Direction,
    Work,
    Flow,
    Video
  }
}
</script>

<style scoped>

.camera {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
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
  margin: auto ;
}

.speed{
  width: 20%;
  margin: auto ;
}

.handle {
  width: 20%;
  margin: auto ;
}
.direction {
  width: 20%;
  margin: auto;
}

.work {
  width: 20%;
  margin: auto ;
}

.flow {
  width: 20%;
  margin: auto ;
}
</style>

