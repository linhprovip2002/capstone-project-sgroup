<template>
  <div class="tableft">
    <div class="tableft__item category">
      <h2>Favorite Post</h2>
      <div class="category__item">
        <img src="~/assets/img/image_post.jpg" alt="" />
        <div class="category__item__info">
          <span class="name">Newest and Recent</span>
          <span class="desc">Find the last udpate</span>
        </div>
      </div>
      <div class="category__item">
        <img src="~/assets/img/avt.png" alt="" />
        <div class="category__item__info">
          <span class="name">Following</span>
          <span class="desc">Explore from your favorite person</span>
        </div>
      </div>
      <div class="category__item">
        <img src="~/assets/img/design.png" alt="" />
        <div class="category__item__info">
          <span class="name">Popular of the day</span>
          <span class="desc">Shots featured today by curators</span>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script></script>

<style scoped lang="scss">
@import '~/assets/scss/variables.scss';
.tableft {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;

  &__item {
    border-radius: 16px;
    background: $dark-3;
    display: flex;
    width: 280px;
    padding: 10px;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;

    h2 {
      color: #F7F7F7;

      /* SemiBold 16 */
      font-family: 'Montserrat', sans-serif;
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: 24px; /* 150% */
    }
    .category {
      &__item {
        display: flex;
        width: 100%;
        padding: 6px 5px;
        align-items: flex-start;
        gap: 10px;
        border-radius: 6px;
        background: $dark-3;  
        cursor: pointer;

        img {
          display: flex;
          width: 58px;
          height: 58px;   
          object-fit: cover;
          justify-content: center;
          align-items: center;
          gap: 10px;
          border: 1px solid rgba(43, 0, 212, 0.10);
          box-shadow: 0px 2px 6px 0px rgba(43, 0, 212, 0.06);
          border-radius: 8px;
        }
        &__info {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: space-between;
          gap: 2px;
          height: 100%;
          .name {
            color: $neutral-0;
            font-family: 'Montserrat', sans-serif;
            font-size: 12px;
            font-style: normal;
            font-weight: 600;
            line-height: 18px; /* 150% */
          }
          .desc {
            color: #97989d;
            /* Regular 9 */
            font-family: 'Montserrat', sans-serif;
            font-size: 10px;
            font-style: normal;
            font-weight: 400;
            line-height: 14px; /* 155.556% */
          }
        }
        &:hover {
          background: $dark-4;
        }
      }
    }
  }
}
</style>
