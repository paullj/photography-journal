# To Do List

- Build basic routes;
  - [x] /: feed
  - [x] /new: new post
  - [x] /@[user]: user page
  - [x] /@[user]/[id]: post page
	  - [ ] add realtime to this page
			- Potentially blocked by this https://github.com/supabase/realtime/issues/284
	  - [x] add lightbox

- new post
	- [x] extract metadata
  - [x] look up what to do with metadata and all that
  - [x] each picture needs a caption, alt text, camera metadata and 
	- [ ] refactor to share components with edit
	- [ ] drag and drop to upload image 
	- [ ] drag to rearrange

- then get feed working / masonry component
	- [x] api for getting feed
		- [ ] add params for pagination
	- [ ] fix height issue
	- [x] api for getting user page

- onboarding
  - [x] set username
  - [x] set name 
	- [ ] set profile picture
	- [ ] set bio
  - [ ] set social links?
		- instagram
		- website

- dark mode
- lazy load images and load different resolutions

## Bugs
- redirect to welcome page when login