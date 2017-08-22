import * as _React_ from 'react';
import * as ReactDOM from 'react-dom';
import * as types from 'prop-types';

// API shared by Preact and React
export const React = {
  createElement: _React_.createElement || _React_.h
};
export const PureComponent = _React_.PureComponent || _React_.Component;
export const PropTypes = types;
export const render = ReactDOM.render;

/**
 * This is a abstract React/Preact component class
 */
export class Component extends _React_.Component {

  /**
   * Dispatches a native event
   * @param {string} name Event name
   * @param {*} detail Event detail data
   * @param {boolean} bubbles True if the event bubbles up the dom tree
   * @returns {void}
   */
  dispatchEvent(name, detail, bubbles = true) {
    const event = new CustomEvent(name, {detail, bubbles});
    // It's possible that the component is not mounted and there is no element yet
    if (this.element) {
      this.element.dispatchEvent(event);
    }
  }
}
