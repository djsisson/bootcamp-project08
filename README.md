Build a comment form
Overview
You've built a simple blog, your task now is to embellish it. Use database relationships to add a comments table. Add categories and tags to your posts. Add a form to create new comments. Add an edit page that populates the form with the post data and allows you save changes to the database.

You can use Vercel Postgres or Supabase, so long as Postgres is the database.

User Stories
🐿️ As a user, I want to browse a list of posts, sortable by ascending or descending order
🐿️ As a user, I want to see a list of categories, and click on a category to see a list of posts in that category
🐿️ As a user, I want to be able to leave a comment sharing my thoughts on each post

Completed the above goals, using hashtags instead of categories

Stretch Goals

allow categorisation at creation time using hashtags, can view all posts for a given hastag using search on teh side, im not sure if this counts

Allow Edit post.. can only edit your own post

Allow delete post... again can only delete your own post

Allow edit comment, can only edit own comments on posts


This experience was incredibly frustrating, i had no end of caching issues, at one point i had wiped my db, but could still see everything in it, also would randomly get fetch failures due to caching, in the end i switched to revalidate = 0 to force each page to revalidate everytime.
some of teh next js docs were describing features that aren't even in release yet but didn't say anywhere (useformactions)
i switched to normal sql, and although i got it in the end, i can def see the appeal of using an orm
I needed way more time with tailwind, i can see the appeal, but need a lot more practice
Same with Next js, the server/client component model, feels like it has made it much harder.. i honestly feel like im going backwards these past couple of weeks

