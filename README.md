# Test Paymium

## Main library used
| Lib | Usage              |
|-----|--------------------|
| React | Framework          |
| Biome | Linter + Formater  |
| Luxon | i18n Date formating |
| axios | Http client |
| Tanstack Query | API Call with cache management |
| Tanstack Table | HTML Table builder |

## Git branches
- master (release)
- feature/sprint-1 : branch containing all merged branches ready to deploy in the next release
- feature/<name> : Independant branch to merge in a sprint
- hotfix/<name> : Urgent fix to deploy in production directly

## Features
[x] Make each column sortable.
[x] Add support for row multi select using the Shift key.
[x] A single row selection should display the details into the right side panel.
[x] A multi row selection should display the selected transaction's ids into the right side panel.
