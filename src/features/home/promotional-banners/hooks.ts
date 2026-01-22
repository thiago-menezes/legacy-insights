import { useEffect, useState, useRef, useCallback } from 'react';

type UseScrollPaginationProps = {
  totalItems: number;
  itemWidth: number;
  gap: number;
};

export const useScrollPagination = ({
  totalItems,
  itemWidth,
  gap,
}: UseScrollPaginationProps) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const calculateItemsPerPage = useCallback(() => {
    if (!scrollerRef.current) return 1;

    const containerWidth = scrollerRef.current.offsetWidth;

    const itemsWithGap = Math.floor(containerWidth / (itemWidth + gap));
    return Math.max(1, itemsWithGap);
  }, [itemWidth, gap]);

  useEffect(() => {
    const updatePagination = () => {
      const items = calculateItemsPerPage();
      setItemsPerPage(items);

      const pages = Math.ceil(totalItems / items);
      setTotalPages(pages);
    };

    updatePagination();

    window.addEventListener('resize', updatePagination);
    return () => window.removeEventListener('resize', updatePagination);
  }, [calculateItemsPerPage, totalItems]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }

      rafId = requestAnimationFrame(() => {
        const scrollLeft = scroller.scrollLeft;
        const containerWidth = scroller.offsetWidth;

        const scrollCenter = scrollLeft + containerWidth / 2;
        const pageWidth = itemsPerPage * (itemWidth + gap);
        const page = Math.floor(scrollCenter / pageWidth);
        const clampedPage = Math.max(0, Math.min(page, totalPages - 1));

        setCurrentPage(clampedPage);
      });
    };

    handleScroll();

    scroller.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      scroller.removeEventListener('scroll', handleScroll);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [itemWidth, gap, itemsPerPage, totalPages]);

  const handlePageChange = useCallback(
    (pageIndex: number) => {
      if (!scrollerRef.current) return;

      const itemIndex = pageIndex * itemsPerPage;
      const scrollLeft = itemIndex * (itemWidth + gap);

      scrollerRef.current.scrollTo({
        left: scrollLeft,
        behavior: 'smooth',
      });
    },
    [itemsPerPage, itemWidth, gap],
  );

  return {
    scrollerRef,
    currentPage,
    totalPages,
    itemsPerPage,
    handlePageChange,
  };
};
