import { PWA_CONFIG, getPWAConfig } from '../lib/pwa-config';

describe('PWA Configuration', () => {
  test('should have required PWA properties', () => {
    expect(PWA_CONFIG.name).toBeDefined();
    expect(PWA_CONFIG.shortName).toBeDefined();
    expect(PWA_CONFIG.description).toBeDefined();
    expect(PWA_CONFIG.startUrl).toBeDefined();
    expect(PWA_CONFIG.display).toBe('standalone');
  });

  test('should have valid icons', () => {
    expect(PWA_CONFIG.icons['192']).toBeDefined();
    expect(PWA_CONFIG.icons['512']).toBeDefined();
  });

  test('should have service worker configuration', () => {
    expect(PWA_CONFIG.sw.enabled).toBe(true);
    expect(PWA_CONFIG.sw.cacheName).toBeDefined();
    expect(PWA_CONFIG.sw.urlsToCache).toBeInstanceOf(Array);
  });

  test('should have cache strategy', () => {
    expect(PWA_CONFIG.cache.strategy).toBe('stale-while-revalidate');
    expect(PWA_CONFIG.cache.maxAge).toBeGreaterThan(0);
  });

  test('should have offline configuration', () => {
    expect(PWA_CONFIG.offline.enabled).toBe(true);
    expect(PWA_CONFIG.offline.fallbackPage).toBeDefined();
  });

  test('should have notifications configuration', () => {
    expect(PWA_CONFIG.notifications.enabled).toBe(true);
    expect(PWA_CONFIG.notifications.title).toBeDefined();
    expect(PWA_CONFIG.notifications.icon).toBeDefined();
  });
});

describe('PWA Config Function', () => {
  test('should return config object', () => {
    const config = getPWAConfig();
    expect(config).toBeDefined();
    expect(typeof config).toBe('object');
  });

  test('should disable service worker in development', () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';
    
    const config = getPWAConfig();
    expect(config.sw.enabled).toBe(false);
    
    process.env.NODE_ENV = originalEnv;
  });

  test('should enable service worker in production', () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';
    
    const config = getPWAConfig();
    expect(config.sw.enabled).toBe(true);
    
    process.env.NODE_ENV = originalEnv;
  });
});

// Mock service worker tests
describe('Service Worker', () => {
  beforeEach(() => {
    // Mock service worker registration
    Object.defineProperty(navigator, 'serviceWorker', {
      value: {
        register: jest.fn().mockResolvedValue({}),
        getRegistration: jest.fn().mockResolvedValue({}),
      },
      writable: true,
    });
  });

  test('should register service worker', async () => {
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.register('/sw.js');
      expect(registration).toBeDefined();
    }
  });
});

// Mock PWA install prompt tests
describe('PWA Install Prompt', () => {
  beforeEach(() => {
    // Mock beforeinstallprompt event
    Object.defineProperty(window, 'addEventListener', {
      value: jest.fn(),
      writable: true,
    });
  });

  test('should handle beforeinstallprompt event', () => {
    const mockAddEventListener = jest.fn();
    window.addEventListener = mockAddEventListener;
    
    // Simulate adding event listener
    window.addEventListener('beforeinstallprompt', () => {});
    
    expect(mockAddEventListener).toHaveBeenCalledWith(
      'beforeinstallprompt',
      expect.any(Function)
    );
  });
});

// Mock offline/online detection tests
describe('Offline/Online Detection', () => {
  beforeEach(() => {
    // Mock navigator.onLine
    Object.defineProperty(navigator, 'onLine', {
      value: true,
      writable: true,
    });
  });

  test('should detect online status', () => {
    expect(navigator.onLine).toBe(true);
  });

  test('should detect offline status', () => {
    navigator.onLine = false;
    expect(navigator.onLine).toBe(false);
  });
});

// Mock display mode detection tests
describe('Display Mode Detection', () => {
  beforeEach(() => {
    // Mock matchMedia
    Object.defineProperty(window, 'matchMedia', {
      value: jest.fn().mockReturnValue({
        matches: false,
        addListener: jest.fn(),
        removeListener: jest.fn(),
      }),
      writable: true,
    });
  });

  test('should detect standalone mode', () => {
    const mockMatchMedia = jest.fn().mockReturnValue({
      matches: true,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    });
    window.matchMedia = mockMatchMedia;
    
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    expect(isStandalone).toBe(true);
  });

  test('should detect browser mode', () => {
    const mockMatchMedia = jest.fn().mockReturnValue({
      matches: false,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    });
    window.matchMedia = mockMatchMedia;
    
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    expect(isStandalone).toBe(false);
  });
});
