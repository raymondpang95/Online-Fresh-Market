import Vue from 'vue'

import {
    Bar,
    HorizontalBar,
    Doughnut,
    Line,
    Pie,
    PolarArea,
    Radar,
    Bubble,
    Scatter
} from "vue-chartjs";

Vue.component('fd-bar-chart', {
    extends: Bar,
    props: {
        labels: Array,
        datasets: Array,
    },
    mounted() {
        // Docs: https://www.chartjs.org/docs/latest/charts/ , https://vue-chartjs.org/guide/#introduction
        this.renderChart({
            labels: this.labels,
            datasets: this.datasets
        }, { responsive: true, maintainAspectRatio: false });
    }
});
Vue.component('fd-horizontal-bar-chart', {
    extends: HorizontalBar,
    props: ["labels", "datasets"],
    mounted() {
        this.renderChart({
            labels: this.labels,
            datasets: this.datasets
        }, { responsive: true, maintainAspectRatio: false });
    }
});
Vue.component('fd-doughnut-chart', {
    extends: Doughnut,
    props: ["labels", "datasets"],
    mounted() {
        this.renderChart({
            labels: this.labels,
            datasets: this.datasets
        }, { responsive: true, maintainAspectRatio: false });
    }
});
Vue.component('fd-line-chart', {
    extends: Line,
    props: ["labels", "datasets"],
    mounted() {
        this.renderChart({
            labels: this.labels,
            datasets: this.datasets
        }, { responsive: true, maintainAspectRatio: false });
    }
});
Vue.component('fd-pie-chart', {
    extends: Pie,
    props: ["labels", "datasets"],
    mounted() {
        this.renderChart({
            labels: this.labels,
            datasets: this.datasets
        }, { responsive: true, maintainAspectRatio: false });
    }
});
Vue.component('fd-polar-area-chart', {
    extends: PolarArea,
    props: ["labels", "datasets"],
    mounted() {
        this.renderChart({
            labels: this.labels,
            datasets: this.datasets
        }, { responsive: true, maintainAspectRatio: false });
    }
});
Vue.component('fd-radar-chart', {
    extends: Radar,
    props: ["labels", "datasets"],
    mounted() {
        this.renderChart({
            labels: this.labels,
            datasets: this.datasets
        }, { responsive: true, maintainAspectRatio: false });
    }
});
Vue.component('fd-bubble-chart', {
    extends: Bubble,
    props: ["labels", "datasets"],
    mounted() {
        this.renderChart({
            labels: this.labels,
            datasets: this.datasets
        }, { responsive: true, maintainAspectRatio: false });
    }
});
Vue.component('fd-scatter-chart', {
    extends: Scatter,
    props: ["labels", "datasets"],
    mounted() {
        this.renderChart({
            labels: this.labels,
            datasets: this.datasets
        }, { responsive: true, maintainAspectRatio: false });
    }
});