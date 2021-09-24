<template>
<v-container fluid mt-5>
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
      <v-btn icon to="/">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-card-title class="text-h6 font-weight-regular">
        Login in
      </v-card-title>
      
    </v-toolbar>
    <v-form @click.prevent="login"
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
        v-model="password"
        :rules="[rules.password, rules.length(6)]"
        filled
        color="deep-purple"
        label="Password"
        style="min-height: 96px"
        type="password"
      ></v-text-field>
      
      <v-checkbox
        v-model="agreement"
        :rules="[rules.required]"
        color="deep-purple"
      >
        <template v-slot:label>
          I agree to the&nbsp;
          <a
            href="#"
            @click.stop.prevent="dialog = true"
          >Terms of Service</a>
          &nbsp;and&nbsp;
          <a
            href="#"
            @click.stop.prevent="dialog = true"
          >Privacy Policy</a>*
        </template>
      </v-checkbox>
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
        @click="login"
      >
        Submit
      </v-btn>
    </v-card-actions>
    <v-dialog
      v-model="dialog"
      absolute
      max-width="400"
      persistent
    >
      <v-card>
        <v-card-title class="text-h5 grey lighten-3">
          Legal
        </v-card-title>
        <v-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn
            text
            @click="agreement = false, dialog = false"
          >
            No
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            class="white--text"
            color="deep-purple accent-4"
            @click="agreement = true, dialog = false"
          >
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
  </v-container>
</template>

<script>
import axios from 'axios'
  export default {
    data: () => ({
      agreement: false,
      dialog: false,
      email: undefined,
      form: false,
      isLoading: false,
      password: undefined,
      rules: {
        email: v => !!(v || '').match(/@/) || 'Please enter a valid email',
        length: len => v => (v || '').length >= len || `Invalid character length, required ${len}`,
        password: v => !!(v || ''),
        required: v => !!v || 'This field is required',
      },
    }),
     methods: {
    async login () {
      try {
        const response = await axios.post("login", {
          email: this.email,
          password: this.password
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