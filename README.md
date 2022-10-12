# Crystallize Apps

Here we manage all of the Crystallize Apps.

In order to simplify their maintenance they are all in this Git Repository.

All contributions will happen here:

-   PRs and Issues are therefore open, discuss, contribute in one place
-   Many things will be shared accross the `components`: Coding Standards, CI & Automations, Tests, etc.

✅ Nevertheless, all the `components` will continue to be independant and pushed in their own repository. (through magic mechanisms that we have internally)

## Managed Repositories

| Bundles                                                                                                          | Licence(s) |
| ---------------------------------------------------------------------------------------------------------------- | ---------- |
| [Crystallize Refund App](https://github.com/CrystallizeAPI/crystallize-refund-app)                               | ![MIT]     |
| [Crystallize Subscription Contract App](https://github.com/CrystallizeAPI/crystallize-subscription-contract-app) | ![MIT]     |
| [Hello World Comics](https://github.com/CrystallizeAPI/export-serverless-function)                               | ![MIT]     |

## Contributions

-   Pull Requests and Issues should start with `[$COMPONENT_NAME]`

## Adding a new Component (App)

```bash
make add-component COMPONENT=my-new-component
```

> If not already done, you still need create the Github sub-repository and add an entry in `components/manifest.json`

[mit]: https://img.shields.io/badge/license-MIT-green?style=flat-square&labelColor=black
