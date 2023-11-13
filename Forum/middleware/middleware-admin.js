export default function ({ route, redirect }) {
    // route.name chứa tên của route hiện tại
    if (JSON.parse(localStorage.getItem('user')).roleName==='USER') {
        return redirect('/');
    }
  }