<template>
  <div :class="(cardDesign != false) ? 'card' : 'card shadowless'" v-if="content != null">
    <div class="headline d-flex justify-content-between lineBottom">
      <h4 class="mainTitle">{{ mainTitle }}</h4>
      <div>
        <a
          @click="toggleCheckbox"
          v-if="multiSelect && !showSelectbox"
          class="btn multipleSelect xs"
        >多选</a>
        <div class="custom-multiselect-button" v-if="multiSelect && showSelectbox">
          <a
            v-for="(btn, index) in multiSelectActions"
            :key="'multi' + index"
            @click="btn.afterClick(multiselectChecked)"
            :class="btn.class"
          >{{ btn.title }}</a>
          <a @click="toggleCheckbox" class="btn cancel xs">取消</a>
        </div>
      </div>
    </div>
    <div class="datatable px-2 py-2">
      <div class="searchAndFilter">
        <div class="search-input">
          <input  type="text" placeholder="标题,SKU,顾客名字..." v-model="searchKeyword" />
        </div>
        <div class="filter" v-if="this.dateFilter != null">
          <div class="from">
            <div class="showingDate">{{ filterDate.from || "From" }}</div>
            <input
              type="date"
              name="from"
              placeholder="From"
              v-model="filterDate.from"
              :max="(filterDate.to == '') ? this.todayDate : filterDate.to"
            />
          </div>
          <span>-</span>
          <div class="to">
            <div class="showingDate">{{ filterDate.to || "To" }}</div>
            <input
              type="date"
              name="to"
              placeholder="To"
              v-model="filterDate.to"
              @change="this.compareDate"
              :max="this.todayDate"
            />
          </div>
        </div>
        <div class="additionalActions">
          <slot name="headActions"></slot>
        </div>
      </div>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th v-if="showSelectbox"></th>
              <th v-if="indexed">排序</th>
              <th
                :class="(sortConfig[0] == index) ? ((sortConfig[1]) ? 'dataHead ascend' : 'dataHead descend') : 'dataHead'"
                v-for="(title, index) in this.tableTitle"
                :key="'title' + index"
                @click="toggleSort(index, !sortConfig[1])"
              >{{ title }}</th>
              <th v-if="actions != null">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(list, index) in this.showingResult.slice((this.currentPage - 1) * this.resultPerPage, this.resultPerPage * this.currentPage)"
              :key="'dataTable' + index"
            >
              <td v-if="showSelectbox">
                <input
                  type="checkbox"
                  name="bunchPick[]"
                  v-model="multiselectChecked"
                  :value="index"
                />
              </td>
              <td v-if="indexed">{{ index + 1 }}</td>
              <td
                v-for="(cont, ind) in Object.entries(list).slice(1).map(entry => entry[1])"
                :key="'tableContent' + ind"
              >
                <div v-if="isImage(cont)" class="image-wrapper">
                  <img :src="cont" />
                </div>
                <span v-else-if="typeof cont == 'object' && cont != null">
                  <router-link v-if="cont.routerLink != null" :to="cont.routerLink + '/' + list.id">
                    <i :class="cont.class + ' icon-size'"></i>
                  </router-link>
                  <i
                    :class="cont.class + ' icon-size'"
                    @click="cont.afterClick(list.id) || null"
                    v-else
                  ></i>
                </span>
                <span v-else>{{ cont }}</span>
              </td>
              <td class="actionWrapper mxn-1" v-if="actions != null">
                <div class="actionContainer">
                  <div v-for="(btn, idx) in actions" :key="'actions' + idx">
                    <router-link
                      v-if="btn.routerLink != null"
                      v-show="handleActionLogin(Object.entries(list).slice(1).map(entry => entry[1]), btn.showingLogic)"
                      :to="(btn.hash != null) ? btn.routerLink + '/' + list.id + '#' + btn.hash : btn.routerLink + '/' + list.id"
                    >
                      <button :class="btn.class + ' nowrap'">{{ btn.title }}</button>
                    </router-link>
                    <a
                      v-else-if="btn.afterClick != null"
                      v-show="handleActionLogin(Object.entries(list).slice(1).map(entry => entry[1]), btn.showingLogic)"
                      @click="btn.afterClick(list.id)"
                      :class="btn.class + ' nowrap'"
                    >{{ btn.title }}</a>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="tableFooter">
        <div class="resultControl">
          <fd-select v-model="resultPerPage" @change="manageShowResult">
            <option value="10">显示 10 结果</option>
            <option value="15">显示 15 结果</option>
            <option value="20">显示 20 结果</option>
            <option value="30">显示 30 结果</option>
            <option value="50">显示 50 结果</option>
            <option value="100">显示 100 结果</option>
          </fd-select>
        </div>

        <div class="pagination">
          <div class="page prev" @click="prevPage">
            <i class="flaticon-left-arrow-1"></i>
          </div>
          <div :class="(this.currentPage < 4) ? 'd-none' : 'page ellipsis'">...</div>
          <div
            :class="(index + 1 == currentPage - tabConfig[0]) ? 'page number active' : 'page number'"
            v-for="(page, index) in this.showingNum.slice(tabConfig[0], tabConfig[1])"
            :key="'page' + index"
            @click="toPage(page)"
          >{{ page }}</div>
          <div
            :class="(this.currentPage + 2 > Math.ceil(this.content.length / this.resultPerPage)) ? 'd-none' : 'page ellipsis'"
          >...</div>
          <div class="page next" @click="nextPage">
            <i class="flaticon-right-arrow"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
