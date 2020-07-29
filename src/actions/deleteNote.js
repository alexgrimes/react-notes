export const deleteNote = (id) => {
  return {
    type: "DELETE_NOTE",
    id: id,
  };
};