// Tiny pub/sub bridge so the "Sobre Luz" section can tell the video embeds to
// mount their iframes ahead of time. Deferring the embeds keeps Instagram/TikTok
// third-party requests off the initial load (good for Lighthouse), while this
// lets us warm them up once the user scrolls near the Redes section — so no
// click is needed by the time they get there.

let triggered = false;
const listeners = new Set<() => void>();

export function triggerVideoPreload(): void {
  if (triggered) return;
  triggered = true;
  listeners.forEach((cb) => cb());
}

export function isVideoPreloadTriggered(): boolean {
  return triggered;
}

export function onVideoPreload(cb: () => void): () => void {
  if (triggered) {
    cb();
    return () => {};
  }
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}