var glob;
export default {
  name: "datatable_component",
  props: {
    mainTitle: String, // Page Title
    tableTitle: Array, // Title above data
    content: Array, // Table content
    actions: Array, // Actions button in the last column in the table
    indexed: Boolean, // Show index or not
    dateFilter: Number, // Filter with date range, input the row number to activate, if no number present, it disable
    multiSelect: Boolean, // Enable multiselect feature? Default: true
    multiSelectActions: Array, // Action button for multiselect
    cardDesign: {
      // Add card design to table?
      type: Boolean,
      default: true
    },
    search: Array
  },
  data() {
    return {
      resultPerPage: 10,
      currentPage: 1,
      tabConfig: [0, 4],
      sortConfig: [0, true],
      searchKeyword: "",
      matchedResult: [],
      showSelectbox: false,
      filterDate: {
        from: "",
        to: ""
      },
      multiselectChecked: []
    };
  },
  mounted() {
    glob = this;
    this.isImage();
  },
  watch: {
    searchKeyword: {
      handler(newVal) {
        if (this.search.length != 0) {
          this.compareData();
        }
      },
      deep: false
    }
  },
  computed: {
    showingNum() {
      var totalPage = Math.ceil(this.content.length / this.resultPerPage);
      var temp = [];
      for (var x = 1; x < totalPage + 1; x++) {
        temp.push(x);
      }
      return temp;
    },
    showingResult() {
      this.compareDate();
      if (this.search.length != 0) {
        this.compareData();
      }
      var temp =
        this.matchedResult[this.sortConfig[0]] != null
          ? Object.keys(this.content[0])[this.sortConfig[0]]
          : "";
      return this.$orderBy.orderBy(
        this.matchedResult,
        temp,
        this.sortConfig[1] ? "asc" : "desc"
      );
    },
    todayDate() {
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth() + 1;
      var yyyy = today.getFullYear();
      if (dd < 10) {
        dd = "0" + dd;
      }
      if (mm < 10) {
        mm = "0" + mm;
      }
      today = yyyy + "-" + mm + "-" + dd;
      return today;
    }
  },
  methods: {
    chooseDate(e) {
      e.currentTarget.nextSibling.click();
    },
    toPage(num) {
      this.currentPage = num;
      this.moveTab();
    },
    nextPage(e) {
      var totalPage = Math.ceil(this.content.length / this.resultPerPage);
      if (this.currentPage < totalPage) {
        this.currentPage++;
        this.moveTab();
      }
    },
    prevPage(e) {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.moveTab();
      }
    },
    moveTab() {
      var totalPage = Math.ceil(this.content.length / this.resultPerPage);
      if (this.currentPage > 3 && this.currentPage < totalPage) {
        this.tabConfig[0] = this.currentPage - 3;
        this.tabConfig[1] = this.currentPage + 1;
      } else if (this.currentPage <= 3 && this.currentPage > 1) {
        this.tabConfig[0] = 0;
        this.tabConfig[1] = 4;
      }
    },
    manageShowResult() {
      this.currentPage = 1;
    },
    toggleSort(row, dir) {
      this.sortConfig = [row, dir];
    },
    compareData() {
      var cloneArray = this.matchedResult;
      this.matchedResult = [];
      this.searchKeyword = this.searchKeyword == null ? "" : this.searchKeyword;

      for (var row of cloneArray) {
        for (var x = 0; x < this.search.length; x++) {
          if (
            Object.values(row)
              [this.search[x]].toString()
              .toLowerCase()
              .includes(this.searchKeyword.toLowerCase())
          ) {
            this.matchedResult.push(row);
            break;
          }
        }
      }
    },
    compareDate() {
      this.matchedResult = [];
      if (this.filterDate.from != "") {
        for (var x of this.content) {
          var tableDate = new Date(Object.values(x)[this.dateFilter]);
          var fromDate = new Date(this.filterDate.from).setHours(0, 0, 0, 0);
          var toDate =
            this.filterDate.to != ""
              ? new Date(this.filterDate.to).setHours(23, 59, 59, 99)
              : Date.now();
          if (+tableDate >= +fromDate && +tableDate <= +toDate) {
            this.matchedResult.push(x);
          }
        }
      } else {
        this.matchedResult = this.content;
      }
    },
    isImage(str) {
      str = str == null ? "" : str.toString();
      var matching = str.match("(.jpg+$)|(.png+$)|(.jpeg+$)");
      return matching == null ? false : true;
    },
    toggleCheckbox() {
      this.showSelectbox = !this.showSelectbox;
    },
    handleActionLogin(rowData, logic) {
      let shows = true;

      if (logic != null) {
        if (rowData[logic.referenceIndex].rawData == logic.bool) {
          shows = false;
        }
      }

      return shows;
    }
  }
};
</script>

