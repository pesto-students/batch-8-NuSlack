
## batch-8-NuSlack
**Description** `v1.0.0` The mono repo contains backend and frontend service for NuSlack Project.

**Node Version:** `8.9.*`

**React Version:** `16.*`

### Project Specs
- [Notion](https://www.notion.so/pesto/Batch-8-Project-Specs-33ef6ae26565459f98771b95c7f0cecd)


### Content
* [Instructions](#instructions)
* [Issue Guidlines](#issue-guidelines)
* [Git Branch Guidelines](#git-branch-guidelines)
* [Git Commit Guidelines](#git-commit-guidelines)
* [Git PR Guidelines](#git-pr-guidelines)
* [Development Setup](#development-setup)
* [Unit Testing](#unit-testing)
* [FAQ](#faq)
* [Third party libraries](#third-party-libraries)
* [Team Details](#team-details)


### Instructions
- Please create a issue first and then attach that issue to the PR, so that every one know what’s the need of the PR. Attaching issues to the PR using github keywords, will close the issues once the PR is merged. More info [here]((https://help.github.com/en/articles/closing-issues-using-keywords)).

- Please follow a common git commit style guide. Somewhat similar to [this guide](https://udacity.github.io/git-styleguide/)

- All PRs should be [Rebase And Merged](https://help.github.com/en/articles/about-pull-request-merges#rebase-and-merge-your-pull-request-commits)

### Issue Guidelines
- Always add label to created Issue. For example, `README` for readme update Issue, `USER-API` for Issue related to user api work. More examples : `FIX`, `BUG`, `HOTFIX` labels.

- Add default project `batch-8-NuSlack` to each of the Issue, so that it can be tracked in Projects Section. New Issue will be added as `Open` Issue in project.

### Git Branch Guidelines
- Create your own separate branch to work on new module or issue.
- Suggested branch name format is `username/label/#issue-id/goal-of-branch`.
- Checkout branch from `master` branch.
- To update branch from `master`, update master branch first, then in your branch run `git rebase master`.

### Git Commit Guidelines
Please follow below git commit format:
```git
feat: subject of the commit in max 50 characters

description of the commit

Resolves: #issue-id
```
- Note one empty line after subject, and then again after description

### Git PR Guidelines
- Rebase your branch before creating PR.
- Add label and project to your PR. 
- Add same Label that you tagged in Issue.
- Follow `PR Template`, and fill all the details required.
- Make sure to add issue id in PR to auto resolve the issue.

### Development Setup
- Clone repo
- `cd batch-8-NuSlack`
- Install root packages : `yarn`
- Install packages for client and server : `yarn setup`
- Start both client and server : `yarn start`

### Unit Testing
- Testing is not setup yet.

### FAQ
#### How to run eslint, prettier and commitlint?
These are not configured yet. Will be added in next PR.
Once setup, all lintings will run before commiting your code. `Commitlint` will enforce proper commit format.

### Third party libraries
* **express**: https://www.npmjs.com/package/express - Fast, unopinionated, minimalist web framework
* **dotenv**: https://www.npmjs.com/package/dotenv - Loads environment variables from .env file
* **path**: https://www.npmjs.com/package/path - Node.JS path module
* **concurrently**: https://www.npmjs.com/package/concurrently - Run multiple commands concurrently

### Team Details
#### Team Name : NuSlack 
#### Team Members
* Jaspreet Singh - [jaspreet57](https://github.com/jaspreet57)
* Abhinav Sharma - [abhi18av](https://github.com/abhi18av)
* Saurabh Shetty - [rollaball](https://github.com/rollaball)
* Prateek Madaan - [prateekinstillion](https://github.com/prateekinstillion)
* Abdul Khuddus - [khuddus](https://github.com/khuddus)
