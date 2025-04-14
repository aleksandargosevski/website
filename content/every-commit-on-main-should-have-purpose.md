---
title: Every commit on main should have purpose
description: My thoughts on why committing incomplete features directly to main branch is a bad practice, even during development. Here's what I learned from working on both large team projects and side projects with friends.
createdAt: 2024-01-15
tags:
  - git
---

## The context: different teams, different practices

I work in a large team where Git flow is strictly followed - nothing gets committed directly to main. I've noticed that developers often make small, incremental commits on their feature branches that don't represent complete functionality. This makes sense when you need a safe point to return to or want to backup work in case of hardware failure or unexpected absence.
However, while working on a side project with friends where we don't have code reviews, I noticed they apply the same small-commit practice directly to the main branch. This approach concerns me.

## The case against small commits on main

Even during the development phase, I see little benefit in these small, incomplete commits. They primarily introduce drawbacks. Such commits lack historical significance and make the repository harder to navigate. When multiple developers add their own commits in between these small, incomplete feature commits, it becomes nearly impossible to track how a specific feature evolved over time. Looking at the git history becomes like solving a puzzle, trying to piece together which commits belong to which feature. I believe each commit should represent a complete logical unit, such as a feature or bug fix. During development, I would only accept partial feature commits if they represent a meaningful component, for example: `feat(leadform): add UI for lead form`.

## Arguments supporting small commits

Proponents of committing directly to main offer several arguments:

- It allows other developers to see development direction earlier
- It reduces the risk of large, complex merge conflicts
- It provides clear visibility of development progress (though this can be achieved through feature branches as well)

Some argue it's just simpler. However, I don't find creating branches particularly complicated. While the argument about avoiding complex merge conflicts has merit, regular rebasing and well-scoped features typically prevent such issues.

The underlying reason for this practice might be simpler - some developers either find Git commands intimidating, particularly operations like rebasing, or prefer the path of least resistance, choosing to commit directly to main rather than managing feature branches properly.

## The value of clean git history

Perhaps I'm particular about maintaining a "perfect" Git history, but throughout my career, clear history has repeatedly proved valuable. It's especially helpful during rollbacks, feature removals, parallel releases, and similar scenarios. While achieving a perfect Git history where every commit is completely safe might be unrealistic (as it would mean never introducing bugs), that shouldn't justify making the history more confusing and harder to understand.

## Proposed guidelines

Based on my experience, I recommend these rules:

1. Main branch commits should contain either:

   - Complete features
   - Complete bug fixes

2. During development phase:

   - Partial feature commits are acceptable if they:
   - Represent a logical component
   - Enable work on dependent features

3. Feature branch practices:
   - Commits should be squashed before code review
   - Use fixup commits during review for clarity
   - Squash all fixup commits before merging to main

## Conclusion

While maintaining a clean Git history requires extra effort, the benefits in terms of project maintainability and troubleshooting capabilities make it worthwhile. A well-organized commit history serves as both documentation and a safety net for your project's evolution.
