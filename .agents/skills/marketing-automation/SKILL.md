---
name: marketing-automation
description: Design or implement consent-aware lead capture and marketing workflows while verifying the available infrastructure and keeping external communications disabled unless explicitly authorized.
---

# Marketing Automation

Start by identifying the user's goal, data collected, existing forms/services, and actual email, database, and automation infrastructure. Do not assume a free tier, provider, credentials, or working backend exists.

Collect only information needed for the stated purpose. Separate permission to answer an inquiry from consent to receive marketing. Where marketing messages are implemented, preserve consent records and provide a usable unsubscribe path. Validate inputs, expose clear success/error states, and prevent spam without making privacy promises the system cannot keep.

Build and test locally first. Do not import contacts, send messages, start campaigns, connect services, incur costs, or publish/deploy without the user's explicit authorization for that action. If delivery or persistent storage is unavailable, describe the limitation and implement only a clearly labeled, functional local alternative; never simulate a successful external send.
