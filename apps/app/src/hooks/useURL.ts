export const useURL = (slug: string) => {
  console.log(import.meta.env.VITE_BACKEND_URL);
  return `http"//${import.meta.env.VITE_BACKEND_URL}/${slug}`;
};
