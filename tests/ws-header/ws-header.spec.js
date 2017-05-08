import {React, render} from 'imports';
import {WSHeader} from '../../src/index';

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

  const dummyLinks = ['Home', 'About', 'Details'];


  const defaultState = {
    availableLanguages: ['de', 'en'],
  }

  beforeEach(() => {
    container = document.createElement('div');
    document.querySelector("body").appendChild(container);
    expect(React).toBeDefined();
    expect(render).toBeDefined();
  });

  afterEach(() => {
    document.querySelector("body").innerHTML = "";
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
    const renderedHeader = container;

    expect(headerComponent).toBeDefined();
    expect(headerComponent.props).toBeDefined();
    expect(headerComponent.props).toEqual(jasmine.objectContaining(
      {
        clientId: defaultProps.clientId,
        redirectUrl: defaultProps.redirectUrl,
        logoUrl: defaultProps.logoUrl,
        title: defaultProps.title,
      }
    ));
    expect(headerComponent.props.links.length).toBe(defaultProps.links.length);
  });

  it('should render with default properties', () => {
    const header = render(<WSHeader />, container); 
    // Preact returns HTMLDomElement with component in ._component variable || React is returning WSHeader Object 
    const headerComponent = header._component || header;
    const renderedHeader = container;
    expect(renderedHeader.querySelector('.nav-title').textContent).toBe('');
    expect(renderedHeader.querySelector('.logo')).toBeNull();
    expect(renderedHeader.querySelector('.js-navigation-menu .nav-link')).toBeNull();

  });

  it('should render title "Awesome Navigation" ', () => {
    const header = render(<WSHeader title="Awesome Navigation"/>, container); 
    // Preact returns HTMLDomElement with component in ._component variable || React is returning WSHeader Object 
    const headerComponent = header._component || header;
    const renderedHeader = container;
    expect(headerComponent.props.title).toBe("Awesome Navigation");
    expect(renderedHeader.querySelector('.nav-title').textContent).toBe("Awesome Navigation");
    expect(renderedHeader.querySelector('#selectedLanguage').textContent).toBe(defaultState.availableLanguages[0]);
    expect(renderedHeader.querySelector('#loggedInInfo').textContent).toBe('Login');
  });

  it('should not show any navigation links when not logged in ', () => {
    const header = render(<WSHeader title="Awesome Navigation" links={dummyLinks} /> , container); 
    // Preact returns HTMLDomElement with component in ._component variable || React is returning WSHeader Object 
    const headerComponent = header._component || header;
    const renderedHeader = container;
    expect(headerComponent.props.links.length).toEqual(dummyLinks.length);
    expect(renderedHeader.querySelector('#loggedInInfo').textContent).toBe('Login');
    expect(renderedHeader.querySelector('#nav-links .nav-link')).toBeNull();
  });

  it('should show navigation links when logged in ', () => {

  });

  it('should call props.setLogin function when login is successfully', () => {

  });

  it('should call props.setLogout function when logout is triggered', () => {

  });

  it('should change language state', () => {

  });

});
