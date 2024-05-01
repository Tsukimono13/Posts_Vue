import axios from 'axios';
export const postModule = {
    state: () => ({
        posts: [],
        isPostsLoading: false,
        selectedSort: '',
        searchQuery: '',
        page: 1,
        limitPage: 10,
        totalPages: 0,
        sortOptions: [
          { value: 'title', name: 'По названию' },
          { value: 'body', name: 'По содержанию' },
        ]
    }),
    getters: {
        sortedPosts(state) {
            return [...state.posts].sort((post1, post2) => {
              return post1[state.selectedSort]?.localeCompare(post2[state.selectedSort])
            })
          },
          sortedAndSearchedPosts(state, getters) {
            return getters.sortedPosts.filter(post => post.title.toLowerCase().includes(state.searchQuery.toLowerCase()))
          }
    },
    mutations: {
        setPosts(state, posts) {
            state.posts = posts;
        },
        setLoading(state, bool) {
            state.isPostsLoading = bool
        },
        setPage(state, page) {
            state.page = page
        },
        setSelectedSort(state, selectedSort) {
            state.selectedSort = selectedSort
        },
        setTotalPages(state, totalPages) {
            state.totalPages = totalPages
        },
        setSearchQuery(state, searchQuery) {
            state.searchQuery = searchQuery
        },
    },
    actions: {
        async fetchPosts({state, commit}) {
            try {
              commit('setLoading', true);
              const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                params: {
                  _page: state.page,
                  _limit: state.limitPage
                }
              });
              commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limitPage))
              commit('setPosts', response.data)
            } catch (error) {
              console.log(error, "Ошибка")
            } finally {
                commit('setLoading', false);
            }
          },
          async loadMorePosts({state, commit}) {
            try {
                commit('setPage', state.page + 1)
              const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                params: {
                  _page: state.page,
                  _limit: state.limitPage
                }
              });
              commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limitPage))
              commit('setPosts', [...state.posts, ...response.data])
            } catch (error) {
              console.log(error, "Ошибка")
            }
          }
    },
    namespaced: true
}