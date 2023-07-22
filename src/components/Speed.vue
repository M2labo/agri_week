<template>
  <div>
    <h2>Speed</h2>
    <div class="speed-indicator" :style="{ width: speed + '%' }"></div>
    <p>Your current speed is: {{ speed }} km/h</p>
    <button @click="increaseSpeed">Increase Speed</button>
    <button @click="decreaseSpeed">Decrease Speed</button>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      speed: 0
    };
  },
  methods: {
    increaseSpeed() {
      if (this.speed < 100) this.speed += 10; // Assume the maximum speed is 100km/h
    },
    decreaseSpeed() {
      if (this.speed > 0) this.speed -= 10;
    }
  }
};
</script>

<style scoped>
h1 {
  text-align: center;
}

.speed-indicator {
  height: 20px;
  background-color: blue;
  margin-bottom: 20px;
}

p {
  text-align: center;
  font-size: 24px;
}

button {
  display: block;
  margin: 10px auto;
}
</style>
