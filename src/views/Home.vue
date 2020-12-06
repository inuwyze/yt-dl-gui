<template>
  <v-container
  fill-height
  >
    <!-- <v-row
    class="d-flex flex-column"
    align-center
    justify-center> -->
    
    <v-row>

     <v-text-field
         ref='url'
         solo
         class="mr-3"
         autofocus
         append-icon="mdi-link-variant"
         v-model="url"
         placeholder="Type keyword...">
      </v-text-field>
      <v-btn
      @click="pasteUrl"
      class="destination_field_hgt">
        <v-icon>mdi-clipboard</v-icon>
      </v-btn>
      </v-row>
    
    <v-row>
		<v-card
		width="100%"
		class="pa-6">
    <v-row>


      <v-col
      xs='0'
      sm='6'
      
      class="centered">

        <v-img
        v-if="videoId"
        class=" vid_thumbnail"        
        :src='thumbnailImg'
        ></v-img>
        
      </v-col>
      
      <v-col
      
      xs='12'
      sm='6'
      
       class="d-flex flex-column">

          <div class=" primary--text options_title">
            Destination folder
          </div>

          <v-row class="ma-0 ">
            <div class="destination_field destination_field_hgt">
              {{destination_folder| dest_filter}} 
            </div>
          <v-btn
          class="destination_field_hgt"
          @click="openDialog">
          <v-icon>
            mdi-folder-cog-outline
          </v-icon>
          </v-btn>
        </v-row>

        <div
        class=" primary--text options_title">
        Resolution
        </div>
        <v-select
          v-model="download_res"
          solo
          :disabled='!downloadable'
          hide-details
          :menu-props="{ bottom: true, offsetY: true }"
          :items="available_res"
          label="default"
          
        ></v-select>
       <div class=" primary--text options_title">
       Audio
       </div>
        <v-select
          v-model="download_aud"
          solo
          hide-details
          :menu-props="{ bottom: true, offsetY: true }"
          :disabled='!downloadable'
          :items="available_aud"
          label="default"
          
        ></v-select>
        <v-btn
          v-if='downloadable'
          class="primary mt-8 pt-6 pb-6"
          @click="download">
            download
        </v-btn>
      </v-col>
    </v-row>


        
       

		</v-card>
    </v-row> 


    <!-- </v-row> -->
{{url}}
{{downloadProgress}}
{{format_code_lst}}
{{available_aud}}
{{available_res}}

{{custom}}
{{download_res}}
    <v-snackbar
    v-model="alert">
      {{msg}}
    </v-snackbar>
  </v-container>
</template>

<script>
import {spawn } from 'child_process'
const { dialog } = require("electron").remote;

