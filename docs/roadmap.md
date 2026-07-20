# Roadmap — Future Features & Architecture Notes

> This is a living document. Everything listed here is aspirational — do not implement unless explicitly requested.

## Planned (Post-Migration)

- **Booking information page**: Show packages clearly. No direct booking or payment.
- **Google Calendar invite flow**: Option on contact/booking page to schedule a meeting. Calendar link or API integration.
- **Optional IoT / personal server integrations**: Separate routes or modules, without polluting the core photography UX.

## Architecture Notes for Future Expansion

- Layout and components should remain modular enough to add pages without restructuring.
- Keep `components/layout/`, `components/gallery/`, and `components/ui/` separate concerns.
- Any authenticated section should have its own route guard mechanism (consider `server/middleware/` if needed).

## Explicitly Out of Scope

- Client portal
- Payment processing
- Full booking system with payments
- IoT dashboards
- Authenticated sections
