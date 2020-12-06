import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    a:localStorage.getItem('a'),
    destination_folder:localStorage.getItem('destination_folder'),
    preferences:[
      {name:'resolution',
      list:[
        "zenith",
        "nadir",
        "4320p",
        "2160p",
        "1440p",
        "1080p",
        "720p",
        "480p",
        "360p",
        "240p",
        "144p"],
        LcStr_item:'download_res',
        pref:localStorage.getItem('download_res')
      },
      // {name:'video_format',list:["mp4",'webm'],pref:localStorage.getItem('download_format')},
      // {name:'video_codec',list:[
      //   'AV1 HFR',
      //   'AV1',
      //   'VP9.2 HDR HFR',
      //   'VP9 HFR',
      //   'VP9',
      //   'H.264 HFR',
      //   'H.264'
      //   ],
      //   pref:localStorage.getItem('download_res')
      // },
      {name:'audio_codecs',list:[ 
        'zenith',
        'nadir',
        'AAC 48 Kbps',
        'AAC 128 Kbps',
        'Opus ~50 Kbps',
        'Opus ~70 Kbps',
        'Opus ~160 Kbps',
        'AAC 192Kbps',
        'AAC 384Kbps',],
        LcStr_item:'download_aud',
        pref:localStorage.getItem('download_aud')
      },
      ]
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
