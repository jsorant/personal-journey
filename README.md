# Personal Journey


## Start the app

To start the development server run `nx serve personal-journey-front`. Open your browser and navigate to http://localhost:4200/. Happy coding!


## Generate code

If you happen to use Nx plugins, you can leverage code generators that might come with it.

Run `nx list` to get a list of available plugins and whether they have generators. Then run `nx list <plugin-name>` to see what generators are available.

Learn more about [Nx generators on the docs](https://nx.dev/features/generate-code).

## Running tasks

### Dev

Unit tests:
```
nx test personal-journey-front --watch 
```

Components tests:
```
cd apps/personal-journey-front
npx cypress open 
```

End-to-end tests:
```
cd apps/personal-journey-front-e2e
npx cypress open 
```

### Tasks

```
nx lint personal-journey-front
nx test personal-journey-front
nx build personal-journey-front
nx component-test personal-journey-front
nx e2e personal-journey-front-e2e 
```

Execute all tasks locally:

```
 nx run-many -p personal-journey-front -t lint test build e2e-ci component-test
```

More targets can be defined in the `package.json` or `projects.json`. Learn more [in the docs](https://nx.dev/features/run-tasks).

## Want better Editor Integration?

Have a look at the [Nx Console extensions](https://nx.dev/nx-console). It provides autocomplete support, a UI for exploring and running tasks & generators, and more! Available for VSCode, IntelliJ and comes with a LSP for Vim users.

## Ready to deploy?

Just run `nx build demoapp` to build the application. The build artifacts will be stored in the `dist/` directory, ready to be deployed.

## Set up CI!

Nx comes with local caching already built-in (check your `nx.json`). On CI you might want to go a step further.

- [Set up remote caching](https://nx.dev/features/share-your-cache)
- [Set up task distribution across multiple machines](https://nx.dev/nx-cloud/features/distribute-task-execution)
- [Learn more how to setup CI](https://nx.dev/recipes/ci)

## Explore the Project Graph
Run `nx graph` to show the graph of the workspace.
It will show tasks that you can run with Nx.

- [Learn more about Exploring the Project Graph](https://nx.dev/core-features/explore-graph)

