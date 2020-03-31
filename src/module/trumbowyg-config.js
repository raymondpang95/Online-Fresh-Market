import Vue from 'vue'
import axios from "@/controller";

import 'trumbowyg/dist/ui/trumbowyg.css';
import "trumbowyg/dist/plugins/colors/ui/trumbowyg.colors.min.css";

import VueTrumbowyg from 'vue-trumbowyg';
Vue.use(VueTrumbowyg);

import "trumbowyg/dist/plugins/upload/trumbowyg.upload.js";
import "trumbowyg/dist/plugins/fontsize/trumbowyg.fontsize.min.js";
import "trumbowyg/dist/plugins/colors/trumbowyg.colors.min.js";
import "trumbowyg/dist/plugins/history/trumbowyg.history.min.js";
import "trumbowyg/dist/plugins/lineheight/trumbowyg.lineheight.min.js";
import "trumbowyg/dist/plugins/pasteimage/trumbowyg.pasteimage.min.js";
import "trumbowyg/dist/plugins/pasteembed/trumbowyg.pasteembed.min.js";
import "trumbowyg/dist/plugins/emoji/ui/trumbowyg.emoji.min.css";
import "trumbowyg/dist/plugins/emoji/trumbowyg.emoji.min.js";

Vue.prototype.$trumbowyg = {
    /* btnsDef: {
      image: {
        dropdown: ["insertImage", "upload"],
        ico: "insertImage"
      }
    }, */
    btns: [
        ["strong", "em", "underline", "del"],
        ["formatting"],
        ["fontsize"],
        ['lineheight'],
        ['foreColor', 'backColor'],
        /* ['emoji'], */
        /* ["image"], */
        ["link"],
        ["justifyLeft", "justifyCenter", "justifyRight", "justifyFull"],
        ["unorderedList", "orderedList"],
        ['historyUndo', 'historyRedo'],
        /* ["superscript", "subscript"], */
        ["viewHTML"],
        /* ["horizontalRule"], */
        ["removeformat"],
        ["fullscreen"]
    ],
    plugins: {
        upload: {
            serverPath: axios.getUrl() + "/post/image/upload",
        }
    }
};