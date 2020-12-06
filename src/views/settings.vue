<template>
  <v-container
  fill-height
  
  class="justify-center "
  :class="{'pa-0':'this.$vuetify.breakpoint.xs'}">
  
      
      
        <v-card
        :height="this.$vuetify.breakpoint.sm ? '100%' :'90%'"
        :width="this.$vuetify.breakpoint.sm ? '100%' :'90%'"
        class=" pl-10 pr-16">
        <div
        class="text-h3 text-center mt-3 mb-6">
          SETTINGS
        </div>
       
        <v-row>
          <v-col cols='12' md='3'
          class="centered attr">
            destination folder
          </v-col>
          <v-col cols='12' md='9'
          class="pl-16">
            <v-row 
            class="centered ma-0">
            <div
           class="destination_field destination_field_hgt ma-0">{{destination_folder}}</div>
            <v-btn
            @click="openDialog"
            class="ml-3 destination_field_settings">
            <v-icon>
              mdi-folder
            </v-icon></v-btn>
            </v-row>
          </v-col>
        </v-row>
        <v-row
        v-for="(x,i) in preferences"
        :key="i">
          <v-col cols='12' md='3'
          class="centered attr"
          >
            {{x.name}}
          </v-col>
          <v-col cols='12' md='9'
          class="pl-16">
         <!-- <draggable v-model="x.list" >
            <v-btn 
            rounded
            
            class="ml-1 mt-1 primary"
            v-for="(items,i) in x.list" :key="i" >
              {{ items }}
            </v-btn>
          </draggable>         -->
          <v-select
          v-model="x.pref"
          solo
          
          hide-details
          :items="x.list"
          
          
        ></v-select>
          </v-col>
        </v-row>


        <!-- {{preferences}} -->
        {{n}}
        {{l}}

        </v-card>
      
      
  </v-container>
</template>

<script>
const { dialog } = require("electron").remote;

import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['destination_folder','preferences']),

  },
  watch: {
    preferences: {
        handler(n) { 
          n.forEach((x)=>{
            localStorage.setItem(x.LcStr_item,x.pref)
            // console.log(x.pref)
          })
        },
        deep: true
    }
  },

  data () {
    return {
      n:'',
      l:'',
    }
  },
  methods: {
    async openDialog(){
        
        const dir=await dialog.showOpenDialog( {
          properties: ['openDirectory']
        })
        this.$store.state.destination_folder=dir.filePaths[0]
        localStorage.setItem('destination_folder',dir.filePaths[0])
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

.attr{
  border-right: 2px solid lightgrey;
}
.centered{
  display: flex;
  justify-content: center;
  align-items: center;
  
}

</style>