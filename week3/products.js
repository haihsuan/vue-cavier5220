import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
const url = 'https://vue3-course-api.hexschool.io/v2';
const path = 'cavier5220';
let productModal = null;
let delProductModal = null;

const app = {
  data() {
    return {
      tempProduct: {},
      products: [],
      statu:false,
    };
  },
  methods: {
    loginCheck() { //登入檢查
      axios.post(`${url}/api/user/check`)
        .then((res) => {
          this.getData();
          //登入檢查通過，呼叫下方getData功能獲得資料
        })
        .catch(() => {
          alert('你沒登入喔');
          window.location = 'login.html';
          //檢查錯誤，跳出提示訊息以及回歸登入頁面
        })
    },
    getData() { //產品資料
      axios.get(`${url}/api/${path}/admin/products`)
        .then((res) => {
          this.products = res.data.products;
          //成功串接獲取資料
        })
        .catch((err) => {
          alert('資料索取失敗');
        })
    },
    openProduct(product) { //產品細節資料
      this.tempProduct = product;
    },
    openmodal(statu,product){
      if(statu==='delete'){
        this.tempProduct={...product};
        delProductModal.show();
      }else if(statu==='edit'){
        productModal.show();
      }else if(statu==='newProduct'){
        productModal.show();
      }
    },
    // // addProduct() { //新增產品
    // //   axios.post(`${url}/api/${path}/admin/product`)
    // //     .then((res) => {
    // //     })
    // //     .catch((err) => {
    // //     })
    // // },
    // // editProduct() { //編輯產品
    // //   axios.put(`${url}/api/${path}/admin/product/{this.tempProduct.id}`)
    // //     .then((res) => {
    // //     })
    // //     .catch((err) => {
    // //     })
    // },
    delProduct() { //刪除產品
      axios.delete(`${url}/api/${path}/admin/product/${this.tempProduct.id}`)
        .then((res) => {
          console.log(res.data);
          // alert(res.data.message);
          // this.getData();
        })
        .catch((err) => {
          console.log(err);
          // alert(err.res.data.message);
        })
    }
  },
  mounted() { //初始化
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)cavier5220\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    axios.defaults.headers.common.Authorization = token;
    this.loginCheck()
  }
}
createApp(app).mount('#app');

