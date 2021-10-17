import { Page } from '../components/page';
import { useArtShows } from '../components/useArtShows';
import { ArtShowRow } from '../components/art-show-row';

const ArtShows = () => {
  const { futureArtShows, pastArtShows } = useArtShows();

  return (
    <Page title="Current Art Shows">
      <ArtShowRow shows={futureArtShows.nodes} type="upcoming art shows" />
      <h2>Previous Art Shows</h2>
      <ArtShowRow shows={pastArtShows.nodes} />
    </Page>
  );
};

export default ArtShows;
