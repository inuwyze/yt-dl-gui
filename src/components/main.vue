<template>
  <v-container fluid>
    <v-layout align-start justify-center>
      <v-spacer></v-spacer>

          <draggable v-model="tabs" >
            <v-btn 
            fab
            v-for="tab in tabs" :key="tab.id" >
              {{ tab.name }}
            </v-btn>
          </draggable>        
      
      <v-flex xs4 class="grey lighten-2 pa-2">
        <pre>{{ tabs }}</pre>
      </v-flex>
      <v-spacer></v-spacer>
    </v-layout>
  </v-container>
</template>

<script>
import draggable from "vuedraggable";
export default {
  
  components: {
    draggable
  },
  methods: {
  },
  data() {
    return {
      active: 0,
      tabs: [
        {
          id: 1, 
          name: "1st Tab",
          text: "This is a 1st tab"
        },
        {
          id: 2, 
          name: "2nd Tab",
          text: "This is a 2nd tab"
        },
        {
          id: 3, 
          name: "3rd Tab",
          text: "This is a 3rd tab"
        }
      ]
    }
  }
}
</script>
<style  scoped>
.v-btn .v-btn--flat .v-btn--text .theme--light .v-size--default.sortable-ghost{
  color: green;
}
.sortable-ghost{
  color: transparent;
  background-color: transparent !important;
  box-shadow: none;
}
</style>