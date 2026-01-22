'use client';

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'shell-preferences';
const MIN_SIDEBAR_WIDTH = 200;
const MAX_SIDEBAR_WIDTH = 400;
const DEFAULT_SIDEBAR_WIDTH = 280;
const MOBILE_BREAKPOINT = 768;

interface ShellPreferences {
  sidebarWidth: number;
  sidebarVisible: boolean;
  headerVisible: boolean;
}

// Helper function to load preferences from localStorage
const loadPreferences = (): ShellPreferences => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Failed to parse shell preferences:', e);
  }
  return {
    sidebarWidth: DEFAULT_SIDEBAR_WIDTH,
    sidebarVisible: true,
    headerVisible: true,
  };
};

export const useShellState = () => {
  // Initialize state with lazy initializer functions to avoid cascading renders
  // Load preferences once and use for all initial states
  const initialPrefs = loadPreferences();
  const [sidebarWidth, setSidebarWidth] = useState(initialPrefs.sidebarWidth);
  const [sidebarVisible, setSidebarVisible] = useState(
    initialPrefs.sidebarVisible,
  );
  const [headerVisible, setHeaderVisible] = useState(
    initialPrefs.headerVisible,
  );
  const [isResizing, setIsResizing] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [previousSidebarVisible, setPreviousSidebarVisible] = useState(true);
  const [previousHeaderVisible, setPreviousHeaderVisible] = useState(true);

  // Save preferences to localStorage
  useEffect(() => {
    const prefs: ShellPreferences = {
      sidebarWidth,
      sidebarVisible,
      headerVisible,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  }, [sidebarWidth, sidebarVisible, headerVisible]);

  // Detect mobile breakpoint
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleSidebar = useCallback(() => {
    setSidebarVisible((prev) => !prev);
  }, []);

  const toggleHeader = useCallback(() => {
    setHeaderVisible((prev) => !prev);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!isFullscreen) {
      // Entering fullscreen - save current state and hide both
      setPreviousSidebarVisible(sidebarVisible);
      setPreviousHeaderVisible(headerVisible);
      setSidebarVisible(false);
      setHeaderVisible(false);
      setIsFullscreen(true);
    } else {
      // Exiting fullscreen - always show sidebar, restore header state
      setSidebarVisible(true);
      setHeaderVisible(true);
      setIsFullscreen(false);
    }
  }, [isFullscreen, sidebarVisible, headerVisible, previousHeaderVisible]);

  const startResize = useCallback(() => {
    setIsResizing(true);
  }, []);

  const stopResize = useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = useCallback((clientX: number) => {
    const newWidth = Math.min(
      Math.max(clientX, MIN_SIDEBAR_WIDTH),
      MAX_SIDEBAR_WIDTH,
    );
    setSidebarWidth(newWidth);
  }, []);

  const enterFullScreen = useCallback(() => {
    setPreviousSidebarVisible(sidebarVisible);
    setPreviousHeaderVisible(headerVisible);
    setSidebarVisible(false);
    setHeaderVisible(false);
    setIsFullscreen(true);
  }, [sidebarVisible, headerVisible]);

  const exitFullScreen = () => {
    setSidebarVisible(previousSidebarVisible);
    setHeaderVisible(previousHeaderVisible);
    setIsFullscreen(false);
  };

  return {
    sidebarWidth,
    sidebarVisible,
    headerVisible,
    isResizing,
    isMobile,
    toggleSidebar,
    toggleHeader,
    toggleFullscreen,
    startResize,
    stopResize,
    resize,
    enterFullScreen,
    exitFullScreen,
  };
};
