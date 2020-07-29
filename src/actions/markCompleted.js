export const markCompleted = (note) => {
  return {
    type: "MARK_COMPLETED",
    note
  };
};
