import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const easings = {
  smooth:     'power3.out',
  cinematic:  'power4.out',
  sharp:      'expo.out',
  soft:       'sine.out',
  elastic:    'elastic.out(1, 0.5)',
};

gsap.defaults({ ease: easings.smooth, duration: 1 });

export default gsap;