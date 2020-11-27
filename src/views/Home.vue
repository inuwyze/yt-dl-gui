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
         solo
         append-icon="mdi-link-variant"
         v-model="url"
         placeholder="Type keyword...">
      </v-text-field>
      <v-btn
      v-if="openConfig"
      class="primary ml-4 pt-6 pb-6"
			@click="download">
      <v-icon>mdi-download</v-icon></v-btn>
      <v-btn
      class="primary ml-4 pt-6 pb-6"
      @click="openDestinationFolder"
      >
      <v-icon>mdi-folder </v-icon>
      </v-btn>
      </v-row>
    
    <v-row>
		<v-card
		width="100%"
		
		v-if="openConfig"		
		class="pa-6">
    <v-row>


      <v-col
      class="centered">

        <v-img
        v-if="videoId"
        :src='thumbnailImg'
        max-height="300px"
        max-width="400px"
        ></v-img>
        
      </v-col>
      <v-col
       class="d-flex flex-column">
          
     
          <div class="destination_field">
           
          {{destination_folder}}
           
          <v-btn
          @click="openDialog"
          class=" primary">
          <v-icon>
            mdi-folder-outline 
          </v-icon>
          </v-btn>
        </div>
            
            
        <v-select
          v-model="vid_res"
          solo
          :items="available_res"
          label="default"
          
        ></v-select>
		
      </v-col>
    </v-row>


        
       

		</v-card>
    </v-row> 


    <!-- </v-row> -->

{{downloadProgress}}
{{format_code_lst}}

{{custom}}
{{vid_res}}
    <v-snackbar
    v-model="alert">
      {{msg}}
    </v-snackbar>
  </v-container>
</template>

<script>
import {spawn } from 'child_process'
const { dialog } = require("electron").remote;
const { shell } = require("electron")
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
        vid_res:'default',
        msg:'',
        alert:false,
        openConfig:false,
        dir:'',
        tab:0,
        videoId:'',
        format_code_lst:'',
        res_ids:{
          '4320p' : ['402','571','272','138'],
          '2160p' : ['401','337','315','313','266'],
          '1440p' : ['400','336','308','271','264'],
          '1080p' : ['399','335','303','248','299','137'],
          '720p' :  ['398','334','302','247','298','136'],
          '480p' :  ['397','333','244','135'],
          '360p' :  ['396','332','243','134'],
          '240p' :  ['395','331','242','133'],
          '144p' :  ['394','330','278','160'],
        },
        available_res:[]
      }
    },
    computed: {
      
      thumbnailImg(){
        return 'https://img.youtube.com/vi/'+this.videoId+'/hqdefault.jpg'
      }
    },
    methods: {
    openDestinationFolder(){
      shell.openPath(this.destination_folder)
    },


    get_format_id(){
      this.format_code_lst=this.formats.map((a)=>{
      var r = /\d+/;
       return a.match(r)[0]
      })

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

      if(this.vid_res=='default')
			{
        // var r = /\d+/;
        // this.vid_res=this.vid_res.match(r)[0]
        
        //get default download config
        // this.download_script()
        shell.openPath(this.destination_folderx)

        alert('default')
      }

      else{
        alert( 'custom')
        this.downloadRes_script()
      }

     },

     downloadRes_script(){
      
      //  regex to get just the numeric value of height
      var r = /\d+/;
      let hgt=this.vid_res.match(r)[0]

      // video format script with best audio
      hgt='bestvideo[height='+hgt+']+bestaudio'

      //download script
      const child = spawn('youtube-dl',[this.url,'-f'+hgt],{cwd:this.destination_folder});
      child.stdout.on('data', (data) => {
        // this.progress=`child stdout:\n${data}`;
          this.downloadProgress=data
          console.log(`child stdout:\n${data}`);
          // this.formats+=(`${data}`);
        });

      
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
          this.alert=true;
          this.msg=data;
          this.formats=formats.split(re).slice(2,-1)
          
          this.get_format_id()
          //generate vid_res list

          console.log(`stdersr: ${data}`)
        });
      },
		
      get_res(){
        const res_list=['144','720']
        console.log(res_list)

      },

      get_formatList(url){
        // '-o "C:\\Users\\paullhungdim\\Downloads\\%%(title)s.%%(ext)s"'
        const path = require('path');
        
        // Returns: 'myfile.html'
        console.log(path.basename('D:\\temp\\myfile.html'))
        console.log(process.env.PATH)
        // download vid
        // const child = spawn('youtube-dl',[url],{cwd:this.dir});
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
          this.openConfig=true
          this.formats=formats.split(re).slice(2,-1)
          // this.vid_res=this.formats[this.formats.length]
          this.get_format_id()
          //generate vid_res list

          console.log(`stdersr: ${data}`)
        });
      }
    },
    watch: {
      url(val){
      val=val.trim()
      var p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
      if(val.match(p)){
          this.available_res=[]
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
.destination_field{
  /* border:red 1px solid; */
  width:100%;
  display: flex;
  justify-content: space-between;
  padding:6px;
  margin-bottom: 20px;
}
.centered{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>