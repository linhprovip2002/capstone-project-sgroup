export default function({$axios}){
    $axios.onRequest((config) => {
        const token = localStorage.getItem('accessToken');
        if(token){
            console.log(token);
            config.headers.Authorization = `${token}`
        }
        return config
    })

    $axios.onError((error) => {
        // Xử lý lỗi response
        console.error('Request error:', error);
        return Promise.reject(error);
      });
}