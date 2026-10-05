export function filterSearchableItems<T>(items: readonly T[], query: string, getSearchText: (item: T) => string) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [...items];
  return items.filter((item) => getSearchText(item).toLowerCase().includes(normalized));
}
