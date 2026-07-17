# Animation Plans

Plans are stamped against `466ae8e` and follow Emil Kowalski's animation audit values.

| Plan | Title | Severity | Status |
| --- | --- | --- | --- |
| 001 | Crossfade the video handoff | MEDIUM | DONE |
| 002 | Clarify the video affordance | LOW | DONE |
| 003 | Move arrows in their stated direction | LOW | DONE |
| 004 | Give article rows click feedback | LOW | DONE |
| 005 | Indicate the current section | LOW | DONE |

## Execution order

1. Implement 001 and 002 together because they share the video facade selectors.
2. Implement 003 and 004 as independent link-feedback changes.
3. Implement 005 last because it adds the only persistent JavaScript state.

No plan may add a dependency, keyframe animation, scroll listener, or initial content reveal.
