import { newE2EPage } from '@stencil/core/testing';

describe('umichlib-universal-header', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<umichlib-universal-header></umichlib-universal-header>');

    const element = await page.find('umichlib-universal-header');
    expect(element).toHaveClass('hydrated');
  });
});
