export const useURL = (slug: string) => {
  if (import.meta.env.DEV) {
    return `http://${import.meta.env.VITE_BACKEND_URL}/${slug}`;
  }
  return `https://${import.meta.env.VITE_BACKEND_URL}/${slug}`;
};
