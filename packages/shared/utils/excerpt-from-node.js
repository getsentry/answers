const excerptFromNode = ({ excerpt, body }) => {
  const fallback = 'This post does not have a valid excerpt';
  let val = '';
  if (body && body.childMarkdownRemark) val = body.childMarkdownRemark.excerpt;
  if (excerpt) val = excerpt.excerpt;
  val = val.replace(/\{\{.*\}\}/gi, '').trim();
  return val || fallback;
};

module.exports = excerptFromNode;
