<template>
  <v-card
    class="mx-auto"
    style="max-width: 500px;"
  >
    <v-toolbar
      color="deep-purple accent-4"
      cards
      dark
      flat
    >
      <v-btn icon>
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-card-title class="text-h6 font-weight-regular">
        Add User
      </v-card-title>
    </v-toolbar>
    <v-form
      ref="form"
      v-model="form"
      class="pa-4 pt-6"
    >
      <v-text-field
        v-model="email"
        :rules="[rules.email]"
        filled
        color="deep-purple"
        label="Email address"
        type="email"
      ></v-text-field>
      <v-text-field
        v-model="first_name"
        :rules="[rules.name]"
        filled
        color="deep-purple"
        label="First Name"
        type="name"
      ></v-text-field>
      <v-text-field
        v-model="last_name"
        :rules="[rules.name]"
        filled
        color="deep-purple"
        label="Last Name"
        type="name"
      ></v-text-field>
      <v-text-field
        v-model="password"
        :rules="[rules.password, rules.length(6)]"
        filled
        color="deep-purple"
        label="Password"
        style="min-height: 96px"
        type="password"
      ></v-text-field>
    </v-form>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn
        text
        @click="$refs.form.reset()"
      >
        Clear
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        :disabled="!form"
        :loading="isLoading"
        class="white--text"
        color="deep-purple accent-4"
        depressed
        @click="sendInvite"
      >
        Submit
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from 'axios'
  export default {
    data: () => ({
        email: '',
        first_name: '',
        last_name: '',
        password: '',
        isLoading: false,
        form: false,
      rules: {
        email: v => !!(v || '').match(/@/) || 'Please enter a valid email',
        length: len => v => (v || '').length >= len || `Invalid character length, required ${len}`,
        password: v => !!(v || ''),
        name: v => !!(v || '').match(/^[a-zA-Z]+$/) || 'Please enter a valid name',
        required: v => !!v || 'This field is required',
      },
    }),
    methods: {
    async sendInvite () {
      try {
        const response = await axios.post("sendInvite", {
            first_name: this.first_name,
            last_name: this.last_name,
            email: this.email,
            password: this.password,
        })

        localStorage.setItem("token", response.data.token);
        this.$store.dispatch("users", response.data.user);
           console.log(response)
        this.$router.push('/')
        location.reload();
      } catch (error) {
        this.error = ("Invalid Email or Password")
        console.log(this.error)
      }
    }
}
  }
</script>