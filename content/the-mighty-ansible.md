---
title: The Mighty Ansible
description: I've always been fascinated by automated provisioning tools, but I often found them needlessly complicated. However, my perspective changed completely when I heard about Ansible...
createdAt: 2017-05-02
tags:
  - ansible
  - devops
---

I've always been fascinated by automated provisioning tools, but I often found them needlessly complicated. However, my perspective changed completely when a [friend](https://www.linkedin.com/in/djordjeparovic/) took just five minutes to explain how [Ansible](https://www.ansible.com/) works and how straightforward it is to set up a new project.

## What are Automated Provisioning Tools?

Think of automated provisioning tools as your personal IT assistant. They help you set up and manage multiple servers automatically, saving you from the tedious task of manually configuring each server one by one. Instead of logging into hundreds of machines individually, tools like Ansible do the heavy lifting for you, setting up everything simultaneously.

## Ansible: Simplicity and Efficiency Combined

Ansible's magic lies in its simplicity. It uses SSH to connect to your servers and runs your specified tasks – no complicated setup needed! What makes it special is that it uses Python, which comes pre-installed on most systems, making it a "zero-installation" solution for your target machines. After completing its tasks, Ansible cleans up automatically, leaving your servers pristine.

One of Ansible's best features is its use of simple YAML files to define tasks. These files are just plain text, making them perfect for version control with Git. This means you can track every change made to your server configurations, just like you would with regular code.

## Getting Started

Starting with Ansible is surprisingly easy! Install it on your computer and use Vagrant to create virtual machines for practice. This setup lets you build and test your infrastructure locally before deploying to real servers – just change the IP addresses in your config file when you're ready to go live.

While there are many tutorials available, here are some essential resources to begin your Ansible journey:

- [Ansible Docs](https://docs.ansible.com)
- [Ansible Galaxy (community-created tasks)](https://galaxy.ansible.com)
- [Simple Ansible examples](https://github.com/ansible/ansible-examples)
