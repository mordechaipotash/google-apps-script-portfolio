# Google Apps Script Portfolio — 41 Production Scripts

> "I don't want to do two steps, just give me a script that can straight away work."
> — **2025-01** | Download YouTube Videos Mac | chatgpt

That's the philosophy. Automate everything. No manual steps.

---

## The Problem

> "it needs to work with google sheets i need my team to dump a new sheet in and then i want to automatically process it"
> — **2024-01** | Free CSV Data Tools | chatgpt

Real work. Real data. Real deadlines. The team dumps data in, the script handles the rest.

---

## The Work

### Data Reconciliation Engine

> "the key is really {client_id}_{ssn}"
> — **2024-08** | Discussing New Project | chatgpt

SSN matching. Fuzzy name matching. Cross-sheet validation. The scripts that kept a $200K tax credit pipeline running.

| Script | Purpose |
|--------|---------|
| **ssn-lastname-matcher.gs** | Match SSNs across spreadsheets, highlight discrepancies |
| **fuzzy-match-reconciliation.gs** | Handle name variations (typos, abbreviations) |
| **master-sheet-updater.gs** | Sync data across multiple sources |

---

### Torah Translation System

Connected to the same barrier as the Talmudic Study App—Hebrew text that needed to be accessible.

| Script | Purpose |
|--------|---------|
| **artscroll-style-translator.gs** | OpenRouter + Claude 3.5 Sonnet for reverent translation |
| **contextual-hebrew-translator.gs** | Context-aware translation with commentary |
| **torah-translator-main.gs** | Main translation pipeline |

---

### AI Content Generator

10 scripts integrating GPT-3.5, GPT-4, and Claude into Google Sheets workflows.

| Script | Purpose |
|--------|---------|
| **claude-sonnet-generator.gs** | Claude API integration |
| **gpt4-integration.gs** | GPT-4 API wrapper |
| **cognitive-enhancer.gs** | AI-powered content improvement |

---

### Document Intelligence

> "no not demos use real pdfs please"
> — **2025-07** | production_webhook | chatgpt

PDF extraction. OCR. Form classification. Real documents, not test files.

| Script | Purpose |
|--------|---------|
| **form-classifier-ocr.gs** | Classify incoming forms by type |
| **pdf-gmail-extractor.gs** | Extract attachments, process automatically |

---

### WooCommerce Automation

> "I have created developed and integrated a web app to automate whatsapps, calader booking, leads, crm, order management, with admins, optometrist and customers giving live visibility, booking, order status"
> — **2023-09** | List of Accomplishments | chatgpt

E-commerce order management integrated with Google Sheets.

| Script | Purpose |
|--------|---------|
| **woo-order-importer.gs** | Pull orders into Sheets |
| **woo-status-manager.gs** | Update order status automatically |

---

## The Scale

| Metric | Value |
|--------|-------|
| Total scripts | **41** |
| Project categories | **13** |
| Development period | Dec 2023 - Jan 2025 |
| Lines of code | 10,000+ |
| Google Sheets integrated | 950+ (across all projects) |

---

## The Categories

```
01-ai-content-generator/      (10 scripts) — GPT + Claude integration
02-torah-translation-system/  (4 scripts)  — Hebrew → English AI translation
03-data-reconciliation-engine/ (6 scripts) — SSN matching, fuzzy matching
04-document-intelligence/     (2 scripts)  — PDF/OCR processing
05-financial-tracker/         (3 scripts)  — Currency, donations, exchange rates
06-woocommerce-automation/    (2 scripts)  — Order management
07-sheets-synchronizer/       (4 scripts)  — Multi-sheet automation
08-youtube-tools/             (1 script)   — Transcript extraction
09-search-analytics/          (2 scripts)  — Data discovery
10-claude-integration/        (3 scripts)  — Anthropic API
11-api-connectors/            (2 scripts)  — Data Studio, Docs
12-formatting-utilities/      (1 script)   — Conditional formatting
13-website-analyzer/          (1 script)   — Page feedback
```

---

## The Philosophy

> "DONT USE DEMO USE ALL REAL AND ALSO CLONE"
> — **2025-08** | sparkii-command-center | chatgpt

Every script here was built for real work. Not tutorials. Not demos. Production automation that saved hours every week.

---

## The Pattern

This is part of a larger automation ecosystem:

| System | Purpose | Link |
|--------|---------|------|
| **Google Apps Script** | Spreadsheet automation (this repo) | You're here |
| **Audio WOTC** | Voice-guided verification ($200K) | [View →](https://github.com/mordechaipotash/audio_wotc_unemployment_verification) |
| **WOTCFY Production** | Full platform (29K LOC) | [View →](https://github.com/mordechaipotash/wotcfy-app-production) |

---

*Built in Beit Shemesh, Israel*

*41 scripts. 13 categories. Real work, not demos.*
