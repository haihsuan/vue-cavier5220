import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.45/vue.esm-browser.min.js';
const app = {
    data() {
        return {
            user: {
                username: '',
                password: '',
            },
        };
    },
    methods: {
        login() { //登入
            const url ='https://vue3-course-api.hexschool.io/v2';
            const path ='cavier5220' ;
            axios.post(`${url}/admin/signin`, this.user)
                .then((res) => {
                    //console.log(res);
                    const { token, expired } = res.data;
                    document.cookie = `cavier5220=${token}; expires=${expired};`;
                    window.location = 'index.html';
                })
                .catch((err) => {
                    alert('你登入失敗了');
                })
        },

    },
}
createApp(app).mount('#app');
