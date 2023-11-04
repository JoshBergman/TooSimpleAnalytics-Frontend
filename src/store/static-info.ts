export const staticInfo = {
  uri: "https://tsa-real-765f9ae13226.herokuapp.com",
};

export const get_connect_methods = (
  connect_method: string,
  projLink: string,
  keys?: boolean
) => {
  const connect_methods: { [index: string]: React.ReactNode } = {
    recommended: `This recommended way to connect to your project. Proj Link BTW: ${projLink}`,
  };

  if (keys) {
    return Object.keys(connect_methods);
  }

  return connect_methods[connect_method];
};
