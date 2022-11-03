# Crystallize Apps

Here we manage all of the Crystallize Apps.

In order to simplify their maintenance they are all in this Git Repository.

All contributions will happen here:

-   PRs and Issues are therefore open, discuss, contribute in one place
-   Many things will be shared accross the `components`: Coding Standards, CI & Automations, Tests, etc.

✅ Nevertheless, all the `components` will continue to be independant and pushed in their own repository. (through magic mechanisms that we have internally)

## Managed Repositories

| Bundles                                    |           | Licence(s) |
| ------------------------------------------ | --------- | ---------- |
| [Crystallize Import App][0]                | [Live][1] | ![MIT]     |
| [Crystallize Refund App][2]                | [Live][3] | ![MIT]     |
| [Crystallize Subscription Contract App][4] | [Live][5] | ![MIT]     |
| [Hello World Comics][6]                    |           | ![MIT]     |

## Contributions

-   Pull Requests and Issues should start with `[$COMPONENT_NAME]`

## Adding a new Component (App)

```bash
make add-component COMPONENT=my-new-component
```

> If not already done, you still need create the Github sub-repository and add an entry in `components/manifest.json`

[mit]: https://img.shields.io/badge/license-MIT-green?style=flat-square&labelColor=black
[0]: https://github.com/CrystallizeAPI/crystallize-import-app
[1]: https://import.app-labs.crystallize.com
[2]: https://github.com/CrystallizeAPI/crystallize-refund-app
[3]: https://refund.app-labs.crystallize.com
[4]: https://github.com/CrystallizeAPI/crystallize-subscription-contract-app
[5]: https://subscription-contract.app-labs.crystallize.com
[6]: https://github.com/CrystallizeAPI/hello-world-comics-app
