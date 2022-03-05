import { getAuth, signOut, deleteUser, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export const state = () => ({
  user: null,
  loadingModal: false,
  loadingMessage: "テスト",
  partsList: [],
  productsList: [],
  packingList: [],
})

export const getters = {
  isLogin: state => !!state.user,
  getUser: state => state.user,
  loadingModal: state => state.loadingModal,
  loadingMessage: state => state.loadingMessage,
  getPartsList: state => state.partsList,
  getProductsList: state => state.productsList,
  getPackingList: state => state.packingList,
}

export const mutations = {
  loadingShow(state, message) {
    state.loadingModal = true;
    state.loadingMessage = message;
  },
  loadingHide(state) {
    state.loadingModal = false;
    state.loadingMessage = "";
  },
  async setUser(state, user) {
    state.user = user;
  },
  async addProducts(state, item) {

  },
  async updateProducts(state, item) {

  },
  async addParts(state, item) {

  },
  async updateParts(state, item) {

  },
  async addPacking(state, item) {

  },
  async updatePacking(state, item) {

  },
  loadUserItem(state, item) {
    // state.partsList = this.$fire.firestore.collections("users").doc(user.uid).collection("parts").get();
    // const snapshot = await db.collection("users").orderBy("status.total","desc").get()
    // let rankingTable = [];
    // snapshot.forEach((item) => {
    //   rankingTable.push({
    //     display_name: item.data().display_name,
    //     screen_name: item.data().screen_name,
    //     image_path: item.data().image_path,
    //     battle_point: item.data().status.total,
    //   });
    // })
    // state.partsList = this.$fire.firestore.collections("users").doc(user.uid).collection("parts").get();
    // state.productsList = this.$fire.firestore.collections("users").doc(user.uid).collection("products").get();
    // state.packingList = this.$fire.firestore.collections("users").doc(user.uid).collection("packing").get();
    state.partsList = item.partsList
    state.productsList = item.productsList
    state.packingList = item.packingList
  },
  clear(state) {
    state.user = null;
    state.partsList = [];
    state.productsList = [];
    state.packingList = [];
  },
}

export const actions = {
  async login({ commit }) {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    if (this.isLogin) {
      //認証済み
      this.$router.push({ path: "/" });
    } else {
      //未認証
      signInWithPopup(auth, provider)
        .then(async (result) => {
          let user = {
            uid: result.user.uid,
            displayName: result.user.displayName,
            photoURL: result.user.photoURL,
          };
          const userRef = this.$fire.firestore.collection("users").doc(user.uid);
          await userRef.set({
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          });
          commit("setUser", user);
          this.$router.push("/");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  },
  async logout({ commit }) {
    const auth = getAuth();
    await signOut(auth);
    commit("clear");
    this.$router.push('/login');
  },
  async deleteUser({ commit }) {
    const auth = getAuth();
    const user = auth.currentUser;
    await deleteUser(user);
    commit("clear");
    this.$router.push('/login');
  }
}
