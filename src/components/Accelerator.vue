<template>
    <div>
      <h2>Accelerator</h2>
      <div class="box">
        <div class="speed-indicator" :style="{ width: speed + '%' }"></div>
      </div>
      <p>Your current accelerator is: {{ speed }} %</p>
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
    font-size: 22px;
  }
  
  button {
    display: block;
    margin: 10px auto;
  }
  </style>
  