import { useEffect, useRef } from 'react';

export default function useUtterance() {
  const anchor = useRef<HTMLElement>(null);

  useEffect(() => {
    (() => {
      const script = document.createElement('script');

      script.src = 'https://utteranc.es/client.js';
      script.crossOrigin = 'anonymous';
      script.async = true;

      Object.entries(attributes).forEach(([key, value]) => {
        script.setAttribute(key, value);
      });

      anchor.current.appendChild(script);
      anchor.current.style.marginTop = '50px';
    })();
  }, []);

  return { anchor };
}

const attributes = {
  repo: 'pumpkiinbell/blog',
  'issue-term': 'https://github.com/pumpkiinbell/blog/issues',
  label: 'comment',
  theme: 'github-light',
};
