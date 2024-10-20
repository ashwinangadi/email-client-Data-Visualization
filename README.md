# Email Client App and Interactive Data Visualization Dashboard

This repository contains two completed assignments:

1. **Email Client App (Moonshot Q1)**
2. **Interactive Data Visualization Dashboard (Moonshot Q2)**


Both projects (Email Client App and Interactive Data Visualization Dashboard) are deployed under the same link:

[https://moonshot-assignment-email-client-and-data-viz.vercel.app/](https://moonshot-assignment-email-client-and-data-viz.vercel.app/)

You can access both applications from this single deployment.


## Assignment 1: Email Client App (Moonshot Q1)

This project is an email client application inspired by Outlook. The app fetches emails via provided APIs and offers comprehensive functionality for managing and interacting with emails.

### Features:

1. **Email List View**:
   - Displays a list of emails with detailed information
   - Information includes: sender name, email subject, snippet of email body, date received
   - Visually distinguishes between read and unread emails

2. **Email Body View**:
   - Implements a split-screen layout for simultaneous email list and body viewing
   - Fetches and displays the full email body when an email is selected
   - Renders HTML content safely, ensuring proper formatting 

3. **Favorite Email Management**:
   - Allows users to mark/unmark emails as favorites
   - Provides a visual indicator for favorite emails in the list view
   - Implements a separate filter for viewing only favorite emails

4. **Read/Unread Email Handling**:
   - Automatically marks emails as read when opened
   - Allows manual toggling of read/unread status
   - Applies distinct styling to differentiate read and unread emails in the list view

5. **Pagination and Infinite Scrolling**:
   - Supports pagination of email lists for large datasets
   - Implements server-side pagination for efficient data loading

6. **Persistent Storage for User Preferences**:
   - Utilizes browser's local storage for saving user preferences
   - Persists email read/unread status across sessions
   - Maintains a list of favorite emails even after browser closure

7. **Responsive Design**:
   - Ensures optimal viewing and interaction experience across various devices
   - Adapts layout for desktop, tablet, and mobile screens

8. **Performance Optimization**:
    - Implements server-side fetching and rendering for faster initial page load
    - Uses caching mechanisms to store frequently accessed data
    - Optimizes API calls to minimize data transfer and improve response times

### Tech Stack:
- Frontend: Nextjs, TailwindCSS, Typescript
- Backend API: Flipkart Email Mock API

### APIs used:
- Email List: https://flipkart-email-mock.now.sh/
- Email Body: https://flipkart-email-mock.now.sh/?id=<email-item-id>


# Assignment 2: Interactive Data Visualization Dashboard (Moonshot Q2)

This project is a comprehensive Full Stack web application designed to provide interactive data visualizations for product analytics. It offers a rich set of features to analyze and interpret product usage data effectively. The application includes a robust authentication system, ensuring secure access to personalized analytics. User-specific filter preferences and settings are managed through cookies, which are tied to individual user accounts, providing a tailored and persistent experience across sessions.

## Key Features:

1. **Data Visualization Components:**
   - **Bar Chart:**
     - Visualizes time spent on various product features
     - Allows for quick comparison between different features
     - Interactive: clicking on a bar updates the line chart
   - **Line Chart:**
     - Displays time trends for specific categories
     - Includes pan and zoom functionality for detailed analysis
     - Updates dynamically based on bar chart selection

2. **Advanced Filtering Capabilities:**
   - **Age Range Filter:**
     - Allows users to filter data by specific age groups
     - Helps in analyzing product usage across different age demographics
   - **Gender Filter:**
     - Enables filtering of data based on gender
     - Useful for understanding gender-specific usage patterns

3. **Date Range Selector:**
   - Allows users to choose a specific time range for analytics
   - Provides flexibility in analyzing data over custom time periods
   - Implemented using a user-friendly calendar interface

4. **User Preference Management:**
   - **Cookie-based Storage:**
     - Saves user preferences (filters, date range, selected category) in cookies
     - Ensures a persistent and personalized experience across sessions
   - **User-specific Cookies:**
     - Ties preferences to individual user accounts
     - Allows for multi-user support on shared devices
   - **Automatic Preference Application:**
     - Applies saved preferences on subsequent visits
     - Provides seamless continuation of analysis from previous sessions

5. **User Authentication System:**
   - Provides secure login and signup functionality
   - Includes a logout feature for session management
   - Enhances data privacy and enables user-specific analytics

6. **Responsive Design:**
   - Optimized for various devices: desktops, tablets, and mobile phones
   - Ensures a consistent user experience across different screen sizes

7. **URL Sharing Functionality:**
   - Allows users to share filtered and date-selected chart views via URL
   - Facilitates easy collaboration and sharing of insights

8. **Real-time Data Updates:**
   - Charts and filters update dynamically without page reloads
   - Provides a smooth and interactive user experience

This application combines powerful data visualization tools with user-friendly interfaces, making it an ideal solution for product managers, analysts, and stakeholders to gain valuable insights into product usage patterns and trends.

## Tech Stack

- **Frontend:**
  - Next.js
  - Tailwind CSS
  - Shadcn UI
  - Zod
  - react-hook-form
  - radix-ui
  - recharts

- **Backend:**
  - Custom API integration for dataset processing and filtering

- **Authentication:**
  - Basic user authentication with session management and cookies by Auth.js

- **Data Storage:**
  - MongoDB for storing user data and preferences
  - Mongoose as the ODM

- **Cookies:**
  - Manages temporary user preferences using cookies


# Instructions to run the project

## Install dependencies
```bash
npm install
```

## Run the development server:
```bash
npm run dev
```
## Build for production:
```bash
npm run build
```
## Start the production server:
```bash
npm run start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.
