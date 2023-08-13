<template>
  <div>
    <h2>速度</h2>
    <svg class="gauge" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 50">
      <circle cx="50" cy="50" r="40" stroke="grey" stroke-width="2" fill="transparent" />
      <line :transform="`rotate(${speed*30}, 50, 50)`" x1="50" y1="50" x2="0" y2="50" style="stroke:rgb(255,0,0);stroke-width:2" />
    </svg>
    <p> {{ speed }} km/h</p>
    <!-- <button @click="increaseSpeed">Increase Speed</button>
    <button @click="decreaseSpeed">Decrease Speed</button> -->
    
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
      if (this.speed < 6) this.speed += 1; // Assume the maximum speed is 180km/h
    },
    decreaseSpeed() {
      if (this.speed > 0) this.speed -= 1;
    }
  }
};
</script>

<style scoped>
h1 {
  text-align: center;
}

.gauge {
  width: 200px;
  height: 100px;
  display: block;
  margin: 20px auto;
}

p {
  text-align: center;
  font-size: 22px;
}

button {
  display: block;
  margin: 10px auto;
}
</style>
