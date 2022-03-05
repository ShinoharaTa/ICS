<template>
  <div class="container py-5">
    <h1>ログイン</h1>
    <button class="btn btn-lg btn-success" @click="login">
      Googleでログイン
    </button>
  </div>
</template>

<script>
import {
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";
import { mapGetters } from "vuex";
// import Ranking from "@/components/ranking";

export default {
  layout: "single",
  components: {},
  async beforeMount() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        this.$store.dispatch("logout");
        return;
      }
    });
    if (this.isLogin) {
      //認証済み
      this.$router.push("/");
    }
  },
  methods: {
    async login() {
      this.$store.commit("loadingShow", "ログイン中");
      await this.$store.dispatch("login");
      this.$store.commit("loadingHide");
    },
  },
  computed: {
    ...mapGetters(["isLogin", "user"]),
  },
};
</script>
