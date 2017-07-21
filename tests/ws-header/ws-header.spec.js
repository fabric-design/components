/* eslint-disable */
import {React} from 'imports';
import {WSHeader} from '../../src/ws-header/ws-header';
import {CookieStorage} from '../../src/ws-header/storage/cookie-storage';
import {LocalStorage} from '../../src/ws-header/storage/local-storage';

function clearStorage() {
  WSHeader.storage.remove('access_token');
  WSHeader.storage.remove('refresh_token');
  WSHeader.storage.remove('expires_at');
}

describe('A WSHeader', () => {

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

  it('get\'s the access token', done => {
    const tokenName = 'asd';
    // Only test the basic function, the general authorization ist tested elsewhere
    WSHeader.storage.set('access_token', tokenName);
    WSHeader.getAccessToken()
      .then(accessToken => {
        expect(accessToken).toBe(tokenName);
        WSHeader.storage.remove('access_token');
        done();
      });
  });

  it('doesn\'t get an access token', done => {
    const tokenName = 'asd';
    // Only test the basic function, the general authorization ist tested elsewhere
    WSHeader.getAccessToken(`test&no_token=${tokenName}&tests`)
      .then(accessToken => {
        expect(accessToken).toBeFalsy();
        done();
      });
  });

  it('initializes correctly', () => {
    WSHeader.storage.set('locale', 'de');
    const header = new WSHeader({
      loginUrl: '1111',
      refreshUrl: 222,
      businessPartnerId: '333',
      clientId: 444
    });

    expect(header.authorization).toBeTruthy();
    expect(header.authorization.loginUrl).toBe('1111');
    expect(header.authorization.refreshUrl).toBe(222);
    expect(header.authorization.businessPartnerId).toBe('333');
    expect(header.authorization.clientId).toBe(444);
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
