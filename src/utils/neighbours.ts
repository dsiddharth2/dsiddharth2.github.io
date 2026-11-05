/** Previous and next items in a list, wrapping at both ends. */
export function neighbours<T>(list: readonly T[], current: T): { prev: T; next: T } {
  const index = list.indexOf(current);
  if (index < 0) throw new Error('neighbours: item is not in the list');
  return {
    prev: list[(index - 1 + list.length) % list.length],
    next: list[(index + 1) % list.length],
  };
}
