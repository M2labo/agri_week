<template>
    <div>
      <h2>Work</h2>
      <svg width="100" height="100" @click="toggleSwitch">
        <rect x="0" y="25" rx="25" ry="25" width="100" height="50" :fill="isSwitchOn ? 'green' : 'gley'"/>
        <circle :cx="isSwitchOn ? '70' : '30'" cy="50" r="20" fill="white" />
        <text v-if="isSwitchOn" x="15" y="55" font-size="18" fill="white">ON</text>
        <text v-if="!isSwitchOn" x="55" y="55" font-size="18" fill="white">OFF</text>
      </svg>
      <p>Current status: {{ isSwitchOn ? 'ON' : 'OFF'}} </p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isSwitchOn: false,
      };
    },
    methods: {
      toggleSwitch() {
        this.isSwitchOn = !this.isSwitchOn;
      },
    },
  };
  </script>
  