<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
      class="d-flex justify-center"
    >
    <v-btn router to='/'>
    home
    </v-btn>
    <v-btn router to='/about'>
    about
    </v-btn>
    <v-btn router to='/settings'>
    settings
    </v-btn>
     <v-btn v-clipboard="btnvalue">url</v-btn>
    
      <v-btn
      class=" destination_btn pt-6 pb-6"
      @click="openDestinationFolder"
      >
      <v-icon>mdi-folder </v-icon>
      </v-btn>
    </v-app-bar>    

      <v-main>
      <router-view/>
      </v-main>
    
  </v-app>
</template>

<script>
const { shell } = require("electron")

export default {
  name: 'App',
  components: {
  },
  data: () => ({
    btnvalue:'https://www.youtube.com/watch?v=cY1B3R4BWc4'
  }),

  methods: {
     openDestinationFolder(){
      shell.openPath(this.$store.state.destination_folder)
    },
    copyToClipboard(){
      let testingCodeToCopy = document.querySelector('#testing-code')
      testingCodeToCopy.select()
      document.execCommand('copy');
    }
  }
};
</script>
<style  scoped>
.destination_btn{
  position: fixed;
  right: 5px;
}
</style>