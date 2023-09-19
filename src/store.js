import { createStore } from 'vuex';

export default createStore({
  state: {
    left_speed: 0,
    right_speed: 0,
    Steering: 0,
    switchOn: false
  },
  mutations: {
    setSpeed(state, value) {
      state.left_speed = value.left;
      state.right_speed = value.right;
    },
    setSteering(state, value) {
      state.Steering = value;
    },
    setSwitchOn(state, value) {
      state.switchOn = value;
    }
  }
});
