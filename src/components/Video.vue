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
        label: 'dataChannel'
      };
    },
    mounted() {
      this.remoteVideo = this.$el.querySelector('#remote-video');
      this.options.clientId = this.clientId ? this.clientId : this.options.clientId;
      if (this.signalingKey) {
        this.options.signalingKey = this.signalingKey;
      }
    },
    methods: {
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
            this.dataChannel = await this.conn.createDataChannel(this.label);
            if (this.dataChannel) {
              this.dataChannel.onmessage = this.onMessage;
            }
        });
        this.conn.on('datachannel', (channel) => {
          console.log("datachannel")
          if (!this.dataChannel) {
            this.dataChannel = channel;
            this.dataChannel.onmessage = this.onMessage;
          }
        });
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