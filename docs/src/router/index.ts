import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		name: "Home",
		component: Home,
	},
	{
		path: "/about",
		name: "About",
		component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
	},
	{
		path: "/admin",
		name: "Admin",
		component: () => import(/* webpackChunkName: "admin" */ "../views/Admin.vue"),
		children: [
			{
				path: 'session',
				name: 'view-session',
				component: async () => import(/* webpackChunkName: "admin" */ '@/views/admin/ViewSession.vue'),
			},
			{
				path: 'proposal',
				name: 'view-proposal',
				component: async () => import(/* webpackChunkName: "admin" */ '@/views/admin/ViewProposal.vue'),
			},
			{
				path: 'voter',
				name: 'view-voter',
				component: async () => import(/* webpackChunkName: "admin" */ '@/views/admin/ViewVoter.vue'),
			},
			{
				path: 'result',
				name: 'view-result',
				component: async () => import(/* webpackChunkName: "admin" */ '@/views/admin/ViewResult.vue'),
			},
		]
	},
	{
		path: "/voting",
		name: "Voting",
		component: () => import(/* webpackChunkName: "admin" */ "../views/Voting.vue"),
		children: [
			{
				path: 'session',
				name: 'voting-session',
				component: async () => import(/* webpackChunkName: "admin" */ '@/views/voting/Session.vue'),
			},
			{
				path: 'proposal',
				name: 'voting-proposal',
				component: async () => import(/* webpackChunkName: "admin" */ '@/views/voting/Proposal.vue'),
				children: [
					{
						path: 'proposal-add',
						name: 'voting-proposal-add',
						component: async () => import(/* webpackChunkName: "admin" */ '@/components/proposal/AddProposal.vue'),
					},
					{
						path: 'proposal-view',
						name: 'voting-proposal-view',
						component: async () => import(/* webpackChunkName: "admin" */ '@/components/proposal/ListProposal.vue'),
					},
					{
						path: 'proposal-vote',
						name: 'voting-proposal-vote',
						component: async () => import(/* webpackChunkName: "admin" */ '@/components/proposal/ListProposal.vue'),
					},
				]
			},
			{
				path: 'result',
				name: 'voting-result',
				component: async () => import(/* webpackChunkName: "admin" */ '@/views/voting/Result.vue'),
			},
		]
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
