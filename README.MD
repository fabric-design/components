# Web-Components implementation for Wholesale

## Aim

We in wholesale want the developers to choose frameworks they feel comfortable with. Still we want the UI to look and behave consistent. For that reason we decided to have components that can be used framework agnostic, web-components.

## Usage

run `gulp` for building / watcher

`gulp test` for test / watcher

## Demo

In 'demo/index.html' you will find already build web-components. And see how you can integrate them in a vanilla setup.

## Integration with Angular 2

Check out the implementation of the header for an ng2 project: `https://github.bus.zalan.do/alpha/organizational-structure-frontend/blob/master/frontend/src/app.ts`.

## How to extend

Create a folder under `webcomponents` with the name of your web-component. In there you can have .html, .scss and .js files that will be merged into one file by the build process.

### How do Web-Components work

Web-Components are written as js classes. On these components certain life-cycle-functions are called: createdCallback, attachedCallback, detachedCallback, attributeChangedCallback. 
More on those later. Apart from that, you have to implement most of the logic and DOM-manipulation yourself.

#### View-Part

The view part of the Web-Component is query from a `<template/>`. The DOM you provide in your .html will be rendered in that. Then you put this DOM under a shadow-root:

```javascript
    var template = (document._currentScript || document.currentScript).ownerDocument.querySelector('template');
    ...
    // in your component
    createdCallback() {
    		let clone = document.importNode(template.content, true);
    
    		// This element uses Shadow DOM.
    		this.createShadowRoot().appendChild(clone);
    		... 
    }
```

#### Inputs

Everytime you change an attribute on the element-tag of the web-component the attributeChangedCallback is called. On that call you could react and rerender your DOM:

```javascript
    // in your component
    attributeChangedCallback(attrName, oldVal, newVal) {
        switch (attrName) {
            case "redirect-url":
            case "client-id":
            case "userservice-url":
                this.myGetAttributesIntoStateFunction();
                this.myRerenderFunction();
                break;
        }
    };
```

#### Outputs

You communicate with the outside world either by the outside world calling functions directly on the component like `document.querySelector('#header').logout()`. Or you trigger custom events on the element:

```javascript
    // in your component
    propagateLoginStatusChange(isLoggedIn, token) {
        ...
        let event = new CustomEvent("login-status-changed", {
            detail: {
                loggedIn: isLoggedIn,
                token: token
            }
        });
        this.dispatchEvent(event);
    }
    
    // outside the component
    document.querySelector('#header').addEventListener('login-status-changed',
        function({ detail: {loggedIn, token}}) {
            console.log('logged in state: ' + loggedIn + ' with token: ' + token);
        });
```

### Quirks

Webcomponents need a polyfill in some browsers. Use the webcomponentsjs polyfill.