import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
const url = 'https://vue3-course-api.hexschool.io/v2';
const path = 'cavier5220';
let productModal = null;
let delProductModal = null;

const app = {
  data() {
    return {
      products: [],
      tempProduct: {
        imagesUrl:[],
      },
      isNew:false, //確認是編輯或是新增
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
    getData() { //取得產品資料
      axios.get(`${url}/api/${path}/admin/products`)
        .then((res) => {
          this.products = res.data.products;
          //成功串接獲取資料
        })
        .catch((err) => {
          alert('資料索取失敗');
        })
    },
    openModal(status,product){
      if(status === 'creat'){
        productModal.show();
        this.isNew = true ;
        //初始化，帶imagesUrl避免多張圖片出錯
        this.tempProduct= {
          imagesUrl:[],
        };
      }else if (status === 'edit'){
        productModal.show();
        this.isNew = false ;
        //帶入當前資料
        this.tempProduct = {...product} ;
      }else if (status === 'del'){
        delProductModal.show();
        this.tempProduct = {...product} ;
      }
      // productModal.show();
      // console.log(status);
    },
    updateProduct(){
      //isNew判斷API運行
      let urlProduct =`${url}/api/${path}/admin/product`;
      let method ='post';
      if (!this.isNew) {
         urlProduct =`${url}/api/${path}/admin/product/${this.tempProduct.id}`;
         method ='put';
      }
      axios[method](urlProduct, {data:this.tempProduct})
      .then((res) => {
        this.getData();
        productModal.hide(); //更新完資料後關閉modal
      })
    },
    deleteProduct(){
      axios.delete(`${url}/api/${path}/admin/product/${this.tempProduct.id}`)
      .then((res) => {
        this.getData();
        delProductModal.hide(); //更新完資料後關閉modal
      })
    }
  },
  mounted() { //初始化
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)cavier5220\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    axios.defaults.headers.common.Authorization = token;
    this.loginCheck()
    //bootstrap modal
    // 1.初始化 2.方法(hide.show等)
    productModal = new bootstrap.Modal('#productModal')
    delProductModal= new bootstrap.Modal('#delProductModal')
    // productModal.show(); //檢查功能正常
  }
}
createApp(app).mount('#app');

