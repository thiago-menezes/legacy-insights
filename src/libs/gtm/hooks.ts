'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { sendPageView } from './events';
import type { PageData, UserData } from './types';

type UsePageViewOptions = {
  getPageData: () => PageData;
  getUserData: () => UserData;
  skipInitial?: boolean;
  ready?: boolean; // Only send pageView when ready is true
};

export const usePageView = (options: UsePageViewOptions) => {
  const pathname = usePathname();
  const isInitialMount = useRef(true);
  const optionsRef = useRef(options);
  const hasSeenPathname = useRef(new Set<string>());

  useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  useEffect(() => {
    // If ready is specified and false, don't send pageView yet
    if (optionsRef.current.ready === false) {
      return;
    }

    if (isInitialMount.current && optionsRef.current.skipInitial) {
      isInitialMount.current = false;
      return;
    }

    isInitialMount.current = false;

    // Prevent duplicate pageViews for the same pathname
    if (hasSeenPathname.current.has(pathname)) {
      return;
    }

    hasSeenPathname.current.add(pathname);

    const pageData = optionsRef.current.getPageData();
    const userData = optionsRef.current.getUserData();

    sendPageView(pageData, userData);
  }, [pathname, options.ready]);
};
