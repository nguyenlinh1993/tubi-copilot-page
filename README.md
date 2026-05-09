# 🤖 Tubi Copilot — Landing Page

A clean, data-driven landing page for **Tubi Copilot**, an AI-powered chat assistant plugin for IntelliJ IDEA. All content (product info, features, and releases) is managed through a single `config.json` file — no build tools or frameworks required.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [Features](#features)
- [Customisation](#customisation)
- [Browser Support](#browser-support)
- [License](#license)

---

## Overview

This is a fully static, single-page website built with plain **HTML**, **CSS**, and **vanilla JavaScript**. It serves as the official download and information hub for the Tubi Copilot IntelliJ IDEA plugin. The page includes:

- A hero section with an interactive IDE mockup
- A feature highlights grid
- A release history table with status badges and download links
- A setup guide call-to-action
- A contact section for internal team members

---

## Project Structure

```
tubi-copilot-page/
├── index.html      # Main HTML page (structure & markup)
├── style.css       # All styles (dark theme, layout, animations)
├── app.js          # Vanilla JS — loads config and populates the page
└── config.json     # Content configuration (product info, links, releases)
```

> ⚠️ There are **no build steps**, no `node_modules`, and no dependencies to install.

---

## Getting Started

Because the page uses `fetch()` to load `config.json`, you need to serve it over HTTP rather than opening `index.html` directly from the file system (browsers block local `fetch` requests by default).

### Option 1 — VS Code Live Server

1. Install the **Live Server** extension in VS Code.
2. Right-click `index.html` and select **"Open with Live Server"**.

### Option 2 — Python HTTP Server

```bash
# Python 3
python -m http.server 8080
```

Then open `http://localhost:8080` in your browser.

### Option 3 — Node.js `serve`

```bash
npx serve .
```

---

## Configuration

All page content is controlled by **`config.json`**. You do not need to touch `index.html` or `app.js` for routine content updates.

### `product`

| Field         | Type     | Description                                      |
|---------------|----------|--------------------------------------------------|
| `name`        | `string` | Product name displayed throughout the page       |
| `tagline`     | `string` | Short tagline shown in the hero section          |
| `description` | `string` | Longer description (used in meta / future use)   |
| `features`    | `array`  | List of feature cards (see below)                |

**Feature object:**

```json
{
  "icon": "💬",
  "title": "Smart Chat Assistant",
  "description": "A brief explanation of this feature."
}
```

### `links`

| Field        | Description                                      |
|--------------|--------------------------------------------------|
| `setupGuide` | URL for the "Setup Guide" button                 |
| `contact`    | URL for the "Contact Info" button                |

### `releases`

Each entry in the `releases` array represents one plugin version:

| Field            | Type     | Description                                               |
|------------------|----------|-----------------------------------------------------------|
| `version`        | `string` | Semantic version number (e.g. `"1.0.0"`)                  |
| `releaseDate`    | `string` | ISO date string (`"YYYY-MM-DD"`)                          |
| `eofDate`        | `string` | End-of-life date (`"YYYY-MM-DD"`), or omit if not set     |
| `status`         | `string` | `"active"`, `"lts"`, or `"eol"`                           |
| `releaseNoteUrl` | `string` | Link to the release notes document                        |
| `downloadUrl`    | `string` | Direct download link for the `.zip` plugin archive        |
| `highlights`     | `string` | Short summary of what's new (reserved for future display) |

Releases are automatically **sorted by date** (newest first) on the page.

---

## Features

| Feature                        | Details                                                                 |
|--------------------------------|-------------------------------------------------------------------------|
| 🎨 Dark theme                  | Deep black background with pink–violet gradient accents                 |
| 📱 Fully responsive            | Adapts gracefully to mobile, tablet, and desktop screens                |
| ⚡ Zero dependencies           | No frameworks, no bundlers — just HTML, CSS, and JS                     |
| 🔄 Data-driven content         | Update everything by editing `config.json` only                         |
| 👁 Scroll animations           | Elements fade in as they enter the viewport (Intersection Observer API) |
| 🔗 Active nav highlighting     | Navigation links highlight to reflect the current visible section       |
| 🏷 Release status badges       | Colour-coded **Active**, **LTS**, and **End of Life** labels            |
| 🔒 XSS-safe rendering          | All dynamic content is HTML-escaped before insertion into the DOM       |

---

## Customisation

### Changing the colour palette

All CSS custom properties (variables) are declared in the `:root` block at the top of `style.css`:

```css
:root {
  --pink:   #f72585;
  --violet: #7b2ff7;
  /* ... */
}
```

Adjust `--pink` and `--violet` to rebrand the page with a different colour scheme.

### Adding a new feature card

Open `config.json` and append an object to the `product.features` array:

```json
{
  "icon": "🚀",
  "title": "Your Feature Title",
  "description": "A short description of what this feature does."
}
```

### Adding a new release

Append an entry to the `releases` array in `config.json`:

```json
{
  "version": "1.1.0",
  "releaseDate": "2026-06-01",
  "eofDate": null,
  "status": "active",
  "releaseNoteUrl": "https://...",
  "downloadUrl": "https://...",
  "highlights": "Bug fixes and performance improvements."
}
```

---

## Browser Support

This page uses modern web APIs including `fetch`, CSS custom properties, CSS Grid, and the Intersection Observer API. It is supported in all evergreen browsers:

| Browser        | Minimum version |
|----------------|-----------------|
| Chrome         | 61+             |
| Firefox        | 60+             |
| Edge           | 79+             |
| Safari         | 12.1+           |

> Internet Explorer is **not** supported.

---

## License

Internal use only. © 2026 Tubi Copilot Team. All rights reserved.