<style lang="scss">
* {
  // border: solid 1px red;
}
.datatable {
  .tableTitle {
    margin-bottom: 24px;
  }
  .searchAndFilter {
    @include flex(row, space-between, flex-start);
    margin: 16px -16px;
    flex-wrap: wrap;
    .search-input {
      padding: 0 16px 16px;
      max-width: 35%;
      flex: 35%;
      input {
        min-width: 200px;
        padding: 10px 6px;
      }
    }

    .filter {
      @include flex(row, flex-start, center);
      padding: 0 16px 16px;
      max-width: 300px;
      flex: 300px;
      .from,
      .to {
        @include flex(column, flex-start, flex-start);
        position: relative;
        max-width: 50%;
        flex: 50%;
        .showingDate {
          @include flex(row, flex-start, center);
          border: 1px solid #dadada;
          border-radius: 4px;
          padding: 7px 12px;
          width: 100%;
        }
        input {
          top: 0;
          left: 0;
          opacity: 0;
          font-size: 13px;
          padding: 7px 12px;
          position: absolute;
        }
      }
      span {
        padding: 0 8px;
      }
    }

    .additionalActions {
      @include flex(row, flex-end, center);
      padding: 0 16px;
      max-width: 100%;
      flex: 100%;
    }
  }
  .table-container {
    overflow-x: auto;
    width: 100%;
    table {
      background-color: #ffffff;
      thead {
        tr {
          th {
            position: relative;
            padding-right: 24px;
            padding-left: 8px;
            white-space: nowrap;
            &::selection {
              color: none;
              background: none;
            }
            &.dataHead {
              cursor: pointer;
              &.ascend {
                &:before {
                  display: none;
                }
              }
              &.descend {
                &:after {
                  display: none;
                }
              }
              &:before,
              &:after {
                transform: translateY(-50%);
                font-family: "Flaticon";
                position: absolute;
                font-size: 8px;
                right: 8px;
              }
              &:before {
                content: "\f10c";
                top: 60%;
              }
              &:after {
                content: "\f10e";
                top: 40%;
              }
            }
          }
        }
      }
      tbody {
        tr {
          td {
            &.actionWrapper {
              .actionContainer {
                @include flex(row, flex-start, flex-start);
                flex-wrap: nowrap;
              }
            }
            .image-wrapper {
              position: relative;
              overflow: hidden;
              display: block;
              width: 40px;
              &:before {
                content: "";
                display: block;
                padding-top: calc(3 / 4 * 100%);
              }
              img {
                @include image(cover);
                position: absolute;
                bottom: 0;
                left: 0;
                top: 0;
              }
            }
          }
        }
      }
    }
  }
  .tableFooter {
    @include flex(row, flex-end, center);
    margin: 24px 0;
    .resultControl {
      padding-right: 24px;
    }
    .pagination {
      @include flex(row, flex-start, flex-start);
      .page {
        @include flex(row, center, center);
        // border: 1px solid $color-1;
        background-color: rgba($color-secondary, 0.1);
        border-radius: 4px;
        transition: 0.3s;
        color: $color-1;
        cursor: pointer;
        margin: 0 4px;
        font-weight: normal;
        height: 28px;
        width: 28px;
        &:hover {
          background-color: rgba($color-secondary, 1);
          // border-color: $color-main;
          color: white;
        }
        &::selection {
          color: none;
          background: none;
        }
      }
      .number {
        font-size: 16px;
        &.active {
          background-color: $color-secondary;
          border-color: $color-secondary;
          color: white;
        }
      }
      .ellipsis {
        cursor: default;
        border: none;
        margin: 0;
        &:hover {
          border-color: inherit;
          color: inherit;
        }
      }
    }
  }
  @media #{$breakpoint-down-sm} {
    .searchAndFilter {
      flex-wrap: wrap;
      .search-input {
        flex: 100%;
        max-width: 100%;
      }
      .filter,
      .additionalActions {
        flex: 50%;
        max-width: 50%;
      }
    }
  }
  @media #{$breakpoint-down-xs} {
    .searchAndFilter {
      .search-input,
      .filter,
      .additionalActions {
        flex: 100%;
        max-width: 100%;
      }
    }
    .tableFooter {
      .pagination {
        .page {
          height: 30px;
          width: 30px;
        }
      }
    }
  }
}
.icon-size {
  font-size: 24px;
}
.nowrap {
  white-space: nowrap;
  flex-wrap: nowrap;
}
.shadowless {
  box-shadow: none !important;
}
</style>