// import { dialog } from "electron.remote";
  export default {
    name: 'HelloWorld',
    data () {
      return {
        destination_folder:this.$store.state.destination_folder,
        url:'',
        downloadProgress:'',
        custom:false,
        formats:[],
        download_res:this.$store.state.preferences[0].pref,
        download_aud:this.$store.state.preferences[1].pref,
        msg:'',
        alert:false,
        downloadable:false,
        dir:'',
        tab:0,
        videoId:'',
        format_code_lst:'',
        res_ids:{
          '4320p' :   ['402','571','272','138'],
          '2160p' :   ['401','337','315','313','266'],
          '1440p' :   ['400','336','308','271','264'],
          '1080p' :   ['399','335','303','248','299','137'],
          '720p'  :   ['398','334','302','247','298','136'],
          '480p'  :   ['397','333','244','135'],
          '360p'  :   ['396','332','243','134'],
          '240p'  :   ['395','331','242','133'],
          '144p'  :   ['394','330','278','160'],
        },
        aud_formats:{
          'zenith'                        :'bestvideo' ,
          'nadir'                         :'bestaudio' ,
          'AAC 48 Kbps'                   :'129' ,
          'AAC 128 Kbps'                  :'140' ,
          'Opus ~50 Kbps'                 :'249' ,
          'Opus ~70 Kbps'                 :'250' ,
          'Opus ~160 Kbps'                :'251' ,
          'AAC 192Kbps (surround sound)'  :'256' ,
          'AAC 384Kbps (surround sound)'  :'258' ,
        },
        available_res:[],
        available_aud:[],
      }
    },
    computed: {
      
      thumbnailImg(){

        // console.log('https://img.youtube.com/vi/'+this.videoId+'/hqdefault.jpg')
        // console.log('https://www.youtube.com/watch?v=cY1B3R4BWc4')
        
        return 'http://i3.ytimg.com/vi/'+this.videoId+'/maxresdefault.jpg'
      }
    },
    methods: {
    async pasteUrl(){
      const text = await navigator.clipboard.readText();
      
      this.url=text
      // this.$refs.url=''
      // document.execCommand('paste')
      // console.log(this.url)
    },
    get_format_id(){      
      //gets all format codes available
      this.format_code_lst=this.formats.map((a)=>{
        var r = /\d+/;
       return a.match(r)[0]
      })

      //gets all video format codes available
        for(const aud_format in this.aud_formats) {
          console.log(aud_format)
          console.log(this.aud_formats[ aud_format])
          const found = this.format_code_lst.includes(this.aud_formats[aud_format])
          if (found){
            this.available_aud.push(aud_format)
          }
        }


      //gets all video format codes available
        for(const res in this.res_ids) {
          const found = this.format_code_lst.some(r=> this.res_ids[res].includes(r))
          if (found){
            this.available_res.push(res)
          }
        }


    },


    async openDialog(){  
      const dir=await dialog.showOpenDialog( {
        properties: ['openDirectory']
      })
      this.destination_folder=dir.filePaths[0]
    },


    youtube_parser(url){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    this.videoId=(match&&match[7].length==11)? match[7] : false;
    },


		download(){

        alert( 'custom')
        this.downloadRes_script()


     },

     downloadRes_script(){
      //  regex to get just the numeric value of height
      
      let vid=this.download_res=='nadir'?'worstvideo':'bestvideo'
      let aud=this.aud_formats[this.download_aud]
      let res=''

      // format script with custom audio 
      
      // console.log(this.download_aud)
      // console.log(aud)
      
      // format script with custom resolution
      if (/\d/.test(this.download_res)){
        //regex to get just the int
        var r = /\d+/;
        res='[height='+this.download_res.match(r)[0]+']'
        vid+=res
        // console.log(res)
        
      }
      let scrpt=vid+'+'+aud
      console.log(scrpt)
      

      // //download script
      // const child = spawn('youtube-dl',[this.url,'-f'+scrpt],{cwd:this.destination_folder});
      // child.stdout.on('data', (data) => {
      //   // this.progress=`child stdout:\n${data}`;
      //     this.downloadProgress=data
      //     console.log(`child stdout:\n${data}`);
      //     // this.formats+=(`${data}`);
      //   });
      // child.on('close', () => {
      //   // this.progress=`child stdout:\n${data}`;
      //     this.alert=true;
      //     this.msg='finished downloading';
          
      //     // this.formats+=(`${data}`);
      //   });

      
     },
      download_script(){
        const child = spawn('youtube-dl',[this.url,'-f']);
        
        var formats=''
        child.stdout.on('data', (data) => {
          // this.progress=`child stdout:\n${data}`;
          formats=(`${data}`);
          console.log(`child stdout:\n${data}`);
          // this.formats+=(`${data}`);
        });
        child.stderr.on('data', (data) => {
          this.alert=true;
          this.msg=data;
          console.error(`stderr: ${data}`);
        });
          child.on('close', (data) => {
          // https://www.youtube.com/watch?v=cY1B3R4BWc4
          const re=/\n/
          
          this.formats=formats.split(re).slice(2,-1)
          
          this.get_format_id()
          //generate download_res list

          console.log(`stdersr: ${data}`)
        });
      },
		
      get_res(){
        const res_list=['144','720']
        console.log(res_list)

      },

      get_formatList(url){
        // '-o "C:\\Users\\paullhungdim\\Downloads\\%%(title)s.%%(ext)s"'
    
        const child = spawn('youtube-dl',[url,'-F']);
        
        var formats=''
        child.stdout.on('data', (data) => {
          // this.progress=`child stdout:\n${data}`;
          formats=(`${data}`);
          console.log(`child stdout:\n${data}`);
          // this.formats+=(`${data}`);
        });
        child.stderr.on('data', (data) => {
          this.alert=true;
          this.msg=data;
          console.error(`stderr: ${data}`);
        });
          child.on('close', (data) => {
          // https://www.youtube.com/watch?v=cY1B3R4BWc4
          const re=/\n/
          this.alert=true;
          this.msg=data;
          this.downloadable=true
          this.formats=formats.split(re).slice(2,-1)
          // this.download_res=this.formats[this.formats.length]
          this.get_format_id()
          //generate download_res list

          console.log(`stdersr: ${data}`)
        });
      }
    },
    filters: {
      dest_filter(val){
        console.log(val)
        console.log(val.length)
        let l=val.length
        if(l>49)
          return val.substring(0,3)+'...'+val.substring(l-35,l)
        return val
      }
    },
    watch: {
      url(val){
      val=val.trim()
      var p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
      if(val.match(p)){
          this.available_res=['zenith','nadir']
          this.available_aud=['zenith','nadir']
          this.youtube_parser(val)
          this.get_formatList(val)
      }
      else
        console.log('yos')
      
      }
    }
  }
</script>
<style >
.options_title{
  margin-left:5px ;
  margin-top:15px ;
}

.vid_thumbnail{
  /* max-width: 80%; */
  box-shadow: 0px 12px 8px -8px rgba(0, 0, 0, .24), 
  0px 8px 8px 0px rgba(0, 0, 0, .24),
  0px 4px 20px 5px rgba(0, 0, 0, .22);
}


::-webkit-scrollbar {
  
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: coral;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background:lightblue;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: blue;
}


.destination_field_row{
  /* border:red 1px solid; */
  
  display: flex;
  justify-content: space-between;
  padding:6px;
  margin-bottom: 20px;
}
.destination_field {
  /* border:red 1px solid; */
  display: flex;
  align-items: center;
  overflow: hidden;
  /* direction: rtl; */
  text-overflow: ellipsis; 
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, .2), 
  0px 2px 2px 0px rgba(0, 0, 0, .14),
  0px 1px 5px 0px rgba(0, 0, 0, .12);
  border-radius: 6px;
  flex: 1 1 auto;
  margin-right: 10px  !important;
  padding:6px;
}
.centered{
  display: flex;
  justify-content: center;
  align-items: center;
}

/* width */
.destination_field_hgt{
  min-height: 48px;

}
</style>