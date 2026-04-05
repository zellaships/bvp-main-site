# Privacy Compliance Program
## Product Requirements Document (PRD)

| Field | Value |
|-------|-------|
| **Document ID** | PRD-PRIVACY-2026-001 |
| **Status** | DRAFT |
| **Author** | Privacy Engineering |
| **Reviewers** | Legal, Security, Engineering, DPO |
| **Created** | April 2, 2026 |
| **Last Modified** | April 2, 2026 |
| **Target Launch** | Prior to Legal Review |
| **Classification** | Internal - Confidential |

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 0.1 | 2026-04-02 | Privacy Eng | Initial draft |

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Problem Statement](#2-problem-statement)
3. [Goals & Non-Goals](#3-goals--non-goals)
4. [User Personas & Journeys](#4-user-personas--journeys)
5. [Current State Analysis](#5-current-state-analysis)
6. [Requirements](#6-requirements)
7. [Technical Design](#7-technical-design)
8. [Work Breakdown Structure](#8-work-breakdown-structure)
9. [Resource Plan](#9-resource-plan)
10. [Risk Management](#10-risk-management)
11. [Testing Strategy](#11-testing-strategy)
12. [Launch Plan](#12-launch-plan)
13. [Success Metrics](#13-success-metrics)
14. [Appendices](#14-appendices)

---

# 1. Executive Summary

## 1.1 One-Pager

**What:** Comprehensive remediation of GDPR/CCPA compliance gaps across the Black Veterans Project website, including consent management, data subject rights, privacy policy, and security hardening.

**Why:**
- Current compliance audit score: **35-45%** (FAILING)
- 6 critical vulnerabilities identified including exposed credentials
- Legal review blocked until remediation complete
- Regulatory risk: GDPR fines up to €20M or 4% annual revenue
- Reputational risk: Data breach notification requirements

**Who:**
- **Impacted Users:** ~50,000 estimated annual visitors, supporters, donors
- **Data Subjects:** EU/UK visitors, California residents, all form submitters
- **Internal:** Engineering, Legal, Marketing, Executive Leadership

**How:**
- 5-phase remediation program
- ~160 engineering hours estimated
- Cross-functional execution: Engineering, Legal, DevOps, QA

**When:**
- Phase 0 (Security): Immediate (24 hours)
- Phases 1-5: 4-6 weeks total
- Legal review readiness: End of Phase 2

## 1.2 Strategic Alignment

| Organizational Goal | How This Supports |
|---------------------|-------------------|
| Build trust with veteran community | Demonstrates commitment to protecting sensitive personal data |
| Scale supporter base | Enables compliant data collection for growth |
| Prepare for institutional funding | Foundations require compliance documentation |
| Mitigate organizational risk | Prevents regulatory action and reputational harm |

## 1.3 Executive Decision Required

| Decision | Options | Recommendation | Deadline |
|----------|---------|----------------|----------|
| Credential rotation | Rotate now vs. investigate first | **Rotate immediately** - exposure risk too high | Immediate |
| DPO appointment | Appoint formal DPO vs. designated privacy contact | Designated contact (org size exemption) | Phase 2 |
| Third-party DPAs | Negotiate custom vs. accept standard terms | Accept standard terms (faster) | Phase 5 |
| Consent mechanism | Banner only vs. preference center | **Preference center** (already built) | N/A |

---

# 2. Problem Statement

## 2.1 Background

Black Veterans Project (BVP) operates a Next.js website collecting personal data from veterans, supporters, and donors. The site includes:

- **Join/Advocate forms** collecting sensitive demographic, military, and personal history data
- **Donation processing** (currently placeholder)
- **Newsletter signup**
- **Contact forms**
- **Feedback collection** with screenshot capture
- **Analytics tracking** (Vercel Analytics, prepared for GA4)

A comprehensive GDPR compliance audit conducted on April 2, 2026 revealed significant gaps.

## 2.2 Problem Definition

### Primary Problem
> The BVP website collects and processes personal data—including GDPR Article 9 special category data (race, health indicators)—without adequate consent mechanisms, transparency, or user rights infrastructure, creating regulatory, legal, and reputational risk.

### Problem Breakdown

| Problem Area | Current State | Required State | Gap |
|--------------|---------------|----------------|-----|
| **Consent** | Analytics defaults ON (opt-out) | Must default OFF (opt-in) | CRITICAL |
| **Form Consent** | No checkbox for sensitive data | Explicit consent required | CRITICAL |
| **Third-Party Disclosure** | Not mentioned in privacy policy | Must name all processors | CRITICAL |
| **Credential Security** | API keys in version control | Secrets in secure vault only | CRITICAL |
| **User Rights** | Email-only process | Self-service + tracked system | HIGH |
| **Data Retention** | Undefined | Documented periods per data type | HIGH |
| **Cookie Policy** | Generic | Specific cookie inventory | MEDIUM |

## 2.3 Impact Analysis

### Regulatory Impact
| Regulation | Jurisdiction | Max Penalty | Current Exposure |
|------------|--------------|-------------|------------------|
| GDPR | EU/EEA | €20M or 4% revenue | HIGH - multiple violations |
| UK GDPR | United Kingdom | £17.5M or 4% revenue | HIGH |
| CCPA/CPRA | California | $7,500/violation | MEDIUM |
| CAN-SPAM | United States | $46,517/email | LOW - unsubscribe exists |

### Operational Impact
- **Legal Review:** BLOCKED until compliance achieved
- **Fundraising:** Institutional funders require compliance documentation
- **Partnerships:** Corporate partners conduct privacy due diligence
- **Insurance:** Cyber liability coverage may require compliance attestation

### Reputational Impact
- **Veteran Community:** Trust is paramount; data mishandling would be devastating
- **Media:** Privacy violations create negative press cycles
- **Advocacy:** Undermines credibility as justice-focused organization

## 2.4 Root Cause Analysis

```
                    ┌─────────────────────────────────────┐
                    │     COMPLIANCE GAPS IDENTIFIED      │
                    └─────────────────────────────────────┘
                                      │
        ┌─────────────────────────────┼─────────────────────────────┐
        ▼                             ▼                             ▼
┌───────────────┐           ┌───────────────┐           ┌───────────────┐
│   TECHNICAL   │           │    PROCESS    │           │   KNOWLEDGE   │
└───────────────┘           └───────────────┘           └───────────────┘
        │                             │                             │
        ▼                             ▼                             ▼
• Cookie consent          • No privacy review        • GDPR requirements
  defaults wrong            in dev workflow            not fully understood
• No consent checkbox     • No DPA tracking         • Special category
  on forms                • No credential             data rules unclear
• UTM capture not           rotation policy         • Retention periods
  consent-gated           • No DSAR process           not researched
• Feedback captures
  without consent
        │                             │                             │
        └─────────────────────────────┼─────────────────────────────┘
                                      ▼
                    ┌─────────────────────────────────────┐
                    │          ROOT CAUSES                │
                    │  1. Speed-to-launch prioritized     │
                    │  2. No privacy engineering role     │
                    │  3. Third-party integrations added  │
                    │     without privacy assessment      │
                    │  4. .env.local committed to repo    │
                    └─────────────────────────────────────┘
```

---

# 3. Goals & Non-Goals

## 3.1 Goals

### G1: Achieve GDPR/CCPA Compliance (P0)
- Pass external compliance audit with score >90%
- Zero critical findings
- Documented evidence of compliance for each requirement

### G2: Enable Legal Review (P0)
- Privacy policy approved by legal counsel
- All required disclosures present
- Sign-off documentation complete

### G3: Implement User Rights Infrastructure (P1)
- Self-service data subject request form
- Automated request tracking with SLA monitoring
- Data export and deletion capabilities

### G4: Secure Credential Management (P0)
- Zero secrets in version control
- Automated secret scanning in CI/CD
- Documented credential rotation procedures

### G5: Establish Ongoing Compliance Operations (P2)
- Quarterly compliance review process
- Privacy impact assessment template for new features
- Team training on privacy requirements

## 3.2 Non-Goals

| Non-Goal | Rationale |
|----------|-----------|
| ISO 27001 certification | Out of scope; separate initiative |
| SOC 2 compliance | Not required for current operations |
| Privacy-preserving analytics (differential privacy) | Over-engineering for current scale |
| Consent management platform (CMP) vendor integration | Built in-house already; sufficient |
| Multi-language privacy policy | English-only acceptable for US-based org |
| Mobile app privacy | No mobile app exists |
| Employee data privacy | Separate HR workstream |

## 3.3 Success Criteria

| Goal | Success Metric | Target | Measurement Method |
|------|----------------|--------|-------------------|
| G1 | Compliance audit score | >90% | External audit tool/checklist |
| G1 | Critical vulnerabilities | 0 | Security scan |
| G2 | Legal sign-off | Obtained | Signed document |
| G3 | DSAR response time | <30 days | Tracking system |
| G3 | DSAR completion rate | 100% | Tracking system |
| G4 | Secrets in code | 0 | Automated scanning |
| G5 | Compliance review cadence | Quarterly | Calendar |

---

# 4. User Personas & Journeys

## 4.1 Personas

### Persona 1: Maria - EU Supporter
```
┌────────────────────────────────────────────────────────────────┐
│ MARIA - EU SUPPORTER                                           │
├────────────────────────────────────────────────────────────────┤
│ Demographics:                                                  │
│ • 42 years old, lives in Germany                               │
│ • Descended from Black American GIs stationed in Europe        │
│ • Works in human rights advocacy                               │
│                                                                │
│ Goals:                                                         │
│ • Support BVP's mission                                        │
│ • Sign up for newsletter                                       │
│ • Potentially donate                                           │
│                                                                │
│ Privacy Expectations:                                          │
│ • GDPR-aware: expects consent before tracking                  │
│ • Wants to know where data goes                                │
│ • May exercise right to access/delete                          │
│                                                                │
│ Pain Points:                                                   │
│ • Unclear cookie banners frustrate her                         │
│ • Doesn't trust sites that auto-enable tracking                │
│ • Wants easy way to see/delete her data                        │
└────────────────────────────────────────────────────────────────┘
```

### Persona 2: James - Veteran Advocate
```
┌────────────────────────────────────────────────────────────────┐
│ JAMES - VETERAN ADVOCATE                                       │
├────────────────────────────────────────────────────────────────┤
│ Demographics:                                                  │
│ • 58 years old, lives in California                            │
│ • Black veteran, served in Army 1986-2006                      │
│ • Experienced discharge upgrade discrimination                 │
│                                                                │
│ Goals:                                                         │
│ • Share his story with BVP                                     │
│ • Connect with legal resources                                 │
│ • Join advocate network                                        │
│                                                                │
│ Privacy Expectations:                                          │
│ • Understands he's sharing sensitive info                      │
│ • Wants to know exactly who sees his story                     │
│ • Concerned about his military history being misused           │
│ • CCPA rights under California law                             │
│                                                                │
│ Pain Points:                                                   │
│ • Unclear what happens to his sensitive data                   │
│ • Doesn't see Action Network mentioned anywhere                │
│ • No way to delete his info if he changes mind                 │
└────────────────────────────────────────────────────────────────┘
```

### Persona 3: Sandra - Compliance Officer (Foundation)
```
┌────────────────────────────────────────────────────────────────┐
│ SANDRA - FOUNDATION COMPLIANCE OFFICER                         │
├────────────────────────────────────────────────────────────────┤
│ Demographics:                                                  │
│ • 45 years old, works at major foundation                      │
│ • Reviews grantee organizations for compliance                 │
│ • Reports to foundation board                                  │
│                                                                │
│ Goals:                                                         │
│ • Assess BVP for potential grant                               │
│ • Verify privacy compliance before recommending funding        │
│ • Document due diligence                                       │
│                                                                │
│ Privacy Expectations:                                          │
│ • Complete, professional privacy policy                        │
│ • Clear data handling practices                                │
│ • Evidence of compliance (not just claims)                     │
│                                                                │
│ Pain Points:                                                   │
│ • Incomplete privacy policies are red flags                    │
│ • Missing retention periods = governance concern               │
│ • No DPA documentation = vendor management gap                 │
└────────────────────────────────────────────────────────────────┘
```

## 4.2 User Journeys

### Journey 1: EU Visitor Cookie Consent

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ JOURNEY: EU Visitor Cookie Consent                                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  CURRENT STATE (Broken)                                                     │
│  ─────────────────────                                                      │
│                                                                             │
│  ┌─────────┐    ┌─────────────┐    ┌──────────────┐    ┌─────────────┐     │
│  │ Visits  │───▶│ Analytics   │───▶│ Banner shows │───▶│ User sees   │     │
│  │ site    │    │ ALREADY     │    │ (too late)   │    │ toggle ON   │     │
│  └─────────┘    │ LOADING     │    └──────────────┘    │ by default  │     │
│                 └─────────────┘                        └─────────────┘     │
│                       ▲                                      │             │
│                       │                                      ▼             │
│                 ┌─────┴─────┐                         ┌─────────────┐      │
│                 │ VIOLATION │                         │ Opt-OUT not │      │
│                 │ Tracking  │                         │ Opt-IN      │      │
│                 │ before    │                         │ VIOLATION   │      │
│                 │ consent   │                         └─────────────┘      │
│                 └───────────┘                                              │
│                                                                             │
│  TARGET STATE (Compliant)                                                   │
│  ────────────────────────                                                   │
│                                                                             │
│  ┌─────────┐    ┌─────────────┐    ┌──────────────┐    ┌─────────────┐     │
│  │ Visits  │───▶│ NO tracking │───▶│ Banner shows │───▶│ Toggle OFF  │     │
│  │ site    │    │ loads       │    │ immediately  │    │ by default  │     │
│  └─────────┘    └─────────────┘    └──────────────┘    └─────────────┘     │
│                                                               │             │
│                                           ┌───────────────────┼────────┐   │
│                                           ▼                   ▼        │   │
│                                    ┌─────────────┐    ┌─────────────┐  │   │
│                                    │ User clicks │    │ User clicks │  │   │
│                                    │ "Accept"    │    │ "Reject" /X │  │   │
│                                    └─────────────┘    └─────────────┘  │   │
│                                           │                   │        │   │
│                                           ▼                   ▼        │   │
│                                    ┌─────────────┐    ┌─────────────┐  │   │
│                                    │ Analytics   │    │ No tracking │  │   │
│                                    │ NOW loads   │    │ ever        │  │   │
│                                    └─────────────┘    └─────────────┘  │   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Journey 2: Veteran Submitting Sensitive Data

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ JOURNEY: Veteran Advocate Signup                                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  CURRENT STATE                                                              │
│  ─────────────                                                              │
│                                                                             │
│  ┌─────────┐    ┌─────────────┐    ┌──────────────┐    ┌─────────────┐     │
│  │ Fills   │───▶│ Enters      │───▶│ Clicks       │───▶│ Data sent   │     │
│  │ form    │    │ race,gender │    │ Submit       │    │ to Action   │     │
│  └─────────┘    │ military,   │    │ (no consent  │    │ Network     │     │
│                 │ barriers    │    │  checkbox)   │    │ (undisclosed│     │
│                 └─────────────┘    └──────────────┘    └─────────────┘     │
│                       ▲                   ▲                   ▲             │
│                       │                   │                   │             │
│              ┌────────┴────────┐  ┌───────┴───────┐  ┌───────┴───────┐    │
│              │ ARTICLE 9 DATA  │  │ NO EXPLICIT   │  │ THIRD PARTY   │    │
│              │ Special category│  │ CONSENT       │  │ NOT DISCLOSED │    │
│              │ requires        │  │ VIOLATION     │  │ VIOLATION     │    │
│              │ explicit consent│  └───────────────┘  └───────────────┘    │
│              └─────────────────┘                                           │
│                                                                             │
│  TARGET STATE                                                               │
│  ────────────                                                               │
│                                                                             │
│  ┌─────────┐    ┌─────────────┐    ┌──────────────┐    ┌─────────────┐     │
│  │ Fills   │───▶│ Sees clear  │───▶│ Checks       │───▶│ Data sent   │     │
│  │ form    │    │ notice about│    │ consent box: │    │ with consent│     │
│  └─────────┘    │ sensitive   │    │ "I consent   │    │ timestamp   │     │
│                 │ data & AN   │    │  to AN..."   │    │ recorded    │     │
│                 └─────────────┘    └──────────────┘    └─────────────┘     │
│                                           │                                 │
│                                           ▼                                 │
│                                    ┌─────────────┐                         │
│                                    │ Can request │                         │
│                                    │ deletion    │                         │
│                                    │ anytime via │                         │
│                                    │ DSAR form   │                         │
│                                    └─────────────┘                         │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Journey 3: Data Subject Access Request

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ JOURNEY: Data Subject Access Request (DSAR)                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  CURRENT STATE                          TARGET STATE                        │
│  ─────────────                          ────────────                        │
│                                                                             │
│  ┌─────────────┐                        ┌─────────────┐                    │
│  │ User emails │                        │ User visits │                    │
│  │ info@bvp    │                        │ /privacy/   │                    │
│  │ (maybe)     │                        │ request     │                    │
│  └──────┬──────┘                        └──────┬──────┘                    │
│         │                                      │                            │
│         ▼                                      ▼                            │
│  ┌─────────────┐                        ┌─────────────┐                    │
│  │ No tracking │                        │ Fills DSAR  │                    │
│  │ No SLA      │                        │ form        │                    │
│  │ No process  │                        │ • Request   │                    │
│  │             │                        │   type      │                    │
│  └──────┬──────┘                        │ • Details   │                    │
│         │                               └──────┬──────┘                    │
│         ▼                                      │                            │
│  ┌─────────────┐                               ▼                            │
│  │ ??? Maybe   │                        ┌─────────────┐                    │
│  │ responded   │                        │ Auto email: │                    │
│  │ ??? Forgot  │                        │ Ticket #    │                    │
│  │ ??? 60 days │                        │ Deadline    │                    │
│  └─────────────┘                        └──────┬──────┘                    │
│                                                │                            │
│                                                ▼                            │
│                                         ┌─────────────┐                    │
│                                         │ Internal    │                    │
│                                         │ tracking:   │                    │
│                                         │ • SLA timer │                    │
│                                         │ • Assignee  │                    │
│                                         │ • Alerts    │                    │
│                                         └──────┬──────┘                    │
│                                                │                            │
│                                                ▼                            │
│                                         ┌─────────────┐                    │
│                                         │ Response    │                    │
│                                         │ within 30   │                    │
│                                         │ days with   │                    │
│                                         │ data export │                    │
│                                         │ or deletion │                    │
│                                         │ confirmation│                    │
│                                         └─────────────┘                    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

# 5. Current State Analysis

## 5.1 Data Flow Inventory

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        BVP DATA FLOW DIAGRAM                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   DATA SOURCES                    PROCESSING                 DESTINATIONS  │
│   ────────────                    ──────────                 ────────────  │
│                                                                             │
│   ┌─────────────┐                                                          │
│   │   JOIN      │                                                          │
│   │   FORM      │──┐                                                       │
│   │             │  │                                                       │
│   │ • Name      │  │         ┌─────────────────┐     ┌─────────────────┐  │
│   │ • Email     │  │         │                 │     │                 │  │
│   │ • Phone     │  ├────────▶│  /api/advocate  │────▶│ ACTION NETWORK  │  │
│   │ • Address   │  │         │  -signup        │     │                 │  │
│   │ • Race      │  │         │                 │     │ • CRM storage   │  │
│   │ • Gender    │  │         │ Sanitization    │     │ • Email sends   │  │
│   │ • Military  │  │         │ Validation      │     │ • Segmentation  │  │
│   │ • Barriers  │  │         │                 │     │                 │  │
│   │ • Story     │  │         └─────────────────┘     └─────────────────┘  │
│   └─────────────┘  │                                         │             │
│                    │                                         │             │
│   ┌─────────────┐  │                                         │             │
│   │  CONTACT    │  │                                         │             │
│   │   FORM      │──┤         [NOT CONNECTED]                 │             │
│   │             │  │                                         │             │
│   │ • Name      │  │                                         │             │
│   │ • Email     │  │                                         │             │
│   │ • Topic     │  │                                         │             │
│   │ • Message   │  │                                         │             │
│   └─────────────┘  │                                         │             │
│                    │                                         │             │
│   ┌─────────────┐  │                                         │             │
│   │ NEWSLETTER  │  │                                         │             │
│   │   FORM      │──┤         [NOT CONNECTED]                 │             │
│   │             │  │                                         │             │
│   │ • Name      │  │                                         │             │
│   │ • Email     │  │                                         │             │
│   └─────────────┘  │                                         │             │
│                    │                                         │             │
│   ┌─────────────┐  │         ┌─────────────────┐     ┌─────────────────┐  │
│   │  FEEDBACK   │  │         │                 │     │                 │  │
│   │  WIDGET     │──┴────────▶│  /api/feedback  │────▶│ GOOGLE SHEETS   │  │
│   │             │            │                 │     │ (if configured) │  │
│   │ • Comment   │            │                 │     │                 │  │
│   │ • Screenshot│            └────────┬────────┘     └─────────────────┘  │
│   │ • UserAgent │                     │                                    │
│   │ • URL       │                     ▼                                    │
│   │ • Position  │            ┌─────────────────┐                          │
│   └─────────────┘            │   localStorage  │                          │
│                              │                 │                          │
│                              │ bvp_feedback_   │                          │
│                              │ data            │                          │
│                              └─────────────────┘                          │
│                                                                             │
│   ┌─────────────┐            ┌─────────────────┐     ┌─────────────────┐  │
│   │   COOKIE    │            │                 │     │                 │  │
│   │   CONSENT   │───────────▶│   localStorage  │     │ VERCEL          │  │
│   │             │            │                 │     │ ANALYTICS       │  │
│   │ • Necessary │            │ bvp-cookie-     │     │                 │  │
│   │ • Analytics │            │ consent         │     │ (conditional)   │  │
│   │ • Marketing │            └────────┬────────┘     │                 │  │
│   └─────────────┘                     │              └────────▲────────┘  │
│                                       │                       │            │
│                                       │    IF consent=true    │            │
│                                       └───────────────────────┘            │
│                                                                             │
│   ┌─────────────┐            ┌─────────────────┐                          │
│   │    UTM      │            │                 │                          │
│   │  PARAMETERS │───────────▶│ sessionStorage  │                          │
│   │             │            │                 │                          │
│   │ • source    │            │ bvp_utm_params  │                          │
│   │ • medium    │            │                 │                          │
│   │ • campaign  │            └─────────────────┘                          │
│   └─────────────┘                                                          │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## 5.2 Third-Party Processor Inventory

| Processor | Data Received | Purpose | Location | DPA Status | Privacy Policy |
|-----------|---------------|---------|----------|------------|----------------|
| **Action Network** | Name, email, phone, address, race, gender, military history, barriers, story | CRM, email marketing, organizing | USA | ❌ NOT VERIFIED | [Link](https://actionnetwork.org/privacy) |
| **Vercel** | IP, pages, device, performance metrics | Hosting, analytics | USA (Edge) | ❌ NOT VERIFIED | [Link](https://vercel.com/legal/privacy-policy) |
| **Google Analytics** | IP (anonymized), pages, events, conversions | Analytics | USA | ❌ NOT VERIFIED | [Link](https://policies.google.com/privacy) |
| **Google Sheets** | Feedback content, device info, screenshots | Feedback storage | USA | ❌ NOT VERIFIED | [Link](https://policies.google.com/privacy) |
| **Donately** | Name, email, payment info | Donations | USA | ❌ NOT VERIFIED | TBD |

## 5.3 Compliance Gap Matrix

```
┌────────────────────────────────────────────────────────────────────────────┐
│                     GDPR COMPLIANCE GAP MATRIX                             │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  REQUIREMENT                          CURRENT     TARGET      GAP SEVERITY │
│  ───────────────────────────────────  ────────    ──────      ──────────── │
│                                                                            │
│  LAWFULNESS (Art. 6)                                                       │
│  ├─ Consent before tracking           ❌ NO       ✅ YES      🔴 CRITICAL  │
│  ├─ Consent for special data (Art.9)  ❌ NO       ✅ YES      🔴 CRITICAL  │
│  ├─ Legal basis documented            ❌ NO       ✅ YES      🔴 CRITICAL  │
│  └─ Legitimate interest assessment    ❌ NO       ✅ YES      🟡 HIGH      │
│                                                                            │
│  TRANSPARENCY (Art. 13-14)                                                 │
│  ├─ Data controller identified        ⚠️ PARTIAL ✅ FULL     🟡 HIGH      │
│  ├─ Third parties named               ❌ NO       ✅ YES      🔴 CRITICAL  │
│  ├─ Retention periods stated          ❌ NO       ✅ YES      🔴 CRITICAL  │
│  ├─ International transfers disclosed ❌ NO       ✅ YES      🔴 CRITICAL  │
│  ├─ User rights documented            ⚠️ PARTIAL ✅ FULL     🟡 HIGH      │
│  └─ Cookie inventory                  ❌ NO       ✅ YES      🟡 HIGH      │
│                                                                            │
│  DATA SUBJECT RIGHTS (Art. 15-22)                                          │
│  ├─ Right to access mechanism         ⚠️ EMAIL   ✅ SELF-SVC 🟡 HIGH      │
│  ├─ Right to deletion mechanism       ⚠️ EMAIL   ✅ SELF-SVC 🟡 HIGH      │
│  ├─ Right to portability              ❌ NO       ✅ YES      🟡 HIGH      │
│  ├─ Right to withdraw consent         ⚠️ PARTIAL ✅ FULL     🟢 MEDIUM    │
│  └─ Complaint authority info          ❌ NO       ✅ YES      🔴 CRITICAL  │
│                                                                            │
│  ACCOUNTABILITY (Art. 5, 24, 30)                                           │
│  ├─ Processing records (Art. 30)      ❌ NO       ✅ YES      🟡 HIGH      │
│  ├─ DPAs with processors              ❌ NO       ✅ YES      🟡 HIGH      │
│  ├─ Consent audit trail               ❌ NO       ✅ YES      🟡 HIGH      │
│  └─ Privacy by design evidence        ❌ NO       ✅ YES      🟢 MEDIUM    │
│                                                                            │
│  SECURITY (Art. 32)                                                        │
│  ├─ Credentials secured               ❌ NO       ✅ YES      🔴 CRITICAL  │
│  ├─ Encryption in transit             ✅ YES      ✅ YES      ✅ COMPLIANT │
│  ├─ Input sanitization                ✅ YES      ✅ YES      ✅ COMPLIANT │
│  └─ Access controls                   ⚠️ PARTIAL ✅ FULL     🟢 MEDIUM    │
│                                                                            │
│  LEGEND: 🔴 CRITICAL  🟡 HIGH  🟢 MEDIUM  ✅ COMPLIANT                     │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

## 5.4 Technical Debt Inventory

| ID | Component | Issue | Severity | Effort |
|----|-----------|-------|----------|--------|
| TD-001 | CookieConsent.tsx:74 | Analytics defaults to `true` | CRITICAL | 0.5h |
| TD-002 | .env.local | Credentials in version control | CRITICAL | 2h |
| TD-003 | join/page.tsx | No consent checkbox for Article 9 data | CRITICAL | 4h |
| TD-004 | FeedbackWidget.tsx | Screenshot capture without consent | HIGH | 3h |
| TD-005 | ConsentAwareAnalytics.tsx | UTM capture not fully consent-gated | HIGH | 2h |
| TD-006 | privacy/page.tsx | Missing GDPR sections | CRITICAL | 16h |
| TD-007 | N/A | No DSAR form/system | HIGH | 20h |
| TD-008 | N/A | No data export functionality | HIGH | 12h |
| TD-009 | N/A | No data deletion across systems | HIGH | 16h |
| TD-010 | CookieConsentContext.tsx | No consent timestamp | MEDIUM | 4h |

---

# 6. Requirements

## 6.1 Functional Requirements

### FR-1: Consent Management

| ID | Requirement | Priority | Acceptance Criteria |
|----|-------------|----------|---------------------|
| FR-1.1 | Cookie consent banner SHALL default analytics to OFF | P0 | Analytics toggle shows OFF for new visitors |
| FR-1.2 | Analytics SHALL NOT load until explicit consent given | P0 | Network tab shows zero analytics requests before consent |
| FR-1.3 | Consent preferences SHALL be persisted in localStorage | P0 | Returning visitors see no banner if consented |
| FR-1.4 | Users SHALL be able to change consent via footer link | P0 | "Cookie Settings" reopens preferences panel |
| FR-1.5 | Consent timestamp SHALL be recorded | P1 | ISO 8601 timestamp stored with preferences |
| FR-1.6 | Privacy policy version SHALL be recorded with consent | P1 | Version string stored with consent record |
| FR-1.7 | Consent changes SHALL clear/enable tracking immediately | P0 | Revoking consent stops analytics; granting starts them |
| FR-1.8 | Annual re-consent SHALL be prompted after 12 months | P2 | Consent older than 365 days triggers banner |

### FR-2: Form Consent

| ID | Requirement | Priority | Acceptance Criteria |
|----|-------------|----------|---------------------|
| FR-2.1 | Join forms SHALL include consent checkbox | P0 | Checkbox visible on all form variants |
| FR-2.2 | Consent checkbox SHALL be unchecked by default | P0 | Visual inspection confirms unchecked |
| FR-2.3 | Forms SHALL NOT submit without consent checked | P0 | Validation prevents submission |
| FR-2.4 | Consent text SHALL name Action Network | P0 | "Action Network" appears in consent text |
| FR-2.5 | Consent text SHALL mention sensitive data categories | P0 | Military, demographic, etc. mentioned |
| FR-2.6 | Consent timestamp SHALL be sent with form data | P1 | API payload includes timestamp |
| FR-2.7 | Consent text SHALL include withdrawal instructions | P0 | Email/method for withdrawal stated |

### FR-3: Data Subject Rights

| ID | Requirement | Priority | Acceptance Criteria |
|----|-------------|----------|---------------------|
| FR-3.1 | DSAR form SHALL be available at dedicated URL | P1 | Page loads at /privacy/request |
| FR-3.2 | DSAR form SHALL support all request types | P1 | Access, delete, rectify, port, restrict, object available |
| FR-3.3 | DSAR submission SHALL generate unique ticket ID | P1 | Ticket ID format: DSAR-YYYY-NNNN |
| FR-3.4 | DSAR submission SHALL send confirmation email | P1 | Email within 5 minutes of submission |
| FR-3.5 | DSAR system SHALL calculate 30-day deadline | P1 | Deadline = submission + 30 days |
| FR-3.6 | DSAR system SHALL alert approaching deadlines | P1 | Alerts at 7, 3, 1 days before |
| FR-3.7 | Data export SHALL include all user data | P1 | All data types in JSON format |
| FR-3.8 | Data deletion SHALL span all systems | P1 | Removed from AN, internal storage, etc. |
| FR-3.9 | Deletion SHALL be confirmed within 30 days | P1 | Confirmation email sent |

### FR-4: Privacy Policy

| ID | Requirement | Priority | Acceptance Criteria |
|----|-------------|----------|---------------------|
| FR-4.1 | Privacy policy SHALL include all 15 GDPR sections | P0 | Checklist verification |
| FR-4.2 | Privacy policy SHALL name all third-party processors | P0 | Action Network, Vercel, Google listed |
| FR-4.3 | Privacy policy SHALL state retention periods | P0 | Period for each data type |
| FR-4.4 | Privacy policy SHALL document legal basis | P0 | Basis for each processing activity |
| FR-4.5 | Privacy policy SHALL explain international transfers | P0 | US processing disclosed |
| FR-4.6 | Privacy policy SHALL list supervisory authorities | P0 | EDPB, ICO, CA AG listed |
| FR-4.7 | Privacy policy SHALL have version number | P1 | Version visible on page |
| FR-4.8 | Privacy policy SHALL have last updated date | P0 | Date visible |
| FR-4.9 | Cookie policy SHALL list all cookies by name | P0 | Actual cookie names documented |

### FR-5: Security

| ID | Requirement | Priority | Acceptance Criteria |
|----|-------------|----------|---------------------|
| FR-5.1 | Credentials SHALL NOT exist in version control | P0 | Grep returns no secrets |
| FR-5.2 | Credentials SHALL be stored in Vercel env vars | P0 | Keys in Vercel dashboard only |
| FR-5.3 | Secret scanning SHALL run in CI/CD | P0 | PR blocked if secret detected |
| FR-5.4 | Pre-commit hook SHALL scan for secrets | P1 | Commit blocked if secret detected |
| FR-5.5 | .env.example SHALL document required vars | P1 | File exists with placeholders |

## 6.2 Non-Functional Requirements

| ID | Requirement | Target | Measurement |
|----|-------------|--------|-------------|
| NFR-1 | DSAR form page load | <2s (LCP) | Lighthouse |
| NFR-2 | Cookie banner render | <100ms after DOM ready | Performance API |
| NFR-3 | Consent preference save | <50ms | localStorage timing |
| NFR-4 | DSAR system uptime | 99.9% | Monitoring |
| NFR-5 | DSAR response time | <30 days | Tracking system |
| NFR-6 | Accessibility | WCAG 2.1 AA | axe audit |
| NFR-7 | Mobile support | Full functionality on iOS/Android | Manual testing |

## 6.3 Compliance Requirements

| Regulation | Article | Requirement | Implementation |
|------------|---------|-------------|----------------|
| GDPR | 6(1)(a) | Consent must be freely given, specific, informed | Consent checkbox with clear text |
| GDPR | 7(1) | Controller must demonstrate consent | Timestamp + version stored |
| GDPR | 7(3) | Withdrawal must be as easy as giving | Footer link to preferences |
| GDPR | 9(2)(a) | Explicit consent for special categories | Checkbox for race/health data |
| GDPR | 13 | Information at time of collection | Privacy notice on forms |
| GDPR | 15 | Right of access | DSAR form with export |
| GDPR | 17 | Right to erasure | DSAR form with deletion |
| GDPR | 20 | Right to portability | JSON export |
| GDPR | 30 | Records of processing | Documentation |
| CCPA | 1798.100 | Right to know | DSAR form |
| CCPA | 1798.105 | Right to delete | DSAR form |
| CCPA | 1798.120 | Right to opt-out of sale | N/A (no sale) |

---

# 7. Technical Design

## 7.1 Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      PRIVACY INFRASTRUCTURE ARCHITECTURE                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                         CLIENT (Browser)                            │   │
│  │                                                                     │   │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐    │   │
│  │  │ CookieConsent   │  │ ConsentAware    │  │ Forms with      │    │   │
│  │  │ Provider        │  │ Analytics       │  │ Consent         │    │   │
│  │  │                 │  │                 │  │ Checkbox        │    │   │
│  │  │ • State mgmt    │  │ • Conditional   │  │                 │    │   │
│  │  │ • UI banner     │  │   loading       │  │ • Join          │    │   │
│  │  │ • Persistence   │  │ • Vercel        │  │ • Contact       │    │   │
│  │  │                 │  │ • UTM           │  │ • Newsletter    │    │   │
│  │  └────────┬────────┘  └────────┬────────┘  └────────┬────────┘    │   │
│  │           │                    │                    │              │   │
│  │           ▼                    ▼                    ▼              │   │
│  │  ┌─────────────────────────────────────────────────────────────┐  │   │
│  │  │                     localStorage                            │  │   │
│  │  │                                                             │  │   │
│  │  │  bvp-cookie-consent: {                                      │  │   │
│  │  │    necessary: true,                                         │  │   │
│  │  │    analytics: false,                                        │  │   │
│  │  │    marketing: false,                                        │  │   │
│  │  │    consentedAt: "2026-04-02T...",                          │  │   │
│  │  │    policyVersion: "2026.04.01"                             │  │   │
│  │  │  }                                                          │  │   │
│  │  └─────────────────────────────────────────────────────────────┘  │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                      │                                      │
│                                      │ HTTPS                                │
│                                      ▼                                      │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                         SERVER (Next.js API)                        │   │
│  │                                                                     │   │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐    │   │
│  │  │ /api/advocate   │  │ /api/dsar       │  │ /api/consent    │    │   │
│  │  │ -signup         │  │                 │  │                 │    │   │
│  │  │                 │  │ • Create ticket │  │ • Log consent   │    │   │
│  │  │ • Sanitize      │  │ • Send confirm  │  │ • Audit trail   │    │   │
│  │  │ • Add consent   │  │ • Track SLA     │  │                 │    │   │
│  │  │   timestamp     │  │                 │  │                 │    │   │
│  │  │ • Forward to AN │  │                 │  │                 │    │   │
│  │  └────────┬────────┘  └────────┬────────┘  └────────┬────────┘    │   │
│  │           │                    │                    │              │   │
│  └───────────┼────────────────────┼────────────────────┼──────────────┘   │
│              │                    │                    │                   │
│              ▼                    ▼                    ▼                   │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐           │
│  │ ACTION NETWORK  │  │ DSAR DATABASE   │  │ CONSENT LOG     │           │
│  │                 │  │                 │  │                 │           │
│  │ • CRM data      │  │ • Tickets       │  │ • Timestamps    │           │
│  │ • Custom fields │  │ • Status        │  │ • Versions      │           │
│  │ • Tags          │  │ • Deadlines     │  │ • Preferences   │           │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘           │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## 7.2 Component Design

### 7.2.1 Enhanced Consent Storage Schema

```typescript
// Current
type ConsentPreferences = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

// Enhanced
type EnhancedConsentRecord = {
  preferences: {
    necessary: true;  // Always true
    analytics: boolean;
    marketing: boolean;
  };
  metadata: {
    consentedAt: string;           // ISO 8601
    policyVersion: string;         // "2026.04.01"
    consentMethod: ConsentMethod;  // How consent was given
    userAgent?: string;            // For audit (optional)
    expiresAt: string;             // consentedAt + 365 days
  };
  history: ConsentEvent[];         // Audit trail
};

type ConsentMethod =
  | 'banner_accept_all'
  | 'banner_reject_all'
  | 'banner_dismiss'
  | 'preferences_save'
  | 'footer_link_update';

type ConsentEvent = {
  timestamp: string;
  action: 'grant' | 'revoke' | 'update';
  preferences: ConsentPreferences;
  method: ConsentMethod;
};
```

### 7.2.2 DSAR System Schema

```typescript
// DSAR Request
interface DSARRequest {
  id: string;                    // UUID
  ticketId: string;              // DSAR-2026-0001
  requestType: DSARType;
  requester: {
    name: string;
    email: string;
    verificationStatus: 'pending' | 'verified' | 'failed';
  };
  details?: string;
  status: DSARStatus;
  timeline: {
    submittedAt: string;
    deadline: string;            // submittedAt + 30 days
    verifiedAt?: string;
    completedAt?: string;
  };
  assignee?: string;
  notes: DSARNote[];
  auditLog: AuditEntry[];
}

type DSARType =
  | 'access'
  | 'deletion'
  | 'rectification'
  | 'portability'
  | 'restrict'
  | 'object'
  | 'withdraw_consent';

type DSARStatus =
  | 'received'
  | 'pending_verification'
  | 'verified'
  | 'in_progress'
  | 'pending_review'
  | 'completed'
  | 'rejected';
```

### 7.2.3 Form Consent Component

```typescript
// ConsentCheckbox.tsx
interface ConsentCheckboxProps {
  formType: 'join' | 'contact' | 'newsletter' | 'feedback';
  processors: string[];          // ['Action Network']
  dataTypes: string[];           // ['name', 'email', 'military history']
  sensitiveData?: boolean;       // True if Article 9 data
  onConsentChange: (consent: FormConsent) => void;
}

interface FormConsent {
  given: boolean;
  timestamp: string;
  policyVersion: string;
  checkboxText: string;          // Exact text shown
}

// Usage
<ConsentCheckbox
  formType="join"
  processors={['Action Network']}
  dataTypes={['name', 'email', 'race', 'military history', 'barriers']}
  sensitiveData={true}
  onConsentChange={setFormConsent}
/>
```

## 7.3 API Design

### 7.3.1 DSAR API

```
POST /api/dsar
─────────────────
Request:
{
  "requestType": "access",
  "name": "John Doe",
  "email": "john@example.com",
  "details": "I want a copy of all my data"
}

Response (201 Created):
{
  "ticketId": "DSAR-2026-0001",
  "status": "pending_verification",
  "deadline": "2026-05-02T00:00:00Z",
  "verificationEmailSent": true,
  "nextSteps": "Please check your email to verify your identity"
}

───────────────────────────────────────────────────────────────

GET /api/dsar/:ticketId
─────────────────────────
Response (200 OK):
{
  "ticketId": "DSAR-2026-0001",
  "status": "in_progress",
  "requestType": "access",
  "timeline": {
    "submittedAt": "2026-04-02T15:30:00Z",
    "deadline": "2026-05-02T15:30:00Z",
    "verifiedAt": "2026-04-02T16:00:00Z"
  },
  "updates": [
    {
      "date": "2026-04-03T10:00:00Z",
      "message": "Request is being processed"
    }
  ]
}

───────────────────────────────────────────────────────────────

GET /api/dsar/:ticketId/export
────────────────────────────────
Response (200 OK):
{
  "exportUrl": "https://secure-download.../export-abc123.json",
  "expiresAt": "2026-04-03T15:30:00Z",
  "format": "json",
  "size": "2.4 MB"
}
```

### 7.3.2 Consent Logging API

```
POST /api/consent
─────────────────
Request:
{
  "eventType": "grant",
  "preferences": {
    "necessary": true,
    "analytics": true,
    "marketing": false
  },
  "policyVersion": "2026.04.01",
  "method": "banner_accept_all"
}

Response (201 Created):
{
  "logged": true,
  "consentId": "consent-abc123"
}
```

## 7.4 Security Design

### 7.4.1 Secret Management

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        SECRET MANAGEMENT FLOW                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   DEVELOPMENT                  DEPLOYMENT                  RUNTIME          │
│   ───────────                  ──────────                  ───────          │
│                                                                             │
│   ┌─────────────┐             ┌─────────────┐            ┌─────────────┐   │
│   │ .env.local  │             │ Vercel      │            │ process.env │   │
│   │ (gitignored)│             │ Environment │            │             │   │
│   │             │─────────────│ Variables   │────────────│ Secrets     │   │
│   │ For local   │  manually   │             │  injected  │ available   │   │
│   │ dev only    │  copied     │ Encrypted   │  at build  │ at runtime  │   │
│   └─────────────┘             │ at rest     │            └─────────────┘   │
│         │                     └─────────────┘                              │
│         │                                                                   │
│         ▼                                                                   │
│   ┌─────────────┐                                                          │
│   │ 1Password   │   ◄──── Source of truth for all secrets                 │
│   │ Team Vault  │                                                          │
│   └─────────────┘                                                          │
│                                                                             │
│   NEVER IN GIT                                                             │
│   ────────────                                                             │
│   • .env.local          ← gitignored                                       │
│   • API keys            ← never in code                                    │
│   • OIDC tokens         ← never in code                                    │
│   • Database creds      ← never in code                                    │
│                                                                             │
│   CI/CD SCANNING                                                           │
│   ──────────────                                                           │
│   ┌─────────────┐                                                          │
│   │ Pre-commit  │────▶ detect-secrets                                      │
│   │ Hook        │                                                          │
│   └─────────────┘                                                          │
│         │                                                                   │
│         ▼                                                                   │
│   ┌─────────────┐                                                          │
│   │ GitHub      │────▶ Secret scanning alert                               │
│   │ Action      │                                                          │
│   └─────────────┘                                                          │
│         │                                                                   │
│         ▼                                                                   │
│   ┌─────────────┐                                                          │
│   │ PR Blocked  │   if secret detected                                     │
│   └─────────────┘                                                          │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

# 8. Work Breakdown Structure

## 8.1 Epic Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         WORK BREAKDOWN STRUCTURE                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  EPIC 0: EMERGENCY SECURITY                                    [P0] 1 day  │
│  ══════════════════════════════                                             │
│  │                                                                          │
│  ├─► Story 0.1: Rotate Action Network API Key                    2h        │
│  │   ├── Task: Revoke old key in AN dashboard                    15m       │
│  │   ├── Task: Generate new key                                  15m       │
│  │   ├── Task: Add to Vercel env vars                            30m       │
│  │   ├── Task: Deploy and verify                                 30m       │
│  │   └── Task: Audit AN access logs                              30m       │
│  │                                                                          │
│  ├─► Story 0.2: Rotate Vercel OIDC Token                         1h        │
│  │   ├── Task: Invalidate old token                              15m       │
│  │   ├── Task: Generate new token (if needed)                    15m       │
│  │   └── Task: Audit Vercel deployments                          30m       │
│  │                                                                          │
│  ├─► Story 0.3: Secure Version Control                           2h        │
│  │   ├── Task: Verify .gitignore                                 15m       │
│  │   ├── Task: Scrub git history (if needed)                     1h        │
│  │   └── Task: Notify team of changes                            15m       │
│  │                                                                          │
│  ├─► Story 0.4: Implement Secret Scanning                        2h        │
│  │   ├── Task: Install detect-secrets                            30m       │
│  │   ├── Task: Create baseline                                   15m       │
│  │   ├── Task: Add pre-commit hook                               30m       │
│  │   └── Task: Add CI pipeline step                              45m       │
│  │                                                                          │
│  └─► Story 0.5: Document Incident                                2h        │
│      ├── Task: Write incident report                             1h        │
│      ├── Task: Impact assessment                                 30m       │
│      └── Task: Breach notification determination                 30m       │
│                                                                             │
│  EPIC 1: CONSENT FIXES                                         [P0] 3-5d   │
│  ═════════════════════                                                      │
│  │                                                                          │
│  ├─► Story 1.1: Fix Analytics Consent Default                    4h        │
│  │   ├── Task: Change default to false                           30m       │
│  │   ├── Task: Add unit test                                     1h        │
│  │   ├── Task: Add E2E test                                      1.5h      │
│  │   └── Task: QA verification                                   1h        │
│  │                                                                          │
│  ├─► Story 1.2: Add Form Consent Checkbox                        8h        │
│  │   ├── Task: Design consent text (Legal)                       2h        │
│  │   ├── Task: Create ConsentCheckbox component                  2h        │
│  │   ├── Task: Integrate with Join forms                         2h        │
│  │   ├── Task: Add consent to API payload                        1h        │
│  │   └── Task: QA all form variants                              1h        │
│  │                                                                          │
│  ├─► Story 1.3: Add Feedback Widget Consent                      6h        │
│  │   ├── Task: Design consent dialog                             1h        │
│  │   ├── Task: Implement consent flow                            2h        │
│  │   ├── Task: Gate screenshot capture                           1h        │
│  │   ├── Task: Persist consent preference                        1h        │
│  │   └── Task: QA                                                1h        │
│  │                                                                          │
│  ├─► Story 1.4: Gate UTM Capture                                 3h        │
│  │   ├── Task: Refactor capture logic                            1.5h      │
│  │   ├── Task: Add consent check                                 30m       │
│  │   ├── Task: Clear on revoke                                   30m       │
│  │   └── Task: Unit tests                                        30m       │
│  │                                                                          │
│  └─► Story 1.5: Add Form Privacy Notices                         3h        │
│      ├── Task: Contact form notice                               1h        │
│      ├── Task: Newsletter form update                            1h        │
│      └── Task: QA                                                1h        │
│                                                                             │
│  EPIC 2: PRIVACY POLICY                                        [P0] 5-7d   │
│  ══════════════════════                                                     │
│  │                                                                          │
│  ├─► Story 2.1: Policy Structure & Framework                     4h        │
│  │   ├── Task: Create section outline                            1h        │
│  │   ├── Task: Build page structure                              2h        │
│  │   └── Task: Add TOC navigation                                1h        │
│  │                                                                          │
│  ├─► Story 2.2: Data Controller Section                          2h        │
│  │   ├── Task: Gather org info                                   1h        │
│  │   └── Task: Write section                                     1h        │
│  │                                                                          │
│  ├─► Story 2.3: Legal Basis Documentation                        6h        │
│  │   ├── Task: Map all processing activities                     2h        │
│  │   ├── Task: Determine basis for each                          2h        │
│  │   └── Task: Write section with table                          2h        │
│  │                                                                          │
│  ├─► Story 2.4: Third-Party Disclosure                           4h        │
│  │   ├── Task: Audit all third parties                           1h        │
│  │   ├── Task: Document data shared                              1h        │
│  │   ├── Task: Write section                                     1h        │
│  │   └── Task: Add privacy policy links                          1h        │
│  │                                                                          │
│  ├─► Story 2.5: International Transfers                          2h        │
│  │   ├── Task: List US-based services                            30m       │
│  │   ├── Task: Document transfer mechanisms                      30m       │
│  │   └── Task: Write section                                     1h        │
│  │                                                                          │
│  ├─► Story 2.6: Retention Periods                                4h        │
│  │   ├── Task: Define periods per data type                      2h        │
│  │   ├── Task: Legal review of periods                           1h        │
│  │   └── Task: Write section                                     1h        │
│  │                                                                          │
│  ├─► Story 2.7: User Rights Documentation                        4h        │
│  │   ├── Task: Document all 8 rights                             2h        │
│  │   ├── Task: Write exercise procedures                         1h        │
│  │   └── Task: Add supervisor authority info                     1h        │
│  │                                                                          │
│  ├─► Story 2.8: Cookie Policy                                    6h        │
│  │   ├── Task: Audit all cookies                                 2h        │
│  │   ├── Task: Document each cookie                              2h        │
│  │   └── Task: Write section                                     2h        │
│  │                                                                          │
│  └─► Story 2.9: Legal Review & Approval                          8h        │
│      ├── Task: Internal review                                   2h        │
│      ├── Task: Legal counsel review                              4h        │
│      └── Task: Revisions and sign-off                            2h        │
│                                                                             │
│  EPIC 3: USER RIGHTS SYSTEM                                    [P1] 7-10d  │
│  ══════════════════════════                                                 │
│  │                                                                          │
│  ├─► Story 3.1: DSAR Form                                        12h       │
│  │   ├── Task: Design form UI                                    2h        │
│  │   ├── Task: Build form component                              4h        │
│  │   ├── Task: Create API endpoint                               3h        │
│  │   ├── Task: Email confirmation                                2h        │
│  │   └── Task: Accessibility audit                               1h        │
│  │                                                                          │
│  ├─► Story 3.2: Data Export                                      16h       │
│  │   ├── Task: Design export schema                              2h        │
│  │   ├── Task: Build export endpoint                             4h        │
│  │   ├── Task: Action Network integration                        4h        │
│  │   ├── Task: Secure download flow                              3h        │
│  │   └── Task: Testing                                           3h        │
│  │                                                                          │
│  ├─► Story 3.3: Data Deletion                                    20h       │
│  │   ├── Task: Design deletion workflow                          2h        │
│  │   ├── Task: Build deletion endpoint                           4h        │
│  │   ├── Task: Action Network API deletion                       4h        │
│  │   ├── Task: Handle exceptions                                 3h        │
│  │   ├── Task: Confirmation flow                                 3h        │
│  │   └── Task: Testing                                           4h        │
│  │                                                                          │
│  ├─► Story 3.4: Request Tracking System                          12h       │
│  │   ├── Task: Database schema                                   2h        │
│  │   ├── Task: Ticket management API                             4h        │
│  │   ├── Task: Deadline monitoring                               2h        │
│  │   ├── Task: Admin dashboard                                   3h        │
│  │   └── Task: Reporting                                         1h        │
│  │                                                                          │
│  └─► Story 3.5: Consent Withdrawal                               6h        │
│      ├── Task: Review existing mechanisms                        1h        │
│      ├── Task: Add to DSAR form                                  2h        │
│      ├── Task: Unsubscribe flow verification                     2h        │
│      └── Task: Documentation                                     1h        │
│                                                                             │
│  EPIC 4: CONSENT HARDENING                                     [P1] 5-7d   │
│  ═════════════════════════                                                  │
│  │                                                                          │
│  ├─► Story 4.1: Consent Timestamps                               4h        │
│  ├─► Story 4.2: Server-Side Logging                              8h        │
│  ├─► Story 4.3: Policy Version Tracking                          4h        │
│  ├─► Story 4.4: Annual Re-Consent                                4h        │
│  └─► Story 4.5: Form Consent Integration                         4h        │
│                                                                             │
│  EPIC 5: AUDIT & DOCUMENTATION                                 [P2] 3-5d   │
│  ═════════════════════════════                                              │
│  │                                                                          │
│  ├─► Story 5.1: Article 30 Records                               8h        │
│  ├─► Story 5.2: DPA Verification                                 4h        │
│  ├─► Story 5.3: Compliance Dashboard                             8h        │
│  ├─► Story 5.4: Runbook Creation                                 4h        │
│  └─► Story 5.5: Final Audit                                      8h        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## 8.2 Sprint Planning

### Sprint 0 (Days 1): Emergency
| Story | Points | Assignee | Definition of Done |
|-------|--------|----------|-------------------|
| 0.1 | 2 | DevOps | Old key 401s, new key works, audit clean |
| 0.2 | 1 | DevOps | Token invalidated, deployments audited |
| 0.3 | 2 | Eng Lead | .gitignore updated, history clean |
| 0.4 | 2 | Eng Lead | Pre-commit blocks secrets, CI scans |
| 0.5 | 2 | PM + DPO | Report complete, determination made |

### Sprint 1 (Days 2-6): Critical Fixes
| Story | Points | Assignee | Definition of Done |
|-------|--------|----------|-------------------|
| 1.1 | 3 | Frontend | Default false, tests pass, no pre-consent tracking |
| 1.2 | 5 | Frontend + Legal | Checkbox on forms, AN mentioned, timestamp sent |
| 1.3 | 5 | Frontend | Dialog shown, consent gated, persisted |
| 1.4 | 2 | Frontend | UTM capture consent-gated, clears on revoke |
| 1.5 | 2 | Frontend | Notices on contact/newsletter forms |

### Sprint 2 (Days 7-13): Privacy Policy
| Story | Points | Assignee | Definition of Done |
|-------|--------|----------|-------------------|
| 2.1-2.8 | 13 | Legal + Eng | All sections written |
| 2.9 | 5 | Legal | Legal sign-off obtained |

### Sprint 3 (Days 14-23): User Rights
| Story | Points | Assignee | Definition of Done |
|-------|--------|----------|-------------------|
| 3.1 | 5 | Backend | Form live, tickets created, emails sent |
| 3.2 | 8 | Backend | Export includes all data, AN integrated |
| 3.3 | 8 | Backend | Deletion across systems, exceptions handled |
| 3.4 | 5 | Backend | Tracking operational, deadlines monitored |
| 3.5 | 3 | Frontend | Withdrawal mechanisms verified |

### Sprint 4 (Days 24-30): Hardening & Audit
| Story | Points | Assignee | Definition of Done |
|-------|--------|----------|-------------------|
| 4.1-4.5 | 8 | Frontend + Backend | Timestamps, logging, versioning complete |
| 5.1-5.5 | 13 | PM + DPO + QA | Records complete, audit passed |

---

# 9. Resource Plan

## 9.1 Team Structure

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           PROJECT TEAM STRUCTURE                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│                        ┌─────────────────┐                                  │
│                        │ Executive       │                                  │
│                        │ Sponsor         │                                  │
│                        │                 │                                  │
│                        │ • Final         │                                  │
│                        │   decisions     │                                  │
│                        │ • Resource      │                                  │
│                        │   allocation    │                                  │
│                        └────────┬────────┘                                  │
│                                 │                                           │
│                        ┌────────▼────────┐                                  │
│                        │ Project Lead    │                                  │
│                        │ (Privacy PM)    │                                  │
│                        │                 │                                  │
│                        │ • Day-to-day    │                                  │
│                        │ • Stakeholders  │                                  │
│                        │ • Reporting     │                                  │
│                        └────────┬────────┘                                  │
│                                 │                                           │
│        ┌────────────────────────┼────────────────────────┐                 │
│        │                        │                        │                 │
│        ▼                        ▼                        ▼                 │
│  ┌───────────┐           ┌───────────┐           ┌───────────┐            │
│  │ Eng Lead  │           │ Legal     │           │ DPO /     │            │
│  │           │           │ Counsel   │           │ Privacy   │            │
│  │ • Tech    │           │           │           │           │            │
│  │   arch    │           │ • Policy  │           │ • GDPR    │            │
│  │ • Code    │           │   review  │           │   interp  │            │
│  │   review  │           │ • Sign-off│           │ • Risk    │            │
│  └─────┬─────┘           └───────────┘           └───────────┘            │
│        │                                                                    │
│  ┌─────┴─────────────────────────────┐                                     │
│  │                                   │                                     │
│  ▼                                   ▼                                     │
│  ┌───────────┐                ┌───────────┐                                │
│  │ Frontend  │                │ Backend   │                                │
│  │ Engineer  │                │ Engineer  │                                │
│  │           │                │           │                                │
│  │ • Consent │                │ • APIs    │                                │
│  │   UI      │                │ • DSAR    │                                │
│  │ • Forms   │                │ • Export  │                                │
│  └───────────┘                └───────────┘                                │
│        │                            │                                       │
│        └──────────┬─────────────────┘                                       │
│                   ▼                                                         │
│            ┌───────────┐                                                   │
│            │ DevOps    │                                                   │
│            │           │                                                   │
│            │ • Secrets │                                                   │
│            │ • CI/CD   │                                                   │
│            │ • Deploy  │                                                   │
│            └───────────┘                                                   │
│                   │                                                         │
│                   ▼                                                         │
│            ┌───────────┐                                                   │
│            │ QA Lead   │                                                   │
│            │           │                                                   │
│            │ • Testing │                                                   │
│            │ • A11y    │                                                   │
│            │ • Sign-off│                                                   │
│            └───────────┘                                                   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## 9.2 Effort Allocation

| Role | Phase 0 | Phase 1 | Phase 2 | Phase 3 | Phase 4 | Phase 5 | Total |
|------|---------|---------|---------|---------|---------|---------|-------|
| **Project Lead** | 4h | 8h | 8h | 8h | 4h | 8h | **40h** |
| **Engineering Lead** | 4h | 8h | 4h | 8h | 4h | 4h | **32h** |
| **Frontend Engineer** | - | 24h | 4h | 12h | 16h | - | **56h** |
| **Backend Engineer** | - | 4h | - | 48h | 8h | - | **60h** |
| **DevOps** | 8h | - | - | - | - | 4h | **12h** |
| **Legal Counsel** | 2h | 4h | 24h | 2h | - | 4h | **36h** |
| **DPO** | 4h | 4h | 8h | 4h | 4h | 8h | **32h** |
| **QA Lead** | - | 12h | 4h | 16h | 8h | 8h | **48h** |
| **TOTAL** | **22h** | **64h** | **52h** | **98h** | **44h** | **36h** | **316h** |

## 9.3 RACI Matrix

| Deliverable | Exec Sponsor | Project Lead | Eng Lead | Frontend | Backend | DevOps | Legal | DPO | QA |
|-------------|--------------|--------------|----------|----------|---------|--------|-------|-----|-----|
| Credential Rotation | I | A | C | - | - | R | I | I | - |
| Consent UI Changes | I | A | R | R | C | - | C | C | R |
| Privacy Policy | A | R | C | - | - | - | R | R | I |
| DSAR System | I | A | R | C | R | C | C | C | R |
| Compliance Dashboard | I | A | C | C | R | C | I | R | I |
| Final Sign-Off | A | R | C | I | I | I | R | R | C |

**Legend:** R=Responsible, A=Accountable, C=Consulted, I=Informed

---

# 10. Risk Management

## 10.1 Risk Register

| ID | Risk | Category | Probability | Impact | Severity | Mitigation | Contingency | Owner |
|----|------|----------|-------------|--------|----------|------------|-------------|-------|
| R01 | Exposed credentials already compromised | Security | Medium | Critical | **P0** | Immediate rotation | Breach notification process | DevOps |
| R02 | Legal review delayed | Schedule | Medium | High | **P1** | Parallel workstream | Identify backup counsel | PM |
| R03 | Action Network API limitations | Technical | Low | High | **P1** | Early API testing | Manual fallback process | Eng |
| R04 | DSAR volume spike post-launch | Operational | Medium | Medium | **P2** | Automated system | Temporary staff | PM |
| R05 | Third-party DPA negotiations stall | Compliance | Medium | High | **P1** | Start early | Accept standard terms | Legal |
| R06 | Engineering resource constraints | Resource | Medium | High | **P1** | Prioritize P0/P1 | Contract support | PM |
| R07 | Scope creep from legal requirements | Scope | High | Medium | **P1** | Change control | Phase additions | PM |
| R08 | Cookie consent breaks user experience | Product | Low | Medium | **P2** | A/B testing | Iterate design | Frontend |
| R09 | International transfer mechanism invalidated | Regulatory | Low | Critical | **P1** | Monitor Schrems III | EU hosting option | Legal |
| R10 | New GDPR guidance during project | Regulatory | Low | Medium | **P2** | Monitor EDPB | Incorporate updates | DPO |

## 10.2 Risk Heat Map

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              RISK HEAT MAP                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│    IMPACT                                                                   │
│       ▲                                                                     │
│       │                                                                     │
│  CRITICAL │          │  R09      │  R01       │                            │
│       │   │          │           │            │                            │
│       │───┼──────────┼───────────┼────────────┤                            │
│       │   │          │           │            │                            │
│  HIGH │   │  R10     │  R02,R05  │  R06,R07   │                            │
│       │   │          │  R03      │            │                            │
│       │───┼──────────┼───────────┼────────────┤                            │
│       │   │          │           │            │                            │
│  MEDIUM   │  R08     │  R04      │            │                            │
│       │   │          │           │            │                            │
│       │───┼──────────┼───────────┼────────────┤                            │
│       │   │          │           │            │                            │
│  LOW  │   │          │           │            │                            │
│       │   │          │           │            │                            │
│       └───┴──────────┴───────────┴────────────┴───────────▶ PROBABILITY   │
│              LOW         MEDIUM       HIGH                                  │
│                                                                             │
│  LEGEND:                                                                    │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐                           │
│  │ EXTREME │ │  HIGH   │ │ MEDIUM  │ │   LOW   │                           │
│  │ (P0)    │ │  (P1)   │ │  (P2)   │ │  (P3)   │                           │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘                           │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## 10.3 Risk Response Plans

### R01: Credential Compromise (P0)

**Trigger:** Discovery of credentials in version control

**Response Plan:**
```
T+0h     : Stop all other work
T+1h     : Rotate all exposed credentials
T+2h     : Verify old credentials non-functional
T+4h     : Audit access logs for unauthorized activity
T+8h     : Complete incident report
T+24h    : Breach notification determination
T+72h    : Notify supervisory authority (if required)
```

**Escalation Path:**
1. DevOps Lead → Engineering Lead
2. Engineering Lead → Project Lead
3. Project Lead → Executive Sponsor + Legal + DPO
4. If breach confirmed: Executive Sponsor → Supervisory Authority

---

# 11. Testing Strategy

## 11.1 Test Pyramid

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              TEST PYRAMID                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│                           ┌───────────┐                                     │
│                          /│   E2E     │\          10% of tests             │
│                         / │  Tests    │ \         Slow, expensive          │
│                        /  │           │  \        Critical paths only      │
│                       /   └───────────┘   \                                │
│                      /                     \                                │
│                     /   ┌───────────────┐   \                              │
│                    /    │  Integration  │    \    20% of tests             │
│                   /     │    Tests      │     \   API + component          │
│                  /      │               │      \  Medium speed             │
│                 /       └───────────────┘       \                          │
│                /                                 \                          │
│               /      ┌───────────────────┐       \                         │
│              /       │                   │        \   70% of tests         │
│             /        │    Unit Tests     │         \  Fast, isolated       │
│            /         │                   │          \ Functions/components │
│           /          └───────────────────┘           \                     │
│          ─────────────────────────────────────────────                     │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## 11.2 Test Categories

### Unit Tests

| Component | Test Cases | Framework |
|-----------|------------|-----------|
| CookieConsentContext | Default state, state transitions, persistence | Jest + RTL |
| ConsentCheckbox | Render states, validation, consent object | Jest + RTL |
| ConsentAwareAnalytics | Conditional rendering, consent gating | Jest + RTL |
| UTM capture | Capture with consent, clear on revoke | Jest |
| DSAR API | Validation, ticket generation, emails | Jest |

### Integration Tests

| Scenario | Components | Framework |
|----------|------------|-----------|
| Consent flow | Banner → localStorage → Analytics loading | Playwright |
| Form submission | Form → API → Action Network | Playwright |
| DSAR submission | Form → API → Database → Email | Playwright |
| Data export | Request → AN API → JSON generation | Jest |

### E2E Tests

| Test Case | Steps | Pass Criteria |
|-----------|-------|---------------|
| EU visitor consent | Visit, reject, verify no tracking | Zero analytics requests |
| Form consent | Fill form, submit without checkbox | Blocked with error |
| DSAR happy path | Submit, verify email, check ticket | Ticket created, email received |
| Cookie settings | Accept, change via footer, verify | Preferences updated, analytics toggled |

## 11.3 Accessibility Testing

| Standard | Tool | Target |
|----------|------|--------|
| WCAG 2.1 AA | axe DevTools | Zero critical/serious |
| Keyboard nav | Manual | All interactive elements reachable |
| Screen reader | VoiceOver/NVDA | All content announced correctly |
| Color contrast | axe | Minimum 4.5:1 ratio |
| Focus management | Manual | Visible focus, logical order |

## 11.4 Security Testing

| Test Type | Tool | Scope |
|-----------|------|-------|
| Secret scanning | detect-secrets | All code files |
| Dependency audit | npm audit | All packages |
| OWASP Top 10 | Manual review | API endpoints |
| HTTPS | SSL Labs | Production domain |
| CSP | CSP Evaluator | Headers |

---

# 12. Launch Plan

## 12.1 Launch Criteria

### Hard Requirements (Must Have)

| Category | Criterion | Verification | Status |
|----------|-----------|--------------|--------|
| Security | All credentials rotated | API test | ⬜ |
| Security | Zero secrets in code | Scan results | ⬜ |
| Consent | Analytics defaults OFF | Code review + E2E | ⬜ |
| Consent | Form consent checkbox present | Visual inspection | ⬜ |
| Policy | All 15 GDPR sections | Checklist | ⬜ |
| Policy | Legal sign-off | Signed document | ⬜ |
| Rights | DSAR form functional | E2E test | ⬜ |
| Rights | Export/deletion working | E2E test | ⬜ |

### Soft Requirements (Should Have)

| Category | Criterion | Verification | Status |
|----------|-----------|--------------|--------|
| Consent | Timestamps stored | Unit test | ⬜ |
| Consent | Server-side logging | API test | ⬜ |
| Audit | Article 30 records | Document review | ⬜ |
| Audit | Compliance dashboard | Visual inspection | ⬜ |

## 12.2 Launch Sequence

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            LAUNCH SEQUENCE                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  L-7 DAYS     Staging deployment                                           │
│  ──────────   ├── All code merged to staging                               │
│               ├── Full regression testing                                  │
│               └── Stakeholder review                                       │
│                                                                             │
│  L-5 DAYS     Legal review                                                 │
│  ──────────   ├── Legal counsel reviews privacy policy on staging          │
│               ├── Final revisions                                          │
│               └── Sign-off obtained                                        │
│                                                                             │
│  L-3 DAYS     Final testing                                                │
│  ──────────   ├── E2E test suite pass                                      │
│               ├── Accessibility audit pass                                 │
│               ├── Security scan pass                                       │
│               └── Performance baseline                                     │
│                                                                             │
│  L-1 DAY      Go/No-Go meeting                                             │
│  ──────────   ├── All launch criteria reviewed                             │
│               ├── Risk assessment                                          │
│               ├── Rollback plan confirmed                                  │
│               └── Executive sign-off                                       │
│                                                                             │
│  L-DAY        Production deployment                                        │
│  ──────────   ├── Deploy to production                                     │
│               ├── Smoke tests                                              │
│               ├── Monitor error rates                                      │
│               └── Announce internally                                      │
│                                                                             │
│  L+1 DAY      Monitoring                                                   │
│  ──────────   ├── Review consent rates                                     │
│               ├── Check for DSAR submissions                               │
│               ├── Monitor error logs                                       │
│               └── Address any issues                                       │
│                                                                             │
│  L+7 DAYS     Retrospective                                                │
│  ──────────   ├── Project retrospective                                    │
│               ├── Document lessons learned                                 │
│               └── Plan ongoing compliance work                             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## 12.3 Rollback Plan

**Trigger Conditions:**
- Critical bug affecting >5% of users
- Security vulnerability discovered
- Consent mechanism completely broken
- Legal counsel requests immediate removal

**Rollback Procedure:**
```bash
# 1. Revert to previous deployment
vercel rollback [deployment-id]

# 2. Verify rollback successful
curl -I https://blackveteransproject.org
# Check response headers match previous version

# 3. Notify stakeholders
# Send email to legal, exec sponsor, team

# 4. Document incident
# Create incident report with timeline
```

**Rollback Owners:**
- Primary: DevOps Lead
- Backup: Engineering Lead
- Escalation: Executive Sponsor

---

# 13. Success Metrics

## 13.1 Compliance Metrics

| Metric | Baseline | Target | Measurement |
|--------|----------|--------|-------------|
| GDPR compliance score | 35-45% | >90% | Audit checklist |
| Critical vulnerabilities | 6 | 0 | Security scan |
| Privacy policy sections | 5/15 | 15/15 | Document review |
| DSAR response time | N/A | <30 days | Tracking system |
| DSAR completion rate | N/A | 100% | Tracking system |

## 13.2 User Experience Metrics

| Metric | Baseline | Target | Measurement |
|--------|----------|--------|-------------|
| Consent acceptance rate | N/A | >40% | Analytics |
| Consent rejection rate | N/A | <30% | Analytics |
| Form completion rate | TBD | No decrease | Analytics |
| Cookie settings usage | N/A | Track baseline | Analytics |
| DSAR form completion | N/A | >80% | Form analytics |

## 13.3 Operational Metrics

| Metric | Target | Frequency | Owner |
|--------|--------|-----------|-------|
| Compliance review | Quarterly | 4x/year | DPO |
| Privacy policy updates | As needed | Per change | Legal |
| DSAR volume | Track trend | Monthly | PM |
| Consent audit | Annual | 1x/year | DPO |
| Security scan | Clean | Per deployment | DevOps |

---

# 14. Appendices

## Appendix A: Glossary

| Term | Definition |
|------|------------|
| **CCPA** | California Consumer Privacy Act |
| **CMP** | Consent Management Platform |
| **DPA** | Data Processing Agreement |
| **DPO** | Data Protection Officer |
| **DSAR** | Data Subject Access Request |
| **EDPB** | European Data Protection Board |
| **GDPR** | General Data Protection Regulation |
| **ICO** | UK Information Commissioner's Office |
| **PII** | Personally Identifiable Information |
| **SCCs** | Standard Contractual Clauses |

## Appendix B: Reference Documents

- [GDPR Full Text](https://gdpr-info.eu/)
- [EDPB Guidelines](https://edpb.europa.eu/our-work-tools/general-guidance_en)
- [ICO Guidance](https://ico.org.uk/for-organisations/)
- [CCPA Text](https://oag.ca.gov/privacy/ccpa)
- [Action Network API Docs](https://actionnetwork.org/docs)
- [Vercel Privacy Policy](https://vercel.com/legal/privacy-policy)

## Appendix C: Related Documents

- `GDPR-ACCEPTANCE-CRITERIA.md` - Detailed acceptance criteria per task
- `INCIDENT-REPORT-TEMPLATE.md` - Template for security incidents
- `DSAR-RUNBOOK.md` - Procedures for handling data subject requests
- `PRIVACY-POLICY-v2026.04.md` - Updated privacy policy draft

---

## Document Approval

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Executive Sponsor | | | |
| Project Lead | | | |
| Engineering Lead | | | |
| Legal Counsel | | | |
| Data Protection Officer | | | |

---

**Document Control:**
- **ID:** PRD-PRIVACY-2026-001
- **Version:** 0.1
- **Status:** DRAFT
- **Classification:** Internal - Confidential
- **Review Cycle:** Weekly during project
- **Next Review:** [Date]
