'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type MarkdownImagePreviewProps = React.ImgHTMLAttributes<HTMLImageElement>;

export default function MarkdownImagePreview({
  alt,
  className,
  src,
  ...props
}: MarkdownImagePreviewProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const scrollY = window.scrollY;
    const previousBodyOverflow = document.body.style.overflow;
    const previousBodyPaddingRight = document.body.style.paddingRight;
    const previousBodyPosition = document.body.style.position;
    const previousBodyTop = document.body.style.top;
    const previousBodyWidth = document.body.style.width;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.body.style.paddingRight = previousBodyPaddingRight;
      document.body.style.position = previousBodyPosition;
      document.body.style.top = previousBodyTop;
      document.body.style.width = previousBodyWidth;
      window.removeEventListener('keydown', handleKeyDown);
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  const openPreview = (event: React.MouseEvent<HTMLImageElement> | React.KeyboardEvent<HTMLImageElement>) => {
    if (!src) return;

    event.preventDefault();
    event.stopPropagation();
    setIsOpen(true);
  };

  const image = (
    <img
      {...props}
      alt={alt}
      src={src}
      className={`${className ?? ''} cursor-zoom-in rounded-md transition hover:opacity-90`}
      role="button"
      tabIndex={0}
      aria-label={alt ? `查看大图：${alt}` : '查看大图'}
      onClick={openPreview}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          openPreview(event);
        }
      }}
    />
  );

  if (!src) {
    return image;
  }

  return (
    <>
      {image}
      {isMounted && isOpen && createPortal(
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={alt ? `图片预览：${alt}` : '图片预览'}
          onClick={() => setIsOpen(false)}
        >
          <button
            type="button"
            className="btn btn-circle btn-sm absolute right-3 top-3 bg-base-100/90 text-base-content shadow-md sm:right-5 sm:top-5"
            aria-label="关闭图片预览"
            onClick={() => setIsOpen(false)}
          >
            x
          </button>
          <img
            src={src}
            alt={alt}
            className="max-h-[90vh] max-w-[95vw] cursor-zoom-out rounded-md object-contain shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          />
        </div>,
        document.body
      )}
    </>
  );
}
