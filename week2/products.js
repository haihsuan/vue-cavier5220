import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.45/vue.esm-browser.min.js';
const url = 'https://vue3-course-api.hexschool.io/v2';
const path = 'cavier5220';

const app = {
  data() {
    return {
      tempProduct: {},
      products: []
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
    }
  },
  mounted() { //初始化
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)cavier5220\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    axios.defaults.headers.common.Authorization = token;
    this.loginCheck()
  }
}

createApp(app).mount('#app');

