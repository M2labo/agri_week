<template>
    <div>
      
      <img :src="iconPath">
      
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
  