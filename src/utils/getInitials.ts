export const getInitials = (fullName: string) => {
  if (!fullName.trim()) return '';

  const words = fullName.trim().split(/\s+/);

  // If there is only one word, return its initial; otherwise, take the first and last initials.
  const selectedWords = words.length > 1 ? [words[0], words[words.length - 1]] : [words[0]];

  return selectedWords.map((word) => word[0].toUpperCase()).join('');
};
