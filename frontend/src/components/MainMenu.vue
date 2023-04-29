<template>
  <div>
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-cog</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left color="indigo" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Vue.js - Django Web Programming</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn text href="/">Home</v-btn>
      <!-- <v-btn text href="/post_list.html">Blog</v-btn> -->
      <v-btn text href="/blog/post/list/">Blog</v-btn>
      <v-btn text href="/admin/">Admin</v-btn>

      <v-spacer></v-spacer>

      <v-menu offset-y left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn text v-bind="attrs" v-on="on">
            <v-icon>mdi-account</v-icon>{{ me.username }}
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <template v-if="me.username === 'Anonymous'">
            <v-list-item @click="dialogOpen('login')">
              <v-list-item-title>Login</v-list-item-title>
            </v-list-item>
            <v-list-item @click="dialogOpen('register')">
              <v-list-item-title>Register</v-list-item-title>
            </v-list-item>
          </template>
          <template v-else>
            <v-list-item @click="logout">
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
            <v-list-item @click="dialogOpen('pwdchg')">
              <v-list-item-title>Password change</v-list-item-title>
            </v-list-item>
          </template>
        </v-list>
      </v-menu>
    </v-app-bar>

    <!-- login dialog -->
    <v-dialog v-model="dialog.login" max-width="600">
      <v-card class="elevation-12">
        <v-toolbar color="primary" dark flat>
          <v-toolbar-title>Login form</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form id="login-form" ref="loginForm">
            <v-text-field
              label="Username"
              name="username"
              prepend-icon="mdi-account"
              type="text"
            ></v-text-field>
            <v-text-field
              label="Password"
              name="password"
              prepend-icon="mdi-lock"
              type="password"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="grey" @click="cancel('login')">Cancel</v-btn>
          <v-btn color="primary" class="mr-5" @click="save('login')"
            >Login</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- register dialog -->
    <v-dialog v-model="dialog.register" max-width="600">
      <v-card class="elevation-12">
        <v-toolbar color="success" dark flat>
          <v-toolbar-title>Register form</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form id="register-form" ref="registerForm">
            <v-text-field
              label="Username"
              name="username"
              prepend-icon="mdi-account"
              type="text"
            ></v-text-field>
            <v-text-field
              label="Password"
              name="password1"
              prepend-icon="mdi-lock"
              type="password"
            ></v-text-field>
            <v-text-field
              label="Password again"
              name="password2"
              prepend-icon="mdi-lock"
              type="password"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="grey" @click="cancel('register')">Cancel</v-btn>
          <v-btn color="success" class="mr-5" @click="save('register')"
            >Register</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- pwdchg dialog -->
    <v-dialog v-model="dialog.pwdchg" max-width="600">
      <v-card class="elevation-12">
        <v-toolbar color="warning" dark flat>
          <v-toolbar-title>Password change form</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form id="pwdchg-form" ref="pwdchgForm">
            <v-text-field
              label="Old password"
              name="old_password"
              prepend-icon="mdi-lock"
              type="password"
            ></v-text-field>
            <v-text-field
              label="New password"
              name="new_password1"
              prepend-icon="mdi-lock"
              type="password"
            ></v-text-field>
            <v-text-field
              label="New password again"
              name="new_password2"
              prepend-icon="mdi-lock"
              type="password"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="grey" @click="cancel('pwdchg')">Cancel</v-btn>
          <v-btn color="warning" class="mr-5" @click="save('pwdchg')"
            >Password change</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
import EventBus from "./event_bus";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

export default {
  data: () => ({
    drawer: null,
    dialog: {
      login: false,
      register: false,
      pwdchg: false,
    },
    me: { username: "Anonymous" },
  }),

  watch: {
    me(newVal, oldVal) {
      console.log("watch.me()...", newVal, oldVal);
      EventBus.$emit("me_change", newVal);
    },
  },

  created() {
    console.log("created()...");    
    this.getUserInfo();
  },

  methods: {
    dialogOpen(kind) {
      console.log("dialogOpen()...", kind);
      if (kind === "login") {
        this.dialog.login = true;
      } else if (kind === "register") {
        this.dialog.register = true;
      } else if (kind === "pwdchg") {
        this.dialog.pwdchg = true;
      }
    },

    cancel(kind) {
      console.log("cancel()...", kind);
      if (kind === "login") {
        this.dialog.login = false;
        this.$refs.loginForm.reset();
      } else if (kind === "register") {
        this.dialog.register = false;
        this.$refs.registerForm.reset();
      } else if (kind === "pwdchg") {
        this.dialog.pwdchg = false;
        this.$refs.pwdchgForm.reset();
      }
    },

    save(kind) {
      console.log("save()...", kind);
      if (kind === "login") {
        this.login();
        this.dialog.login = false;
        this.$refs.loginForm.reset();
      } else if (kind === "register") {
        this.register();
        this.dialog.register = false;
        this.$refs.registerForm.reset();
      } else if (kind === "pwdchg") {
        this.pwdchg();
        this.dialog.pwdchg = false;
        this.$refs.pwdchgForm.reset();
      }
    },

    login() {
      console.log("login()...");
      const postData = new FormData(document.getElementById("login-form"));
      axios
        .post("/api/login/", postData)
        .then((res) => {
          console.log("LOGIN POST RES", res);
          // alert(`user ${res.data.username} login OK`);
          this.me = res.data;
        })
        .catch((err) => {
          console.log("LOGIN POST ERR.RESPONSE", err.response);
          alert("login NOK");
        });
    },

    register() {
      console.log("register()...");
      const postData = new FormData(document.getElementById("register-form"));
      axios
        .post("/api/register/", postData)
        .then((res) => {
          console.log("REGISTER POST RES", res);
          alert(`user ${res.data.username} created OK`);
          // this.me = res.data;
        })
        .catch((err) => {
          console.log("REGISTER POST ERR.RESPONSE", err.response);
          alert("register NOK");
        });
    },

    logout() {
      console.log("logout()...");
      axios
        .get("/api/logout/")
        .then((res) => {
          console.log("LOGOUT GET RES", res);
          alert(`user ${this.me.username} logout OK`);
          this.me = { username: "Anonymous" };
        })
        .catch((err) => {
          console.log("LOGOUT GET ERR.RESPONSE", err.response);
          alert("logout NOK");
        });
    },

    pwdchg() {
      console.log("pwdchg()...");
      const postData = new FormData(document.getElementById("pwdchg-form"));
      axios
        .post("/api/pwdchg/", postData)
        .then((res) => {
          console.log("PWDCHG POST RES", res);
          alert(`user ${this.me.username} password change OK`);
        })
        .catch((err) => {
          console.log("PWDCHG POST ERR.RESPONSE", err.response);
          alert("password change NOK");
        });
    },

    getUserInfo() {
      console.log("getUserInfo()...");
      axios
        .get("/api/me/")
        .then((res) => {
          console.log("GETUSERINFO GET RES", res);
          this.me = res.data;
        })
        .catch((err) => {
          console.log("GETUSERINFO GET ERR.RESPONSE", err.response);
          alert(err.response.status + " " + err.response.statusText);
        });
    },
  },
};
</script>

<style>
</style>