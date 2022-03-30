import { onMounted, ref } from 'vue';

export const useSearch = (searchApi, searchKeys) => {
  const data = ref([]);
  const pagination = ref({
    page: 1,
    rowsPerPage: 10,
    rowsNumber: 10
  });

  const fetchData = (props = { pagination: null }) => {
    const { page, rowsPerPage } = props.pagination || pagination.value;

    const filter = {
      ...searchKeys.value,
      page,
      size: rowsPerPage
    };

    searchApi(filter).then(response => {
      data.value = response.content;
      pagination.value = {
        page: response.number + 1,
        rowsPerPage: response.size,
        rowsNumber: response.totalElements
      };
    });
  };

  onMounted(() => fetchData({ pagination: pagination.value }));

  return {
    data,
    pagination,
    fetchData
  };
};
