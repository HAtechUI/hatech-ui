"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = require("vue");
var App_vue_1 = require("./App.vue");
var router_1 = require("./router");
var store_1 = require("./store");
require("./registerServiceWorker");
var index_1 = require("../../types/index");
vue_1.default.use(index_1.default);
vue_1.default.config.productionTip = false;
new vue_1.default({
    router: router_1.default,
    store: store_1.default,
    render: function (h) { return h(App_vue_1.default); },
}).$mount('#app');
