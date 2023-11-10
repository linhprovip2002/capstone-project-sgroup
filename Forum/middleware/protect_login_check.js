export default function ({ redirect, $auth }) {
    if (localStorage.getItem('auth._token.local') ==='false') {
      console.log('redirect lkjlkjlkj login')
      return redirect('/auth/login')
    }
  }
  