import {React, Component, PropTypes} from '../imports';
import {CookieStorage} from './storage/cookie-storage';
import {LocalStorage} from './storage/local-storage';
import {Authorization} from './authorization';
import {WSDropdown} from '../ws-dropdown/ws-dropdown';

/**
 * This component renders a generic header which provides authentication and language management
 *
 * Optionally call WSHeader.setStorageType('cookie', 'zalando') If you want a to use cookies instead of localStorage
 * to persist the tokens. You can call WSHeader.getAccessToken().then(token => ...) to get the current access token.
 * It will resolve null when no access token is present and therefore the user isn't logged in.
 * If you configured the header with a refreshUrl you should subscribe the ws-auth-changed event. It will be emitted
 * when the access token was refreshed and it will have the access token in the event details.
 */
export class WSHeader extends Component {

  /**
   * Default storage instance
   * @type {AbstractStorage}
   */
  static storage = new LocalStorage();

  static defaultProps = {
    loginUrl: 'https://identity.zalando.com/oauth2/authorize',
    refreshUrl: null,
    businessPartnerId: '810d1d00-4312-43e5-bd31-d8373fdd24c7',
    clientId: null,
    links: [],
    appName: 'Zalando',
    appLogo: null,
    onLocaleChange: () => {},
    onAuthChange: () => {}
  };

  static propTypes = {
    loginUrl: PropTypes.string,
    refreshUrl: PropTypes.string,
    businessPartnerId: PropTypes.string,
    clientId: PropTypes.string,
    links: PropTypes.array,
    appName: PropTypes.string,
    appLogo: PropTypes.string,
    onLocaleChange: PropTypes.func,
    onAuthChange: PropTypes.func
  };

  /**
   * Initialize the storage
   * @param {string} type Can be either cookie or local
   * @param {string} name Storage name will be used as key prefix
   * @returns {void}
   */
  static setStorageType(type, name) {
    // Create storage for persisting keys
    if (type === 'cookie') {
      this.storage = new CookieStorage(name);
    } else {
      this.storage = new LocalStorage(name);
    }
  }

  /**
   * Tries to get the access token from authorization class
   * @param {string} queryString The current query string to parse the token from
   * @returns {Promise}
   */
  static getAccessToken(queryString = location.hash.substr(1)) {
    return new Promise(resolve => {
      const authorization = new Authorization(this.storage);
      authorization.onAccessTokenChange(accessToken => resolve(accessToken));
      authorization.tryFetchToken(queryString);
    });
  }

  /**
   * Retrieve the persisted locale
   * @returns {string}
   */
  static getLocale() {
    const locale = WSHeader.storage.get('locale') || window.navigator.language.replace(/([a-z]+)-.*/, '$1');
    if (['de', 'en'].indexOf(locale) === -1) {
      return 'en';
    }
    return locale;
  }

  /**
   * @param {Object} props React/Preact properties
   */
  constructor(props) {
    super(props);
    this.initState();
    this.initAuthorization(props);
    this.mounted = false;
    this.locales = [
      {label: 'German', value: 'de'},
      {label: 'English', value: 'en'}
    ];
    this.subMenus = [];
    this.menuItems = [];
    this.level2 = null;
  }

  /**
   * Detect mounted state to prevent calling setState to early
   * @returns {void}
   */
  componentDidMount() {
    this.mounted = true;
  }

  /**
   * Changes the locale to the given one
   * @param {string} newLocale The new locale
   * @returns {void}
   */
  setLocale(newLocale) {
    this.setState({locale: newLocale});
    WSHeader.storage.set('locale', newLocale);
    this.dispatchEvent('ws-locale-changed', newLocale);
    // Propagate value in React world
    if (typeof this.props.onLocaleChange === 'function') {
      this.props.onLocaleChange(newLocale);
    }
  }

  /**
   * Initialize the component state
   * @returns {void}
   */
  initState() {
    this.state = {
      isLoggedIn: false,
      locale: WSHeader.getLocale()
    };
  }

  /**
   * Initialize the OAuth2 authorization
   * @param {Object} props React/Preact props
   * @returns {void}
   */
  initAuthorization(props) {
    // Initialize authorization with implicit flow
    this.authorization = new Authorization(
      WSHeader.storage,
      props.loginUrl,
      props.refreshUrl,
      props.clientId,
      props.businessPartnerId
    );
    // Listen to authorization changes
    this.authorization.onAccessTokenChange(accessToken => {
      if (this.mounted) {
        this.setState({isLoggedIn: !!accessToken});
      } else {
        this.state.isLoggedIn = !!accessToken;
      }

      this.dispatchEvent('ws-auth-changed', accessToken);
    });
    // Check if we was redirected from the auth page and an access token is available
    this.authorization.tryFetchToken(location.hash.substr(1));
    // Listen for authentication requests
    window.addEventListener('ws-authorize', () => {
      this.authorization.authorize();
    });
    // Listen for authentication removal requests
    window.addEventListener('ws-unauthorize', () => {
      this.authorization.unauthorize();
    });
  }

