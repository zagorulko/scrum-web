import { ScrumWebPage } from './app.po';

describe('scrum-web App', () => {
  let page: ScrumWebPage;

  beforeEach(() => {
    page = new ScrumWebPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
