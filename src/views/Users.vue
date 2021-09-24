<template>
  <v-container fluid>
    <div class="users" v-if="users">
      <h1 class="text-center">Welcome Administrator</h1>
      <h3 class="text-center">List of users available</h3>
      <v-simple-table dense>
        <template v-slot:default>
          <thead>
            <tr>
              <th style="font-size: 1.5rem">First Name</th>
              <th style="font-size: 1.5rem">Last Name</th>
              <th style="font-size: 1.5rem">Email Address</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="n in users.data" :key="n.user_id">
              <td>{{ n.first_name }}</td>
              <td>{{ n.last_name }}</td>
              <td>{{ n.email }}</td>
              <v-btn text depressed color="primary" @click="remove">
                Remove
              </v-btn>
              <!-- <v-btn
              text
                class="btn btn-primary"
                :to="{ name: 'EditUser', params: { id: n.user_id } }"
                >Remove</v-btn
              > -->
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>
    <div v-else>You don't have access to this page</div>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  async created() {
    const response = await axios.get("users");

    if (localStorage.getItem === null) {
      this.$router.push("/login");
    }
    this.$store.dispatch("users", response.data);
  },
  computed: {
    ...mapGetters(["users"]),
  },
};
</script>