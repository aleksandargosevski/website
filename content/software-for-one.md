---
title: Software for one
description: "I built ten small apps that only I really need. When building gets this cheap, writing software for an audience of one starts to make sense."
createdAt: 2026-11-22
tags:
  - ai
  - productivity
---

Since May, I've published ten new projects on GitHub. A screenshot app. A calendar. A mail client. A design tool. A file manager for the terminal. A shell history manager. A tmux session manager. A menu bar app that switches my keyboard layout. And one that shows Matrix rain on my screen when I'm away from the computer.

Before that, my last public project was from 2019.

This post isn't about the apps themselves. It's about what changed, and why I think we'll see a lot more of this kind of software: software built for exactly one person.

## Software that fits

Every app I use was built for millions of people. That's how software works - you build something once and sell it to as many people as possible. The result is software that fits everyone a little bit and nobody perfectly.

When you build for one person, the problem looks very different.

I write in Serbian, and in Serbia we use two alphabets. I write Slack messages in Cyrillic and almost everything else in Latin. Switching the keyboard layout by hand all day is a small thing, but it's annoying. No company will ever fix this for me - the problem is too small and too specific. So I built [Pismo](https://github.com/aleksandargosevski/pismo), a menu bar app that switches the layout based on the app and even the text field I'm focused on. Cyrillic in the Slack message box, Latin everywhere else.

Pismo is the extreme example, but the reason behind every app is the same: my shortcuts and the features I actually need. Nothing more, nothing less.

- My calendar, [Dani](https://github.com/aleksandargosevski/dani), works directly with Google Calendar. It doesn't ask me to create yet another account or sign up for a workspace just to see my meetings. It also creates events from text, and it understands "Sastanak sa Markom sutra u 14h" just as well as English.
- My design tool, [Skica](https://github.com/aleksandargosevski/skica), is my free replacement for Sketch. I'm not a designer, but every now and then I need to draw something, and for that I was paying for Sketch. Skica has only the options I use, and it's really fast.
- My mail app, [Pošćar](https://github.com/aleksandargosevski/poscar), does mail and nothing else. No calendar, no contacts, no AI features. It's fast, every action has a keyboard shortcut, and there is nothing in it I don't need.

None of these would make sense as a product. All of them make sense for me.

## The math changed

A few years ago, building your own calendar or mail client was a silly idea. It would take months, maybe years, to get to something usable. Paying for an app, or just living with its flaws, was the only reasonable choice.

That math has changed. With AI agents, the cost of building something dropped below the cost of putting up with something. Small daily annoyances suddenly become worth fixing. The missing shortcut, the feature I never use that gets in the way, the layout I switch by hand fifty times a day.

I'm not a Swift developer. I spent most of my career on the web. Most of these apps are native macOS apps written in Swift, and a few are terminal tools in Go. A few years ago, the language alone would have stopped me. Now it barely matters. What matters is knowing what I want and being able to judge whether I got it.

## No users, no compromises

The nice part about having one user is that you never have to compromise.

There is no onboarding, because I know how the app works. There are no settings for workflows I don't have. No accounts, no growth features, no "rate this app" popups. Everything is keyboard-first, because that's how I work. Every app has a Serbian name - Škljoc, Skica, Dani, Pošćar, Skočko - because nobody else needs to pronounce them.

When something bothers me, I don't open a feature request and wait. I describe it to an agent, test it, and use the new version the same evening.

## How I build them

"Vibe-coded" sounds like I just type a wish and hope for the best. It's not quite like that.

For Skica, before any code was written, I worked out a plan: the decisions (Swift, Core Graphics, the file format), phases from an empty canvas to Sketch and Figma import, and performance budgets - the app has to start in under 300 ms. After each phase, I opened the app, used it, and gave feedback before moving on.

This is the same thing I wrote about in [Code is no longer written for humans](/code-is-no-longer-written-for-humans). I don't read every line. I plan, I test like a user, and I check the results. The code is the agent's job. Knowing what to build and whether it works is mine.

## The boring part is distribution

Building the app turned out to be the easy part. Getting it installed properly was harder.

macOS doesn't like apps that don't come from the App Store or a paid developer account. Screen recording, accessibility, keyboard monitoring - every permission is tied to the app's signature. Rebuild the app with a different signature, and macOS forgets all the permissions.

My solution is simple and a bit hacky. Every app is signed with the same self-signed certificate, so permissions survive rebuilds. Everything is installed through my own [Homebrew tap](https://github.com/aleksandargosevski/homebrew-tap), so updating is one `brew upgrade`. The apps aren't notarized, so the first launch needs an "Open Anyway" click. For an audience of one, that's fine.

## The price nobody mentions

There is a catch, and it's maintenance.

I now depend every day on ten apps whose code I've never fully read. macOS will change. Gmail will change its APIs. Something will break at the worst possible moment. That's why most of my READMEs start with the same note: this is vibe-coded for personal use, it may have rough edges, use it at your own risk.

I'm fine with that, for a few reasons. The apps are small and do one thing. When something breaks, the same agent that built it can usually fix it. And if a project ever stops being worth it, I can go back to a paid app. Nothing is locked in. The user is me, and I know what I signed up for.

## What this means for software

I don't think this replaces paid software. Teams need shared tools. Some apps are worth their price because of sync, security, support, or years of polish that you can't rebuild in a weekend.

But I think the bar is moving. If an app is just a nicer interface over something simple, more and more people will build their own version that fits them exactly. Paid software will have to offer something that's hard to rebuild, not just something that's annoying to live without.

For a long time, software was something you bought and adapted to. Now it's becoming something you can shape around yourself.

If you're curious, pick the one app that annoys you most every day and try to build your own version. Not a product. Just something for you. You might be surprised how far you get.
