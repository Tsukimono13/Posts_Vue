import { createRouter, createWebHistory } from 'vue-router';
import Main from '@/pages/Main'
import About from '@/pages/About'
import PostIdPage from '@/pages/PostIdPage'
import PostPage from '@/pages/PostPage';
import PostPageWithStore from '@/pages/PostPageWithStore';
import PostPageCompositionAPI from '@/pages/PostPageCompositionAPI';

const routes = [
    {
        path: '/',
        component: Main
    },
    {
        path: '/posts',
        component: PostPage
    },
    {
        path: '/posts/:id',
        component: PostIdPage
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/store',
        component: PostPageWithStore
    },
    {
        path: '/composition',
        component: PostPageCompositionAPI
    },
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;