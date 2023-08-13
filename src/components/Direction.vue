<template>
    <div>
      <h2>向き</h2>
      <img :src="iconPath" :style="{ transform: `rotate(${direction*-1-45}deg)` }" alt="Direction icon">
      <p>{{ direction }} deg</p>
      <!-- <button @click="turnLeft">Turn Left</button>
      <button @click="turnRight">Turn Right</button> -->
      
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        direction: 0,
        iconPath: '/car2.png'
      };
    },
    methods: {
      turnRight() {
        this.direction -= 10; 
      },
      turnLeft() {
        this.direction += 10; 
      }
    }
  };
  </script>
  
  <style scoped>
  h1 {
    text-align: center;
  }
  
  img {
    display: block;
    width: 100px;
    height: 100px;
    margin: 20px auto;
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
  