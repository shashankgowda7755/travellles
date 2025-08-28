// Service Worker Registration Utility

export const registerServiceWorker = async (): Promise<void> => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      });
      
      console.log('Service Worker registered successfully:', registration);
      
      // Handle updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New content is available, show update notification
              showUpdateNotification();
            }
          });
        }
      });
      
    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
  }
};

export const unregisterServiceWorker = async (): Promise<void> => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration) {
        await registration.unregister();
        console.log('Service Worker unregistered successfully');
      }
    } catch (error) {
      console.error('Service Worker unregistration failed:', error);
    }
  }
};

const showUpdateNotification = (): void => {
  // Create a simple notification for app updates
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #E07A3E;
    color: white;
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 10000;
    font-family: Inter, sans-serif;
    max-width: 300px;
  `;
  
  notification.innerHTML = `
    <div style="margin-bottom: 8px; font-weight: 600;">App Update Available</div>
    <div style="margin-bottom: 12px; font-size: 14px;">A new version is ready. Refresh to update.</div>
    <button id="refresh-btn" style="
      background: white;
      color: #E07A3E;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 600;
      margin-right: 8px;
    ">Refresh</button>
    <button id="dismiss-btn" style="
      background: transparent;
      color: white;
      border: 1px solid white;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
    ">Later</button>
  `;
  
  document.body.appendChild(notification);
  
  // Add event listeners
  const refreshBtn = notification.querySelector('#refresh-btn');
  const dismissBtn = notification.querySelector('#dismiss-btn');
  
  refreshBtn?.addEventListener('click', () => {
    window.location.reload();
  });
  
  dismissBtn?.addEventListener('click', () => {
    document.body.removeChild(notification);
  });
  
  // Auto-dismiss after 10 seconds
  setTimeout(() => {
    if (document.body.contains(notification)) {
      document.body.removeChild(notification);
    }
  }, 10000);
};

// Check if app can be installed
export const checkInstallPrompt = (): void => {
  let deferredPrompt: any;
  
  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    // Stash the event so it can be triggered later
    deferredPrompt = e;
    
    // Show install button/banner
    showInstallPrompt(deferredPrompt);
  });
};

const showInstallPrompt = (deferredPrompt: any): void => {
  const installBanner = document.createElement('div');
  installBanner.style.cssText = `
    position: fixed;
    bottom: 20px;
    left: 20px;
    right: 20px;
    background: #634B3A;
    color: white;
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 10000;
    font-family: Inter, sans-serif;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `;
  
  installBanner.innerHTML = `
    <div>
      <div style="font-weight: 600; margin-bottom: 4px;">Install Milesalone</div>
      <div style="font-size: 14px; opacity: 0.9;">Get the full experience with our app</div>
    </div>
    <div>
      <button id="install-btn" style="
        background: #E07A3E;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
        font-weight: 600;
        margin-right: 8px;
      ">Install</button>
      <button id="close-install" style="
        background: transparent;
        color: white;
        border: none;
        padding: 8px;
        cursor: pointer;
        font-size: 18px;
      ">×</button>
    </div>
  `;
  
  document.body.appendChild(installBanner);
  
  const installBtn = installBanner.querySelector('#install-btn');
  const closeBtn = installBanner.querySelector('#close-install');
  
  installBtn?.addEventListener('click', async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User response to the install prompt: ${outcome}`);
      deferredPrompt = null;
    }
    document.body.removeChild(installBanner);
  });
  
  closeBtn?.addEventListener('click', () => {
    document.body.removeChild(installBanner);
  });
};