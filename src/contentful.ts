import { createClient, type EntryFieldTypes } from "contentful";

export interface ContentfulArtShowProps {
  contentTypeId: "artShows",
  fields: {
    ignore: EntryFieldTypes.Boolean;
    excerpt: EntryFieldTypes.Text;
    displayField: EntryFieldTypes.Text;
    post: EntryFieldTypes.RichText;
  }
}

const contentfulClient = createClient({
  space: import.meta.env.CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.CONTENTFUL_ACCESS_TOKEN,
});

export const artShows = await contentfulClient.getEntries<ContentfulArtShowProps>({
  content_type: "artShows",
});