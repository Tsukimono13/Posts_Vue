import { onMounted, ref } from "vue";
import axios from 'axios';

export function usePosts(limitPage) {
  const posts = ref([]);
  const totalPages = ref(0);
  const isPostsLoading = ref(true);
  const fetching = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts",
        {
          params: {
            _page: 1,
            _limit: limitPage,
          },
        }
      );
      totalPages.value = Math.ceil(
        response.headers["x-total-count"] / limitPage
      );
      posts.value = response.data;
    } catch (error) {
      console.log("Ошибка");
    } finally {
      isPostsLoading.value = false;
    }
  };
  onMounted(fetching);
  return {
    posts, isPostsLoading, totalPages
  }
}
