<template>
    <div>
      <p>映像コーデック
        <select v-model="videoCodec" @change="onChangeVideoCodec">
          <option value="none">none</option>
          <option value="VP8">VP8</option>
          <option value="VP9">VP9</option>
          <option value="AV1">AV1</option>
          <option value="H264">H264</option>
          <option value="H265">H265</option>
        </select>
        
      </p>
      <p>
        <button @click="startConn">接続</button>
        <button @click="disconnect">切断</button>
      </p>
      
      <video id="remote-video" autoplay playsinline controls style="width: 400px; height: 300px; border: 1px solid black;"></video>
    </div>
  </template>
  
  <script>
  import Ayame from '@open-ayame/ayame-web-sdk'
  
  
  export default {
    props: {
      roomId: String,
      data_flg: Boolean
    },
    data() {
      return {
        signalingUrl: 'ws://100.106.144.110:3000/signaling',
        clientId: null,
        videoCodec: 'AV1',
        audioCodec: null,
        signalingKey: null,
        options: Ayame.defaultOptions,
        conn: null,
        remoteVideo: null,
        dataChannel: null,
        label: 'dataChannel',
        controllers : {},
        left_speed : 0,
        right_speed : 0,
        Steering : 0.0,
        
      };
    },
    mounted() {
      this.remoteVideo = this.$el.querySelector('#remote-video');
      this.options.clientId = this.clientId ? this.clientId : this.options.clientId;
      if (this.signalingKey) {
        this.options.signalingKey = this.signalingKey;
      }
      if(this.data_flg == 'true'){
        
        window.addEventListener("gamepadconnected", this.connectHandler);
        
      }
    },
    methods: {
      connectHandler(e) {
        // gamepadのArrayを作成
        
        let gamepad = e.gamepad;
        this.controllers[gamepad.index] = gamepad;
        // HTMLへ接続されたGamepad毎の要素を追加（複数のgamepadにも対応）
        var d = document.createElement("div");
        d.setAttribute("id", "controller" + gamepad.index);//idはpadの番号がついた形式
        var t = document.createElement("h2");
        t.appendChild(document.createTextNode("接続Gamepad情報: "));
        d.appendChild(t);
        var info = document.createElement("h1");
        info.appendChild(document.createTextNode(gamepad.id));
        d.appendChild(info);
        //Gamepadコントロール要素（ボタンなど）表示部分
        var b = document.createElement("div");
        b.className = "buttons";
        var t = document.createElement("h2");
        t.appendChild(document.createTextNode("ボタンコントロール情報: "));
        b.appendChild(t);
        for (var i = 0; i < gamepad.buttons.length; i++) {
            var e = document.createElement("span");
            e.className = "button";
            //e.id = "b" + i;
            e.innerHTML = i;
            b.appendChild(e);
        }
        d.appendChild(b);
        //Gamepadコントロール要素（アナログジョイなど）表示部分
        var a = document.createElement("div");
        a.className = "axes";
        var t = document.createElement("h2");
        t.appendChild(document.createTextNode("アナログコントロール情報: "));
        a.appendChild(t);
        for (i = 0; i < gamepad.axes.length; i++) {
            let c = document.createElement("h3");
            c.appendChild(document.createTextNode("axis" + i));
            a.appendChild(c);
            e = document.createElement("meter");
            e.className = "axis";
            //e.id = "a" + i;
            e.setAttribute("min", "-1");
            e.setAttribute("max", "1");
            e.setAttribute("value", "0");
            e.innerHTML = i;
            a.appendChild(e);
        }
        d.appendChild(a);
        let rAF = window.requestAnimationFrame
        rAF(this.updateStatus);
    },
    async updateStatus() {
      this.scanGamepads();
      let shift = 0
      if(this.controllers[0].buttons[12].pressed){
        shift = 1
      }else if(this.controllers[0].buttons[13].pressed){
        shift = 2
      }else if(this.controllers[0].buttons[14].pressed){
        shift = 3
      }else if(this.controllers[0].buttons[15].pressed){
        shift = 4
      }else if(this.controllers[0].buttons[16].pressed){
        shift = 5
      }else if(this.controllers[0].buttons[17].pressed){
        shift = -1
      }

      let handle = this.controllers[0].axes[0]
      if(handle > 1){
        handle = 1
      }else if(handle < -1){
        handle = -1
      }
      await this.sendSerial([parseInt(handle*64)+63]);

      // console.log(this.controllers[0].axes[1])
      // console.log(this.controllers[0].axes[2])
      let accel = (-this.controllers[0].axes[2] + 1)/2
      // console.log(accel)
      if(shift == 0){
        await this.sendSerial([63+128]);
      }else if(shift > 0){
        await this.sendSerial([parseInt(accel*64)+63+128]);
      }else if(shift < 0){
        await this.sendSerial([parseInt(-accel*64)+63+128]);
      } 
      
      let rAF = window.requestAnimationFrame
      rAF(this.updateStatus);
  },
  sendSerial(num) {
    let arr8 = new Uint8Array(num);
    if (this.dataChannel == null || this.dataChannel.readyState != "open") {
      return;
    }
    this.dataChannel.send(arr8);
  },
  scanGamepads() {
    var gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
    for (var i = 0; i < gamepads.length; i++) {
        if (gamepads[i]) {
            if (!(gamepads[i].index in this.controllers)) {
                addGamepad(gamepads[i]);
                console.log("a");
            } else {
                this.controllers[gamepads[i].index] = gamepads[i];
                //console.log("b");
            }
        }
    }
},
      disconnect() {
        if (this.conn) {
          this.conn.disconnect();
        }
      },
      async startConn() {
        this.options.video.codec = this.videoCodec;
        this.conn = Ayame.connection(this.signalingUrl, this.roomId, this.options, true);
        
        this.conn.on('open', async (e) => {
            console.log("open");
            if(this.data_flg){
              this.dataChannel = await this.conn.createDataChannel(this.label);
              if (this.dataChannel) {
                this.dataChannel.onmessage = this.onMessage;
              }
            }
        });
        if(this.data_flg){
          this.conn.on('datachannel', (channel) => {
            console.log("datachannel")
            if (!this.dataChannel) {
              this.dataChannel = channel;
              this.dataChannel.onmessage = this.onMessage;
            }
          });
        }

        this.conn.on('disconnect', (e) => {
          console.log(e);
          this.remoteVideo.srcObject = null;
        });
        this.conn.on('addstream', (e) => {
          this.remoteVideo.srcObject = e.stream;
        });
        await this.conn.connect(null);
      },
      onChangeVideoCodec() {
        // 必要に応じてここにコーデック変更時の処理を記述
      },
      onMessage(e) {
        let data = new TextDecoder().decode(e.data);
        let datas = data.split(":")
        if(datas[0] == "Speed"){
          this.left_speed = Number(datas[1].split(",")[0])
          this.right_speed = Number(datas[1].split(",")[1])
          
        }else if(datas[0] == "Steering"){
          this.Steering = Number((datas[1] - 900)/10)
          // console.log(this.Steering)
        }
      }
  }
}
</script>