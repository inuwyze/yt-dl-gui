<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
      class="d-flex justify-center"
    >
    https://www.youtube.com/watch?v=cY1B3R4BWc4
    <v-btn router to='/'>
    home
    </v-btn>
    <v-btn router to='/about'>
    about
    </v-btn>
    <v-btn router to='/settings'>
    settings
    </v-btn>
    
    </v-app-bar>    

      <v-main>
      <router-view/>
      </v-main>
    
  </v-app>
</template>

<script>


export default {
  name: 'App',

  components: {

  },

  data: () => ({
    //
  }),
};
</script>
