/* eslint-disable no-underscore-dangle, import/extensions, no-proto */
import {React, render} from 'imports';
import {WSHeader} from '../../src/index';

/**
 * Tests for WS-Header
 * Info: If you want to test the render output after state / props change
 * you have to do a setTimeout (see other tests) as Jasmine expect is faster then the .render() method
 */
describe('Test: <WS-Header />', () => {
  let container;

  const defaultProps = {
    setLang: () => {},
    setLogin: () => {},
    clientId: null,
    redirectUrl: '',
    logoUrl: null,
    title: '',
    links: []
  };


  const dummyLinks = [
    {label: 'Home', value: 'HomeValue', onclick: value => value},
    {label: 'Link', value: 'LinkValue', onclick: value => value},
    {label: 'Details', value: 'DetailsValue', onclick: value => value}
  ];

  const mockAuthResponse = {
    uid: 'chuckNorrisIsEverywhere',
    access_token: 'chuckNorrisCanBeAnAccessToken'
  };

  const mockUserLookUpResponse = {
    name: 'Chuck Norris',
    email: 'chuck.norris@zalando.de'
  };

  const defaultState = {
    availableLanguages: ['de', 'en']
  };

  beforeEach(() => {
    container = document.createElement('div');
    document.querySelector('body').appendChild(container);
    window.localStorage.clear();
  });

  /**
   * Doing some stuff here
   *
   */
  it('should have default properties set', () => {
    // initialization has to been done for every testcase
    const header = render(<WSHeader />, container);
    // Preact returns HTMLDomElement with component in ._component variable || React is returning WSHeader Object
    const headerComponent = header._component || header;

    expect(headerComponent).toBeDefined();
    expect(headerComponent.props).toBeDefined();
    expect(headerComponent.props).toEqual(jasmine.objectContaining(
      {
        clientId: defaultProps.clientId,
        redirectUrl: defaultProps.redirectUrl,
        logoUrl: defaultProps.logoUrl,
        title: defaultProps.title
      }
    ));
    expect(headerComponent.props.links.length).toBe(defaultProps.links.length);
  });

  it('should render with default properties', () => {
    const header = render(<WSHeader />, container);
    // Preact returns HTMLDomElement with component in ._component variable || React is returning WSHeader Object
    const headerComponent = header._component || header;
    const renderedHeader = container;
    expect(headerComponent).toBeDefined();
    expect(renderedHeader.querySelector('.nav-title').textContent).toBe('');
    expect(renderedHeader.querySelector('.logo')).toBeNull();
    expect(renderedHeader.querySelector('.js-navigation-menu .nav-link')).toBeNull();
  });

  it('should render title "Awesome Navigation" ', () => {
    const header = render(<WSHeader title="Awesome Navigation" />, container);
    // Preact returns HTMLDomElement with component in ._component variable || React is returning WSHeader Object
    const headerComponent = header._component || header;
    const renderedHeader = container;
    expect(headerComponent.props.title).toBe('Awesome Navigation');
    expect(renderedHeader.querySelector('.nav-title').textContent).toBe('Awesome Navigation');
    expect(renderedHeader.querySelector('#selectedLanguage').textContent).toBe(defaultState.availableLanguages[0]);
    expect(renderedHeader.querySelector('#loggedInInfo').textContent).toBe('Login');
  });

  it('should not show any navigation links when not logged in ', () => {
    const header = render(<WSHeader title="Awesome Navigation" links={dummyLinks} />, container);
    // Preact returns HTMLDomElement with component in ._component variable || React is returning WSHeader Object
    const headerComponent = header._component || header;
    const renderedHeader = container;
    expect(headerComponent.props.links.length).toEqual(dummyLinks.length);
    expect(renderedHeader.querySelector('#loggedInInfo').textContent).toBe('Login');
    expect(renderedHeader.querySelector('#nav-links .nav-link')).toBeNull();
  });

  it('should show navigation links when logged in ', done => {
    const header = render(<WSHeader title="Awesome Navigation" links={dummyLinks} />, container);
    // Preact returns HTMLDomElement with component in ._component variable || React is returning WSHeader Object
    const headerComponent = header._component || header;
    const renderedHeader = container;
    // preact-specific
    // don't use arrow functions as they get binded wrong!
    spyOn(headerComponent.__proto__, 'checkIsLoggedIn').and.callFake(function checkIsLoggedIn() {
      expect(this.setState).toBeDefined();
      this.setState({
        userUID: mockAuthResponse.uid,
        access_token: mockAuthResponse.access_token,
        userName: mockUserLookUpResponse.name,
        userEmail: mockUserLookUpResponse.email});
      this.propagateLoginStatusChange(true, mockAuthResponse.access_token);
      return true;
    });
    spyOn(headerComponent.__proto__, 'render').and.callThrough();
    headerComponent.checkIsLoggedIn();
    // We have to wait some ms as re-rendering needs some time
    setTimeout(() => {
      expect(headerComponent.render).toHaveBeenCalled();
      expect(headerComponent.props.links.length).toEqual(dummyLinks.length);
      expect(renderedHeader.querySelector('#loggedInInfo').textContent).toBe(mockUserLookUpResponse.name);
      expect(renderedHeader.querySelector('#nav-links .nav-link')).not.toBeNull();
      done();
    }, 300);
  });

  it('should call props.setLogin function when loggedIn changes (login & logout)', () => {
    const mockSetLogin = jasmine.createSpy('mockSetLogin');
    const header = render(<WSHeader title="Awesome Navigation" links={dummyLinks} setLogin={mockSetLogin} />, container);
    // Preact returns HTMLDomElement with component in ._component variable || React is returning WSHeader Object
    const headerComponent = header._component || header;
    // check for successfull login
    headerComponent.propagateLoginStatusChange(true, mockAuthResponse.access_token);
    expect(headerComponent.props.setLogin).toHaveBeenCalled();
    expect(headerComponent.props.setLogin.calls.mostRecent()).toEqual(jasmine.objectContaining(
      {
        args: [{
          loggedIn: true,
          token: mockAuthResponse.access_token
        }]
      }
      ));
    // logout
    headerComponent.propagateLoginStatusChange(false, null);
    expect(headerComponent.props.setLogin).toHaveBeenCalled();
    expect(headerComponent.props.setLogin.calls.mostRecent()).toEqual(jasmine.objectContaining(
      {
        args: [{
          loggedIn: false,
          token: null
        }]
      }
      ));
  });

  it('should change language state', done => {
    const mockSetLang = jasmine.createSpy('mockSetLang');
    const header = render(<WSHeader title="Awesome Navigation" links={dummyLinks} setLang={mockSetLang} />, container);
    // Preact returns HTMLDomElement with component in ._component variable || React is returning WSHeader Object
    const headerComponent = header._component || header;
    const renderedHeader = container;
    // initially 'de' if not check your localStorage
    expect(headerComponent.state.lang).toEqual(defaultState.availableLanguages[0]);
    headerComponent.setLanguage(defaultState.availableLanguages[1]);
    expect(headerComponent.state.lang).toEqual(defaultState.availableLanguages[1]);
    expect(headerComponent.props.setLang).toHaveBeenCalled();
    setTimeout(() => {
      expect(renderedHeader.querySelector('#selectedLanguage').textContent).toBe(defaultState.availableLanguages[1]);
      done();
    }, 300);
  });
});
