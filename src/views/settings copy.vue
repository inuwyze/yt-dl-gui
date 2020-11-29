<template>
  <v-container
  fill-height
  
  class="justify-center "
  :class="{'pa-0':'this.$vuetify.breakpoint.xs'}">
  
      
      
        <v-card
        height="100%"
        width="100%"
        class="pl-10 pr-10">
        <div
        class="text-h3 text-center mt-3 mb-6">
          SETTINGS
        </div>
        <v-row
        v-for="(x,i) in preferences"
        :key="i">
          <v-col cols='12' md='3'
          class="centered"
          >
            {{x.name}}
          </v-col>
          <v-col cols='12' md='9'>
         <draggable v-model="x.list" >
            <v-btn 
            rounded
            
            class="ml-1 mt-1 primary"
            v-for="(items,i) in x.list" :key="i" >
              {{ items }}
            </v-btn>
          </draggable>        
          </v-col>
        </v-row>


       
        <v-row>
          <v-col cols='12' md='3'
          class="centered">
            destination folder
          </v-col>
          <v-col cols='12' md='9'>
            <v-row >
            <div
           class="destination_field">{{destination_folder}}</div>
            <v-btn
            @click="openDialog"
            class="ml-3">
            <v-icon>
              mdi-folder</v-icon></v-btn>
            </v-row>
          </v-col>
        </v-row>
        


        </v-card>
      
      
  </v-container>
</template>

<script>
const { dialog } = require("electron").remote;
import draggable from "vuedraggable";
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['destination_folder','preferences']),

  },
 components: {
    draggable
  },
  data () {
    return {
    
    }
  },
  methods: {
    async openDialog(){
        
        const dir=await dialog.showOpenDialog( {
          properties: ['openDirectory']
        })
        this.$store.state.destination_folder=dir.filePaths[0]
        // this.destination_folder=dir.filePaths[0]
      },
  }
}
</script>

<style  scoped>

.sortable-chosen.sortable-ghost{
  color: transparent !important;
  background-color: white !important;
  box-shadow: none;
}

.centered{
  display: flex;
  justify-content: center;
  align-items: center;
}
.destination_field{
  /* border:red 1px solid; */
  width:80%;
  padding:6px;
}
</style>