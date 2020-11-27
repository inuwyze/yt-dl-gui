import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    destination_folder:'C:\\Users\\paullhungdim\\Videos\\youtube',
    preferences:[
      {name:'resolution',list:[
        "4320p",
        "2160p",
        "1440p",
        "1080p",
        "720p",
        "480p",
        "360p",
        "240p",
        "144p"
        ]},
      {name:'video_format',list:["mp4",'webm']},
      {name:'video_codec',list:[
        'AV1 HFR',
        'AV1',
        'VP9.2 HDR HFR',
        'VP9 HFR',
        'VP9',
        'H.264 HFR',
        'H.264'
        ]},
      {name:'audio_codecs',list:[ 
        'AAC 48 Kbps',
        'AAC 128 Kbps',
        'Opus ~50 Kbps',
        'Opus ~70 Kbps',
        'Opus ~160 Kbps',
        'AAC 192Kbps',
        'AAC 384Kbps',]},
      ]
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
