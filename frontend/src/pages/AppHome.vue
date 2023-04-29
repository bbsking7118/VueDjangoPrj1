<template>
  <v-app id="inspire">
    <MainMenu />

    <v-main>
      <HelloWorld />
    </v-main>

    <v-footer app>
      <span>Copyright &copy; 2022 by shkim</span>
    </v-footer>
  </v-app>
</template>

<script>
import MainMenu from '../components/MainMenu.vue';
import HelloWorld from '../components/HelloWorld.vue';

export default {
  components: { MainMenu, HelloWorld },

  data: () => ({
  }),
};
</script>