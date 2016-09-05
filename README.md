# git-contributions
> Get a user's Github Contributions in the last year/week/day.

# Install
``` npm install git-contributions ```

# Usage
```js
var contributions = require('git-contributions');

contributions.yearly('mazdeh').then((count) => {
  console.log(count);
  // => user mazdeh's contributions in the last year
});
```

`username` is optional, if no `username` is passed, it is pulled from `~/.gitconfig`.

```js
contributions.weekly().then((count) => {
  console.log(count);
  // => local user's contributions in the last week
});
```

# API
`contributions.daily(username)` returns Promise, resolves to **daily** contributions.

`contributions.weekly(username)` returns Promise, resolves to **weekly** contributions.

`contributions.yearly(username)` returns Promise, resolves to **yearly** contributions.

NOTE: `username` is optional.

# Motivation
Github's API doesn't have an endpoint to contributions yet. This is a small package that scrapes the publicly available contributions chart from github.com.
See it live on my [website](http://www.mazdeh.com).
