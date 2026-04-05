# GDPR Remediation Project Plan
## Black Veterans Project Website

**Document Version:** 1.0
**Created:** April 2, 2026
**Status:** DRAFT - Pending Stakeholder Approval
**Classification:** Internal - Confidential

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Project Overview](#2-project-overview)
3. [Stakeholders & RACI](#3-stakeholders--raci)
4. [Risk Assessment](#4-risk-assessment)
5. [Phase 0: Emergency Security Response](#5-phase-0-emergency-security-response)
6. [Phase 1: Critical Compliance Fixes](#6-phase-1-critical-compliance-fixes)
7. [Phase 2: Privacy Policy Overhaul](#7-phase-2-privacy-policy-overhaul)
8. [Phase 3: User Rights Implementation](#8-phase-3-user-rights-implementation)
9. [Phase 4: Consent Infrastructure Hardening](#9-phase-4-consent-infrastructure-hardening)
10. [Phase 5: Audit Trail & Documentation](#10-phase-5-audit-trail--documentation)
11. [Success Metrics & KPIs](#11-success-metrics--kpis)
12. [Dependencies & Blockers](#12-dependencies--blockers)
13. [Go/No-Go Checklist](#13-gono-go-checklist)

---

## 1. Executive Summary

### 1.1 Purpose
This document outlines the comprehensive remediation plan to bring the Black Veterans Project (BVP) website into full GDPR and CCPA compliance before legal review and public launch.

### 1.2 Current State
- **Compliance Score:** 35-45% (FAILING)
- **Critical Vulnerabilities:** 6 identified
- **High-Priority Gaps:** 8 identified
- **Estimated Remediation Effort:** 120-160 engineering hours

### 1.3 Target State
- **Compliance Score:** 95%+ (PASSING)
- **Zero Critical Vulnerabilities**
- **Full GDPR Article 13-14 Compliance**
- **Auditable Consent Trail**
- **Legal Review Ready**

### 1.4 Project Timeline Summary

| Phase | Name | Duration | Dependencies |
|-------|------|----------|--------------|
| 0 | Emergency Security Response | 1 day | None |
| 1 | Critical Compliance Fixes | 3-5 days | Phase 0 |
| 2 | Privacy Policy Overhaul | 5-7 days | Phase 1 |
| 3 | User Rights Implementation | 7-10 days | Phase 2 |
| 4 | Consent Infrastructure Hardening | 5-7 days | Phase 1 |
| 5 | Audit Trail & Documentation | 3-5 days | Phase 3, 4 |

**Total Estimated Duration:** 4-6 weeks

---

## 2. Project Overview

### 2.1 Scope

**In Scope:**
- All data collection forms (Join, Contact, Newsletter, Donate, Feedback)
- Cookie consent implementation
- Privacy policy and terms of service
- Third-party integrations (Action Network, Vercel, Google)
- User rights mechanisms (access, deletion, portability)
- Consent record-keeping infrastructure
- Security remediation (credential rotation)

**Out of Scope:**
- Backend infrastructure changes beyond API routes
- Third-party vendor contract negotiations
- Legal counsel review (separate workstream)
- Marketing campaign modifications
- Non-web properties (social media, email)

### 2.2 Success Criteria (Project-Level)

| Criteria | Measurement | Target |
|----------|-------------|--------|
| All critical vulnerabilities resolved | Security audit | 0 critical findings |
| Privacy policy GDPR-complete | Legal checklist | 100% sections present |
| Consent obtained before tracking | Technical audit | 0 pre-consent tracking |
| User rights mechanisms functional | QA testing | All 8 GDPR rights addressable |
| Consent audit trail | System review | 100% consent events logged |
| Legal review approval | Legal team sign-off | Approved |

---

## 3. Stakeholders & RACI

### 3.1 Stakeholder Matrix

| Role | Name/Team | Responsibilities |
|------|-----------|------------------|
| **Executive Sponsor** | [TBD] | Final approval, resource allocation |
| **Project Lead** | [TBD] | Day-to-day management, status reporting |
| **Engineering Lead** | [TBD] | Technical implementation, code review |
| **Legal Counsel** | [TBD] | Policy review, compliance validation |
| **Privacy Officer/DPO** | [TBD] | GDPR interpretation, risk assessment |
| **QA Lead** | [TBD] | Testing, acceptance validation |
| **DevOps** | [TBD] | Deployment, secret management |

### 3.2 RACI Matrix

| Task | Exec Sponsor | Project Lead | Eng Lead | Legal | DPO | QA | DevOps |
|------|--------------|--------------|----------|-------|-----|-----|--------|
| Credential rotation | I | A | R | I | I | - | R |
| Code changes | I | A | R | - | C | R | C |
| Privacy policy draft | I | A | C | R | R | - | - |
| Privacy policy approval | A | R | I | R | R | - | - |
| Consent UI changes | I | A | R | C | C | R | - |
| User rights API | I | A | R | C | C | R | C |
| Security audit | I | A | C | I | I | R | R |
| Final sign-off | A | R | C | R | R | C | I |

**Legend:** R=Responsible, A=Accountable, C=Consulted, I=Informed

---

## 4. Risk Assessment

### 4.1 Risk Matrix

| Risk ID | Risk Description | Probability | Impact | Severity | Mitigation |
|---------|------------------|-------------|--------|----------|------------|
| R001 | Exposed API keys already compromised | HIGH | CRITICAL | P0 | Immediate rotation, audit logs review |
| R002 | Legal review delayed due to incomplete policy | MEDIUM | HIGH | P1 | Parallel workstream with legal |
| R003 | Action Network API changes during remediation | LOW | MEDIUM | P2 | Pin API version, document fallbacks |
| R004 | User data requests spike post-launch | MEDIUM | MEDIUM | P2 | Automated DSAR system |
| R005 | Third-party DPA negotiations stall | MEDIUM | HIGH | P1 | Start negotiations immediately |
| R006 | Engineering resource constraints | MEDIUM | HIGH | P1 | Prioritize P0/P1 items only |
| R007 | Scope creep from legal requirements | HIGH | MEDIUM | P1 | Strict change control process |

### 4.2 Risk Response Plan

**R001 - Exposed Credentials:**
- IMMEDIATE: Rotate all exposed keys within 4 hours
- Audit Action Network for unauthorized access
- Review Vercel deployment logs for anomalies
- Implement secret scanning in CI/CD
- Post-mortem documentation

---

## 5. Phase 0: Emergency Security Response

**Duration:** 1 day (IMMEDIATE)
**Priority:** P0 - CRITICAL
**Dependencies:** None
**Owner:** DevOps + Engineering Lead

### 5.1 Objective
Neutralize immediate security threat from exposed credentials before any other work proceeds.

### 5.2 Tasks

#### Task 0.1: Revoke Exposed Action Network API Key
**Estimated Effort:** 30 minutes

| Attribute | Value |
|-----------|-------|
| **Description** | Revoke the exposed Action Network API key `5da2d0acf...` and generate new key |
| **Current State** | API key visible in `.env.local` file in repository |
| **Target State** | Old key revoked, new key generated and stored securely |
| **Assignee** | DevOps |
| **Acceptance Criteria** | |

**Acceptance Criteria:**
- [ ] AC-0.1.1: Old API key `5da2d0acf27fa1d4d541253eb71bc60b` returns 401 Unauthorized when tested
- [ ] AC-0.1.2: New API key generated in Action Network dashboard
- [ ] AC-0.1.3: New key stored in Vercel Environment Variables (not in code)
- [ ] AC-0.1.4: New key stored in secure password manager for team access
- [ ] AC-0.1.5: Deployment succeeds with new key
- [ ] AC-0.1.6: Form submission to Action Network succeeds with new key
- [ ] AC-0.1.7: Action Network audit log reviewed for unauthorized access in past 30 days

**Verification Steps:**
```bash
# Test old key is revoked
curl -X GET "https://actionnetwork.org/api/v2/people" \
  -H "OSDI-API-Token: 5da2d0acf27fa1d4d541253eb71bc60b"
# Expected: 401 Unauthorized

# Test new key works
curl -X GET "https://actionnetwork.org/api/v2/people" \
  -H "OSDI-API-Token: [NEW_KEY]"
# Expected: 200 OK with data
```

---

#### Task 0.2: Revoke Exposed Vercel OIDC Token
**Estimated Effort:** 30 minutes

| Attribute | Value |
|-----------|-------|
| **Description** | Revoke the exposed Vercel OIDC token and regenerate |
| **Current State** | OIDC token visible in `.env.local` |
| **Target State** | Old token invalidated, new token issued |
| **Assignee** | DevOps |

**Acceptance Criteria:**
- [ ] AC-0.2.1: Old OIDC token invalidated in Vercel dashboard
- [ ] AC-0.2.2: New OIDC token generated (if needed for deployment)
- [ ] AC-0.2.3: Vercel deployment logs reviewed for unauthorized deployments
- [ ] AC-0.2.4: All team members with Vercel access verified

---

#### Task 0.3: Secure .env.local from Version Control
**Estimated Effort:** 1 hour

| Attribute | Value |
|-----------|-------|
| **Description** | Ensure `.env.local` is gitignored and scrub from history if committed |
| **File** | `.gitignore`, git history |
| **Assignee** | Engineering Lead |

**Acceptance Criteria:**
- [ ] AC-0.3.1: `.env.local` present in `.gitignore` file
- [ ] AC-0.3.2: `git status` does not show `.env.local` as tracked
- [ ] AC-0.3.3: If file was committed, git history rewritten using `git filter-branch` or BFG Repo Cleaner
- [ ] AC-0.3.4: All team members notified to re-clone repository if history rewritten
- [ ] AC-0.3.5: GitHub/GitLab secret scanning enabled on repository
- [ ] AC-0.3.6: Pre-commit hook added to prevent future secret commits

**Implementation:**
```bash
# Add to .gitignore if missing
echo ".env.local" >> .gitignore
echo ".env*.local" >> .gitignore

# Check if file was committed
git log --all --full-history -- .env.local

# If committed, use BFG to remove (DESTRUCTIVE - coordinate with team)
# bfg --delete-files .env.local
# git reflog expire --expire=now --all && git gc --prune=now --aggressive
```

---

#### Task 0.4: Implement Secret Scanning
**Estimated Effort:** 2 hours

| Attribute | Value |
|-----------|-------|
| **Description** | Add automated secret detection to prevent future exposure |
| **Assignee** | DevOps |

**Acceptance Criteria:**
- [ ] AC-0.4.1: GitHub Advanced Security secret scanning enabled (if GitHub)
- [ ] AC-0.4.2: Pre-commit hook using `detect-secrets` or `gitleaks` installed
- [ ] AC-0.4.3: CI pipeline includes secret scanning step
- [ ] AC-0.4.4: Documentation updated with secret handling procedures
- [ ] AC-0.4.5: `.env.example` file created with placeholder values (no real secrets)

**Implementation:**
```bash
# Install detect-secrets
pip install detect-secrets

# Create baseline
detect-secrets scan > .secrets.baseline

# Add pre-commit hook
cat >> .pre-commit-config.yaml << 'EOF'
repos:
  - repo: https://github.com/Yelp/detect-secrets
    rev: v1.4.0
    hooks:
      - id: detect-secrets
        args: ['--baseline', '.secrets.baseline']
EOF
```

---

#### Task 0.5: Create Incident Report
**Estimated Effort:** 2 hours

| Attribute | Value |
|-----------|-------|
| **Description** | Document the security incident for compliance records |
| **Assignee** | Project Lead + DPO |

**Acceptance Criteria:**
- [ ] AC-0.5.1: Incident report created with timeline of exposure
- [ ] AC-0.5.2: Impact assessment completed (what data could have been accessed)
- [ ] AC-0.5.3: Remediation actions documented
- [ ] AC-0.5.4: Lessons learned documented
- [ ] AC-0.5.5: Report stored in compliance documentation
- [ ] AC-0.5.6: Determination made on whether GDPR breach notification required (72-hour rule)

---

### 5.3 Phase 0 Exit Criteria

| Criterion | Verification Method | Status |
|-----------|---------------------|--------|
| All exposed credentials rotated | Manual verification | [ ] |
| Old credentials confirmed non-functional | API testing | [ ] |
| New credentials in secure storage only | Vercel dashboard check | [ ] |
| .env.local not in version control | `git status` check | [ ] |
| Secret scanning implemented | CI pipeline test | [ ] |
| Incident report completed | Document review | [ ] |

**Phase 0 Sign-off Required From:** DevOps Lead, Engineering Lead, DPO

---

## 6. Phase 1: Critical Compliance Fixes

**Duration:** 3-5 days
**Priority:** P1 - HIGH
**Dependencies:** Phase 0 complete
**Owner:** Engineering Lead

### 6.1 Objective
Address all critical GDPR violations that could result in regulatory action or block legal review.

### 6.2 Tasks

#### Task 1.1: Fix Analytics Consent Default
**Estimated Effort:** 1 hour

| Attribute | Value |
|-----------|-------|
| **Description** | Change analytics cookie default from `true` (opt-out) to `false` (opt-in) |
| **File** | `src/components/ui/CookieConsent.tsx` |
| **Line** | 74 |
| **GDPR Article** | Article 7 (Conditions for Consent) |
| **Assignee** | Frontend Engineer |

**Current Code:**
```typescript
const [preferences, setPreferences] = useState<ConsentPreferences>({
  necessary: true,
  analytics: true,  // ← VIOLATION: opt-out
  marketing: false,
});
```

**Target Code:**
```typescript
const [preferences, setPreferences] = useState<ConsentPreferences>({
  necessary: true,
  analytics: false,  // ← COMPLIANT: opt-in
  marketing: false,
});
```

**Acceptance Criteria:**
- [ ] AC-1.1.1: Default `analytics` value is `false` in CookieConsent.tsx
- [ ] AC-1.1.2: New visitors see banner with analytics toggle OFF by default
- [ ] AC-1.1.3: Vercel Analytics does NOT load until user explicitly enables analytics
- [ ] AC-1.1.4: Existing users with stored consent are not affected (their choice persists)
- [ ] AC-1.1.5: Unit test added verifying default state
- [ ] AC-1.1.6: E2E test confirms no network requests to Vercel Analytics before consent

**Test Cases:**
| Test ID | Description | Expected Result |
|---------|-------------|-----------------|
| TC-1.1.1 | Fresh visit (no localStorage) | Banner shows, analytics toggle OFF |
| TC-1.1.2 | User clicks Accept without toggling | Analytics enabled, Vercel loads |
| TC-1.1.3 | User dismisses banner (X) | Analytics remains disabled |
| TC-1.1.4 | User with prior consent revisits | Prior choice respected |
| TC-1.1.5 | Network tab before consent | No requests to vercel-insights.com |

---

#### Task 1.2: Add Consent Checkbox to Join Form
**Estimated Effort:** 4 hours

| Attribute | Value |
|-----------|-------|
| **Description** | Add explicit consent checkbox before collecting sensitive personal data |
| **File** | `src/app/(main)/join/page.tsx` |
| **GDPR Article** | Article 6(1)(a) (Consent), Article 9 (Special Categories) |
| **Assignee** | Frontend Engineer |

**Sensitive Data Collected (Requiring Explicit Consent):**
- Race/ethnicity
- Gender identity
- Military service details
- Discharge status
- Health-related barriers (mental health, addiction)
- Financial hardship indicators
- Incarceration/probation history

**Implementation Requirements:**

**Consent Checkbox UI:**
```typescript
// Add before form submission button
<div className="consent-checkbox-group">
  <label className="flex items-start gap-3 cursor-pointer">
    <input
      type="checkbox"
      required
      checked={consentGiven}
      onChange={(e) => setConsentGiven(e.target.checked)}
      className="mt-1 w-5 h-5 rounded border-2 border-black"
      aria-describedby="consent-description"
    />
    <span id="consent-description" className="text-sm text-black/70">
      I consent to Black Veterans Project collecting and processing my personal
      information, including sensitive data about my military service, demographics,
      and life experiences. This data will be shared with{' '}
      <a href="https://actionnetwork.org/privacy" target="_blank" rel="noopener" className="underline">
        Action Network
      </a>{' '}
      for organizing and communication purposes. I understand I can withdraw
      consent at any time by contacting{' '}
      <a href="mailto:info@blackveteransproject.org" className="underline">
        info@blackveteransproject.org
      </a>.{' '}
      <a href="/privacy" className="underline">Read our full Privacy Policy</a>.
    </span>
  </label>
</div>
```

**Acceptance Criteria:**
- [ ] AC-1.2.1: Consent checkbox visible on all Join form variants (Affiliate, Advocate, Veteran)
- [ ] AC-1.2.2: Checkbox is unchecked by default
- [ ] AC-1.2.3: Form cannot be submitted without checkbox checked (HTML5 `required` + JS validation)
- [ ] AC-1.2.4: Consent text mentions "Action Network" by name
- [ ] AC-1.2.5: Consent text mentions "sensitive data" explicitly
- [ ] AC-1.2.6: Link to Action Network privacy policy included and functional
- [ ] AC-1.2.7: Link to BVP privacy policy included and functional
- [ ] AC-1.2.8: Withdrawal instructions included (email address)
- [ ] AC-1.2.9: Consent checkbox state included in form submission payload
- [ ] AC-1.2.10: API endpoint records consent timestamp with submission
- [ ] AC-1.2.11: Accessibility: checkbox has proper aria-describedby
- [ ] AC-1.2.12: Mobile: checkbox touch target meets 44x44px minimum

**API Payload Addition:**
```typescript
// In /api/advocate-signup/route.ts
const payload = {
  person: {
    // ... existing fields
    custom_fields: {
      // ... existing fields
      gdpr_consent_given: true,
      gdpr_consent_timestamp: new Date().toISOString(),
      gdpr_consent_version: "2026-04-v1",
    }
  }
};
```

---

#### Task 1.3: Add Consent to Feedback Widget
**Estimated Effort:** 3 hours

| Attribute | Value |
|-----------|-------|
| **Description** | Require user consent before capturing screenshots and device information |
| **File** | `src/components/FeedbackWidget.tsx` |
| **GDPR Article** | Article 6(1)(a) (Consent), Article 13 (Information) |
| **Assignee** | Frontend Engineer |

**Data Captured Without Consent (Current State):**
- Screenshot of page area (may contain sensitive content)
- User agent string (browser fingerprinting)
- Viewport dimensions
- Click position
- Page URL
- Timestamp

**Implementation Requirements:**

Add consent dialog before enabling feedback mode:

```typescript
// Consent dialog component
function FeedbackConsentDialog({ onAccept, onDecline }) {
  return (
    <div role="alertdialog" aria-modal="true" aria-labelledby="feedback-consent-title">
      <h3 id="feedback-consent-title">Help Us Improve</h3>
      <p>
        BVP will collect the following to process your feedback:
      </p>
      <ul>
        <li>A screenshot of the area you click</li>
        <li>Your browser and device information</li>
        <li>The page URL</li>
      </ul>
      <p>
        This data helps us understand and fix issues. It may be sent to
        Google Sheets for analysis.{' '}
        <a href="/privacy">Privacy Policy</a>
      </p>
      <div className="flex gap-3">
        <button onClick={onDecline}>No Thanks</button>
        <button onClick={onAccept}>I Agree, Enable Feedback</button>
      </div>
    </div>
  );
}
```

**Acceptance Criteria:**
- [ ] AC-1.3.1: Consent dialog appears BEFORE feedback mode is enabled
- [ ] AC-1.3.2: Dialog clearly lists all data that will be captured
- [ ] AC-1.3.3: Dialog mentions Google Sheets as potential destination
- [ ] AC-1.3.4: User can decline without enabling feedback mode
- [ ] AC-1.3.5: Consent choice persisted in localStorage (don't ask repeatedly)
- [ ] AC-1.3.6: Consent can be revoked (add option to reset)
- [ ] AC-1.3.7: Screenshot capture only proceeds after consent
- [ ] AC-1.3.8: No data sent to /api/feedback without consent flag
- [ ] AC-1.3.9: Dialog is accessible (focus trap, keyboard navigation)
- [ ] AC-1.3.10: Consent timestamp logged with each feedback submission

---

#### Task 1.4: Gate UTM Capture Behind Consent
**Estimated Effort:** 2 hours

| Attribute | Value |
|-----------|-------|
| **Description** | Only capture UTM parameters after analytics consent is given |
| **File** | `src/components/providers/ConsentAwareAnalytics.tsx`, `src/lib/utm.ts` |
| **GDPR Article** | Article 6(1)(a) (Consent) |
| **Assignee** | Frontend Engineer |

**Current State:**
UTM parameters are captured in `ConsentAwareAnalytics.tsx` but the function may be called before consent state is fully resolved.

**Target State:**
UTM capture only occurs when `hasAnalyticsConsent === true`.

**Acceptance Criteria:**
- [ ] AC-1.4.1: `captureUTMParams()` only called when `hasAnalyticsConsent` is true
- [ ] AC-1.4.2: sessionStorage key `bvp_utm_params` not set without consent
- [ ] AC-1.4.3: If user later grants consent, UTM params captured from current URL
- [ ] AC-1.4.4: If user revokes consent, existing UTM params cleared from sessionStorage
- [ ] AC-1.4.5: Unit test verifies no UTM capture without consent
- [ ] AC-1.4.6: Referrer capture (`getReferrerInfo()`) also gated behind consent

---

#### Task 1.5: Add Data Processing Disclosure to Contact Form
**Estimated Effort:** 1 hour

| Attribute | Value |
|-----------|-------|
| **Description** | Add notice about data handling when contact form is connected |
| **File** | `src/app/(main)/contact/page.tsx` |
| **GDPR Article** | Article 13 (Information to be provided) |
| **Assignee** | Frontend Engineer |

**Note:** Contact form is currently NOT connected to backend. This task prepares it for when it is.

**Implementation:**
```typescript
// Add above submit button
<p className="text-sm text-black/60 mb-4">
  By submitting this form, you agree to our{' '}
  <Link href="/privacy" className="underline">Privacy Policy</Link>.
  We'll use your information to respond to your inquiry and may
  store it in our CRM system.
</p>
```

**Acceptance Criteria:**
- [ ] AC-1.5.1: Privacy notice visible above submit button
- [ ] AC-1.5.2: Link to privacy policy functional
- [ ] AC-1.5.3: Text explains purpose (respond to inquiry)
- [ ] AC-1.5.4: Text mentions CRM storage

---

#### Task 1.6: Add Data Processing Disclosure to Newsletter Form
**Estimated Effort:** 1 hour

| Attribute | Value |
|-----------|-------|
| **Description** | Enhance existing newsletter notice with specific processor info |
| **File** | `src/components/sections/NewsletterSection.tsx` |
| **GDPR Article** | Article 13 (Information to be provided) |
| **Assignee** | Frontend Engineer |

**Current Notice:**
> "By signing up, you agree to receive email updates... Unsubscribe anytime."

**Enhanced Notice:**
> "By signing up, you agree to receive email updates from Black Veterans Project. Your email will be stored in Action Network for newsletter management. You can unsubscribe anytime. [Privacy Policy]"

**Acceptance Criteria:**
- [ ] AC-1.6.1: Notice mentions "Action Network" as processor
- [ ] AC-1.6.2: Link to privacy policy included
- [ ] AC-1.6.3: Unsubscribe mention retained
- [ ] AC-1.6.4: Notice visible before form submission

---

### 6.3 Phase 1 Exit Criteria

| Criterion | Verification Method | Status |
|-----------|---------------------|--------|
| Analytics defaults to opt-in (false) | Code review + E2E test | [ ] |
| Join form has consent checkbox | UI review + form test | [ ] |
| Feedback widget has consent dialog | UI review + test | [ ] |
| UTM capture gated behind consent | Code review + test | [ ] |
| Contact form has privacy notice | UI review | [ ] |
| Newsletter form has processor disclosure | UI review | [ ] |
| All acceptance criteria met | QA sign-off | [ ] |

**Phase 1 Sign-off Required From:** Engineering Lead, QA Lead

---

## 7. Phase 2: Privacy Policy Overhaul

**Duration:** 5-7 days
**Priority:** P1 - HIGH
**Dependencies:** Phase 1 (for accurate data flow documentation)
**Owner:** Legal + DPO + Engineering (technical review)

### 7.1 Objective
Rewrite privacy policy to meet all GDPR Article 13-14 requirements with specific, accurate information about BVP's data practices.

### 7.2 Tasks

#### Task 2.1: Create Privacy Policy Structure
**Estimated Effort:** 2 hours (Legal)

| Attribute | Value |
|-----------|-------|
| **Description** | Define comprehensive section structure for GDPR-compliant privacy policy |
| **File** | `src/app/(main)/privacy/page.tsx` |
| **GDPR Articles** | 13, 14, 15-22 |
| **Assignee** | Legal Counsel + DPO |

**Required Sections:**

| # | Section | GDPR Requirement | Status |
|---|---------|------------------|--------|
| 1 | Data Controller Information | Art. 13(1)(a) | TO ADD |
| 2 | Data Protection Officer Contact | Art. 13(1)(b) | TO ADD |
| 3 | Categories of Personal Data | Art. 13(1)(c) | EXISTS (incomplete) |
| 4 | Purposes of Processing | Art. 13(1)(c) | EXISTS (incomplete) |
| 5 | Legal Basis for Processing | Art. 13(1)(c) | TO ADD |
| 6 | Legitimate Interests | Art. 13(1)(d) | TO ADD |
| 7 | Recipients/Third Parties | Art. 13(1)(e) | TO ADD |
| 8 | International Transfers | Art. 13(1)(f) | TO ADD |
| 9 | Retention Periods | Art. 13(2)(a) | TO ADD |
| 10 | User Rights | Art. 13(2)(b) | EXISTS (incomplete) |
| 11 | Right to Withdraw Consent | Art. 13(2)(c) | TO ADD |
| 12 | Right to Lodge Complaint | Art. 13(2)(d) | TO ADD |
| 13 | Statutory/Contractual Requirement | Art. 13(2)(e) | TO ADD |
| 14 | Automated Decision Making | Art. 13(2)(f) | TO ADD |
| 15 | Cookie Policy | ePrivacy | EXISTS (incomplete) |

**Acceptance Criteria:**
- [ ] AC-2.1.1: All 15 sections present in privacy policy
- [ ] AC-2.1.2: Section headings use plain language (not just article numbers)
- [ ] AC-2.1.3: Table of contents with anchor links at top of page
- [ ] AC-2.1.4: Last updated date prominently displayed
- [ ] AC-2.1.5: Version number added for consent tracking

---

#### Task 2.2: Document Data Controller Information
**Estimated Effort:** 1 hour

| Attribute | Value |
|-----------|-------|
| **Description** | Add complete data controller identity and contact information |
| **GDPR Article** | 13(1)(a) |
| **Assignee** | Legal + Project Lead |

**Required Content:**
```markdown
## Data Controller

Black Veterans Project, Inc.
[Street Address]
[City, State ZIP]
United States

EIN: [Tax ID]
501(c)(3) Nonprofit Organization

**Privacy Contact:**
Email: privacy@blackveteransproject.org
Phone: [Phone Number]

**Data Protection Officer:**
[Name if appointed, or statement that DPO not required due to org size]
```

**Acceptance Criteria:**
- [ ] AC-2.2.1: Full legal entity name included
- [ ] AC-2.2.2: Physical mailing address included
- [ ] AC-2.2.3: Tax ID/EIN included
- [ ] AC-2.2.4: Dedicated privacy email address (not general info@)
- [ ] AC-2.2.5: DPO information or explanation of why not appointed

---

#### Task 2.3: Document Legal Basis for Each Processing Activity
**Estimated Effort:** 4 hours

| Attribute | Value |
|-----------|-------|
| **Description** | Create comprehensive table of processing activities with legal basis |
| **GDPR Article** | 13(1)(c), 6(1) |
| **Assignee** | Legal + DPO |

**Required Format:**

| Processing Activity | Data Types | Legal Basis | Details |
|---------------------|-----------|-------------|---------|
| Join form submission | Name, email, phone, address, military history, demographics | Consent (Art. 6(1)(a)) | Explicit consent obtained via checkbox |
| Donation processing | Name, email, payment info | Contract (Art. 6(1)(b)) | Necessary to process your donation |
| Newsletter delivery | Email | Consent (Art. 6(1)(a)) | You can unsubscribe anytime |
| Analytics tracking | IP, browser, pages viewed | Consent (Art. 6(1)(a)) | Only with cookie consent |
| Website security | IP, access logs | Legitimate Interest (Art. 6(1)(f)) | Protecting our systems from attacks |
| Legal compliance | Donation records | Legal Obligation (Art. 6(1)(c)) | Tax reporting requirements |

**Acceptance Criteria:**
- [ ] AC-2.3.1: Every data collection point mapped to legal basis
- [ ] AC-2.3.2: Article 9 special category data (race, health) explicitly addressed
- [ ] AC-2.3.3: Legitimate interest assessments documented (if used)
- [ ] AC-2.3.4: Table format for easy scanning
- [ ] AC-2.3.5: Plain language explanations

---

#### Task 2.4: Document Third-Party Data Sharing
**Estimated Effort:** 4 hours

| Attribute | Value |
|-----------|-------|
| **Description** | Create comprehensive list of all third parties receiving personal data |
| **GDPR Article** | 13(1)(e) |
| **Assignee** | Engineering + Legal |

**Required Format:**

| Third Party | Data Shared | Purpose | Location | DPA |
|-------------|------------|---------|----------|-----|
| Action Network | Name, email, phone, address, demographics, military info, story content | CRM, email marketing, organizing | USA | [Link] |
| Vercel | IP address, pages viewed, device info, performance metrics | Website hosting, analytics | USA (Edge network) | [Link] |
| Google Analytics | IP (anonymized), pages viewed, events, conversions | Website analytics | USA | [Link] |
| Donately | Name, email, payment info | Payment processing | USA | [Link] |
| Google Sheets | Feedback content, device info | Feedback analysis | USA | [Link] |

**Acceptance Criteria:**
- [ ] AC-2.4.1: All third parties listed by name (not generic "service providers")
- [ ] AC-2.4.2: Specific data types shared with each party documented
- [ ] AC-2.4.3: Purpose of sharing explained for each
- [ ] AC-2.4.4: Location/jurisdiction for each party
- [ ] AC-2.4.5: Links to each third party's privacy policy
- [ ] AC-2.4.6: DPA status documented for each (or statement that DPA in place)

---

#### Task 2.5: Document International Data Transfers
**Estimated Effort:** 2 hours

| Attribute | Value |
|-----------|-------|
| **Description** | Disclose transfers outside EU/EEA and legal mechanisms used |
| **GDPR Article** | 13(1)(f), Chapter V |
| **Assignee** | Legal + DPO |

**Required Content:**
```markdown
## International Data Transfers

Your personal data may be transferred to and processed in the United States,
where our organization and service providers are located. The United States
may not have data protection laws equivalent to those in your country.

We transfer data to the US based on:
- **Standard Contractual Clauses (SCCs):** We have agreements with our
  processors that include EU-approved standard contractual clauses.
- **Your Consent:** By using our website and submitting forms, you consent
  to the transfer of your data to the US.

**Service Providers Located in the US:**
- Action Network (CRM)
- Vercel (Hosting)
- Google (Analytics)
- Donately (Payments)
```

**Acceptance Criteria:**
- [ ] AC-2.5.1: US-based processing explicitly disclosed
- [ ] AC-2.5.2: Legal mechanism for transfer stated (SCCs or consent)
- [ ] AC-2.5.3: List of US-based service providers
- [ ] AC-2.5.4: User informed of potentially different protections
- [ ] AC-2.5.5: Reference to Schrems II implications (if applicable)

---

#### Task 2.6: Document Data Retention Periods
**Estimated Effort:** 3 hours

| Attribute | Value |
|-----------|-------|
| **Description** | Define and document retention period for each data type |
| **GDPR Article** | 13(2)(a) |
| **Assignee** | Legal + DPO + Engineering |

**Required Format:**

| Data Type | Retention Period | Rationale | Deletion Method |
|-----------|-----------------|-----------|-----------------|
| Join/Advocate form data | 5 years after last activity | Ongoing supporter relationship | Automated deletion or upon request |
| Donation records | 7 years | IRS tax compliance | Automated archive after 7 years |
| Contact form submissions | 2 years | Follow-up and record keeping | Automated deletion |
| Newsletter subscribers | Until unsubscribe + 30 days | Service delivery + grace period | Immediate upon unsubscribe |
| Website analytics | 26 months | Google Analytics default | Automatic (Google policy) |
| Feedback submissions | 90 days | Product improvement | Automated deletion |
| Cookie consent records | 12 months | Re-consent requirement | Annual reset |
| Server logs | 30 days | Security and debugging | Automatic rotation |

**Acceptance Criteria:**
- [ ] AC-2.6.1: Every data type has defined retention period
- [ ] AC-2.6.2: Rationale provided for each retention period
- [ ] AC-2.6.3: Deletion method specified
- [ ] AC-2.6.4: No "indefinite" retention without justification
- [ ] AC-2.6.5: Retention periods align with legal requirements
- [ ] AC-2.6.6: Technical implementation planned for automated deletion

---

#### Task 2.7: Document Complete User Rights
**Estimated Effort:** 4 hours

| Attribute | Value |
|-----------|-------|
| **Description** | Document all 8 GDPR data subject rights with exercise procedures |
| **GDPR Article** | 13(2)(b), Articles 15-22 |
| **Assignee** | Legal + DPO |

**Required Rights Documentation:**

| Right | GDPR Article | Description | How to Exercise |
|-------|-------------|-------------|-----------------|
| Access | 15 | Request copy of your data | Email privacy@bvp.org with "Data Access Request" |
| Rectification | 16 | Correct inaccurate data | Email with corrections needed |
| Erasure | 17 | Delete your data ("right to be forgotten") | Email with "Deletion Request" |
| Restrict Processing | 18 | Limit how we use your data | Email with specific restrictions |
| Data Portability | 20 | Receive data in machine-readable format | Email with "Portability Request" |
| Object | 21 | Object to processing based on legitimate interest | Email with objection |
| Withdraw Consent | 7(3) | Withdraw previously given consent | Cookie settings, unsubscribe, or email |
| Lodge Complaint | 77 | Complain to supervisory authority | Contact your local DPA (links below) |

**Acceptance Criteria:**
- [ ] AC-2.7.1: All 8 rights clearly explained in plain language
- [ ] AC-2.7.2: Step-by-step exercise instructions for each right
- [ ] AC-2.7.3: Dedicated privacy email address provided
- [ ] AC-2.7.4: Response timeline stated (30 days per GDPR)
- [ ] AC-2.7.5: Exceptions/limitations explained (e.g., legal holds)
- [ ] AC-2.7.6: No charge for first request (unless excessive)

---

#### Task 2.8: Add Supervisory Authority Information
**Estimated Effort:** 1 hour

| Attribute | Value |
|-----------|-------|
| **Description** | Provide contact information for relevant data protection authorities |
| **GDPR Article** | 13(2)(d), 77 |
| **Assignee** | Legal |

**Required Content:**
```markdown
## Right to Lodge a Complaint

If you believe we have violated your data protection rights, you have the
right to lodge a complaint with a supervisory authority. You can contact:

**For EU Residents:**
Your local Data Protection Authority. Find your DPA at:
[European Data Protection Board](https://edpb.europa.eu/about-edpb/about-edpb/members_en)

**For UK Residents:**
Information Commissioner's Office (ICO)
Website: https://ico.org.uk
Phone: 0303 123 1113

**For California Residents:**
California Attorney General
Website: https://oag.ca.gov/privacy

You may also contact us first, and we will work to resolve your concerns:
privacy@blackveteransproject.org
```

**Acceptance Criteria:**
- [ ] AC-2.8.1: Right to complain explicitly stated
- [ ] AC-2.8.2: EDPB link provided for EU residents
- [ ] AC-2.8.3: ICO information for UK residents
- [ ] AC-2.8.4: California AG for CCPA
- [ ] AC-2.8.5: Encouragement to contact BVP first

---

#### Task 2.9: Create Detailed Cookie Policy
**Estimated Effort:** 4 hours

| Attribute | Value |
|-----------|-------|
| **Description** | Document all cookies with names, purposes, and durations |
| **Regulation** | ePrivacy Directive, GDPR |
| **Assignee** | Engineering + Legal |

**Required Cookie Table:**

| Cookie Name | Provider | Purpose | Type | Duration | Category |
|-------------|----------|---------|------|----------|----------|
| `bvp-cookie-consent` | BVP (First Party) | Stores your cookie preferences | Preference | 1 year | Necessary |
| `_vercel_speed_insights_*` | Vercel | Measures page performance | Analytics | Session | Analytics |
| `_vercel_insights_*` | Vercel | Website analytics | Analytics | Session | Analytics |
| `_ga` | Google | Distinguishes users | Analytics | 2 years | Analytics |
| `_ga_*` | Google | Maintains session state | Analytics | 2 years | Analytics |
| `bvp_utm_params` | BVP (First Party) | Campaign attribution | Analytics | Session | Analytics |

**Acceptance Criteria:**
- [ ] AC-2.9.1: Every cookie used on site documented
- [ ] AC-2.9.2: Cookie names are exact (verified via browser dev tools)
- [ ] AC-2.9.3: Provider identified (first-party vs third-party)
- [ ] AC-2.9.4: Purpose explained in plain language
- [ ] AC-2.9.5: Duration/expiry specified
- [ ] AC-2.9.6: Category aligned with consent banner (Necessary/Analytics/Marketing)
- [ ] AC-2.9.7: Links to third-party cookie policies (Google, Vercel)
- [ ] AC-2.9.8: Instructions for managing cookies in browsers

---

#### Task 2.10: Legal Review and Approval
**Estimated Effort:** 8 hours (Legal)

| Attribute | Value |
|-----------|-------|
| **Description** | Legal counsel reviews and approves complete privacy policy |
| **Assignee** | Legal Counsel |

**Acceptance Criteria:**
- [ ] AC-2.10.1: Legal counsel has reviewed entire policy
- [ ] AC-2.10.2: All GDPR Article 13-14 requirements confirmed met
- [ ] AC-2.10.3: CCPA requirements confirmed met (if applicable)
- [ ] AC-2.10.4: Plain language review passed (readability score)
- [ ] AC-2.10.5: Sign-off document provided
- [ ] AC-2.10.6: Version number assigned (e.g., v2026.04.01)

---

### 7.3 Phase 2 Exit Criteria

| Criterion | Verification Method | Status |
|-----------|---------------------|--------|
| All 15 required sections present | Checklist review | [ ] |
| Legal basis documented for all processing | Legal review | [ ] |
| All third parties named | Technical verification | [ ] |
| International transfers disclosed | Legal review | [ ] |
| Retention periods defined | Policy review | [ ] |
| All 8 user rights documented | GDPR checklist | [ ] |
| Supervisory authorities listed | Policy review | [ ] |
| Cookie table complete | Technical audit | [ ] |
| Legal sign-off obtained | Sign-off document | [ ] |
| Policy deployed to production | Deployment verification | [ ] |

**Phase 2 Sign-off Required From:** Legal Counsel, DPO, Project Lead

---

## 8. Phase 3: User Rights Implementation

**Duration:** 7-10 days
**Priority:** P1 - HIGH
**Dependencies:** Phase 2 (privacy policy defines rights)
**Owner:** Engineering Lead

### 8.1 Objective
Implement technical mechanisms for users to exercise their GDPR data subject rights.

### 8.2 Tasks

#### Task 3.1: Create Data Subject Access Request (DSAR) Form
**Estimated Effort:** 8 hours

| Attribute | Value |
|-----------|-------|
| **Description** | Build dedicated form for users to request their data |
| **Files** | `src/app/(main)/privacy/dsar/page.tsx`, `src/app/api/dsar/route.ts` |
| **GDPR Article** | 15 (Right of Access) |
| **Assignee** | Full-stack Engineer |

**Form Fields:**
- Full Name (required)
- Email Address (required) - must match records
- Request Type (dropdown): Access / Deletion / Rectification / Portability / Restrict / Object
- Additional Details (textarea)
- Identity Verification (file upload for ID, optional but recommended)
- Consent checkbox for processing request

**API Endpoint:**
```typescript
// POST /api/dsar
interface DSARRequest {
  name: string;
  email: string;
  requestType: 'access' | 'deletion' | 'rectification' | 'portability' | 'restrict' | 'object';
  details?: string;
  verificationDocument?: File;
  consentToProcess: boolean;
  submittedAt: string;
}

// Response
interface DSARResponse {
  ticketId: string;  // e.g., "DSAR-2026-0001"
  expectedResponseDate: string;  // 30 days from submission
  confirmationEmailSent: boolean;
}
```

**Acceptance Criteria:**
- [ ] AC-3.1.1: Form accessible at `/privacy/dsar` or similar
- [ ] AC-3.1.2: All request types from GDPR Articles 15-21 available
- [ ] AC-3.1.3: Form validates email format
- [ ] AC-3.1.4: Form submission creates ticket in tracking system
- [ ] AC-3.1.5: Confirmation email sent to requester with ticket ID
- [ ] AC-3.1.6: Email includes expected response date (30 days)
- [ ] AC-3.1.7: Form accessible (WCAG 2.1 AA compliant)
- [ ] AC-3.1.8: Rate limiting implemented (prevent abuse)
- [ ] AC-3.1.9: Request logged in secure audit trail
- [ ] AC-3.1.10: Link to DSAR form added to privacy policy

---

#### Task 3.2: Implement Data Export (Portability)
**Estimated Effort:** 12 hours

| Attribute | Value |
|-----------|-------|
| **Description** | Enable users to download their data in machine-readable format |
| **Files** | `src/app/api/dsar/export/route.ts` |
| **GDPR Article** | 20 (Right to Data Portability) |
| **Assignee** | Backend Engineer |

**Export Format:**
- JSON (primary format)
- CSV (optional alternative)

**Data to Include:**
```json
{
  "exportDate": "2026-04-02T12:00:00Z",
  "dataSubject": {
    "name": "John Doe",
    "email": "john@example.com"
  },
  "formSubmissions": [
    {
      "formType": "advocate_signup",
      "submittedAt": "2026-01-15T...",
      "data": { /* all submitted fields */ }
    }
  ],
  "newsletterSubscription": {
    "subscribed": true,
    "subscribedAt": "2026-01-15T...",
    "preferences": { }
  },
  "feedbackSubmissions": [
    { /* feedback data */ }
  ],
  "cookieConsent": {
    "preferences": { "analytics": true, "marketing": false },
    "consentedAt": "2026-01-15T..."
  },
  "utmHistory": [
    { /* UTM parameters captured */ }
  ]
}
```

**Acceptance Criteria:**
- [ ] AC-3.2.1: Export endpoint secured (requires identity verification)
- [ ] AC-3.2.2: Export includes ALL data held about the user
- [ ] AC-3.2.3: Format is machine-readable (JSON)
- [ ] AC-3.2.4: Export file downloadable via secure, time-limited link
- [ ] AC-3.2.5: Link expires after 24 hours
- [ ] AC-3.2.6: Export logged in audit trail
- [ ] AC-3.2.7: Data from Action Network included (via API)
- [ ] AC-3.2.8: Local storage data instructions provided (client-side)
- [ ] AC-3.2.9: Export completes within reasonable time (< 72 hours)

---

#### Task 3.3: Implement Data Deletion
**Estimated Effort:** 16 hours

| Attribute | Value |
|-----------|-------|
| **Description** | Enable complete deletion of user data across all systems |
| **Files** | `src/app/api/dsar/delete/route.ts` |
| **GDPR Article** | 17 (Right to Erasure) |
| **Assignee** | Backend Engineer |

**Deletion Scope:**
1. Action Network records (via API)
2. Local feedback in localStorage (provide instructions)
3. Server-side logs (if any)
4. Google Sheets feedback (if applicable)
5. Analytics data (provide instructions for GA)

**Deletion Workflow:**
```
1. User submits deletion request
2. Identity verified (email confirmation)
3. System identifies all data locations
4. Deletion executed across systems:
   a. Action Network API: DELETE /people/{id}
   b. Internal databases: DELETE WHERE email = ?
   c. Google Sheets: Manual or scripted removal
5. Confirmation email sent
6. Audit log updated (retaining only request record)
```

**Acceptance Criteria:**
- [ ] AC-3.3.1: Deletion request triggers identity verification
- [ ] AC-3.3.2: All data locations identified and deleted
- [ ] AC-3.3.3: Action Network deletion via API confirmed
- [ ] AC-3.3.4: Deletion confirmation sent within 30 days
- [ ] AC-3.3.5: Audit trail retains deletion request (not deleted data)
- [ ] AC-3.3.6: Exceptions handled (legal holds, tax records)
- [ ] AC-3.3.7: User notified of any data that cannot be deleted (with reason)
- [ ] AC-3.3.8: Process documented in privacy policy
- [ ] AC-3.3.9: Rollback not possible (true deletion, not soft delete)

---

#### Task 3.4: Implement Request Tracking System
**Estimated Effort:** 8 hours

| Attribute | Value |
|-----------|-------|
| **Description** | Build internal system to track and manage DSAR requests |
| **GDPR Article** | Accountability (Art. 5(2)) |
| **Assignee** | Backend Engineer |

**System Requirements:**
- Track all incoming DSARs
- Monitor 30-day deadline
- Assign to team members
- Track status (Received → Verified → In Progress → Complete)
- Generate reports for compliance

**Database Schema:**
```sql
CREATE TABLE dsar_requests (
  id UUID PRIMARY KEY,
  ticket_id VARCHAR(20) UNIQUE,  -- DSAR-2026-0001
  request_type VARCHAR(50),
  requester_name VARCHAR(255),
  requester_email VARCHAR(255),
  details TEXT,
  status VARCHAR(50) DEFAULT 'received',
  assigned_to VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  deadline TIMESTAMP,  -- created_at + 30 days
  completed_at TIMESTAMP,
  notes TEXT,
  audit_log JSONB
);
```

**Acceptance Criteria:**
- [ ] AC-3.4.1: All DSARs logged with unique ticket ID
- [ ] AC-3.4.2: 30-day deadline automatically calculated
- [ ] AC-3.4.3: Status tracking with history
- [ ] AC-3.4.4: Email notifications for approaching deadlines (7 days, 3 days, 1 day)
- [ ] AC-3.4.5: Admin dashboard to view/manage requests
- [ ] AC-3.4.6: Compliance report generation (monthly/quarterly)
- [ ] AC-3.4.7: Secure access (admin only)
- [ ] AC-3.4.8: Audit trail for all actions on requests

---

#### Task 3.5: Implement Consent Withdrawal
**Estimated Effort:** 4 hours

| Attribute | Value |
|-----------|-------|
| **Description** | Easy mechanism for users to withdraw previously given consent |
| **Files** | Cookie settings, unsubscribe flow, DSAR form |
| **GDPR Article** | 7(3) (Withdrawal of Consent) |
| **Assignee** | Frontend Engineer |

**Withdrawal Methods:**
1. **Cookie Consent:** Footer "Cookie Settings" link (already implemented)
2. **Newsletter:** Unsubscribe link in every email
3. **Form Consent:** DSAR form with "Withdraw Consent" option
4. **Email Request:** Manual processing

**Acceptance Criteria:**
- [ ] AC-3.5.1: Cookie consent withdrawable via footer link
- [ ] AC-3.5.2: Newsletter unsubscribe in every email footer
- [ ] AC-3.5.3: Unsubscribe page functional
- [ ] AC-3.5.4: DSAR form includes consent withdrawal option
- [ ] AC-3.5.5: Withdrawal effective immediately for future processing
- [ ] AC-3.5.6: Past processing remains lawful (documented in policy)
- [ ] AC-3.5.7: Confirmation provided for each withdrawal

---

### 8.3 Phase 3 Exit Criteria

| Criterion | Verification Method | Status |
|-----------|---------------------|--------|
| DSAR form functional | End-to-end test | [ ] |
| Data export working | Test export | [ ] |
| Data deletion working | Test deletion | [ ] |
| Request tracking system operational | Admin review | [ ] |
| Consent withdrawal mechanisms working | Test all methods | [ ] |
| 30-day deadline tracking functional | System test | [ ] |
| All acceptance criteria met | QA sign-off | [ ] |

**Phase 3 Sign-off Required From:** Engineering Lead, QA Lead, DPO

---

## 9. Phase 4: Consent Infrastructure Hardening

**Duration:** 5-7 days
**Priority:** P2 - MEDIUM
**Dependencies:** Phase 1
**Owner:** Engineering Lead

### 9.1 Objective
Strengthen consent collection, storage, and audit capabilities to provide defensible proof of consent.

### 9.2 Tasks

#### Task 4.1: Add Consent Timestamps
**Estimated Effort:** 4 hours

| Attribute | Value |
|-----------|-------|
| **Description** | Store timestamp with every consent decision |
| **File** | `src/components/providers/CookieConsentContext.tsx` |
| **Assignee** | Frontend Engineer |

**Current Storage:**
```json
{"necessary": true, "analytics": true, "marketing": false}
```

**Target Storage:**
```json
{
  "necessary": true,
  "analytics": true,
  "marketing": false,
  "consentedAt": "2026-04-02T15:30:00.000Z",
  "policyVersion": "2026.04.01",
  "userAgent": "Mozilla/5.0...",
  "consentMethod": "banner_accept"
}
```

**Acceptance Criteria:**
- [ ] AC-4.1.1: ISO 8601 timestamp stored with consent
- [ ] AC-4.1.2: Privacy policy version recorded
- [ ] AC-4.1.3: Consent method recorded (banner_accept, banner_reject, preferences_save)
- [ ] AC-4.1.4: User agent optionally recorded (for audit)
- [ ] AC-4.1.5: Migration handles existing consent records (adds defaults)
- [ ] AC-4.1.6: Timestamp visible in stored localStorage value

---

#### Task 4.2: Implement Server-Side Consent Logging
**Estimated Effort:** 8 hours

| Attribute | Value |
|-----------|-------|
| **Description** | Log consent events server-side for audit trail |
| **File** | `src/app/api/consent/route.ts` |
| **Assignee** | Backend Engineer |

**API Endpoint:**
```typescript
// POST /api/consent
interface ConsentEvent {
  eventType: 'grant' | 'revoke' | 'update';
  preferences: ConsentPreferences;
  timestamp: string;
  policyVersion: string;
  userAgent: string;
  ipAddress: string;  // Hashed for privacy
  sessionId: string;
}
```

**Acceptance Criteria:**
- [ ] AC-4.2.1: API endpoint receives consent events
- [ ] AC-4.2.2: Events stored in secure database/log
- [ ] AC-4.2.3: IP address hashed (not stored in plain text)
- [ ] AC-4.2.4: Consent events queryable by session/email (if known)
- [ ] AC-4.2.5: Retention period defined (recommend 3 years)
- [ ] AC-4.2.6: Audit log tamper-evident (append-only)
- [ ] AC-4.2.7: GDPR Article 7(1) proof requirements met

---

#### Task 4.3: Implement Policy Version Tracking
**Estimated Effort:** 4 hours

| Attribute | Value |
|-----------|-------|
| **Description** | Track which privacy policy version user consented to |
| **Assignee** | Frontend + Backend Engineer |

**Implementation:**
```typescript
// In privacy policy page, export version
export const PRIVACY_POLICY_VERSION = "2026.04.01";

// In consent storage
{
  ...preferences,
  policyVersion: PRIVACY_POLICY_VERSION
}

// When policy changes, prompt re-consent
if (storedConsent.policyVersion !== PRIVACY_POLICY_VERSION) {
  // Show banner again for updated consent
  setShowBanner(true);
}
```

**Acceptance Criteria:**
- [ ] AC-4.3.1: Privacy policy has version number in code
- [ ] AC-4.3.2: Version displayed on privacy policy page
- [ ] AC-4.3.3: Consent stores policy version
- [ ] AC-4.3.4: Policy version change triggers re-consent prompt
- [ ] AC-4.3.5: Old consent remains valid until new consent given
- [ ] AC-4.3.6: Version history documented

---

#### Task 4.4: Implement Annual Re-Consent
**Estimated Effort:** 4 hours

| Attribute | Value |
|-----------|-------|
| **Description** | Prompt users to re-confirm consent after 12 months |
| **Assignee** | Frontend Engineer |

**Implementation:**
```typescript
// Check consent age
const consentAge = Date.now() - new Date(storedConsent.consentedAt).getTime();
const ONE_YEAR = 365 * 24 * 60 * 60 * 1000;

if (consentAge > ONE_YEAR) {
  // Consent expired, show banner
  setShowBanner(true);
}
```

**Acceptance Criteria:**
- [ ] AC-4.4.1: Consent older than 12 months triggers re-consent prompt
- [ ] AC-4.4.2: User can easily re-confirm existing choices
- [ ] AC-4.4.3: "Keep my settings" option available
- [ ] AC-4.4.4: New timestamp recorded on re-consent
- [ ] AC-4.4.5: Configurable re-consent period (default 12 months)

---

#### Task 4.5: Form Consent Timestamp Integration
**Estimated Effort:** 4 hours

| Attribute | Value |
|-----------|-------|
| **Description** | Record consent timestamp with all form submissions |
| **Files** | All form API routes |
| **Assignee** | Backend Engineer |

**Payload Addition:**
```typescript
// Every form submission includes:
{
  ...formData,
  consent: {
    given: true,
    timestamp: "2026-04-02T15:30:00.000Z",
    version: "2026.04.01",
    checkboxText: "I consent to Black Veterans Project..."  // Exact text shown
  }
}
```

**Acceptance Criteria:**
- [ ] AC-4.5.1: Join form records consent timestamp
- [ ] AC-4.5.2: Contact form records consent timestamp
- [ ] AC-4.5.3: Newsletter form records consent timestamp
- [ ] AC-4.5.4: Feedback form records consent timestamp
- [ ] AC-4.5.5: Exact consent text recorded (proves what user agreed to)
- [ ] AC-4.5.6: Consent data sent to Action Network custom fields

---

### 9.3 Phase 4 Exit Criteria

| Criterion | Verification Method | Status |
|-----------|---------------------|--------|
| Consent timestamps stored | localStorage inspection | [ ] |
| Server-side consent logging | API test + DB check | [ ] |
| Policy version tracking | Code review + test | [ ] |
| Annual re-consent working | Time simulation test | [ ] |
| Form consent timestamps | Form submission test | [ ] |

**Phase 4 Sign-off Required From:** Engineering Lead, DPO

---

## 10. Phase 5: Audit Trail & Documentation

**Duration:** 3-5 days
**Priority:** P2 - MEDIUM
**Dependencies:** Phase 3, Phase 4
**Owner:** Project Lead + DPO

### 10.1 Objective
Create comprehensive documentation and audit capabilities for ongoing compliance.

### 10.2 Tasks

#### Task 5.1: Create Data Processing Records (Article 30)
**Estimated Effort:** 8 hours

| Attribute | Value |
|-----------|-------|
| **Description** | Document all processing activities as required by GDPR Article 30 |
| **GDPR Article** | 30 (Records of Processing Activities) |
| **Assignee** | DPO + Project Lead |

**Required Record Format:**

| Field | Content |
|-------|---------|
| Controller Name | Black Veterans Project, Inc. |
| Controller Contact | privacy@blackveteransproject.org |
| Processing Purpose | [Per activity] |
| Categories of Data Subjects | Website visitors, supporters, donors |
| Categories of Personal Data | [Per activity] |
| Recipients | [Third parties] |
| Transfers | USA (SCCs) |
| Retention | [Per data type] |
| Security Measures | HTTPS, encryption, access controls |

**Acceptance Criteria:**
- [ ] AC-5.1.1: Record created for each processing activity
- [ ] AC-5.1.2: All Article 30(1) required fields completed
- [ ] AC-5.1.3: Records stored securely
- [ ] AC-5.1.4: Records available for supervisory authority upon request
- [ ] AC-5.1.5: Annual review process established

---

#### Task 5.2: Create Data Processing Agreement Templates
**Estimated Effort:** 4 hours (Legal)

| Attribute | Value |
|-----------|-------|
| **Description** | Ensure DPAs in place with all processors |
| **GDPR Article** | 28 (Processor) |
| **Assignee** | Legal |

**Processors Requiring DPA:**
- [ ] Action Network
- [ ] Vercel
- [ ] Google (Analytics)
- [ ] Donately
- [ ] Google (Sheets)

**Acceptance Criteria:**
- [ ] AC-5.2.1: DPA status verified for each processor
- [ ] AC-5.2.2: Copies of DPAs on file
- [ ] AC-5.2.3: Missing DPAs negotiated and signed
- [ ] AC-5.2.4: DPA review schedule established (annual)

---

#### Task 5.3: Create Compliance Dashboard
**Estimated Effort:** 8 hours

| Attribute | Value |
|-----------|-------|
| **Description** | Build internal dashboard for monitoring compliance metrics |
| **Assignee** | Full-stack Engineer |

**Dashboard Metrics:**
- Consent rate (accept vs reject)
- DSAR requests (open, completed, overdue)
- Average DSAR response time
- Consent expiration upcoming (re-consent needed)
- Policy version distribution
- Data deletion requests

**Acceptance Criteria:**
- [ ] AC-5.3.1: Dashboard accessible to authorized personnel
- [ ] AC-5.3.2: Real-time consent metrics
- [ ] AC-5.3.3: DSAR status tracking
- [ ] AC-5.3.4: Alerting for overdue DSARs
- [ ] AC-5.3.5: Monthly compliance report generation
- [ ] AC-5.3.6: Secure access (admin only)

---

#### Task 5.4: Create Compliance Runbook
**Estimated Effort:** 4 hours

| Attribute | Value |
|-----------|-------|
| **Description** | Document procedures for handling common compliance scenarios |
| **Assignee** | DPO + Project Lead |

**Runbook Sections:**
1. How to respond to a DSAR
2. How to handle a data breach
3. How to update the privacy policy
4. How to add a new third-party processor
5. How to conduct annual consent review
6. How to respond to supervisory authority inquiry

**Acceptance Criteria:**
- [ ] AC-5.4.1: Runbook covers all common scenarios
- [ ] AC-5.4.2: Step-by-step procedures documented
- [ ] AC-5.4.3: Contact list for escalation
- [ ] AC-5.4.4: Templates for common communications
- [ ] AC-5.4.5: Annual review scheduled

---

#### Task 5.5: Conduct Final Compliance Audit
**Estimated Effort:** 8 hours

| Attribute | Value |
|-----------|-------|
| **Description** | Full audit to verify all remediation complete |
| **Assignee** | QA + DPO |

**Audit Scope:**
- Re-run original three-agent audit
- Verify all critical issues resolved
- Test all user rights mechanisms
- Verify consent flows
- Review privacy policy completeness
- Test DSAR process end-to-end

**Acceptance Criteria:**
- [ ] AC-5.5.1: Zero critical findings
- [ ] AC-5.5.2: All high-priority findings resolved
- [ ] AC-5.5.3: Compliance score > 90%
- [ ] AC-5.5.4: Audit report generated
- [ ] AC-5.5.5: Sign-off from DPO

---

### 10.3 Phase 5 Exit Criteria

| Criterion | Verification Method | Status |
|-----------|---------------------|--------|
| Article 30 records complete | Document review | [ ] |
| DPAs in place | Legal verification | [ ] |
| Compliance dashboard operational | System test | [ ] |
| Runbook complete | Document review | [ ] |
| Final audit passed | Audit report | [ ] |
| DPO sign-off | Signature | [ ] |

**Phase 5 Sign-off Required From:** DPO, Legal Counsel, Executive Sponsor

---

## 11. Success Metrics & KPIs

### 11.1 Project Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Critical vulnerabilities | 0 | Security audit |
| Privacy policy completeness | 100% | GDPR checklist |
| Consent before tracking | 100% | Technical audit |
| DSAR response time | < 30 days | Tracking system |
| User rights coverage | 8/8 rights | Feature audit |
| Compliance score | > 90% | Final audit |

### 11.2 Ongoing KPIs (Post-Launch)

| KPI | Target | Frequency |
|-----|--------|-----------|
| Cookie consent rate | > 60% accept | Weekly |
| DSAR volume | Track baseline | Monthly |
| DSAR response time | < 14 days avg | Monthly |
| Privacy policy views | Track baseline | Monthly |
| Consent withdrawal rate | < 5% | Monthly |
| Compliance audit score | > 95% | Quarterly |

---

## 12. Dependencies & Blockers

### 12.1 Internal Dependencies

| Dependency | Required For | Owner | Status |
|------------|--------------|-------|--------|
| Credential rotation | All phases | DevOps | [ ] |
| Legal review of policy | Phase 2 | Legal | [ ] |
| Action Network API access | Phase 3 | Engineering | [ ] |
| Database for DSAR tracking | Phase 3 | DevOps | [ ] |
| Admin dashboard infrastructure | Phase 5 | Engineering | [ ] |

### 12.2 External Dependencies

| Dependency | Required For | Contact | Status |
|------------|--------------|---------|--------|
| Action Network DPA | Phase 5 | AN Support | [ ] |
| Vercel DPA | Phase 5 | Vercel Support | [ ] |
| Google DPA | Phase 5 | Google Cloud | [ ] |
| Legal counsel availability | Phase 2 | [TBD] | [ ] |

### 12.3 Potential Blockers

| Blocker | Impact | Mitigation |
|---------|--------|------------|
| Legal counsel unavailable | Phase 2 delayed | Identify backup counsel |
| Action Network API limitations | DSAR incomplete | Document limitations, manual process |
| Engineering resource constraints | Timeline slip | Prioritize P0/P1 only |
| Third-party DPA negotiations | Phase 5 delayed | Start early, parallel workstream |

---

## 13. Go/No-Go Checklist

### 13.1 Pre-Launch Compliance Checklist

**Security (Phase 0):**
- [ ] All exposed credentials rotated and verified non-functional
- [ ] Secret scanning enabled in CI/CD
- [ ] .env.local not in version control

**Critical Fixes (Phase 1):**
- [ ] Analytics defaults to opt-in (false)
- [ ] Join form has consent checkbox with Action Network disclosure
- [ ] Feedback widget requires consent before capture
- [ ] UTM capture gated behind analytics consent
- [ ] All forms have privacy notices

**Privacy Policy (Phase 2):**
- [ ] All 15 GDPR sections present
- [ ] Legal basis documented for all processing
- [ ] All third parties named with data types
- [ ] International transfers disclosed
- [ ] Retention periods defined
- [ ] All 8 user rights documented
- [ ] Supervisory authority information provided
- [ ] Cookie table complete
- [ ] Legal sign-off obtained

**User Rights (Phase 3):**
- [ ] DSAR form functional
- [ ] Data export working
- [ ] Data deletion working
- [ ] Request tracking operational
- [ ] Consent withdrawal mechanisms working

**Consent Infrastructure (Phase 4):**
- [ ] Consent timestamps stored
- [ ] Server-side consent logging
- [ ] Policy version tracking
- [ ] Form consent timestamps

**Documentation (Phase 5):**
- [ ] Article 30 records complete
- [ ] DPAs verified with all processors
- [ ] Compliance dashboard operational
- [ ] Runbook complete
- [ ] Final audit passed

### 13.2 Sign-Off Requirements

| Role | Signature | Date |
|------|-----------|------|
| Engineering Lead | _________________ | _____ |
| QA Lead | _________________ | _____ |
| Legal Counsel | _________________ | _____ |
| DPO / Privacy Officer | _________________ | _____ |
| Executive Sponsor | _________________ | _____ |

---

## Appendix A: Reference Documents

- GDPR Full Text: https://gdpr-info.eu/
- EDPB Guidelines: https://edpb.europa.eu/our-work-tools/general-guidance_en
- ICO Guidance: https://ico.org.uk/for-organisations/
- CCPA Text: https://oag.ca.gov/privacy/ccpa
- Action Network API: https://actionnetwork.org/api
- Vercel Privacy: https://vercel.com/legal/privacy-policy

---

## Appendix B: Glossary

| Term | Definition |
|------|------------|
| DSAR | Data Subject Access Request |
| DPA | Data Processing Agreement |
| DPO | Data Protection Officer |
| GDPR | General Data Protection Regulation |
| CCPA | California Consumer Privacy Act |
| SCCs | Standard Contractual Clauses |
| PII | Personally Identifiable Information |

---

**Document Control:**
- Created: April 2, 2026
- Version: 1.0
- Status: DRAFT
- Next Review: Upon completion of Phase 0
- Owner: Project Lead
- Distribution: Internal - Confidential
