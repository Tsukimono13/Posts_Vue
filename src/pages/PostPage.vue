<template>
    <div>
      <h1>Страница с постами</h1>
      <my-input v-focus v-model="searchQuery" placeholder="Поиск..." />
      <div class="app__btns">
        <my-button @click="showDialog">
          Создать пост
        </my-button>
        <my-select v-model="selectedSort" :options="sortOptions" />
      </div>
      <my-dialog v-model:show="dialogVisible">
        <post-form @create="createPost" />
      </my-dialog>
      <post-list :posts="sortedAndSearchedPosts" @remove="removePost" v-if="!isPostsLoading" />
      <div v-else>Идёт загрузка...</div>
      <div class="observer" v-intersection="loadMorePosts"></div>
      <!-- <div class="page__wrapper">
        <div v-for="pageNumber in totalPages" 
        :key="page" 
        class="page" 
        :class="{'current-page': page === pageNumber}"
        @click="changePage(pageNumber)"
        >
          {{ pageNumber }}
        </div>
      </div> -->
    </div>
  </template>
  
  <script>
  import PostList from '@/components/PostList';
  import PostForm from '@/components/PostForm';
  import axios from 'axios';
  
  export default {
    components: {
      PostList, PostForm
    },
    data() {
      return {
        posts: [],
        dialogVisible: false,
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
      }
    },
    methods: {
      createPost(post) {
        this.posts.push(post);
        this.dialogVisible = false;
      },
      removePost(post) {
        this.posts = this.posts.filter(p => p.id !== post.id)
      },
      showDialog() {
        this.dialogVisible = true;
      },
      // changePage(pageNumber){
      //   this.page = pageNumber
      //   this.fetchPosts()
      // },
      async fetchPosts() {
        try {
          this.isPostsLoading = true;
          const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
            params: {
              _page: this.page,
              _limit: this.limitPage
            }
          });
          this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limitPage)
          this.posts = response.data;
        } catch (error) {
          console.log("Ошибка")
        } finally {
          this.isPostsLoading = false;
        }
      },
      async loadMorePosts() {
        try {
          this.page += 1;
          const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
            params: {
              _page: this.page,
              _limit: this.limitPage
            }
          });
          this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limitPage)
          this.posts = [...this.posts, ...response.data];
        } catch (error) {
          console.log("Ошибка")
        }
      }
    },
    mounted() {
      this.fetchPosts();
//       this.$refs.observer;
//       let options = {
//       rootMargin: '5px',
//       threshold: 0.5
//   }
  
//   let callback = (entries, observer) => {
//       if (entries[0].isIntersecting && this.page < this.totalPages) {
//         this.loadMorePosts()
//       }
//   }
  
//   let observer = new IntersectionObserver(callback, options)
//   observer.observe(this.$refs.observer)
    },
    computed: {
      sortedPosts() {
        return [...this.posts].sort((post1, post2) => {
          return post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
        })
      },
      sortedAndSearchedPosts() {
        return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
      }
    },
    watch: {
      // selectedSort(newValue) {
      //   console.log(newValue)
      //   this.posts.sort((post1, post2) => {
      //     return post1[newValue]?.localeCompare(post2[newValue])
      //   })
      // }
    }
  }
  </script>
  
  <style>

  
  .app__btns {
    margin: 15px 0;
    display: flex;
    justify-content: space-between;
  }
  
  .page__wrapper {
    display: flex;
    margin-top: 15px;
    gap: 8px;
  }
  
  .page {
    border: 1px solid black;
    padding: 10px;
    cursor: pointer;
  }
  
  .current-page {
    border: 2px solid teal;
  }
  
  .observer {
    height: 30px;
    background-color: aqua;
  }
  </style>
  