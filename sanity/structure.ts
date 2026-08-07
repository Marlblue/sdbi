import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('article')
        .title('Artikel')
        .child(
          S.documentTypeList('article')
            .title('Artikel')
            // Studio's default list order is "last edited", which after a bulk
            // migration reads as arbitrary. Sort by the article's own date instead,
            // matching how the site itself orders the blog list.
            .defaultOrdering([{field: 'date', direction: 'desc'}])
        ),
      ...S.documentTypeListItems().filter((item) => item.getId() !== 'article'),
    ])
