<template>
    <div>
      <p>ルームID
        <input v-model="roomId" type="text" />
      </p>
      <p>クライアントID
        <input v-model="clientId" disabled type="text" />
      </p>
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
  data() {
    return {
      signalingUrl: 'wss://ayame-labo.shiguredo.app/signaling',
      roomId: 'mecchi624@ayame-labo',
      clientId: null,
      videoCodec: null,
      audioCodec: null,
      signalingKey: 'OzIaJg1oewJz6Q4tgGFVy5xKSKM34-2kDkptqfT8M8npW7hk',
      options: Ayame.defaultOptions,
      conn: null,
      remoteVideo: null
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
      await this.conn.connect(null);
      this.conn.on('open', ({authzMetadata}) => console.log(authzMetadata));
      this.conn.on('disconnect', (e) => {
        console.log(e);
        this.remoteVideo.srcObject = null;
      });
      this.conn.on('addstream', (e) => {
        this.remoteVideo.srcObject = e.stream;
      });
    },
    onChangeVideoCodec() {
      // 必要に応じてここにコーデック変更時の処理を記述
    }
  }
}
</script>