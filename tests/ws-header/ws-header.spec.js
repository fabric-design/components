/* eslint-disable */
import {React} from 'imports';
import {WSHeader} from '../../src/ws-header/ws-header';
import {CookieStorage} from '../../src/ws-header/storage/cookie-storage';
import {LocalStorage} from '../../src/ws-header/storage/local-storage';

describe('A WSHeader', () => {

  afterEach(() => {
    WSHeader.removeAccessToken();
  });

  it('set\'s the storage type', () => {
    WSHeader.storage = null;

    WSHeader.setStorageType('local', 'test');
    expect(WSHeader.storage instanceof CookieStorage).toBeFalsy();
    expect(WSHeader.storage instanceof LocalStorage).toBeTruthy();
    expect(WSHeader.storage.name).toBe('test-');

    WSHeader.setStorageType('cookie', 'asd');
    expect(WSHeader.storage instanceof CookieStorage).toBeTruthy();
    expect(WSHeader.storage instanceof LocalStorage).toBeFalsy();
    expect(WSHeader.storage.name).toBe('asd-');
  });

  it('get\'s the access token', () => {
    const tokenName = 'asd';
    // Only test the basic function, the general authorization ist tested elsewhere
    WSHeader.storage.set('access_token', tokenName);
    expect(`${WSHeader.getAccessToken()}`).toBe(tokenName);
  });

  it('get\'s the user abbreviation from access token', () => {
    const tokenName = 'asd34.' + btoa('{"test": "asd", "asdasdmanaged-id": "supercooluser"}') + '.435dg4';
    // Only test the basic function, the general authorization ist tested elsewhere
    WSHeader.storage.set('access_token', tokenName);
    expect(WSHeader.getAccessToken().getUserAbbreviation()).toBe('supercooluser');
    expect(`${WSHeader.getAccessToken()}`).toBe(tokenName);
  });

  it('doesn\'t get an access token', () => {
    const tokenName = 'asd';
    // Only test the basic function, the general authorization ist tested elsewhere
    expect(WSHeader.getAccessToken(`test&no_token=${tokenName}&tests`)).toBeFalsy();
  });

  it('initializes correctly', () => {
    WSHeader.storage.set('locale', 'de');
    const header = new WSHeader({
      loginUrl: '1111',
      businessPartnerId: '333',
      clientId: 444
    });

    spyOn(WSHeader.authorization, 'authorize');

    expect(WSHeader.authorization).toBeTruthy();
    window.dispatchEvent(new CustomEvent('ws-authorize'));

    expect(WSHeader.authorization.authorize).toHaveBeenCalledWith('1111', 444, '333');
    expect(header.state.locale).toBe('de');
  });

  it('initializes with fallback language', () => {
    WSHeader.storage.set('locale', 'test');
    const header = new WSHeader({
      loginUrl: '1111'
    });
    expect(header.state.locale).toBe('en');
  });
});
