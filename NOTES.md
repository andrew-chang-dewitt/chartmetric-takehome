# Notes

A quick and unorganized file for keeping notes as I work.
Intended to show some of my process as well as act as a record of time spent on the assignment.

## Mon May 24 00:35:07 2021 -0400

Couldn't sleep after taking a test for an online class, so started working on this take home assignment.
After reading the instructions, chose option 2: building a server to serve data from supplied CSV.
Choosing to do this in Typescript with NodeJS/Express since it's one of my most comfortable setups & the job description mentions NodeJS.
Bootstrapped server from my own typescript-express seed project template on GitHub, then made a few updates as I haven't used the template recently.

## Mon May 24 01:30:00 2021 -0400

Stopping work for now—will resume in the morning.

## Mon May 24 08:30:00 2021 -0400

Resuming work.
Started writing function to parse given CSV & return as JS object, then added route `/data` to fetch the entire object.
Then added route `/content/:account_id` to fetch the `content` field for any row matching the given `account_id`; if no match is found, it returns `404`.
Spent some time examining the actual data on this second route to understand it & look for a better way to organize the API.

## Mon May 24 10:00:00 2021 -0400

Looks like each row contains a report of Instagram data on a different account.
There's a lot of uniformity between the content in each row's `content` field, should make it easier to have a more descriptive API.
Starting by reorganizing the `/content` route to a few routes starting with `/account/:id`, such as `.../report_info` & `.../user_profile`.

Added ability to drill down into a single account when giving it's `:id`. 
Can now GET the following fields on a given `/account/:id`:

- `./content/report_info`
- `./content/user_profile`
- `./content/extra`
- `./content/audience`
- `./content/audience/likers`
- `./content/audience/followers`
- `./content/audience/commenters`
- `./meta` (the timestamps at the same level as `content`)

Additionally renamed `/raw-data` to `/account/all` for a more consistent API.

## Mon May 24 11:00:00 2021 -0400

Break for lunch.

## Mon May 24 12:30:00 2021 -0400

Added simple `/search/:query` route. 
Would like to have data in PostgreSQL or Mongo to allow for more powerful searches w/out reinventing the wheel by indexing the data myself in TS, but don't feel it is a good use of time to dive into setting up a whole database to package with this project right now.
Instead, search route only checks to see if `:query` is contained in either `account.content.user_profile.username` or `account.content.user_profile.fullname`, then returns an array containing any account that matches.

## Mon May 24 1:30:00 2021 -0400

Calling it done enough. Writing a quick readme & removing unused dependencies still in package.json from my template repo before pushing to GH & zipping source.
