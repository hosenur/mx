export const useURL = (slug: string) => {
  return `https://${import.meta.env.VITE_BACKEND_URL}/${slug}`;
};
