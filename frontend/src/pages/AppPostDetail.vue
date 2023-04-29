<template>
  <v-app id="inspire">
    <MainMenu />

    <v-main>
      <PostDetail />
    </v-main>

    <v-footer app>
      <span>Copyright &copy; 2022 by shkim</span>
    </v-footer>
  </v-app>
</template>

<script>
import MainMenu from '../components/MainMenu.vue';
import PostDetail from '../components/PostDetail.vue';

export default {
  components: { MainMenu, PostDetail },

  data: () => ({
  }),
};
</script>