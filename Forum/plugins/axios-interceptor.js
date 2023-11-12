export default function({$axios}){
    $axios.onRequest((config) => {
        const token = localStorage.getItem('accessToken');
        if(token){
            console.log(token);
            config.headers.Authorization = `${token}`
        }
        return config
    })
}