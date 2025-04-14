---
title: Thoughts on CSS Frameworks
description: Developers often use Foundation or Bootstrap without understanding the output of their CSS code. Let me explain my perspective on these frameworks, their flaws, and when it's appropriate to use them...
createdAt: 2014-09-23
tags:
  - css
---

In the realm of web development, CSS frameworks like Foundation and Bootstrap have gained immense popularity. However, it is important to critically examine their usage and understand their drawbacks. In this blog post, I will share my perspective on CSS frameworks, highlight their flaws, and discuss situations where they can be beneficial.

## Learning: The Bootstrap Syndrome

One common trend among newcomers and junior developers is what I like to call the "Bootstrap Syndrome." Often, they first delve into using frameworks like Bootstrap and Foundation before gaining a solid understanding of core CSS concepts. To illustrate this point, my friend humorously compares it to giving a fire hose to a kid and turning on the water.

While frameworks can be valuable for learning, it's essential to prioritize understanding the underlying principles of CSS. By using frameworks, you can grasp helpful techniques like image replacement and grid setups. These frameworks introduce smart concepts that can enhance your CSS skills.

## Performance

Let's address the elephant in the room. CSS frameworks are undeniably hefty. Consider the examples of Bootstrap, which weighs around 100kb when minified, and Foundation, which comes in at approximately 115kb. Although you can cherry-pick specific components, many developers are unaware of the inner workings of the included grid system. In truth, most wouldn't utilize it if they possessed a deeper understanding of CSS grid concepts. Before incorporating a framework, it's worth asking yourself if your design truly necessitates a grid structure or if a more tailored solution would suffice. Don't overlook the simplicity of creating your own grid, as explained in this helpful [guide](https://css-tricks.com/dont-overthink-it-grids/).

## When to Utilize CSS Frameworks

While CSS frameworks have their downsides, there are situations where they prove useful. They shine in scenarios involving wireframes, presentations, or the creation of admin panels. For developers who aren't extensively acquainted with CSS, frameworks can expedite the layout creation process.

## Embracing Boilerplates

In a nutshell, consider embracing boilerplates as an alternative approach. Craft your starter folder or boilerplate, equipped with a personal collection of frequently used mixins and styles. By starting from scratch rather than relying on extensive pre-written code, you'll have a leaner foundation tailored precisely to your project's needs.

## Conclusion

To conclude, Bootstrap and Foundation are undeniably excellent resources, and studying their code can be enlightening. However, it's important to exercise caution and avoid a one-size-fits-all mentality. In most cases, you likely won't require the full extent of these frameworks. So, be mindful of their weight and explore alternatives that allow you to strike a balance between convenience and efficiency.

Remember, CSS frameworks are valuable tools, but they should not be your default choice for every project. Aim to be discerning, leverage your growing CSS expertise, and use frameworks judiciously to enhance your development process.
