import Vue from 'vue';
import Router from 'vue-router';
import NewsFeed from './components/NewsFeed.vue';
import SinglePostPage from './components/SinglePostPage.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: NewsFeed,
    },
    {
      path: '/post/:id',
      name: 'post',
      component: SinglePostPage,
    },
  ],
});