  /**
   * Get's called when the mouse enters a menu item
   * @param {number} index The index of the item in the link list
   * @returns {void}
   */
  enterMenuItem(index) {
    clearInterval(this.leaveTimeout);
    this.subMenus.forEach(subMenu => subMenu.classList.remove('is-active'));
    this.menuItems.forEach(item => item.classList.remove('is-hovered'));
    // Show sub menu or hide level 2 completely
    if (this.subMenus[index]) {
      this.level2.classList.add('is-active');
      const subMenu = this.subMenus[index];
      subMenu.classList.add('is-active');
      const item = this.menuItems[index];
      item.classList.add('is-hovered');
    } else {
      this.leaveLevel2();
    }
  }

  /**
   * Get's called when the mouse leaves a menu item
   * @param {number} index The index of the item in the link list
   * @returns {void}
   */
  leaveMenuItem(index) {
    this.leaveTimeout = setTimeout(() => {
      this.level2.classList.remove('is-active');
      if (this.subMenus[index]) {
        const subMenu = this.subMenus[index];
        subMenu.classList.remove('is-active');
        const item = this.menuItems[index];
        item.classList.remove('is-hovered');
      }
    }, 10);
  }

  /**
   * Get's called when the mouse enters into the level 2 (sub menu)
   * @returns {void}
   */
  enterLevel2() {
    clearInterval(this.leaveTimeout);
  }

  /**
   * Get's called when the mouse leaves the level 2 (sub menu)
   * @returns {void}
   */
  leaveLevel2() {
    this.subMenus.forEach(subMenu => subMenu.classList.remove('is-active'));
    this.menuItems.forEach(item => item.classList.remove('is-hovered'));
    this.level2.classList.remove('is-active');
  }

  /**
   * @returns {Object}
   */
  render() {
    return (
      <header className="ws-header" ref={element => { this.element = element; }}>
        <div className="level-1">
          <a // eslint-disable-line jsx-a11y/href-no-hash
            className="application-name"
            href="#"
          >
            {this.props.appLogo &&
              <figure className="application-logo">
                <img src={this.props.appLogo} alt="Application logo" />
              </figure>
            }
            {this.props.appName}
          </a>
          <nav className="main-menu">
            <ul>
              {this.props.links.map((link, index) =>
                <li
                  key={`header-link${index}`}
                  onMouseEnter={() => this.enterMenuItem(index)}
                  onMouseLeave={() => this.leaveMenuItem(index)}
                  ref={element => { this.menuItems[index] = element; }}
                  className={(link.isCurrent) ? 'is-current' : null}
                >
                  <a href={link.href} onClick={event => { if (link.onClick) link.onClick(event); }}>
                    {link.label}
                  </a>
                </li>
              )}
            </ul>
          </nav>
          <nav className="menu-controls">
            <ul>
              <li>
                <WSDropdown
                  className="locale"
                  icon="icon24 icon-sort-down"
                  items={this.locales}
                  text={this.state.locale}
                  onChange={item => this.setLocale(item.value)}
                  orientation="right"
                  type="anchor"
                />
              </li>
              {!this.state.isLoggedIn ?
                <li onClick={() => this.authorization.authorize()}>
                  <a>Login</a>
                </li>
              :
                <li onClick={() => this.authorization.unauthorize()}>
                  <a><span className="icon icon24 icon-power" /></a>
                </li>
              }
            </ul>
          </nav>
        </div>
        <div
          className="level-2"
          onMouseEnter={() => this.enterLevel2()}
          onMouseLeave={() => this.leaveLevel2()}
          onClick={() => this.leaveLevel2()}
          ref={element => { this.level2 = element; }}
        >
          {this.props.links.map((parent, index) =>
            parent.children && parent.children.length &&
            <ul className="main-sub-menu" key={`sub-menu${index}`} ref={element => { this.subMenus[index] = element; }}>
              {parent.children.map((child, childIndex) =>
                <li key={`sub-link-${index}-${childIndex}`} className={(child.isCurrent) ? 'is-current' : null}>
                  <a href={child.href} onClick={event => { if (child.onClick) child.onClick(event); }}>
                    {child.label}
                  </a>
                </li>
              )}
            </ul>
          )}
        </div>
      </header>
    );
  }
}
