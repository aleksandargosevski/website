---
title: Code is no longer written for humans
description: Clean code, style rules and linters existed because people had to read and maintain code. Now that AI agents write most of it, I think what matters is changing - and so is who stands out on a team.
createdAt: 2026-08-01
tags:
  - programming
  - ai
---

For decades we cared a lot about how code looks. We argued about tabs and spaces. We wrote style guides. We set up linters to make sure everyone puts the bracket in the same place. We read books about clean code and felt good when a function was short and well named.

I think most of this is slowly losing its meaning. Not because it was wrong, but because the reason behind it is going away.

## Code was always written for humans

Computers never needed readable code. They were fine with machine code. We invented high-level languages for us, the people. We wanted code that a person can write, read, and change six months later without breaking everything.

Clean code, naming rules, folder structure, linters, code reviews: all of it exists because people had to work with the code every day. Readable code was a tool for human collaboration. It was never the goal.

Now the reader is changing. More and more code is written, read, and changed by AI agents. When the main reader changes, what makes code "good" changes too.

## Agents are the next layer

We already went through this once. Nobody reads the assembly that a compiler produces. We trust it because the program works, not because we checked every instruction.

Agents are becoming the next layer. You describe what you want, and the agent writes the code. When it needs to change something, it reads that code again. It doesn't care if a variable name is a bit long or if a file has 600 lines. It can find its way through code that would make a human give up.

Some will say messy code still makes agents slower. That's true today - they use more tokens on messy code, though they still finish the task. But if the agent writes the code from the start, it also organizes it. Organization doesn't go away. It becomes the agent's job, not yours.

The same goes for linters. Style rules and formatting made sense when ten people had to agree on how code should look. An agent doesn't need to agree with anyone.

## We never wrote perfect code

The usual reply is: "But you can't trust the machine. Someone has to read every line."

I think this is a double standard. We never wrote bug-free code. Code review never caught every bug. People get tired, miss edge cases, and copy the wrong snippet from Stack Overflow. An agent can make the same mistakes, but it also checks many things we forget about, and it doesn't get tired at 6 pm on a Friday.

So yes, responsibility stays with us. Someone has to answer when production breaks. But we don't take that responsibility by reading every line. A tech lead is responsible for the team's code without reading all of it. They do it through process, standards, and checking results.

We do it with:

- good planning before the agent writes anything
- prompts that clearly cover edge cases
- testing the feature ourselves, like a user would
- tests that prove the code does what we asked

## Tests are the real contract

If I had to pick one thing that matters more now than before, it's tests.

A compiler always gives the same output for the same input. An agent doesn't. That's exactly why we need a way to check its work that doesn't depend on reading the code. Tests do that. They don't care who wrote the code or how it looks. They only care whether it works.

A test is also a specification. Writing a test is a clear way to tell the agent what you want. "Make this pass" is a better instruction than a long paragraph of text.

Tests only cover what you thought of, so planning and edge cases are part of the same job. But that's still a much better place for your time than arguing about how code looks.

## The end of the "React developer"

When writing code is no longer the hard part, being an expert in one tool matters less. The lines between front-end and back-end, React and Python, start to fade.

I think every developer becomes a kind of architect. The job is to:

- understand the technologies you work with well enough
- know which tool is good for which problem
- split a problem into clear pieces
- guide the agents to solve each piece well
- check that the whole thing works together

You still need depth. You can't judge a solution you don't understand. But you need depth to make decisions, not to type code.

## The people who will stand out

In most teams there is someone who isn't the fastest or best coder, but who keeps making things better. They build the small tool everyone ends up using. They automate the boring task. They bring a new idea to a meeting and then actually try it.

Before AI, these people had one limit: time. Every idea had to be built by hand, often on the side of their normal work. Many good ideas never happened because nobody had time to build them.

AI removes that limit. When building is cheap, the value moves to knowing what to build. Initiative, curiosity, and good judgment start to matter more than typing speed. I think these people will be the ones who stand out in the next few years.

## The real shift

Code is becoming a byproduct. It still matters that it works, but how it looks matters less and less.

The value moves from _how_ to write code to _what_ to build and _how to prove_ it works. Write tests. Plan well. Learn many tools a little and the ideas behind them a lot. And if you've always been the person with ideas, this is your time.
