export function generatePropertySlug(title: string, id: string): string {
  const cleanTitle = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphen
    .replace(/(^-|-$)/g, '');    // Remove leading/trailing hyphens
  
  return `${cleanTitle}-${id}`;
}

export function extractPropertyId(slugOrId: string): string {
  const uuidRegex = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  const match = slugOrId.match(uuidRegex);
  return match ? match[0] : slugOrId;
}
