import { Page } from '../components/page';
import { useArtShows } from '../components/useArtShows';
import { ArtShowRow } from '../components/art-show-row';

const ArtShows = () => {
  const { artShows } = useArtShows();

  return (
    <Page title="Current Art Shows">
      <ArtShowRow shows={artShows.nodes} type="upcoming art shows" />
    </Page>
  );
};

export default ArtShows;
