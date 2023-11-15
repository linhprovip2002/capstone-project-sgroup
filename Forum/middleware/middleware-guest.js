export default function ({ route, redirect }) {
    // route.name chứa tên của route hiện tại
    console.log('guest:',route.name);
  
    if (localStorage.getItem('accessToken') && !route.name.includes('admin') && localStorage.getItem('user')) {
        return redirect('/')
    }
  }