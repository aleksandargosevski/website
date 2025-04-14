---
title: The DRY principle is misunderstood - it's about coupling, not similarity
description: Most developers think DRY means "don't repeat similar code," but the real principle is about avoiding duplication of knowledge that changes together. Here's why sharing code between similar-looking components often creates more problems than it solves.
createdAt: 2022-01-19
tags:
  - programming
  - architecture
---

You've probably heard "Don't Repeat Yourself" a thousand times. It's one of those programming principles that sounds so obvious, so fundamental, that we rarely question it. But here's the thing - most of us are applying DRY wrong, and it's creating more problems than it solves.

## The common misinterpretation

When developers see two components that look similar or work in a similar way, the immediate instinct is to extract the common parts. "Look, both our user card and product card have rounded corners, shadows, and hover effects. Let's create a shared `BaseCard` component!"

This seems logical. We're eliminating duplication, making our code more maintainable, right? Wrong.

## What DRY actually means

The DRY principle isn't about avoiding similar-looking code. It's about avoiding duplication of **knowledge** - specifically, knowledge that will likely change together. The key insight that most developers miss is the "change together" part.

Let me give you a real example from a project I worked on. We had a user profile card and a product showcase card. They looked nearly identical - same border radius, same shadow, same padding. The team decided to create a shared component called `DisplayCard`.

Six months later, the design team wanted to update the user cards to have a more personal, warm feeling with softer shadows and warmer colors. The product cards needed to stay professional and sharp. Suddenly, our "smart" abstraction became a roadblock. We had to either:

1. Add conditional styling based on card type (making the component more complex)
2. Break the abstraction and duplicate the code anyway
3. Compromise the design to keep both cards looking the same

We ended up choosing option 2, essentially undoing our "clever" optimization.

## The real test for DRY

Before extracting shared code, ask yourself this question: "If I need to change this functionality or appearance in one place, am I likely to need the same change in the other places?"

If the answer is "maybe" or "probably not," then don't extract it. Keep the code separate, even if it looks similar.

Here are some examples:

**Good candidates for DRY:**
- API response formatting across your application
- Form validation rules for the same data type
- Error handling for network requests
- Authentication logic

**Bad candidates for DRY:**
- Two buttons that happen to be the same color
- Components that share styling but serve different business purposes
- Similar layouts for different sections of your app
- Code that looks the same but represents different domain concepts

## The coupling trap

When you extract similar code into a shared component, you're creating coupling between different parts of your application. This coupling has a cost - it makes changes harder because now you have to consider the impact on multiple use cases.

The question isn't "Is this code similar?" but rather "Are these pieces of code coupled in the business domain?" If your user profile and product card are independent concepts that serve different purposes, they shouldn't share code just because they happen to look similar.

## A practical approach

Instead of reflexively extracting every bit of similar code, try this approach:

1. **Let duplication exist initially.** It's easier to extract shared code later than to break apart a premature abstraction.

2. **Extract only when you have clear evidence of coupling.** If you've changed the same code in multiple places for the same business reason three times, that's a sign of true duplication.

3. **Prefer composition over inheritance.** Instead of creating a base component that handles multiple concerns, create focused utilities that can be composed as needed.

4. **Question every abstraction.** Before creating shared code, ask: "What's the cost of maintaining this abstraction vs. the cost of occasional duplication?"

## The real wisdom

The best code isn't the most clever or the most DRY. It's the code that adapts easily to changing requirements. Sometimes that means accepting a bit of duplication in favor of independence and flexibility.

Remember, you can always extract shared code later when the need becomes clear. But extracting yourself from a premature abstraction? That's much harder.

DRY isn't about eliminating all repetition - it's about eliminating the repetition that will hurt you when things need to change. And in software development, things always need to change.
