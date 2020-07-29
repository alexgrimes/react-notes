export const addANote = (note) => {
  return {
    type: "ADD_NOTE",
    note: note,
  };
};
