export default ({ app }, inject) => {
    const scrollToTop = () => {
      console.log('Scroll');
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    };
  
    // Inject hàm vào context, nó sẽ trở thành phần của mọi component và trang
    inject('scrollToTop', scrollToTop);
  };