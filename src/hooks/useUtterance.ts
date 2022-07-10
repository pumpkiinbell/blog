import { useEffect, useRef } from 'react';
import { useColorMode } from '@docusaurus/theme-common';

export default function useUtterance() {
  const anchor = useRef<HTMLElement>(null);
  const { colorMode } = useColorMode();

  useEffect(() => {
    while (anchor.current.firstChild) {
      anchor.current.removeChild(anchor.current.firstChild);
    }

    anchor.current.appendChild(createUtteranceScript({ theme: `github-${colorMode}` }));
    anchor.current.style.marginTop = '50px';
  }, [colorMode]);

  return { anchor };
}

function createUtteranceScript(option?: Record<string, unknown>) {
  const script = document.createElement('script');

  script.src = 'https://utteranc.es/client.js';
  script.crossOrigin = 'anonymous';
  script.async = true;

  Object.entries({ ...defaultAttributes, ...option }).forEach(([key, value]) => {
    script.setAttribute(key, value);
  });

  return script;
}

const defaultAttributes = {
  repo: 'pumpkiinbell/blog',
  'issue-term': 'https://github.com/pumpkiinbell/blog/issues',
  label: 'comment',
  theme: 'github-light',
};
