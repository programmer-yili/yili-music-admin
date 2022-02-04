import { computed, onMounted, ref } from 'vue';
import { search } from '../api/user';

export const useUserSearch = pagination => {
  const data = ref([]);

  const fetchData = () => {
    console.log(pagination.value);
    const pageable = {
      page: pagination.value.page - 1,
      size: pagination.value.rowsPerPage
    };
    search(pageable).then(res => {
      data.value = res.content;
      pagination.value.page = res.number + 1;
      pagination.value.rowsNumber = res.totalElements;
    });
  };

  onMounted(fetchData);

  return {
    data,
    pagination,
    fetchData
  };
};
