export const stripMarkdown = (text?: string): string | undefined => {
  if (!text) return undefined;
  return text
    .replace(/#{1,6}\s?/g, '') // Headers
    .replace(/\*\*(.+?)\*\*/g, '$1') // Bold **text**
    .replace(/__(.+?)__/g, '$1') // Bold __text__
    .replace(/\*(.+?)\*/g, '$1') // Italic *text*
    .replace(/_(.+?)_/g, '$1') // Italic _text_
    .replace(/~~(.+?)~~/g, '$1') // Strikethrough
    .replace(/`(.+?)`/g, '$1') // Inline code
    .replace(/\[(.+?)\]\(.+?\)/g, '$1') // Links [text](url)
    .replace(/^\s*[-*+]\s+/gm, '') // Unordered lists
    .replace(/^\s*\d+\.\s+/gm, '') // Ordered lists
    .replace(/^>\s?/gm, '') // Blockquotes
    .replace(/\n{2,}/g, ' ') // Multiple newlines to space
    .replace(/\n/g, ' ') // Single newlines to space
    .trim();
};
