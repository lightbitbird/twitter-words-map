import { TwitterWordsMapPage } from './app.po';

describe('twitter-words-map App', function() {
  let page: TwitterWordsMapPage;

  beforeEach(() => {
    page = new TwitterWordsMapPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
