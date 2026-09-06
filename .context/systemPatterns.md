# System Patterns & Architectural Guidelines

## Technology Stack
- Next.js (App Router)
- React
- Tailwind CSS
- Lucide React Icons
- Framer Motion

## Data Layer Conventions
- Static council data, events, and newsletters are centralized in `lib/data.js`.
- Team members are grouped by tenure/year under `teamMembersByYear` and categorized by department (`Secretaries`, `Women's Wing`, `Events & Operations`, `Tech & Analytics`, `PR & Outreach`, `Design & Media`).
- Photos are managed with remote CDN/ImageKit URLs or local asset imports.

## Component Patterns
- `components/teamMembers.jsx` provides interactive 3D Cover Flow and department filtering for the council.
- `app/team/page.jsx` contains the cinematic team archives and page structure.
