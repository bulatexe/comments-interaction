let nextId = Number(localStorage.getItem("nextId")) || 5;

export function getNextId() {
  nextId += 1;
  localStorage.setItem("nextId", nextId);

  return nextId;
}
