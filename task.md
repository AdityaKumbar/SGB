# SBG BCA College Website - Task Tracker

## Completed Tasks
- [x] Integrate with GitHub remote repository (`AdityaKumbar/SGB`).
- [x] Clean up repository (remove redundant `components/navbar.html` and `footer.html`).
- [x] Configure global modern typography (Google Fonts: Poppins for headings, Inter for body).
- [x] Complete Navbar functionality and styling:
  - [x] Extracted navigation logic to `assets/js/navbar.js`.
  - [x] Implemented responsive hamburger toggle for mobile devices.
  - [x] Implemented dropdown functionality tailored for desktop (hover) and mobile (tap/toggle).
  - [x] Improved navigation link spacing and transitions.
  - [x] Sticky scroll effect added.
- [x] Fix Logo integration:
  - [x] Added properly scaled and styled logo image (`components/images/logo.png`) to Navbar.
  - [x] Applied logo image to Footer with dynamic dark mode inversion support.
  - [x] Removed overlapping logo title text (`.nav-logo-text`) to create a cleaner header as requested.
  - [x] Updated the website favicon to use the college logo.

## To-Do List (Pending Tasks)
- [ ] Implement inner individual pages (e.g., `about.html`, `programs.html`, `facilities.html`, `gallery.html`, `contact.html`).
- [ ] Enhance homepage assets (update placeholder images with real campus/college photos).
- [ ] Connect/Add functional logic for the `contact.html` form submission.
- [ ] Review mobile layout on all inner and new sections to assure mobile responsiveness.

## Notes
- Navbar scripts and styles are fully separated: `assets/js/navbar.js` and `assets/css/navbar.css`.
- Core application styles (colors, fonts, variables) are defined in `assets/css/style.css`.
- The logo is currently pointing to `components/images/logo.png`.
