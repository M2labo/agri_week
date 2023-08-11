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
        document.body.appendChild(d);
        let rAF = window.requestAnimationFrame
        rAF(this.updateStatus);
    },
    updateStatus() {
      this.scanGamepads();
      for (let j in this.controllers) {
          var controller = this.controllers[j];
          var d = document.getElementById("controller" + j);
          var buttons = d.getElementsByClassName("button");
          //ボタン情報の状態取得
          for (var i = 0; i < controller.buttons.length; i++) {
              var b = buttons[i];
              var val = controller.buttons[i];
              var pressed = val == 1.0;
              if (typeof (val) == "object") {
                  pressed = val.pressed;
                  val = val.value;
              }
              var pct = Math.round(val * 100) + "%";
              b.style.backgroundSize = pct + " " + pct;
              if (pressed) {
                  b.className = "button pressed";
              } else {
                  b.className = "button";
              }
          }
          //アナログコントロール情報の状態取得
          var axes = d.getElementsByClassName("axis");
          for (var i = 0; i < controller.axes.length; i++) {
              var a = axes[i];
              a.innerHTML = i + ": " + controller.axes[i].toFixed(4);
              a.setAttribute("value", controller.axes[i]);
          }
      }
      let rAF = window.requestAnimationFrame
      rAF(this.updateStatus);
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
          console.log(e.data);
      }
  }
}
</script>