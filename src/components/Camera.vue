<template>
    <div>
      
      <img :src="iconPath">
      
    </div>

    <h3>Momo P2P</h3>
    <div>
      <select id="codec">
        <option value="H264">H264</option>
        <option value="VP8">VP8</option>
        <option value="VP9">VP9</option>
        <option value="AV1">AV1</option>
      </select>
      <input type="button" onclick="connect();" value="Connect">
      <input type="button" onclick="disconnect();" value="Disconnect">
      <input type="button" onclick="play();" value="Play">
      <input type="text" id="data_text">
      <input type="button" onclick="sendDataChannel();" value="Send">
    </div>
    <div>
      <video id="remote_video" autoplay style="border: 3px solid gray;"></video>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        direction: 0,
        iconPath: '/nouen.jpg'
      };
    },
    methods: {
      turnRight() {
        this.direction += 10; // Adjust this value as needed
        if (this.direction >= 360) this.direction -= 360; // Keep the direction within [0, 360)
      },
      turnLeft() {
        this.direction -= 10; // Adjust this value as needed
        if (this.direction < 0) this.direction += 360; // Keep the direction within [0, 360)
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
    width: 80%;
    
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
  