<template>
    <!-- <div>
      <img :src="iconPath">
    </div> -->

    <div>
        <p>ルームID
        <input id="roomIdInput" type="text" value=""></input>
        </p>
        <p>クライアントID
        <input id="clientIdInput" disabled type="text" value=""></input>
        </p>
        <p> 映像コーデック
        <select id="video-codec" onChange="onChangeVideoCodec();">
          <option value="none">none</option>
          <option value="VP8">VP8</option>
          <option value="VP9">VP9</option>
          <option value="AV1">AV1</option>
          <option value="H264">H264</option>
          <option value="H265">H265</option>
        </select>
        （Google Chrome、Microsoft Edge でのみで動作します）
        </p>
        <button onclick="startConn();">接続</button>
        <button onclick="disconnect();">切断</button>
      </div>
      <div style="float:left;">
        <video id="remote-video" autoplay playsinline controls style="width: 400px; height: 300px; border: 1px solid black;"></video>
      </div>
  </template>
  
 
  
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
  