export function wait(timeout = 10) {
  const promise = new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, timeout);
  });

  return promise;
}
