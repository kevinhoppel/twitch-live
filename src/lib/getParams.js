export default (hash) => {
  let params = {};
  hash
    .substring(1)
    .split('&')
    .forEach((hk) => {
      let kvp = hk.split('=');
      params[kvp[0]] = kvp[1];
    });
  return params;
};
