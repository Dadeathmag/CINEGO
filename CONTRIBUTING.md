# Contributing to CineGo

First off, thank you for considering contributing to CineGo! It's people like you that make CineGo a great tool.

## Where do I go from here?

If you've noticed a bug or have a question, [search the issue tracker](https://github.com/search?q=repo) to see if someone else in the community has already created a ticket. If not, go ahead and [make one](https://github.com/issues/new)!

## Setting up your environment

1. Fork the repository on GitHub.
2. Clone your forked repository to your local machine.
3. Install the dependencies using `npm install` inside the `backend` folder.
4. Copy the `.env.example` file to create a `.env` file and insert your TMDB API keys for local testing.
5. Create a new branch for your feature or bug fix: `git checkout -b your-branch-name`.

## Making Changes

* Create commits that are logical units of work.
* Check for unnecessary whitespace with `git diff --check` before committing.
* Make sure your commit messages are descriptive and explain the "why" and "what" of the change.

## Submitting a Pull Request

1. Push your changes to your fork on GitHub: `git push origin your-branch-name`.
2. Submit a pull request against the `main` branch of the original repository.
3. Ensure the PR description clearly describes the problem and solution. Include the relevant issue number if applicable.

## Safety & Security

* **Never commit API Keys or Secrets.** Ensure that any testing API keys you use remain in your `.env` file and are never pushed to the repository. 
* Avoid committing raw `.sqlite` database files containing testing data, unless they are specifically intended for sample data seeding.

Thank you for contributing!
