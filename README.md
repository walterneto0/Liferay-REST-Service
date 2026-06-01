# Liferay REST Service

A simple web interface for consuming Liferay's Headless REST API, built as part of the **JavaScript module** of Liferay's Basic Training program.

## Why this exists

This project was created to fulfill an exercise from Liferay's Basic Training, specifically the JavaScript section. The goal was to interact with Liferay's Headless Delivery API through a browser-based client — performing GET and POST requests to blog posting endpoints with Basic Authentication.

Rather than building a bare-bones form, I took the opportunity to make something that actually looks good.

## Creative process

The **HTML and CSS** were generated with the help of AI, with small adjustments on my end — mostly layout fixes, text content, and tweaks to make things fit the way I wanted.

The **JavaScript was written entirely by me.** This includes:

- Reading user inputs at request time (not on page load)
- Building the Basic Auth header with `btoa()`
- Implementing `GET` and `POST` fetch functions
- Toggling the active method state on the buttons
- Validating that all fields are filled before sending
- Rendering the JSON response inside the output box

## How to run

1. Start a Liferay instance via Docker:
   ```
   docker run -it -m 8g -p 8080:8080 liferay/portal:7.4.3.132-ga132
   ```
2. Enable CORS in Liferay: **Control Panel → System Settings → Security Tools → Portal Cross-Origin Resource Sharing (CORS)**
3. Add a new configuration entry with the URL pattern `/o/headless-delivery/*`
4. Open `index.html` in your browser and send requests