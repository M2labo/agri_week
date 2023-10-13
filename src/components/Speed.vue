<template>
  <div>
    <h2>速度</h2>
    <svg class="gauge" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 50">
      <circle cx="50" cy="50" r="40" stroke="grey" stroke-width="2" fill="transparent" />
      <line :transform="`rotate(${speed*10}, 50, 50)`" x1="50" y1="50" x2="0" y2="50" style="stroke:rgb(255,0,0);stroke-width:2" />
    </svg>
    <p> {{ speed/10 }} km/h</p>
      
    <!-- <button @click="increaseSpeed">Increase Speed</button>
    <button @click="decreaseSpeed">Decrease Speed</button>
    <button @click="updateSpeed(2,4)">commit</button> -->
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      // speed: (this.$store.state.left_speed + this.$store.state.right_speed)/2
    };
  },
  computed: {
    speed() {
      return (this.$store.state.left_speed + this.$store.state.right_speed)/2;
    }
    },
  
  methods: {
    increaseSpeed() {
      if (this.speed < 6) this.speed += 1; // Assume the maximum speed is 180km/h
    },
    decreaseSpeed() {
      if (this.speed > 0) this.speed -= 1;
    },
    updateSpeed(left, right) {
      this.$store.commit('setSpeed', { left, right });
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
