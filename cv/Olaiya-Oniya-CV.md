# Olaiya Joseph Oniya

**Full-Stack Software Engineer & Founder · Lagos, Nigeria**

[oniya.olaiya@tagrider.com](mailto:oniya.olaiya@tagrider.com) · [github.com/OlaiyaO](https://github.com/OlaiyaO) · [linkedin.com/in/oniya-joseph](https://www.linkedin.com/in/oniya-joseph-3721b9186/) · [tagrider.com](https://tagrider.com)

---

## Summary

Founder of Tag-Along Ltd (TagRides) — a Lagos-based ride-sharing platform built solo from infrastructure to mobile app. Production-grade distributed systems engineer working in Go, Flutter, and TypeScript across the full stack: 9 microservices, real-time MQTT location pipelines, payment integrations, native multi-platform clients, marketing sites, and AI infrastructure.

Currently selected for **Microsoft for Startups Founders Hub**, **Google for Startups**, and engaging with the **AWS Startups** team on cloud architecture and credits. Tony Elumelu Foundation alumnus and ALX Software Engineering & Ventures graduate. Available for senior contract engagements, AI/ML training data work, and high-trust freelance projects.

---

## Selected Programs & Recognitions

| Program | Status |
|---|---|
| **Microsoft for Startups — Founders Hub** | Active member |
| **Google for Startups** | Program participant |
| **AWS Startups** | Active architecture engagement; in process for AWS Activate credit allocation |
| **Tony Elumelu Foundation (TEF)** | Entrepreneurship Programme alumnus |
| **ALX** | Software Engineering Foundation, Backend specialization, ALX Ventures alumnus |

---

## Selected Work

### Tag-Along Ltd / TagRides — Founder & Lead Engineer
**2025 – Present · Lagos, Nigeria**

Lagos-targeted route-shared mobility platform. Designed, built, and deployed solo across backend, mobile, web, and infrastructure.

- Architected **9 production Go microservices** behind a Kong API gateway: `auth`, `driver`, `geolocation`, `orchestrator`, `notification`, `rating`, `wallet`, `analytics`, `admin` — plus an `init` bootstrap service and a `simulator` for load testing the matching algorithm without live drivers.
- Built **real-time location pipelines** over MQTT (EMQX broker) and Kafka, with Tile38 for geospatial proximity queries and PostGIS + OSRM + Valhalla for routing.
- Engineered a **clean-architecture Flutter app** (Android, iOS, Web) across **575 Dart files and 38 screens**: BLoC state management, MQTT5 streaming, Google Maps with custom marker pipelines, Paystack payments, Firebase auth, Google Sign-In with custom web platform-view shim.
- Wrote a complete brand system (`BRAND.md`) — color tokens, type scale, lockups, OG image generation — codified across the Flutter theme and Next.js 16 marketing site so app and web feel like one product.
- Delivered Lighthouse 90+ on the marketing site with Next.js 16, React 19, Tailwind 4, Motion v12, and Lottie.

### Tag-Along LLM Proxy (`ai.tagrider.com`) — Solo Build, 48-hour Sprint
**2026 · Lagos**

Multi-tenant LLM API gateway reselling Azure AI Foundry capacity through virtual keys.

- LiteLLM + Postgres in Docker, behind Nginx with automated Let's Encrypt certificate rotation. Public HTTPS endpoint at `ai.tagrider.com`.
- Per-buyer virtual keys with model allowlists, daily-resetting budgets, and spend-tracking across Anthropic + OpenAI model families.
- Diagnosed and patched upstream API edge cases at the nginx layer (header stripping for `anthropic-beta` headers Foundry rejected) to maintain compatibility with Cline, Claude Code, and Cursor.
- Onboarded two paying-prospect keys within 48 hours of public launch.

### `tagrider.com` — Marketing Site for TagRides
**2026 · Lagos**

Editorial Next.js 16 landing page with Motion v12, Lottie, ECharts-GL, and Cobe. Brand system reproduced verbatim from the Flutter `AppColors` so the app and marketing site read as one product.

---

## Skills

**Languages.** Go (primary backend), Dart, TypeScript / JavaScript, Python, SQL, Bash.

**Backend & infrastructure.** Fiber, gRPC, REST. Kafka, RabbitMQ, MQTT (EMQX). Postgres, PostGIS, GORM, pgx, MySQL. Redis, Tile38. Kong gateway. Docker Compose, systemd. Nginx, Let's Encrypt, Cloudflare DNS.

**Mobile.** Flutter (clean architecture, BLoC, go_router), platform-view interop for Web, native iOS / Android pipelines.

**Web frontend.** Next.js 14 / 15 / 16, React 19, Tailwind 3 / 4, Motion / Framer Motion, Three.js, GSAP, Lenis.

**Integrations.** Paystack, Stripe, Twilio, Mailgun, Firebase (Auth + Cloud Messaging), Google Maps, OSRM, Valhalla, Cloudinary, OpenAI, Anthropic, Azure AI Foundry, LiteLLM.

**Practices.** Domain-driven design. End-to-end ownership (architecture → code → infra → deployment → observability). Solo shipping production systems on tight timelines.

---

## Education

**Federal University of Technology, Minna (FUTMinna)** — Nigeria
Degree program completed.

**ALX Africa**
- Software Engineering Foundation Programme
- Backend Specialization
- ALX Ventures

**Tony Elumelu Foundation**
- Entrepreneurship Programme

---

## What I'm Looking For

Senior contract or full-time remote engineering engagements where a single engineer with depth in distributed systems, mobile, and infrastructure can outpace a coordinated team of specialists. Available for AI/ML training data work (Mercor, Outlier, Shipd), startup MVP builds (4–8 week sprints), and ongoing CTO-for-hire arrangements.

---

*References, code samples, and TagRides system architecture diagrams available on request.*
