export const useToggleDialog = show => {
  const toggleDialog = () => {
    show.value = !show.value;
  };

  return {
    toggleDialog
  };
};
