import { sdk } from 'https://esm.sh/@farcaster/miniapp-sdk';

window.addEventListener('load', async () => {
  try {
    // Call this when the UI is ready for the user
    await sdk.actions.ready();
  } catch (e) {
    console.error('MiniApp sdk.actions.ready() failed', e);
  }
});
