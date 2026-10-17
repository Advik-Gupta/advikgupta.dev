import type Lenis from "lenis";

let instance: Lenis | null = null;
let loaded = false;
const loadListeners = new Set<() => void>();

export function setLenis(lenis: Lenis | null) {
  instance = lenis;
}

export function getLenis() {
  return instance;
}

export function lockScroll() {
  instance?.stop();
  document.documentElement.classList.add("is-locked");
}

export function unlockScroll() {
  instance?.start();
  document.documentElement.classList.remove("is-locked");
}

export function scrollToId(id: string) {
  const target = id === "home" ? 0 : document.getElementById(id);
  if (target === null) return;
  if (instance) {
    instance.scrollTo(target, { duration: 1.6, force: true });
  } else if (target === 0) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    target.scrollIntoView({ behavior: "smooth" });
  }
}

export function isLoaded() {
  return loaded;
}

export function markLoaded() {
  loaded = true;
  loadListeners.forEach((fn) => fn());
  loadListeners.clear();
}

export function onLoaded(fn: () => void) {
  if (loaded) {
    fn();
    return () => {};
  }
  loadListeners.add(fn);
  return () => {
    loadListeners.delete(fn);
  };
}
