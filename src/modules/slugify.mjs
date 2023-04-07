
export const slugify = search=> {
   return search
       .toLowerCase()
       .trim()
       .replace(/[^\w\s-]/g, '')
       .replace(/[\s_-]+/g, '-')
       .replace(/^-+|-+$/g, '');
}

