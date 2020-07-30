export const addNote = (note) => {
  return {
    type: "ADD_NOTE",
    note: note,
  };
};
