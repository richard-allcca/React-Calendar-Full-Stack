

export const getEnvVariables = () => {

  import.meta.env;// NOTE - Comment this line for do building

  return {
    ...import.meta.env
  };
};