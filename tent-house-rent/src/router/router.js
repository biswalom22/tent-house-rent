import Vue from 'vue';
import VueRouter from 'vue-router';
import LoginComponent from '../components/Login.vue';
import ProductComponent from '../components/Products.vue';

Vue.use(VueRouter);

const isAuthenticated = (to, from, next) => {
	const token = localStorage.getItem('token');
	// console.log(token);
	if (!token) {
		console.log(token);
		next({
			name: 'Login',
			path: '/'
			// query: { redirect: to.fullPath }
		});
	} else next();
};

const routes = [
	{ path: '/', component: LoginComponent },
	{ path: '/product', component: ProductComponent, beforeEnter: isAuthenticated },
];

export default new VueRouter({
	routes,
	mode: 'history'
});
