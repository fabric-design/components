/* eslint-disable import/extensions, no-proto */
import {React} from 'imports';
import {TestComponent} from '../test-component';
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
    const header = new TestComponent(<WSHeader />);
    expect(header.component).toBeDefined();
    expect(header.component.props).toBeDefined();
    expect(header.component.props).toEqual(jasmine.objectContaining(
      {
        clientId: defaultProps.clientId,
        redirectUrl: defaultProps.redirectUrl,
        logoUrl: defaultProps.logoUrl,
        title: defaultProps.title
      }
    ));
    expect(header.component.props.links.length).toBe(defaultProps.links.length);
  });

  it('should render with default properties', () => {
    const header = new TestComponent(<WSHeader />);
    expect(header.component).toBeDefined();
    expect(header.q('.nav-title').textContent).toBe('');
    expect(header.q('.logo')).toBeNull();
    expect(header.q('.js-navigation-menu .nav-link')).toBeNull();
  });

  it('should render title "Awesome Navigation" ', () => {
    const header = new TestComponent(<WSHeader title="Awesome Navigation" />);
    expect(header.component.props.title).toBe('Awesome Navigation');
    expect(header.q('.nav-title').textContent).toBe('Awesome Navigation');
    expect(header.q('#selectedLanguage').textContent).toBe(defaultState.availableLanguages[0]);
    expect(header.q('#loggedInInfo').textContent).toBe('Login');
  });

  it('should not show any navigation links when not logged in ', () => {
    const header = new TestComponent(<WSHeader title="Awesome Navigation" links={dummyLinks} />);
    expect(header.component.props.links.length).toEqual(dummyLinks.length);
    expect(header.q('#loggedInInfo').textContent).toBe('Login');
    expect(header.q('#nav-links .nav-link')).toBeNull();
  });

  it('should show navigation links when logged in ', done => {
    const header = new TestComponent(<WSHeader title="Awesome Navigation" links={dummyLinks} />);
    // preact-specific
    // don't use arrow functions as they get binded wrong!
    spyOn(header.component.__proto__, 'checkIsLoggedIn').and.callFake(function checkIsLoggedIn() {
      expect(this.setState).toBeDefined();
      this.setState({
        userUID: mockAuthResponse.uid,
        access_token: mockAuthResponse.access_token,
        userName: mockUserLookUpResponse.name,
        userEmail: mockUserLookUpResponse.email});
      this.propagateLoginStatusChange(true, mockAuthResponse.access_token);
      return true;
    });
    spyOn(header.component.__proto__, 'render').and.callThrough();
    header.component.checkIsLoggedIn();
    // We have to wait some ms as re-rendering needs some time
    setTimeout(() => {
      expect(header.component.render).toHaveBeenCalled();
      expect(header.component.props.links.length).toEqual(dummyLinks.length);
      expect(header.q('#loggedInInfo').textContent).toBe(mockUserLookUpResponse.name);
      expect(header.q('#nav-links .nav-link')).not.toBeNull();
      done();
    }, 300);
  });

  it('should call props.setLogin function when loggedIn changes (login & logout)', () => {
    const mockSetLogin = jasmine.createSpy('mockSetLogin');
    const header = new TestComponent(<WSHeader title="Awesome Navigation" links={dummyLinks} setLogin={mockSetLogin} />);
    // check for successfull login
    header.component.propagateLoginStatusChange(true, mockAuthResponse.access_token);
    expect(header.component.props.setLogin).toHaveBeenCalled();
    expect(header.component.props.setLogin.calls.mostRecent()).toEqual(jasmine.objectContaining(
      {
        args: [{
          loggedIn: true,
          token: mockAuthResponse.access_token
        }]
      }
      ));
    // logout
    header.component.propagateLoginStatusChange(false, null);
    expect(header.component.props.setLogin).toHaveBeenCalled();
    expect(header.component.props.setLogin.calls.mostRecent()).toEqual(jasmine.objectContaining(
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
    const header = new TestComponent(<WSHeader title="Awesome Navigation" links={dummyLinks} setLang={mockSetLang} />);
    // initially 'de' if not check your localStorage
    expect(header.component.state.lang).toEqual(defaultState.availableLanguages[0]);
    header.component.setLanguage(defaultState.availableLanguages[1]);
    expect(header.component.state.lang).toEqual(defaultState.availableLanguages[1]);
    expect(header.component.props.setLang).toHaveBeenCalled();
    setTimeout(() => {
      expect(header.q('#selectedLanguage').textContent).toBe(defaultState.availableLanguages[1]);
      done();
    }, 300);
  });
});
