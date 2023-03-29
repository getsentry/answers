const slugify = input => {
  input = input
    .toString()
    .toLowerCase()
    // Replace spaces with dashes
    .replace(/\s/g, '-')
    // Remove non-letters
    .replace(/[^a-z0-9-]/g, '')
    // Remove leading, trailing, and duplicate dashes
    .replace(/^-+|-+|-+$/g, '-');
  return input;
};

module.exports = slugify;
