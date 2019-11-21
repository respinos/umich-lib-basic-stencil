import { p as patchBrowser, g as globals, b as bootstrapLazy } from './core-ae485377.js';

patchBrowser().then(options => {
  globals();
  return bootstrapLazy([["my-component",[[1,"my-component",{"first":[1],"middle":[1],"last":[1]}]]],["umichlib-universal-header",[[0,"umichlib-universal-header",{"isOpen":[1028,"is-open"],"isLoaded":[1028,"is-loaded"],"data":[1032],"error":[1028]}]]]], options);
});
