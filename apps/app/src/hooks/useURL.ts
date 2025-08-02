export const useURL = (slug: string) => {
  return `http://${import.meta.env.VITE_BACKEND_URL}/${slug}`;
};
