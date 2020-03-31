import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import jQuery from 'jquery';
global.jQuery = jQuery;

import config from "./config";

import lodash from "lodash";

Vue.config.productionTip = false //Disable console display "Running in development mode"

Vue.prototype.$config = config;

Vue.prototype.$orderBy = lodash;

Vue.prototype.$compressImage = (image) => {
  const reader = new FileReader();
  reader.readAsDataURL(image);

  const isReaderLoaded = new Promise((resolve, reject) => {
    reader.onload = e => {
      resolve(e.target.result);
    };
  });

  isReaderLoaded.then(res => {
    const img = new Image();
    img.src = res;

    const isImageLoaded = new Promise((resolve, reject) => {
      img.onload = evt => {
        resolve(true);
      };
    });

    isImageLoaded.then(result => {
      const widths = 800;
      const heights = (widths * img.naturalHeight) / img.naturalWidth;

      const canvas = document.createElement("canvas");
      canvas.height = heights;
      canvas.width = widths;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, widths, heights);

      const changeBackground = ctx.getImageData(0, 0, widths, heights);
      const realImageData = changeBackground.data;

      for (var i = 0; i < realImageData.length; i += 4) {
        if (realImageData[i + 3] < 255) {
          realImageData[i] = 255;
          realImageData[i + 1] = 255;
          realImageData[i + 2] = 255;
          realImageData[i + 3] = 255;
        }
      }

      ctx.putImageData(changeBackground, 0, 0);

      const data = ctx.canvas.toDataURL("image/jpeg", 0.4);
      return data;
    });

    return isImageLoaded;
  });

  return isReaderLoaded;
};

Vue.prototype.$handleImage = (dataurl, type, isMultiple) => {
  if (isMultiple) {
    var files = [];

    for (let x of dataurl) {
      var arr = (x.imageUrl != null) ? x.imageUrl.split(",") : x.split(","),
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

      while (n--) {
        if (n >= 0) {
          u8arr[n] = bstr.charCodeAt(n);
        } else {
          break;
        }
      }

      files.push(new File([u8arr], (Math.random() * 1938) + ".jpeg", { type: type }));
    }

    return files;
  } else {
    if (dataurl.match(/^http/g) == null) {
      var arr = dataurl.split(","),
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

      while (n--) {
        if (n >= 0) {
          u8arr[n] = bstr.charCodeAt(n);
        } else {
          break;
        }
      }

      return new File([u8arr], (Math.random() * 1938) + ".jpeg", { type: type });
    } else {
      return false;
    }
  }
};

new Vue({
  router,
  store,
  config,
  render: h => h(App)
}).$mount('#app')