import { computed, onMounted, ref } from 'vue';
import { search } from '../api/user';

export const useUserSearch = () => {
  const data = ref([]);
  const pagination = ref({
    page: 2,
    rowsPerPage: 10,
    rowsNumber: 10
  });

  const fetchData = () => {
    search({ page: 0 }).then(res => {
      data.value = data.value.concat(res.content);
      pagination.value.page = res.number + 1;
      pagination.value.rowsPerPage = res.size;
      pagination.value.rowsNumber = res.totalElements;
    });
  };

  const pagesNumber = computed(() =>
    Math.ceil(data.value.length / pagination.value.rowsPerPage)
  );

  onMounted(fetchData);

  return {
    data,
    pagination,
    pagesNumber,
    fetchData
  };
};
