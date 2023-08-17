<template>
    <div>
      <h2>向き</h2>
      <img :src="iconPath" :style="{ transform: `rotate(${direction*-1-45}deg)` }" alt="Direction icon">
      <p>{{ direction }} deg</p>
      <!-- <button @click="turnLeft">Turn Left</button>
      <button @click="turnRight">Turn Right</button>
      <button @click="updateSteering(20)">commit</button> -->
      
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        iconPath: 'https://github.com/M2labo/agri_week/blob/master/docs/car2.png?raw=true'
      };
    },
    computed: {
      direction() {
        return this.$store.state.Steering;
      }
    },
    methods: {
      turnRight() {
        // this.direction -= 10; 
        this.$store.commit('setSteering', 10);
      },
      turnLeft() {
        this.direction += 10; 
      },
      updateSteering(value) {
        this.$store.commit('setSteering', value);
        console.log(this.$store.state.Steering)
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
  