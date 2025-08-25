export function readingTimeFromText(text: string, wpm = 225) {
  if (!text) return { minutes: 1, words: 0 };
  // strip code blocks, tags, and MDX expressions for a better count
  const stripped = text
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\{[^}]+\}/g, ' ')
    .replace(/\[(.*?)\]\([^\)]*\)/g, '$1'); // [label](link) -> label

  const words = stripped.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / wpm));
  return { minutes, words };
}
