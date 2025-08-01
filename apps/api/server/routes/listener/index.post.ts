export default defineEventHandler(async(event) => {
  const body = await readFormData(event)
  console.log(event)
  return{ok:"ok"}
});
