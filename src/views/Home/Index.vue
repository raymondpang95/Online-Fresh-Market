<template>
  <div class="home">
    <div class="container">
      <fd-tab>
        <tab-window :name="'Tab Name'">
          <fd-carousel :id="'home-carousel'">
            <div class="slide">
              <div class="image-wrapper">
                <img
                  src="https://p.bigstockphoto.com/GeFvQkBbSLaMdpKXF1Zv_bigstock-Aerial-View-Of-Blue-Lakes-And--227291596.jpg"
                />
              </div>
            </div>
            <div class="slide">
              <div class="image-wrapper">
                <img
                  src="https://p.bigstockphoto.com/GeFvQkBbSLaMdpKXF1Zv_bigstock-Aerial-View-Of-Blue-Lakes-And--227291596.jpg"
                />
              </div>
            </div>
            <div class="slide">
              <div class="image-wrapper">
                <img
                  src="https://p.bigstockphoto.com/GeFvQkBbSLaMdpKXF1Zv_bigstock-Aerial-View-Of-Blue-Lakes-And--227291596.jpg"
                />
              </div>
            </div>
          </fd-carousel>
        </tab-window>
        <tab-window :name="'Tab Name 2'">
          <fd-carousel :id="'home-carousel-2'">
            <div class="slide">
              <div class="image-wrapper">
                <img
                  src="https://p.bigstockphoto.com/GeFvQkBbSLaMdpKXF1Zv_bigstock-Aerial-View-Of-Blue-Lakes-And--227291596.jpg"
                />
              </div>
            </div>
            <div class="slide">
              <div class="image-wrapper">
                <img
                  src="https://p.bigstockphoto.com/GeFvQkBbSLaMdpKXF1Zv_bigstock-Aerial-View-Of-Blue-Lakes-And--227291596.jpg"
                />
              </div>
            </div>
            <div class="slide">
              <div class="image-wrapper">
                <img
                  src="https://p.bigstockphoto.com/GeFvQkBbSLaMdpKXF1Zv_bigstock-Aerial-View-Of-Blue-Lakes-And--227291596.jpg"
                />
              </div>
            </div>
          </fd-carousel>
        </tab-window>
        <tab-window :name="'Tab Name 3'">
          <p>Nothing here</p>
        </tab-window>
        <tab-window :name="'Tab Name 4'">
          <p>Nothing here</p>
        </tab-window>
        <tab-window :name="'Tab Name 5'">
          <p>Nothing here</p>
        </tab-window>
        <tab-window :name="'Tab Name 6'">
          <p>Nothing here</p>
        </tab-window>
      </fd-tab>
    </div>
  </div>
</template>

<script>
import carousel from "@/components/ProjectComponents/Carousel";

export default {
  name: "home",
  components: {
    "fd-carousel": carousel
  }
};
</script>

<style lang="scss">
.home {
}
</style>