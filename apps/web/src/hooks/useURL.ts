export const useURL = (slug: string) => {
  return `${import.meta.env.VITE_BACKEND_URL}/${slug}`;
};
