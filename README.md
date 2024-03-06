# Personal Journey

## Generate code

If you happen to use Nx plugins, you can leverage code generators that might come with it.

Run `nx list` to get a list of available plugins and whether they have generators. Then run `nx list <plugin-name>` to see what generators are available.

Learn more about [Nx generators on the docs](https://nx.dev/features/generate-code).

### Generate angular component:
```
nx g @nx/angular:component home --directory apps/personal-journey-front/src/app/home
```

## Dev tasks

### Run all checks before commit

```
npm run all
```

### Common tasks

```
npm run test
npm run test:watch
npm run test:comp
npm run serve
npm run lint
npm run build
```

### Open Cypress for component testing

```
npm run cypress
```

### Open Cypress for end-to-end testing

```
cd apps/personal-journey-front-e2e
npx cypress open 
```

## Deploy 

### GitHub Pages

```
git checkout gh-pages
npm run deploy
```

- Dashboard: https://github.com/jsorant/personal-journey/settings/pages
- Link to the app: https://jsorant.github.io/personal-journey/

### Follow up
 - Vercel: https://github.com/orgs/vercel/discussions?discussions_q=angular+17+404
 - Netlify: https://answers.netlify.com/t/nx-angular-could-not-locate-your-angular-json/113051/4
