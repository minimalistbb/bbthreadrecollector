Lately, I have been reading many threads using the search function with different keywords. I came across a problem: I noticed that I was reading the same threads repeatedly, but I only realized this when I was halfway through the post. So, I decided to write a browser extension that would tell me when I have already read a thread.

Perhaps this could be useful for others as well, so I decided to publish it.

**How it works:**

**In threads:**

![In threads](https://i.ibb.co/xG89RxG/Screenshot-from-2024-04-20-10-35-08.png)

**In search results:**

![In search results](https://i.ibb.co/yFM2pcy/Screenshot-from-2024-04-20-10-37-48.png)

**It's all done automatically. When you visit a thread, it will be stored in your browser's local storage indefinitely, and you will always see the above messages.**

**Other options:**

![Other options](https://i.ibb.co/5MYYc78/Screenshot-from-2024-04-20-10-39-39.png)


**Import:** To import a list of threads (by id). Useful to pass threads across browsers or devices.
**Export:** Download the list of current readed threads to import them elsewhere.
**Clear Thread List:** Clear the current list of threads stored in the browser.

**Download and Install:**

**Firefox:**
You can install it from the addons mozilla store here: https://addons.mozilla.org/it/firefox/addon/bbforum-thread-recollector/

It works on mobile too.

**Chrome/Brave:**
For chrome, as the upload to store is behind a paywall you will nedd to download the .zip version here: https://www.mediafire.com/file/3chw8s246f8mwaf/chrome-brave-dist.zip/file

- Exctract the zip file
- Go to chrome://extensions/
- Enable developer mode in the top right corner of the page
- Click "Load Unpacked" in the top left corner
- Navigate to the unzipped folder on the extension and upload it

Chrome and brave doesn't support mobile extensions so it can't be used there.

**Notes:**

Let me know if you find any bug or unhandled error.
If you have any feature suggestion write it in this thread: https://www.badbreathhalitosis.com/phpBB2/viewtopic.php?t=8101

*For javascript developers that will read the code: I'm sorry guys I wrote it in like 2/3 hours and I've (almost) never used js before so the code is probably bad.*
