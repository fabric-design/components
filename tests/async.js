/**
 * Helper that returns a promise which resolves after 10ms or the time passed as an argument
 * @param {number} timeout time to wait until resolving promise
 * @returns {Promise}
 */
export function wait(timeout = 10) {
  const promise = new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, timeout);
  });

  return promise;
}
