export const validateName = (name: string) => {
  const nameRegex = /^[a-zA-Z]+$/;
  return nameRegex.test(name);
};
