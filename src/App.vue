<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        ClubApp
      </div>

      <v-spacer></v-spacer>
      <div v-if="!users">
        <v-btn to="/login" text>
          <span class="mr-2">Login</span>
          <v-icon>mdi-account</v-icon>
        </v-btn>

        <v-btn to="/users" text>
          <span class="mr-2">View Users</span>
          <v-icon>mdi-account-cicle</v-icon>
        </v-btn>
        <v-btn to="/adduser" text>
          <span class="mr-2">Add a Users</span>
          <v-icon>mdi-account-plus</v-icon>
        </v-btn>
      </div>
      <div v-if="users">
        
        <a href="javascript:void(0)" class="toolbar-item" @click="logout"
          >Logout</a
        >
      </div>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: "App",

  data: () => ({
    //
  }),
  computed: {
    ...mapGetters(["users"]),
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$store.dispatch("users", null);
      this.$router.push("/");
    },
  },
};
</script>
<style scoped>
.toolbar-item {
  color: #fff;
  text-decoration: none;
  padding: 2rem;
}
</style>
