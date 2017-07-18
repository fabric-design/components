/**
 * This utility class implements a simple stream to listen continuously for changes
 */
export class SimpleSteam {

  /**
   * @constructor
   */
  constructor() {
    this.data = [];
    this.subscribers = [];
  }

  /**
   * Subscribe on the stream for it's changes
   * @param {Function} callback Will be called when changes are published
   * @returns {void}
   */
  subscribe(callback) {
    const subscriber = {
      offset: 0,
      callback
    };
    this.subscribers.push(subscriber);
    // Execute callback for previous data
    this.callSubscriber(subscriber);
  }

  /**
   * Publish data to the stream
   * @param {*} data Data passed to the subscribers
   * @returns {void}
   */
  publish(data) {
    this.data.push(data);
    this.callSubscribers();
  }

  /**
   * Call the subscribers with new data
   * @returns {void}
   */
  callSubscribers() {
    this.subscribers.forEach(subscriber =>
      this.callSubscriber(subscriber)
    );
  }

  /**
   * Call a subscriber with it's new data
   * @param {Object} subscriber The subscriber to call
   * @returns {void}
   */
  callSubscriber(subscriber) {
    const subscriberData = this.data.slice(subscriber.offset);
    subscriberData.forEach(entry =>
      subscriber.callback(entry)
    );
    subscriber.offset = this.data.length;
  }
}
