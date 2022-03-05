<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <nuxt-link class="navbar-brand" to="/">パーツ在庫管理システム</nuxt-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <nuxt-link class="nav-link active" to="/">Home</nuxt-link>
          </li>
          <!-- <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li> -->
          <li class="nav-item" v-if="isLogin">
            <nuxt-link class="nav-link active" to="/products"
              >製品一覧</nuxt-link
            >
          </li>
          <li class="nav-item" v-if="isLogin">
            <nuxt-link class="nav-link active" to="/parts"
              >部品一覧</nuxt-link
            >
          </li>
        </ul>
        <ul class="navbar-nav mb-2 mb-lg-0" v-if="isLogin">
          <li class="nav-item">
            <button class="btn btn-secondary" @click="logout">
              ログアウト
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
  },
  computed: {
    ...mapGetters(["isLogin"]),
  },
};
</script>
