import { async } from '@firebase/util';
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
  setUserItem(state, item) {
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
  },
  async getUserData({ commit }) {
    state.partsList = this.$fire.firestore.collections("users").doc(user.uid).collection("parts").get();
    const partsCollection = this.$fire.firestore.collections("users").doc(user.uid).collection("parts").get();
    let parts = [];
    partsCollection.forEach((item) => {
      parts.push({
        id: item.id,
        name: item.data().name,
        count: item.data().count,
      });
    });
    const productsCollection = this.$fire.firestore.collections("users").doc(user.uid).collection("parts").get();
    let products = [];
    productsCollection.forEach((item) => {
      products.push({
        id: item.id,
        name: item.data().name,
        count: item.data().count,
      });
    });
    const packingCollection = this.$fire.firestore.collections("users").doc(user.uid).collection("parts").get();
    let packing = [];
    packingCollection.forEach((item) => {
      packing.push({
        id: item.id,
        name: item.data().name,
        count: item.data().count,
      });
    });
    let item = {
      partsList: parts,
      productsList: products,
      packingList: packing,
    }
    commit("setUserItem", item);
  },
}
