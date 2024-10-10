import { Howl, Howler, HowlOptions } from "howler";

let howler: Howl | null = null;
// Howler.volume(0.5);

export const playMusic = (src: string, options?: Partial<HowlOptions>) => {
  if (howler) {
    unloadMusic();
  }

  howler = new Howl({
    src: [src],
    // loop: true,
    html5: true,
    autoplay: true,
    ...options,
  });

  return howler;
};

export const unloadMusic = () => {
  if (!howler) {
    return;
  }

  howler.unload();
};

export default howler;
