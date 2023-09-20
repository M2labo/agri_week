<template>
    <div>
      <h2>ポンプ</h2>
      <svg width="100" height="100" @click="toggleSwitch">
        <rect x="0" y="25" rx="25" ry="25" width="100" height="50" :fill="isSwitchOn ? 'green' : 'gley'"/>
        <circle :cx="isSwitchOn ? '70' : '30'" cy="50" r="20" fill="white" />
        <text v-if="isSwitchOn" x="15" y="55" font-size="18" fill="white">ON</text>
        <text v-if="!isSwitchOn" x="55" y="55" font-size="18" fill="white">OFF</text>
      </svg>
      <div class="box">
        <div class="speed-indicator" :style="{ width: speed + '%' }"></div>
      </div>
      <p>{{ speed }} L/min</p>
      <!-- <button @click="increaseSpeed">Increase Flow rate</button>
      <button @click="decreaseSpeed">Decrease Flow rate</button> -->
      
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        speed: 0,
        isSwitchOn: false
      };
    },
    methods: {
        toggleSwitch() {
          console.log('toggleSwitch');
          this.isSwitchOn = !this.isSwitchOn;
        this.$store.commit('setSwitchOn', this.isSwitchOn);
      },
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
    background-color: green;
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
  