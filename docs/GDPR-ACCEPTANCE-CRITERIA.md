# GDPR Remediation: Acceptance Criteria
## Black Veterans Project

**Document Version:** 1.0
**Created:** April 2, 2026
**Classification:** Internal - QA & Compliance

---

## How to Use This Document

Each acceptance criterion follows this format:

```
[AC-X.Y.Z] Criterion Title
├── Description: What must be true
├── Verification Method: How to test
├── Evidence Required: What to capture
├── Pass Condition: Exact pass/fail criteria
└── Owner: Who verifies
```

**Status Legend:**
- ✅ PASS - Criterion met, evidence captured
- ❌ FAIL - Criterion not met, remediation needed
- ⏳ BLOCKED - Cannot test due to dependency
- 🔄 IN PROGRESS - Testing underway

---

# PHASE 0: Emergency Security Response

**Phase Duration:** 1 Day (IMMEDIATE)
**Phase Owner:** DevOps Lead
**Criticality:** P0 - CRITICAL

## Phase 0 Success Gate

> **This phase MUST be 100% complete before ANY other work proceeds.**
> **Zero tolerance for partial completion.**

---

## AC-0.1: Action Network API Key Rotation

### AC-0.1.1: Old API Key Revoked
| Attribute | Value |
|-----------|-------|
| **Description** | The exposed API key `5da2d0acf27fa1d4d541253eb71bc60b` must be completely invalidated and return authentication errors when used |
| **Verification Method** | Direct API call using old key |
| **Test Command** | `curl -X GET "https://actionnetwork.org/api/v2/people" -H "OSDI-API-Token: 5da2d0acf27fa1d4d541253eb71bc60b"` |
| **Pass Condition** | Response is `401 Unauthorized` or `403 Forbidden` |
| **Fail Condition** | Response is `200 OK` or any data is returned |
| **Evidence Required** | Screenshot of terminal showing 401/403 response with timestamp |
| **Owner** | DevOps Lead |
| **Status** | ⬜ |

### AC-0.1.2: New API Key Generated
| Attribute | Value |
|-----------|-------|
| **Description** | A new Action Network API key has been generated in the Action Network dashboard |
| **Verification Method** | Action Network dashboard inspection |
| **Pass Condition** | New key visible in AN dashboard, created after old key revocation |
| **Fail Condition** | No new key exists, or new key created before old key revoked |
| **Evidence Required** | Screenshot of AN dashboard showing new key (last 4 chars only) with creation date |
| **Owner** | DevOps Lead |
| **Status** | ⬜ |

### AC-0.1.3: New Key Stored in Vercel Environment Variables
| Attribute | Value |
|-----------|-------|
| **Description** | New API key is stored ONLY in Vercel Environment Variables, not in any code file |
| **Verification Method** | 1) Vercel dashboard check 2) Codebase grep |
| **Test Command** | `grep -r "ACTION_NETWORK_API_KEY" --include="*.ts" --include="*.tsx" --include="*.js" --include="*.env*" .` |
| **Pass Condition** | Key present in Vercel dashboard AND grep returns NO results with actual key value |
| **Fail Condition** | Key found in any file in repository |
| **Evidence Required** | 1) Vercel dashboard screenshot showing variable exists 2) Terminal output showing grep found no key values |
| **Owner** | DevOps Lead |
| **Status** | ⬜ |

### AC-0.1.4: New Key Stored in Team Password Manager
| Attribute | Value |
|-----------|-------|
| **Description** | New API key is documented in team's secure credential storage (1Password, LastPass, etc.) |
| **Verification Method** | Password manager inspection |
| **Pass Condition** | Entry exists with key value, access restricted to authorized personnel |
| **Fail Condition** | Key not in password manager, or accessible to unauthorized users |
| **Evidence Required** | Screenshot of password manager entry (key value redacted) |
| **Owner** | DevOps Lead |
| **Status** | ⬜ |

### AC-0.1.5: Production Deployment Successful with New Key
| Attribute | Value |
|-----------|-------|
| **Description** | Website deploys successfully and can communicate with Action Network using new key |
| **Verification Method** | Production deployment + form submission test |
| **Pass Condition** | Deployment succeeds AND test form submission appears in Action Network |
| **Fail Condition** | Deployment fails OR form submission fails OR data not in Action Network |
| **Evidence Required** | 1) Vercel deployment success screenshot 2) Action Network showing test submission |
| **Owner** | DevOps Lead |
| **Status** | ⬜ |

### AC-0.1.6: Form Submission End-to-End Test
| Attribute | Value |
|-----------|-------|
| **Description** | A real form submission from production website successfully reaches Action Network |
| **Verification Method** | Submit test form on live site, verify in Action Network |
| **Test Steps** | 1) Go to /join on production 2) Submit with test email 3) Check Action Network for entry |
| **Pass Condition** | Test submission visible in Action Network within 60 seconds |
| **Fail Condition** | Submission not in Action Network, or error during submission |
| **Evidence Required** | Screenshots of: 1) Form success message 2) Action Network entry with matching data |
| **Owner** | QA Lead |
| **Status** | ⬜ |

### AC-0.1.7: Action Network Audit Log Reviewed
| Attribute | Value |
|-----------|-------|
| **Description** | Action Network audit/activity logs reviewed for unauthorized access during exposure period |
| **Verification Method** | Action Network dashboard audit log review |
| **Review Period** | From [date .env.local was committed] to [date key was revoked] |
| **Pass Condition** | No unauthorized API calls, exports, or suspicious activity identified |
| **Fail Condition** | Evidence of unauthorized access found (triggers incident escalation) |
| **Evidence Required** | Export of audit log for review period + written assessment |
| **Escalation** | If FAIL: Immediately notify Legal, DPO; potential breach notification required |
| **Owner** | DevOps Lead + DPO |
| **Status** | ⬜ |

---

## AC-0.2: Vercel OIDC Token Rotation

### AC-0.2.1: Old OIDC Token Invalidated
| Attribute | Value |
|-----------|-------|
| **Description** | The exposed Vercel OIDC token is invalidated |
| **Verification Method** | Vercel dashboard + attempt to use old token |
| **Pass Condition** | Old token returns authentication error when used |
| **Fail Condition** | Old token still functional |
| **Evidence Required** | Screenshot of Vercel showing token invalidated |
| **Owner** | DevOps Lead |
| **Status** | ⬜ |

### AC-0.2.2: New OIDC Token Generated (If Required)
| Attribute | Value |
|-----------|-------|
| **Description** | If OIDC token is required for deployments, new token generated |
| **Verification Method** | Vercel dashboard |
| **Pass Condition** | New token exists OR documentation that token not needed |
| **Fail Condition** | Token needed but not regenerated |
| **Evidence Required** | Screenshot or documentation |
| **Owner** | DevOps Lead |
| **Status** | ⬜ |

### AC-0.2.3: Vercel Deployment Logs Reviewed
| Attribute | Value |
|-----------|-------|
| **Description** | Vercel deployment logs reviewed for unauthorized deployments |
| **Verification Method** | Vercel dashboard deployment history |
| **Review Period** | Past 30 days |
| **Pass Condition** | All deployments match expected team activity |
| **Fail Condition** | Unknown deployments found |
| **Evidence Required** | Export of deployment history + assessment |
| **Owner** | DevOps Lead |
| **Status** | ⬜ |

### AC-0.2.4: All Team Members with Vercel Access Verified
| Attribute | Value |
|-----------|-------|
| **Description** | Verify all users with Vercel project access are authorized |
| **Verification Method** | Vercel team members list review |
| **Pass Condition** | All listed users are current, authorized team members |
| **Fail Condition** | Unknown or departed users have access |
| **Evidence Required** | Screenshot of Vercel team members list |
| **Owner** | DevOps Lead |
| **Status** | ⬜ |

---

## AC-0.3: Version Control Security

### AC-0.3.1: .env.local in .gitignore
| Attribute | Value |
|-----------|-------|
| **Description** | `.env.local` is listed in `.gitignore` file |
| **Verification Method** | File inspection |
| **Test Command** | `grep -E "^\.env\.local$|^\.env\*\.local$" .gitignore` |
| **Pass Condition** | Grep returns matching line(s) |
| **Fail Condition** | No match found |
| **Evidence Required** | Terminal output showing grep result |
| **Owner** | Engineering Lead |
| **Status** | ⬜ |

### AC-0.3.2: .env.local Not Tracked by Git
| Attribute | Value |
|-----------|-------|
| **Description** | `.env.local` is not currently tracked by git |
| **Verification Method** | Git status check |
| **Test Command** | `git ls-files | grep -E "\.env\.local$"` |
| **Pass Condition** | Command returns empty (no output) |
| **Fail Condition** | File path returned |
| **Evidence Required** | Terminal output showing empty result |
| **Owner** | Engineering Lead |
| **Status** | ⬜ |

### AC-0.3.3: Git History Scrubbed (If Previously Committed)
| Attribute | Value |
|-----------|-------|
| **Description** | If `.env.local` was previously committed, history has been rewritten to remove it |
| **Verification Method** | Git log search |
| **Test Command** | `git log --all --full-history -- .env.local` |
| **Pass Condition** | Command returns empty OR only shows deletion commit |
| **Fail Condition** | Historical commits with file content exist |
| **Evidence Required** | Terminal output + documentation of history rewrite if performed |
| **Note** | If history rewritten, all team members must re-clone |
| **Owner** | Engineering Lead |
| **Status** | ⬜ |

### AC-0.3.4: Team Notified of Repository Changes
| Attribute | Value |
|-----------|-------|
| **Description** | If git history was rewritten, all team members notified to re-clone |
| **Verification Method** | Communication record |
| **Pass Condition** | Email/Slack sent to all contributors with instructions, OR history not rewritten |
| **Fail Condition** | History rewritten but team not notified |
| **Evidence Required** | Screenshot of notification OR "N/A - history not rewritten" |
| **Owner** | Engineering Lead |
| **Status** | ⬜ |

### AC-0.3.5: GitHub/GitLab Secret Scanning Enabled
| Attribute | Value |
|-----------|-------|
| **Description** | Repository has automated secret scanning enabled |
| **Verification Method** | Repository settings inspection |
| **Pass Condition** | Secret scanning feature enabled and active |
| **Fail Condition** | Feature not enabled or not available |
| **Evidence Required** | Screenshot of repository security settings |
| **Owner** | DevOps Lead |
| **Status** | ⬜ |

### AC-0.3.6: Pre-Commit Hook Prevents Secret Commits
| Attribute | Value |
|-----------|-------|
| **Description** | Pre-commit hook installed that scans for secrets before allowing commits |
| **Verification Method** | Attempt to commit file with fake secret |
| **Test Steps** | 1) Create test file with fake API key pattern 2) Attempt `git add` + `git commit` 3) Verify hook blocks commit |
| **Pass Condition** | Commit blocked with warning about detected secret |
| **Fail Condition** | Commit succeeds with secret in staged file |
| **Evidence Required** | Terminal output showing blocked commit |
| **Owner** | Engineering Lead |
| **Status** | ⬜ |

---

## AC-0.4: Secret Scanning Implementation

### AC-0.4.1: detect-secrets or gitleaks Installed
| Attribute | Value |
|-----------|-------|
| **Description** | Secret scanning tool installed in project |
| **Verification Method** | Check for tool installation |
| **Test Command** | `detect-secrets --version` OR `gitleaks version` |
| **Pass Condition** | Version number returned |
| **Fail Condition** | Command not found |
| **Evidence Required** | Terminal output showing version |
| **Owner** | Engineering Lead |
| **Status** | ⬜ |

### AC-0.4.2: Baseline File Created
| Attribute | Value |
|-----------|-------|
| **Description** | Secret scanning baseline file exists to track known false positives |
| **Verification Method** | File existence check |
| **Test Command** | `ls -la .secrets.baseline` OR equivalent |
| **Pass Condition** | File exists |
| **Fail Condition** | File does not exist |
| **Evidence Required** | Terminal output showing file |
| **Owner** | Engineering Lead |
| **Status** | ⬜ |

### AC-0.4.3: CI Pipeline Includes Secret Scanning
| Attribute | Value |
|-----------|-------|
| **Description** | CI/CD pipeline runs secret scan on every PR/push |
| **Verification Method** | CI configuration review + test PR |
| **Pass Condition** | Secret scan step visible in CI config AND runs on test PR |
| **Fail Condition** | No secret scan in CI pipeline |
| **Evidence Required** | Screenshot of CI pipeline with secret scan step |
| **Owner** | DevOps Lead |
| **Status** | ⬜ |

### AC-0.4.4: .env.example Created
| Attribute | Value |
|-----------|-------|
| **Description** | Template file exists showing required env vars without actual values |
| **Verification Method** | File inspection |
| **File Content Required** | All required env vars with placeholder values (e.g., `ACTION_NETWORK_API_KEY=your_key_here`) |
| **Pass Condition** | File exists AND contains no real secrets AND documents all required vars |
| **Fail Condition** | File missing OR contains real secrets |
| **Evidence Required** | Cat of file contents |
| **Owner** | Engineering Lead |
| **Status** | ⬜ |

---

## AC-0.5: Incident Documentation

### AC-0.5.1: Incident Report Created
| Attribute | Value |
|-----------|-------|
| **Description** | Formal incident report documenting the credential exposure |
| **Verification Method** | Document review |
| **Required Sections** | Timeline, Impact Assessment, Root Cause, Remediation Steps, Lessons Learned |
| **Pass Condition** | All required sections completed with accurate information |
| **Fail Condition** | Report missing or incomplete |
| **Evidence Required** | Copy of incident report |
| **Owner** | Project Lead |
| **Status** | ⬜ |

### AC-0.5.2: Impact Assessment Completed
| Attribute | Value |
|-----------|-------|
| **Description** | Assessment of what data could have been accessed during exposure |
| **Verification Method** | Assessment document review |
| **Required Analysis** | 1) What APIs were accessible 2) What data could be read 3) What actions could be taken 4) Evidence of actual unauthorized access |
| **Pass Condition** | Analysis completed for all exposed credentials |
| **Fail Condition** | Analysis incomplete or missing |
| **Evidence Required** | Impact assessment document |
| **Owner** | DPO + DevOps Lead |
| **Status** | ⬜ |

### AC-0.5.3: GDPR Breach Notification Determination Made
| Attribute | Value |
|-----------|-------|
| **Description** | Determination made on whether GDPR 72-hour breach notification is required |
| **Verification Method** | Decision document review |
| **GDPR Criteria** | Breach notification required if: personal data compromised AND likely risk to individuals |
| **Pass Condition** | Written determination with reasoning documented |
| **Fail Condition** | No determination made |
| **Evidence Required** | Signed determination document |
| **Decision Deadline** | 72 hours from discovery if breach occurred |
| **Owner** | DPO + Legal |
| **Status** | ⬜ |

### AC-0.5.4: Lessons Learned Documented
| Attribute | Value |
|-----------|-------|
| **Description** | Post-incident lessons learned captured to prevent recurrence |
| **Verification Method** | Document review |
| **Required Content** | What went wrong, why it happened, how to prevent, process changes |
| **Pass Condition** | Document completed and shared with team |
| **Fail Condition** | No lessons learned captured |
| **Evidence Required** | Lessons learned document |
| **Owner** | Project Lead |
| **Status** | ⬜ |

### AC-0.5.5: Report Stored in Compliance Documentation
| Attribute | Value |
|-----------|-------|
| **Description** | Incident report filed in official compliance records |
| **Verification Method** | Compliance folder inspection |
| **Pass Condition** | Report accessible in designated compliance storage |
| **Fail Condition** | Report not properly filed |
| **Evidence Required** | Screenshot of storage location |
| **Owner** | DPO |
| **Status** | ⬜ |

---

## Phase 0: Exit Criteria Summary

### Mandatory Exit Criteria (ALL must pass)

| ID | Criterion | Status |
|----|-----------|--------|
| AC-0.1.1 | Old Action Network API key returns 401 | ⬜ |
| AC-0.1.3 | New key in Vercel only, not in code | ⬜ |
| AC-0.1.5 | Production deployment successful | ⬜ |
| AC-0.1.6 | Form submission works end-to-end | ⬜ |
| AC-0.2.1 | Vercel OIDC token invalidated | ⬜ |
| AC-0.3.1 | .env.local in .gitignore | ⬜ |
| AC-0.3.2 | .env.local not tracked by git | ⬜ |
| AC-0.5.3 | Breach notification determination made | ⬜ |

### Phase 0 Sign-Off

| Role | Name | Signature | Date |
|------|------|-----------|------|
| DevOps Lead | | | |
| Engineering Lead | | | |
| DPO | | | |

**Phase 0 Status:** ⬜ NOT STARTED / 🔄 IN PROGRESS / ✅ COMPLETE

---

# PHASE 1: Critical Compliance Fixes

**Phase Duration:** 3-5 Days
**Phase Owner:** Engineering Lead
**Criticality:** P1 - HIGH
**Dependency:** Phase 0 COMPLETE

---

## AC-1.1: Analytics Consent Default Fix

### AC-1.1.1: Default Analytics Value is FALSE
| Attribute | Value |
|-----------|-------|
| **Description** | In CookieConsent.tsx, the default `analytics` preference is `false` |
| **Verification Method** | Code review |
| **File** | `src/components/ui/CookieConsent.tsx` |
| **Line** | ~74 (useState initialization) |
| **Pass Condition** | Code shows `analytics: false` in default state |
| **Fail Condition** | Code shows `analytics: true` |
| **Evidence Required** | Screenshot of code showing default value |
| **Owner** | Engineering Lead |
| **Status** | ⬜ |

### AC-1.1.2: New Visitors See Analytics Toggle OFF
| Attribute | Value |
|-----------|-------|
| **Description** | When banner is shown to new visitor, analytics toggle is in OFF position |
| **Verification Method** | Manual testing with cleared localStorage |
| **Test Steps** | 1) Clear localStorage 2) Reload page 3) Click "Manage my choices" 4) Verify analytics toggle is OFF |
| **Pass Condition** | Analytics toggle visually shows OFF state |
| **Fail Condition** | Analytics toggle shows ON state |
| **Evidence Required** | Screenshot of preferences panel showing OFF toggle |
| **Owner** | QA Lead |
| **Status** | ⬜ |

### AC-1.1.3: Vercel Analytics Does NOT Load Before Consent
| Attribute | Value |
|-----------|-------|
| **Description** | No network requests to Vercel Analytics domains before user grants consent |
| **Verification Method** | Browser Network tab inspection |
| **Test Steps** | 1) Clear localStorage and cookies 2) Open Network tab 3) Load site 4) Filter for "vercel" 5) Check for requests BEFORE interacting with banner |
| **Pass Condition** | Zero requests to `*.vercel-insights.com` or `*.vercel-analytics.com` before consent |
| **Fail Condition** | Any request to Vercel Analytics domains before consent granted |
| **Evidence Required** | Screenshot of Network tab filtered for "vercel" with timestamp |
| **Owner** | QA Lead |
| **Status** | ⬜ |

### AC-1.1.4: Existing Users with Stored Consent Unaffected
| Attribute | Value |
|-----------|-------|
| **Description** | Users who previously consented retain their stored preferences |
| **Verification Method** | Manual testing with pre-existing consent |
| **Test Steps** | 1) Set localStorage `bvp-cookie-consent` to `{"necessary":true,"analytics":true,"marketing":false}` 2) Reload page 3) Verify banner does NOT show 4) Verify analytics loads |
| **Pass Condition** | Banner hidden AND analytics loads (respecting stored consent) |
| **Fail Condition** | Banner shows OR analytics doesn't load for consented user |
| **Evidence Required** | Screenshot showing no banner + Network tab showing analytics loading |
| **Owner** | QA Lead |
| **Status** | ⬜ |

### AC-1.1.5: Unit Test Verifies Default State
| Attribute | Value |
|-----------|-------|
| **Description** | Automated unit test exists verifying default consent state |
| **Verification Method** | Test file review + test execution |
| **Test File** | `src/__tests__/components/CookieConsent.test.tsx` (or similar) |
| **Pass Condition** | Test exists AND passes AND specifically checks `analytics: false` default |
| **Fail Condition** | No test OR test fails OR test doesn't check default |
| **Evidence Required** | Test code screenshot + passing test output |
| **Owner** | Engineering Lead |
| **Status** | ⬜ |

### AC-1.1.6: E2E Test Confirms No Pre-Consent Tracking
| Attribute | Value |
|-----------|-------|
| **Description** | End-to-end test verifies no tracking before consent |
| **Verification Method** | E2E test execution (Playwright/Cypress) |
| **Pass Condition** | E2E test passes verifying no analytics requests before consent |
| **Fail Condition** | No E2E test OR test fails |
| **Evidence Required** | E2E test code + passing output |
| **Owner** | QA Lead |
| **Status** | ⬜ |

---

## AC-1.2: Join Form Consent Checkbox

### AC-1.2.1: Consent Checkbox Visible on All Form Variants
| Attribute | Value |
|-----------|-------|
| **Description** | Consent checkbox appears on Affiliate, Advocate, and Veteran form variants |
| **Verification Method** | Visual inspection of all form variants |
| **Test Steps** | Navigate to /join, test all form type tabs |
| **Pass Condition** | Checkbox visible on ALL form variants |
| **Fail Condition** | Checkbox missing from any variant |
| **Evidence Required** | Screenshots of all 3 form variants showing checkbox |
| **Owner** | QA Lead |
| **Status** | ⬜ |

### AC-1.2.2: Checkbox Unchecked by Default
| Attribute | Value |
|-----------|-------|
| **Description** | Consent checkbox is unchecked when form loads |
| **Verification Method** | Visual inspection + code review |
| **Pass Condition** | Checkbox visually unchecked AND code shows `checked={false}` or no default |
| **Fail Condition** | Checkbox checked by default |
| **Evidence Required** | Screenshot of unchecked checkbox + code snippet |
| **Owner** | QA Lead |
| **Status** | ⬜ |

### AC-1.2.3: Form Cannot Submit Without Consent
| Attribute | Value |
|-----------|-------|
| **Description** | Form submission blocked if consent checkbox not checked |
| **Verification Method** | Manual form submission test |
| **Test Steps** | 1) Fill all required fields 2) Leave consent unchecked 3) Click submit |
| **Pass Condition** | Form does NOT submit, error message shown |
| **Fail Condition** | Form submits without consent |
| **Evidence Required** | Screenshot showing validation error |
| **Owner** | QA Lead |
| **Status** | ⬜ |

### AC-1.2.4: Consent Text Mentions "Action Network"
| Attribute | Value |
|-----------|-------|
| **Description** | Consent checkbox label explicitly names Action Network as data recipient |
| **Verification Method** | Visual inspection |
| **Required Text** | Must contain "Action Network" (exact name) |
| **Pass Condition** | "Action Network" appears in checkbox label text |
| **Fail Condition** | Action Network not mentioned by name |
| **Evidence Required** | Screenshot of consent text with "Action Network" highlighted |
| **Owner** | QA Lead |
| **Status** | ⬜ |

### AC-1.2.5: Consent Text Mentions "Sensitive Data"
| Attribute | Value |
|-----------|-------|
| **Description** | Consent text explicitly mentions sensitive/special category data |
| **Verification Method** | Visual inspection |
| **Required Reference** | Text must reference sensitive categories (military service, demographics, life experiences) |
| **Pass Condition** | Sensitive data categories mentioned |
| **Fail Condition** | No mention of sensitive data |
| **Evidence Required** | Screenshot of consent text |
| **Owner** | Legal + QA Lead |
| **Status** | ⬜ |

### AC-1.2.6: Link to Action Network Privacy Policy Functional
| Attribute | Value |
|-----------|-------|
| **Description** | Consent text contains working link to Action Network privacy policy |
| **Verification Method** | Click test |
| **Expected URL** | `https://actionnetwork.org/privacy` or similar |
| **Pass Condition** | Link exists, opens correct page in new tab |
| **Fail Condition** | No link OR link broken OR wrong destination |
| **Evidence Required** | Screenshot showing link + destination page |
| **Owner** | QA Lead |
| **Status** | ⬜ |

### AC-1.2.7: Link to BVP Privacy Policy Functional
| Attribute | Value |
|-----------|-------|
| **Description** | Consent text contains working link to BVP privacy policy |
| **Verification Method** | Click test |
| **Expected URL** | `/privacy` |
| **Pass Condition** | Link exists and navigates to privacy policy |
| **Fail Condition** | No link OR link broken |
| **Evidence Required** | Screenshot showing link + destination |
| **Owner** | QA Lead |
| **Status** | ⬜ |

### AC-1.2.8: Withdrawal Instructions Included
| Attribute | Value |
|-----------|-------|
| **Description** | Consent text explains how to withdraw consent |
| **Verification Method** | Visual inspection |
| **Required Content** | Contact email or method for withdrawal |
| **Pass Condition** | Clear withdrawal instructions present (e.g., "contact info@blackveteransproject.org") |
| **Fail Condition** | No withdrawal instructions |
| **Evidence Required** | Screenshot of consent text showing withdrawal info |
| **Owner** | Legal + QA Lead |
| **Status** | ⬜ |

### AC-1.2.9: Consent State Included in API Payload
| Attribute | Value |
|-----------|-------|
| **Description** | Form submission includes consent flag in data sent to API |
| **Verification Method** | Network tab inspection of form submission |
| **Test Steps** | Submit form, inspect POST request payload |
| **Pass Condition** | Payload includes consent field (e.g., `consent: true` or `gdpr_consent_given: true`) |
| **Fail Condition** | No consent field in payload |
| **Evidence Required** | Screenshot of Network tab showing payload with consent field |
| **Owner** | QA Lead |
| **Status** | ⬜ |

### AC-1.2.10: API Records Consent Timestamp
| Attribute | Value |
|-----------|-------|
| **Description** | Backend API includes consent timestamp in data sent to Action Network |
| **Verification Method** | Code review + Action Network verification |
| **Pass Condition** | API code adds ISO 8601 timestamp AND timestamp visible in Action Network custom field |
| **Fail Condition** | No timestamp recorded |
| **Evidence Required** | Code screenshot + Action Network entry showing timestamp |
| **Owner** | Engineering Lead |
| **Status** | ⬜ |

### AC-1.2.11: Checkbox Has Proper aria-describedby
| Attribute | Value |
|-----------|-------|
| **Description** | Checkbox input has `aria-describedby` linking to description text |
| **Verification Method** | DOM inspection |
| **Pass Condition** | `aria-describedby` attribute present and references valid element ID |
| **Fail Condition** | No aria-describedby OR references non-existent ID |
| **Evidence Required** | Screenshot of DOM inspector showing aria attribute |
| **Owner** | QA Lead (Accessibility) |
| **Status** | ⬜ |

### AC-1.2.12: Checkbox Touch Target Meets 44x44px Minimum
| Attribute | Value |
|-----------|-------|
| **Description** | Checkbox clickable area is at least 44x44 pixels (Apple HIG standard) |
| **Verification Method** | Element measurement in dev tools |
| **Pass Condition** | Clickable area >= 44px width AND >= 44px height |
| **Fail Condition** | Either dimension < 44px |
| **Evidence Required** | Screenshot of element dimensions in dev tools |
| **Owner** | QA Lead |
| **Status** | ⬜ |

---

## AC-1.3: Feedback Widget Consent

### AC-1.3.1: Consent Dialog Appears Before Feedback Mode
| Attribute | Value |
|-----------|-------|
| **Description** | User sees consent dialog before feedback capture mode activates |
| **Verification Method** | Manual testing |
| **Test Steps** | 1) Click feedback trigger 2) Verify dialog appears BEFORE crosshair cursor |
| **Pass Condition** | Dialog appears first, mode only enables after "I Agree" |
| **Fail Condition** | Feedback mode activates without consent |
| **Evidence Required** | Screenshot of consent dialog |
| **Owner** | QA Lead |
| **Status** | ⬜ |

### AC-1.3.2: Dialog Lists All Captured Data
| Attribute | Value |
|-----------|-------|
| **Description** | Consent dialog explicitly lists what data will be captured |
| **Verification Method** | Visual inspection |
| **Required Items** | Screenshot, browser/device info, page URL, click position |
| **Pass Condition** | All data types listed |
| **Fail Condition** | Any data type not mentioned |
| **Evidence Required** | Screenshot of dialog content |
| **Owner** | QA Lead |
| **Status** | ⬜ |

### AC-1.3.3: Dialog Mentions Google Sheets
| Attribute | Value |
|-----------|-------|
| **Description** | If feedback is sent to Google Sheets, dialog discloses this |
| **Verification Method** | Visual inspection |
| **Pass Condition** | Google Sheets mentioned (if applicable) OR documented as not used |
| **Fail Condition** | Data sent to Google Sheets but not disclosed |
| **Evidence Required** | Screenshot OR documentation that Sheets not used |
| **Owner** | QA Lead |
| **Status** | ⬜ |

### AC-1.3.4: User Can Decline Without Enabling Feedback
| Attribute | Value |
|-----------|-------|
| **Description** | Clicking "No Thanks" or similar closes dialog without enabling feedback |
| **Verification Method** | Manual testing |
| **Pass Condition** | Dialog closes, feedback mode NOT enabled |
| **Fail Condition** | Feedback mode enables despite decline |
| **Evidence Required** | Recording showing decline flow |
| **Owner** | QA Lead |
| **Status** | ⬜ |

### AC-1.3.5: Consent Choice Persisted
| Attribute | Value |
|-----------|-------|
| **Description** | After consenting once, user doesn't see dialog again (until consent expires) |
| **Verification Method** | Manual testing |
| **Test Steps** | 1) Consent 2) Close feedback 3) Re-open feedback |
| **Pass Condition** | Dialog doesn't appear on subsequent uses |
| **Fail Condition** | Dialog appears every time |
| **Evidence Required** | localStorage inspection showing consent flag |
| **Owner** | QA Lead |
| **Status** | ⬜ |

### AC-1.3.6: Consent Can Be Revoked
| Attribute | Value |
|-----------|-------|
| **Description** | Mechanism exists to reset feedback consent |
| **Verification Method** | Manual testing |
| **Pass Condition** | User can clear/reset feedback consent (e.g., in cookie settings or feedback menu) |
| **Fail Condition** | No way to revoke consent |
| **Evidence Required** | Screenshot of revocation mechanism |
| **Owner** | QA Lead |
| **Status** | ⬜ |

### AC-1.3.7: Screenshot Capture Only After Consent
| Attribute | Value |
|-----------|-------|
| **Description** | html2canvas or screenshot function only called after consent |
| **Verification Method** | Code review |
| **Pass Condition** | Screenshot code inside consent-gated block |
| **Fail Condition** | Screenshot code can execute without consent check |
| **Evidence Required** | Code screenshot showing consent check |
| **Owner** | Engineering Lead |
| **Status** | ⬜ |

### AC-1.3.8: API Rejects Feedback Without Consent Flag
| Attribute | Value |
|-----------|-------|
| **Description** | `/api/feedback` endpoint requires consent flag in request |
| **Verification Method** | API test |
| **Test Command** | `curl -X POST /api/feedback -d '{"comment":"test"}' -H "Content-Type: application/json"` |
| **Pass Condition** | Returns 400 Bad Request or similar without consent flag |
| **Fail Condition** | Accepts request without consent verification |
| **Evidence Required** | API response showing rejection |
| **Owner** | Engineering Lead |
| **Status** | ⬜ |

### AC-1.3.9: Dialog is Accessible
| Attribute | Value |
|-----------|-------|
| **Description** | Dialog has focus trap, keyboard navigation, and ARIA attributes |
| **Verification Method** | Accessibility testing |
| **Required** | role="dialog", aria-modal="true", focus trap, Escape to close |
| **Pass Condition** | All accessibility requirements met |
| **Fail Condition** | Any requirement missing |
| **Evidence Required** | WAVE or axe audit results |
| **Owner** | QA Lead (Accessibility) |
| **Status** | ⬜ |

### AC-1.3.10: Consent Timestamp Logged
| Attribute | Value |
|-----------|-------|
| **Description** | Feedback submission includes timestamp of when user consented |
| **Verification Method** | API payload inspection |
| **Pass Condition** | `consentedAt` or similar field in submission |
| **Fail Condition** | No consent timestamp |
| **Evidence Required** | Payload screenshot |
| **Owner** | QA Lead |
| **Status** | ⬜ |

---

## AC-1.4: UTM Capture Gating

### AC-1.4.1: captureUTMParams Only Called with Consent
| Attribute | Value |
|-----------|-------|
| **Description** | `captureUTMParams()` function only executes when `hasAnalyticsConsent` is true |
| **Verification Method** | Code review |
| **File** | `src/components/providers/ConsentAwareAnalytics.tsx` |
| **Pass Condition** | `captureUTMParams()` inside `if (hasAnalyticsConsent)` block or equivalent |
| **Fail Condition** | Called unconditionally |
| **Evidence Required** | Code screenshot |
| **Owner** | Engineering Lead |
| **Status** | ⬜ |

### AC-1.4.2: sessionStorage Empty Without Consent
| Attribute | Value |
|-----------|-------|
| **Description** | `bvp_utm_params` key not set in sessionStorage without analytics consent |
| **Verification Method** | Manual testing |
| **Test Steps** | 1) Clear storage 2) Visit page with UTM params 3) Reject/ignore consent 4) Check sessionStorage |
| **Pass Condition** | `bvp_utm_params` key does not exist |
| **Fail Condition** | Key exists with UTM data |
| **Evidence Required** | Screenshot of sessionStorage inspection |
| **Owner** | QA Lead |
| **Status** | ⬜ |

### AC-1.4.3: UTM Captured After Granting Consent
| Attribute | Value |
|-----------|-------|
| **Description** | If user grants consent while UTM params in URL, they get captured |
| **Verification Method** | Manual testing |
| **Test Steps** | 1) Visit page with UTM params 2) Grant analytics consent 3) Check sessionStorage |
| **Pass Condition** | UTM params captured after consent |
| **Fail Condition** | UTM params lost |
| **Evidence Required** | Screenshot of sessionStorage with UTM data |
| **Owner** | QA Lead |
| **Status** | ⬜ |

### AC-1.4.4: UTM Cleared When Consent Revoked
| Attribute | Value |
|-----------|-------|
| **Description** | Revoking analytics consent clears stored UTM params |
| **Verification Method** | Manual testing |
| **Test Steps** | 1) Grant consent, capture UTM 2) Open cookie settings 3) Disable analytics 4) Check sessionStorage |
| **Pass Condition** | `bvp_utm_params` removed from sessionStorage |
| **Fail Condition** | UTM data persists after consent revoked |
| **Evidence Required** | Before/after screenshots of sessionStorage |
| **Owner** | QA Lead |
| **Status** | ⬜ |

### AC-1.4.5: Unit Test for UTM Consent Gating
| Attribute | Value |
|-----------|-------|
| **Description** | Automated test verifies UTM capture respects consent |
| **Verification Method** | Test execution |
| **Pass Condition** | Test exists and passes |
| **Fail Condition** | No test or test fails |
| **Evidence Required** | Test output |
| **Owner** | Engineering Lead |
| **Status** | ⬜ |

### AC-1.4.6: Referrer Capture Also Gated
| Attribute | Value |
|-----------|-------|
| **Description** | `getReferrerInfo()` also respects analytics consent |
| **Verification Method** | Code review |
| **Pass Condition** | Referrer capture inside consent-gated block |
| **Fail Condition** | Referrer captured without consent |
| **Evidence Required** | Code screenshot |
| **Owner** | Engineering Lead |
| **Status** | ⬜ |

---

## AC-1.5: Contact Form Privacy Notice

### AC-1.5.1: Privacy Notice Visible Above Submit
| Attribute | Value |
|-----------|-------|
| **Description** | Privacy notice text appears above or near submit button |
| **Verification Method** | Visual inspection |
| **Pass Condition** | Notice visible without scrolling when submit button visible |
| **Fail Condition** | Notice hidden or far from submit |
| **Evidence Required** | Screenshot of form with notice and submit visible |
| **Owner** | QA Lead |
| **Status** | ⬜ |

### AC-1.5.2: Privacy Policy Link Functional
| Attribute | Value |
|-----------|-------|
| **Description** | Link to privacy policy in notice works |
| **Verification Method** | Click test |
| **Pass Condition** | Link navigates to /privacy |
| **Fail Condition** | Link broken or missing |
| **Evidence Required** | Screenshot |
| **Owner** | QA Lead |
| **Status** | ⬜ |

### AC-1.5.3: Purpose Explained
| Attribute | Value |
|-----------|-------|
| **Description** | Notice explains what data will be used for |
| **Verification Method** | Content review |
| **Pass Condition** | Text explains purpose (respond to inquiry) |
| **Fail Condition** | No purpose stated |
| **Evidence Required** | Screenshot of notice text |
| **Owner** | QA Lead |
| **Status** | ⬜ |

### AC-1.5.4: CRM Storage Mentioned
| Attribute | Value |
|-----------|-------|
| **Description** | Notice mentions data may be stored in CRM (when connected) |
| **Verification Method** | Content review |
| **Pass Condition** | CRM or equivalent storage mentioned |
| **Fail Condition** | Storage not mentioned |
| **Evidence Required** | Screenshot |
| **Owner** | QA Lead |
| **Status** | ⬜ |

---

## AC-1.6: Newsletter Form Disclosure

### AC-1.6.1: Notice Mentions Action Network
| Attribute | Value |
|-----------|-------|
| **Description** | Newsletter signup notice names Action Network as processor |
| **Verification Method** | Visual inspection |
| **Pass Condition** | "Action Network" explicitly mentioned |
| **Fail Condition** | Generic language without naming processor |
| **Evidence Required** | Screenshot |
| **Owner** | QA Lead |
| **Status** | ⬜ |

### AC-1.6.2: Privacy Policy Linked
| Attribute | Value |
|-----------|-------|
| **Description** | Link to privacy policy included |
| **Verification Method** | Visual inspection + click test |
| **Pass Condition** | Link exists and works |
| **Fail Condition** | No link |
| **Evidence Required** | Screenshot |
| **Owner** | QA Lead |
| **Status** | ⬜ |

### AC-1.6.3: Unsubscribe Mentioned
| Attribute | Value |
|-----------|-------|
| **Description** | Ability to unsubscribe is mentioned |
| **Verification Method** | Content review |
| **Pass Condition** | "Unsubscribe" or similar mentioned |
| **Fail Condition** | No unsubscribe mention |
| **Evidence Required** | Screenshot |
| **Owner** | QA Lead |
| **Status** | ⬜ |

### AC-1.6.4: Notice Visible Before Submission
| Attribute | Value |
|-----------|-------|
| **Description** | Notice visible when user can submit form |
| **Verification Method** | Visual inspection |
| **Pass Condition** | Notice visible near submit mechanism |
| **Fail Condition** | Notice hidden until after submission |
| **Evidence Required** | Screenshot |
| **Owner** | QA Lead |
| **Status** | ⬜ |

---

## Phase 1: Exit Criteria Summary

### Mandatory Exit Criteria (ALL must pass)

| ID | Criterion | Status |
|----|-----------|--------|
| AC-1.1.1 | Analytics default is FALSE | ⬜ |
| AC-1.1.3 | No analytics before consent | ⬜ |
| AC-1.2.1 | Consent checkbox on all forms | ⬜ |
| AC-1.2.3 | Form blocked without consent | ⬜ |
| AC-1.2.4 | Action Network named in consent | ⬜ |
| AC-1.3.1 | Feedback consent dialog exists | ⬜ |
| AC-1.3.7 | Screenshot only after consent | ⬜ |
| AC-1.4.1 | UTM capture consent-gated | ⬜ |
| AC-1.5.1 | Contact form has notice | ⬜ |
| AC-1.6.1 | Newsletter mentions Action Network | ⬜ |

### Phase 1 Sign-Off

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Engineering Lead | | | |
| QA Lead | | | |
| Legal (review) | | | |

**Phase 1 Status:** ⬜ NOT STARTED / 🔄 IN PROGRESS / ✅ COMPLETE

---

# PHASE 2: Privacy Policy Overhaul

**Phase Duration:** 5-7 Days
**Phase Owner:** Legal + DPO
**Criticality:** P1 - HIGH
**Dependency:** Phase 1 COMPLETE

---

## AC-2.1: Privacy Policy Structure

### AC-2.1.1: All 15 GDPR Sections Present
| Attribute | Value |
|-----------|-------|
| **Description** | Privacy policy contains all required GDPR Article 13-14 sections |
| **Verification Method** | Document review against checklist |
| **Required Sections** | 1) Data Controller 2) DPO 3) Data Categories 4) Purposes 5) Legal Basis 6) Legitimate Interests 7) Recipients 8) International Transfers 9) Retention 10) User Rights 11) Withdraw Consent 12) Lodge Complaint 13) Statutory/Contractual 14) Automated Decisions 15) Cookies |
| **Pass Condition** | All 15 sections present with content |
| **Fail Condition** | Any section missing |
| **Evidence Required** | Checklist with section references |
| **Owner** | Legal + DPO |
| **Status** | ⬜ |

### AC-2.1.2: Plain Language Section Headings
| Attribute | Value |
|-----------|-------|
| **Description** | Section headings use plain language, not legal jargon |
| **Verification Method** | Readability review |
| **Pass Condition** | Headings understandable by general public |
| **Fail Condition** | GDPR article numbers used as headings |
| **Evidence Required** | Screenshot of table of contents |
| **Owner** | Legal |
| **Status** | ⬜ |

### AC-2.1.3: Table of Contents with Anchor Links
| Attribute | Value |
|-----------|-------|
| **Description** | Clickable table of contents at top of privacy page |
| **Verification Method** | Visual inspection + click test |
| **Pass Condition** | TOC exists, all links jump to correct sections |
| **Fail Condition** | No TOC or broken links |
| **Evidence Required** | Screenshot + test all links |
| **Owner** | QA Lead |
| **Status** | ⬜ |

### AC-2.1.4: Last Updated Date Displayed
| Attribute | Value |
|-----------|-------|
| **Description** | Date of last update prominently shown |
| **Verification Method** | Visual inspection |
| **Pass Condition** | Date visible near top or bottom of policy |
| **Fail Condition** | No date or date hidden |
| **Evidence Required** | Screenshot |
| **Owner** | QA Lead |
| **Status** | ⬜ |

### AC-2.1.5: Version Number Added
| Attribute | Value |
|-----------|-------|
| **Description** | Policy has version number for consent tracking |
| **Verification Method** | Visual inspection + code review |
| **Pass Condition** | Version visible on page AND in code constant |
| **Fail Condition** | No version number |
| **Evidence Required** | Screenshot + code snippet |
| **Owner** | Engineering Lead |
| **Status** | ⬜ |

---

## AC-2.2: Data Controller Information

### AC-2.2.1: Full Legal Entity Name
| Attribute | Value |
|-----------|-------|
| **Description** | Complete legal name of organization |
| **Verification Method** | Content review |
| **Pass Condition** | "Black Veterans Project, Inc." or full legal name |
| **Fail Condition** | Informal name only |
| **Evidence Required** | Screenshot |
| **Owner** | Legal |
| **Status** | ⬜ |

### AC-2.2.2: Physical Mailing Address
| Attribute | Value |
|-----------|-------|
| **Description** | Complete street address included |
| **Verification Method** | Content review |
| **Pass Condition** | Full address (street, city, state, ZIP) |
| **Fail Condition** | No address or PO Box only |
| **Evidence Required** | Screenshot |
| **Owner** | Legal |
| **Status** | ⬜ |

### AC-2.2.3: Tax ID Included
| Attribute | Value |
|-----------|-------|
| **Description** | EIN or tax ID displayed |
| **Verification Method** | Content review |
| **Pass Condition** | EIN present |
| **Fail Condition** | No tax ID |
| **Evidence Required** | Screenshot |
| **Owner** | Legal |
| **Status** | ⬜ |

### AC-2.2.4: Dedicated Privacy Email
| Attribute | Value |
|-----------|-------|
| **Description** | Privacy-specific email address (not general info@) |
| **Verification Method** | Content review |
| **Pass Condition** | privacy@blackveteransproject.org or similar |
| **Fail Condition** | Only general email |
| **Evidence Required** | Screenshot |
| **Owner** | Legal |
| **Status** | ⬜ |

### AC-2.2.5: DPO Information
| Attribute | Value |
|-----------|-------|
| **Description** | DPO contact OR explanation why not appointed |
| **Verification Method** | Content review |
| **Pass Condition** | DPO named with contact OR statement that DPO not required |
| **Fail Condition** | No DPO info and no explanation |
| **Evidence Required** | Screenshot |
| **Owner** | Legal + DPO |
| **Status** | ⬜ |

---

## AC-2.3: Legal Basis Documentation

### AC-2.3.1: Every Processing Activity Has Legal Basis
| Attribute | Value |
|-----------|-------|
| **Description** | Table mapping each data collection to GDPR legal basis |
| **Verification Method** | Content review |
| **Pass Condition** | All identified processing activities have legal basis stated |
| **Fail Condition** | Any activity without legal basis |
| **Evidence Required** | Screenshot of legal basis table |
| **Owner** | Legal + DPO |
| **Status** | ⬜ |

### AC-2.3.2: Article 9 Special Categories Addressed
| Attribute | Value |
|-----------|-------|
| **Description** | Explicit mention of race, gender, health data (Article 9) |
| **Verification Method** | Content review |
| **Pass Condition** | Article 9 data types listed with explicit consent basis |
| **Fail Condition** | Special categories not addressed |
| **Evidence Required** | Screenshot |
| **Owner** | Legal + DPO |
| **Status** | ⬜ |

### AC-2.3.3: Legitimate Interest Documented
| Attribute | Value |
|-----------|-------|
| **Description** | If legitimate interest claimed, details provided |
| **Verification Method** | Content review |
| **Pass Condition** | Legitimate interest explained OR not claimed |
| **Fail Condition** | Legitimate interest claimed without explanation |
| **Evidence Required** | Screenshot |
| **Owner** | Legal + DPO |
| **Status** | ⬜ |

### AC-2.3.4: Table Format for Readability
| Attribute | Value |
|-----------|-------|
| **Description** | Legal basis in table format for easy scanning |
| **Verification Method** | Visual inspection |
| **Pass Condition** | Table with columns: Activity, Data, Basis, Details |
| **Fail Condition** | Prose paragraphs only |
| **Evidence Required** | Screenshot |
| **Owner** | Legal |
| **Status** | ⬜ |

### AC-2.3.5: Plain Language Explanations
| Attribute | Value |
|-----------|-------|
| **Description** | Legal basis explained in understandable terms |
| **Verification Method** | Readability review |
| **Pass Condition** | Average person can understand each basis |
| **Fail Condition** | Pure legalese |
| **Evidence Required** | Sample paragraph review |
| **Owner** | Legal |
| **Status** | ⬜ |

---

## AC-2.4: Third-Party Documentation

### AC-2.4.1: All Third Parties Named
| Attribute | Value |
|-----------|-------|
| **Description** | Specific company names, not generic "service providers" |
| **Verification Method** | Content review against technical audit |
| **Required Names** | Action Network, Vercel, Google Analytics, Donately, Google Sheets |
| **Pass Condition** | All identified third parties listed by name |
| **Fail Condition** | Generic descriptions or missing parties |
| **Evidence Required** | Screenshot + comparison to tech audit |
| **Owner** | Legal + Engineering |
| **Status** | ⬜ |

### AC-2.4.2: Data Types per Third Party
| Attribute | Value |
|-----------|-------|
| **Description** | Specific data shared with each third party listed |
| **Verification Method** | Content review |
| **Pass Condition** | Data types listed per third party |
| **Fail Condition** | Generic "personal data" without specifics |
| **Evidence Required** | Screenshot of data sharing table |
| **Owner** | Legal + Engineering |
| **Status** | ⬜ |

### AC-2.4.3: Purpose per Third Party
| Attribute | Value |
|-----------|-------|
| **Description** | Why data is shared with each party explained |
| **Verification Method** | Content review |
| **Pass Condition** | Purpose stated for each third party |
| **Fail Condition** | No purpose explanation |
| **Evidence Required** | Screenshot |
| **Owner** | Legal |
| **Status** | ⬜ |

### AC-2.4.4: Third Party Locations Listed
| Attribute | Value |
|-----------|-------|
| **Description** | Country/jurisdiction for each third party |
| **Verification Method** | Content review |
| **Pass Condition** | Location (e.g., "USA") for each party |
| **Fail Condition** | No location info |
| **Evidence Required** | Screenshot |
| **Owner** | Legal |
| **Status** | ⬜ |

### AC-2.4.5: Links to Third Party Policies
| Attribute | Value |
|-----------|-------|
| **Description** | Links to each third party's privacy policy |
| **Verification Method** | Link test |
| **Pass Condition** | All links functional |
| **Fail Condition** | Missing or broken links |
| **Evidence Required** | Screenshot of links + test results |
| **Owner** | QA Lead |
| **Status** | ⬜ |

### AC-2.4.6: DPA Status Documented
| Attribute | Value |
|-----------|-------|
| **Description** | Statement that DPAs in place with processors |
| **Verification Method** | Content review |
| **Pass Condition** | Statement confirming DPAs exist |
| **Fail Condition** | No mention of DPAs |
| **Evidence Required** | Screenshot |
| **Owner** | Legal |
| **Status** | ⬜ |

---

## AC-2.5: International Transfer Disclosure

### AC-2.5.1: US Processing Disclosed
| Attribute | Value |
|-----------|-------|
| **Description** | Explicit statement that data processed in US |
| **Verification Method** | Content review |
| **Pass Condition** | "United States" or "USA" explicitly mentioned |
| **Fail Condition** | No mention of US processing |
| **Evidence Required** | Screenshot |
| **Owner** | Legal |
| **Status** | ⬜ |

### AC-2.5.2: Transfer Mechanism Stated
| Attribute | Value |
|-----------|-------|
| **Description** | Legal mechanism for transfer explained |
| **Verification Method** | Content review |
| **Pass Condition** | SCCs, consent, or other mechanism stated |
| **Fail Condition** | No transfer mechanism explanation |
| **Evidence Required** | Screenshot |
| **Owner** | Legal + DPO |
| **Status** | ⬜ |

### AC-2.5.3: US-Based Providers Listed
| Attribute | Value |
|-----------|-------|
| **Description** | List of service providers located in US |
| **Verification Method** | Content review |
| **Pass Condition** | All US providers listed |
| **Fail Condition** | List incomplete |
| **Evidence Required** | Screenshot |
| **Owner** | Legal |
| **Status** | ⬜ |

### AC-2.5.4: Different Protection Warning
| Attribute | Value |
|-----------|-------|
| **Description** | User informed US may have different protections |
| **Verification Method** | Content review |
| **Pass Condition** | Statement about potentially different protections |
| **Fail Condition** | No warning |
| **Evidence Required** | Screenshot |
| **Owner** | Legal |
| **Status** | ⬜ |

---

## AC-2.6: Retention Periods

### AC-2.6.1: Every Data Type Has Period
| Attribute | Value |
|-----------|-------|
| **Description** | Retention period defined for each data category |
| **Verification Method** | Content review |
| **Pass Condition** | All data types have retention period |
| **Fail Condition** | Any type without period |
| **Evidence Required** | Screenshot of retention table |
| **Owner** | Legal + DPO |
| **Status** | ⬜ |

### AC-2.6.2: Rationale Provided
| Attribute | Value |
|-----------|-------|
| **Description** | Reason for each retention period explained |
| **Verification Method** | Content review |
| **Pass Condition** | Rationale for each period (e.g., "tax compliance") |
| **Fail Condition** | No rationale |
| **Evidence Required** | Screenshot |
| **Owner** | Legal |
| **Status** | ⬜ |

### AC-2.6.3: Deletion Method Specified
| Attribute | Value |
|-----------|-------|
| **Description** | How data will be deleted explained |
| **Verification Method** | Content review |
| **Pass Condition** | Deletion method stated (auto, manual, anonymization) |
| **Fail Condition** | No deletion method |
| **Evidence Required** | Screenshot |
| **Owner** | Legal |
| **Status** | ⬜ |

### AC-2.6.4: No Indefinite Retention Without Justification
| Attribute | Value |
|-----------|-------|
| **Description** | No "indefinite" periods without strong justification |
| **Verification Method** | Content review |
| **Pass Condition** | All periods have end date OR justified |
| **Fail Condition** | Unjustified indefinite retention |
| **Evidence Required** | Screenshot |
| **Owner** | DPO |
| **Status** | ⬜ |

### AC-2.6.5: Retention Aligns with Legal Requirements
| Attribute | Value |
|-----------|-------|
| **Description** | Periods meet legal minimums (e.g., 7 years for tax) |
| **Verification Method** | Legal review |
| **Pass Condition** | All legal requirements met |
| **Fail Condition** | Periods shorter than legal requirements |
| **Evidence Required** | Legal sign-off |
| **Owner** | Legal |
| **Status** | ⬜ |

---

## AC-2.7: User Rights Documentation

### AC-2.7.1: All 8 Rights Documented
| Attribute | Value |
|-----------|-------|
| **Description** | Rights of access, rectification, erasure, restrict, portability, object, withdraw consent, lodge complaint |
| **Verification Method** | Content review |
| **Pass Condition** | All 8 rights explained |
| **Fail Condition** | Any right missing |
| **Evidence Required** | Screenshot or checklist |
| **Owner** | Legal + DPO |
| **Status** | ⬜ |

### AC-2.7.2: Exercise Instructions Provided
| Attribute | Value |
|-----------|-------|
| **Description** | Step-by-step instructions for exercising each right |
| **Verification Method** | Content review |
| **Pass Condition** | Clear instructions for each right |
| **Fail Condition** | Generic "contact us" without specifics |
| **Evidence Required** | Screenshot |
| **Owner** | Legal |
| **Status** | ⬜ |

### AC-2.7.3: Dedicated Email Provided
| Attribute | Value |
|-----------|-------|
| **Description** | Email address for rights requests |
| **Verification Method** | Content review |
| **Pass Condition** | Specific email provided (e.g., privacy@...) |
| **Fail Condition** | No email or general email only |
| **Evidence Required** | Screenshot |
| **Owner** | Legal |
| **Status** | ⬜ |

### AC-2.7.4: 30-Day Response Timeline Stated
| Attribute | Value |
|-----------|-------|
| **Description** | GDPR 30-day response deadline mentioned |
| **Verification Method** | Content review |
| **Pass Condition** | "30 days" or "one month" stated |
| **Fail Condition** | No timeline mentioned |
| **Evidence Required** | Screenshot |
| **Owner** | Legal |
| **Status** | ⬜ |

### AC-2.7.5: Exceptions Explained
| Attribute | Value |
|-----------|-------|
| **Description** | When rights may be limited (legal holds, etc.) |
| **Verification Method** | Content review |
| **Pass Condition** | Exceptions documented |
| **Fail Condition** | Absolute rights claimed (incorrect) |
| **Evidence Required** | Screenshot |
| **Owner** | Legal |
| **Status** | ⬜ |

### AC-2.7.6: No Charge Statement
| Attribute | Value |
|-----------|-------|
| **Description** | First request free, fees only for excessive requests |
| **Verification Method** | Content review |
| **Pass Condition** | Free first request stated |
| **Fail Condition** | Fees implied for all requests |
| **Evidence Required** | Screenshot |
| **Owner** | Legal |
| **Status** | ⬜ |

---

## AC-2.8: Supervisory Authority Information

### AC-2.8.1: Right to Complain Stated
| Attribute | Value |
|-----------|-------|
| **Description** | Explicit statement of right to file complaint |
| **Verification Method** | Content review |
| **Pass Condition** | Right explicitly mentioned |
| **Fail Condition** | No mention |
| **Evidence Required** | Screenshot |
| **Owner** | Legal |
| **Status** | ⬜ |

### AC-2.8.2: EDPB Link for EU
| Attribute | Value |
|-----------|-------|
| **Description** | Link to European Data Protection Board |
| **Verification Method** | Link test |
| **URL** | https://edpb.europa.eu |
| **Pass Condition** | Link present and functional |
| **Fail Condition** | No EU authority info |
| **Evidence Required** | Screenshot |
| **Owner** | QA Lead |
| **Status** | ⬜ |

### AC-2.8.3: ICO Information for UK
| Attribute | Value |
|-----------|-------|
| **Description** | UK Information Commissioner's Office contact |
| **Verification Method** | Content review |
| **Pass Condition** | ICO website and/or phone listed |
| **Fail Condition** | No UK authority info |
| **Evidence Required** | Screenshot |
| **Owner** | Legal |
| **Status** | ⬜ |

### AC-2.8.4: California AG for CCPA
| Attribute | Value |
|-----------|-------|
| **Description** | California Attorney General reference |
| **Verification Method** | Content review |
| **Pass Condition** | CA AG mentioned for California residents |
| **Fail Condition** | No CCPA authority info |
| **Evidence Required** | Screenshot |
| **Owner** | Legal |
| **Status** | ⬜ |

### AC-2.8.5: Contact BVP First Encouraged
| Attribute | Value |
|-----------|-------|
| **Description** | Encouragement to contact BVP before authority |
| **Verification Method** | Content review |
| **Pass Condition** | Statement encouraging direct contact first |
| **Fail Condition** | No such encouragement |
| **Evidence Required** | Screenshot |
| **Owner** | Legal |
| **Status** | ⬜ |

---

## AC-2.9: Cookie Policy

### AC-2.9.1: All Cookies Documented
| Attribute | Value |
|-----------|-------|
| **Description** | Every cookie used on site listed |
| **Verification Method** | Browser inspection vs policy |
| **Test Steps** | 1) Visit site 2) Accept cookies 3) List all cookies 4) Compare to policy |
| **Pass Condition** | All cookies in browser match policy list |
| **Fail Condition** | Undocumented cookies found |
| **Evidence Required** | Cookie list from browser + policy comparison |
| **Owner** | QA Lead + Engineering |
| **Status** | ⬜ |

### AC-2.9.2: Cookie Names Exact
| Attribute | Value |
|-----------|-------|
| **Description** | Actual cookie names listed (not generic descriptions) |
| **Verification Method** | Content review |
| **Pass Condition** | Names like `_ga`, `bvp-cookie-consent` listed |
| **Fail Condition** | Only "analytics cookie" without name |
| **Evidence Required** | Screenshot |
| **Owner** | Engineering |
| **Status** | ⬜ |

### AC-2.9.3: First vs Third Party Identified
| Attribute | Value |
|-----------|-------|
| **Description** | Each cookie marked as first or third party |
| **Verification Method** | Content review |
| **Pass Condition** | Classification column in cookie table |
| **Fail Condition** | No classification |
| **Evidence Required** | Screenshot |
| **Owner** | Engineering |
| **Status** | ⬜ |

### AC-2.9.4: Purpose Explained
| Attribute | Value |
|-----------|-------|
| **Description** | Plain language purpose for each cookie |
| **Verification Method** | Content review |
| **Pass Condition** | Purpose column with clear descriptions |
| **Fail Condition** | Technical descriptions only |
| **Evidence Required** | Screenshot |
| **Owner** | QA Lead |
| **Status** | ⬜ |

### AC-2.9.5: Duration Specified
| Attribute | Value |
|-----------|-------|
| **Description** | Expiry time for each cookie listed |
| **Verification Method** | Content review + browser verification |
| **Pass Condition** | Duration matches actual cookie expiry |
| **Fail Condition** | Incorrect or missing durations |
| **Evidence Required** | Screenshot + browser comparison |
| **Owner** | QA Lead |
| **Status** | ⬜ |

### AC-2.9.6: Category Aligned with Banner
| Attribute | Value |
|-----------|-------|
| **Description** | Cookie categories match consent banner options |
| **Verification Method** | Comparison |
| **Pass Condition** | Necessary/Analytics/Marketing categories consistent |
| **Fail Condition** | Misaligned categories |
| **Evidence Required** | Screenshot comparison |
| **Owner** | QA Lead |
| **Status** | ⬜ |

### AC-2.9.7: Third Party Policy Links
| Attribute | Value |
|-----------|-------|
| **Description** | Links to Google, Vercel cookie policies |
| **Verification Method** | Link test |
| **Pass Condition** | All links functional |
| **Fail Condition** | Missing or broken links |
| **Evidence Required** | Screenshot |
| **Owner** | QA Lead |
| **Status** | ⬜ |

### AC-2.9.8: Browser Management Instructions
| Attribute | Value |
|-----------|-------|
| **Description** | Instructions for managing cookies in browsers |
| **Verification Method** | Content review |
| **Pass Condition** | Instructions or links to major browsers' cookie settings |
| **Fail Condition** | No browser instructions |
| **Evidence Required** | Screenshot |
| **Owner** | Legal |
| **Status** | ⬜ |

---

## AC-2.10: Legal Approval

### AC-2.10.1: Legal Counsel Full Review
| Attribute | Value |
|-----------|-------|
| **Description** | Legal counsel has reviewed entire privacy policy |
| **Verification Method** | Sign-off document |
| **Pass Condition** | Written confirmation of review |
| **Fail Condition** | No legal review |
| **Evidence Required** | Signed review document |
| **Owner** | Legal |
| **Status** | ⬜ |

### AC-2.10.2: GDPR 13-14 Confirmed
| Attribute | Value |
|-----------|-------|
| **Description** | Legal confirms all GDPR requirements met |
| **Verification Method** | Legal sign-off |
| **Pass Condition** | Written GDPR compliance confirmation |
| **Fail Condition** | No confirmation |
| **Evidence Required** | Compliance certificate |
| **Owner** | Legal + DPO |
| **Status** | ⬜ |

### AC-2.10.3: CCPA Confirmed (If Applicable)
| Attribute | Value |
|-----------|-------|
| **Description** | CCPA requirements met for California users |
| **Verification Method** | Legal review |
| **Pass Condition** | CCPA compliance confirmed |
| **Fail Condition** | CCPA gaps identified |
| **Evidence Required** | Legal sign-off |
| **Owner** | Legal |
| **Status** | ⬜ |

### AC-2.10.4: Readability Score Acceptable
| Attribute | Value |
|-----------|-------|
| **Description** | Policy readable by general public |
| **Verification Method** | Readability tool (Flesch-Kincaid) |
| **Pass Condition** | Grade level < 12 (high school) |
| **Fail Condition** | Grade level > 12 |
| **Evidence Required** | Readability score report |
| **Owner** | Legal |
| **Status** | ⬜ |

### AC-2.10.5: Sign-Off Document Provided
| Attribute | Value |
|-----------|-------|
| **Description** | Formal sign-off on policy approval |
| **Verification Method** | Document exists |
| **Pass Condition** | Signed document with date |
| **Fail Condition** | No sign-off |
| **Evidence Required** | Scanned sign-off |
| **Owner** | Legal |
| **Status** | ⬜ |

### AC-2.10.6: Version Number Assigned
| Attribute | Value |
|-----------|-------|
| **Description** | Policy has version for tracking |
| **Verification Method** | Policy review |
| **Format** | e.g., "v2026.04.01" or similar |
| **Pass Condition** | Version visible on policy |
| **Fail Condition** | No version |
| **Evidence Required** | Screenshot |
| **Owner** | Legal |
| **Status** | ⬜ |

---

## Phase 2: Exit Criteria Summary

### Mandatory Exit Criteria (ALL must pass)

| ID | Criterion | Status |
|----|-----------|--------|
| AC-2.1.1 | All 15 GDPR sections present | ⬜ |
| AC-2.2.1 | Full legal entity name | ⬜ |
| AC-2.3.1 | Legal basis for all processing | ⬜ |
| AC-2.4.1 | All third parties named | ⬜ |
| AC-2.5.1 | US processing disclosed | ⬜ |
| AC-2.6.1 | Retention periods defined | ⬜ |
| AC-2.7.1 | All 8 user rights documented | ⬜ |
| AC-2.8.1 | Right to complain stated | ⬜ |
| AC-2.9.1 | All cookies documented | ⬜ |
| AC-2.10.1 | Legal counsel review complete | ⬜ |
| AC-2.10.5 | Sign-off document provided | ⬜ |

### Phase 2 Sign-Off

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Legal Counsel | | | |
| DPO | | | |
| Project Lead | | | |

**Phase 2 Status:** ⬜ NOT STARTED / 🔄 IN PROGRESS / ✅ COMPLETE

---

# PHASE 3: User Rights Implementation

**Phase Duration:** 7-10 Days
**Phase Owner:** Engineering Lead
**Criticality:** P1 - HIGH
**Dependency:** Phase 2 COMPLETE

---

## AC-3.1: DSAR Form

### AC-3.1.1: Form Accessible at Dedicated URL
| Attribute | Value |
|-----------|-------|
| **Description** | DSAR form available at discoverable URL |
| **Verification Method** | Navigation test |
| **Expected URL** | `/privacy/request` or `/dsar` or similar |
| **Pass Condition** | Page loads with form |
| **Fail Condition** | 404 or form missing |
| **Evidence Required** | Screenshot of form |
| **Owner** | QA Lead |
| **Status** | ⬜ |

### AC-3.1.2: All Request Types Available
| Attribute | Value |
|-----------|-------|
| **Description** | Form supports all GDPR data subject request types |
| **Verification Method** | Form inspection |
| **Required Types** | Access, Deletion, Rectification, Portability, Restrict, Object |
| **Pass Condition** | All types in dropdown/selection |
| **Fail Condition** | Any type missing |
| **Evidence Required** | Screenshot of request type options |
| **Owner** | QA Lead |
| **Status** | ⬜ |

### AC-3.1.3: Email Validation
| Attribute | Value |
|-----------|-------|
| **Description** | Email field validates format |
| **Verification Method** | Enter invalid email |
| **Pass Condition** | Validation error shown for invalid email |
| **Fail Condition** | Invalid email accepted |
| **Evidence Required** | Screenshot of validation |
| **Owner** | QA Lead |
| **Status** | ⬜ |

### AC-3.1.4: Ticket Created on Submission
| Attribute | Value |
|-----------|-------|
| **Description** | Submission creates trackable ticket |
| **Verification Method** | Submit form, check database/tracking |
| **Pass Condition** | Ticket ID generated (e.g., DSAR-2026-0001) |
| **Fail Condition** | No ticket created |
| **Evidence Required** | Screenshot of success message with ticket ID |
| **Owner** | QA Lead |
| **Status** | ⬜ |

### AC-3.1.5: Confirmation Email Sent
| Attribute | Value |
|-----------|-------|
| **Description** | User receives email confirming request received |
| **Verification Method** | Submit form, check email |
| **Pass Condition** | Email received within 5 minutes |
| **Fail Condition** | No email received |
| **Evidence Required** | Screenshot of confirmation email |
| **Owner** | QA Lead |
| **Status** | ⬜ |

### AC-3.1.6: Email Contains Response Deadline
| Attribute | Value |
|-----------|-------|
| **Description** | Confirmation email includes expected response date |
| **Verification Method** | Email content review |
| **Pass Condition** | "We will respond by [date]" or similar (30 days) |
| **Fail Condition** | No deadline in email |
| **Evidence Required** | Screenshot of email |
| **Owner** | QA Lead |
| **Status** | ⬜ |

### AC-3.1.7: Form WCAG 2.1 AA Accessible
| Attribute | Value |
|-----------|-------|
| **Description** | Form meets accessibility standards |
| **Verification Method** | WAVE or axe audit |
| **Pass Condition** | Zero critical accessibility errors |
| **Fail Condition** | Critical errors found |
| **Evidence Required** | Accessibility audit report |
| **Owner** | QA Lead (Accessibility) |
| **Status** | ⬜ |

### AC-3.1.8: Rate Limiting Active
| Attribute | Value |
|-----------|-------|
| **Description** | Form protected against abuse |
| **Verification Method** | Rapid submission test |
| **Pass Condition** | Submissions limited (e.g., 3 per hour per IP) |
| **Fail Condition** | Unlimited submissions allowed |
| **Evidence Required** | Rate limit error screenshot |
| **Owner** | Engineering Lead |
| **Status** | ⬜ |

### AC-3.1.9: Request Logged in Audit Trail
| Attribute | Value |
|-----------|-------|
| **Description** | All requests logged for compliance |
| **Verification Method** | Database/log inspection |
| **Pass Condition** | Request visible in audit log with timestamp |
| **Fail Condition** | No audit trail |
| **Evidence Required** | Audit log screenshot |
| **Owner** | Engineering Lead |
| **Status** | ⬜ |

### AC-3.1.10: DSAR Link in Privacy Policy
| Attribute | Value |
|-----------|-------|
| **Description** | Privacy policy links to DSAR form |
| **Verification Method** | Link test from privacy page |
| **Pass Condition** | Link present and functional |
| **Fail Condition** | No link or broken |
| **Evidence Required** | Screenshot |
| **Owner** | QA Lead |
| **Status** | ⬜ |

---

## AC-3.2: Data Export (Portability)

### AC-3.2.1: Export Requires Identity Verification
| Attribute | Value |
|-----------|-------|
| **Description** | Export not available without verifying requester identity |
| **Verification Method** | Request export, check verification step |
| **Pass Condition** | Verification required (email confirmation, etc.) |
| **Fail Condition** | Export available without verification |
| **Evidence Required** | Screenshot of verification flow |
| **Owner** | QA Lead |
| **Status** | ⬜ |

### AC-3.2.2: Export Includes All User Data
| Attribute | Value |
|-----------|-------|
| **Description** | Export contains all data held about user |
| **Verification Method** | Compare export to known data |
| **Pass Condition** | All data types present in export |
| **Fail Condition** | Data missing from export |
| **Evidence Required** | Export file + data comparison |
| **Owner** | QA Lead |
| **Status** | ⬜ |

### AC-3.2.3: Format is Machine-Readable
| Attribute | Value |
|-----------|-------|
| **Description** | Export in JSON or other machine-readable format |
| **Verification Method** | File format check |
| **Pass Condition** | Valid JSON (or CSV) that can be parsed |
| **Fail Condition** | PDF only or corrupted format |
| **Evidence Required** | Sample of export file |
| **Owner** | Engineering Lead |
| **Status** | ⬜ |

### AC-3.2.4: Download Link Time-Limited
| Attribute | Value |
|-----------|-------|
| **Description** | Export download link expires |
| **Verification Method** | Wait past expiry, try link |
| **Pass Condition** | Link expires within 24-72 hours |
| **Fail Condition** | Link never expires |
| **Evidence Required** | Screenshot of expired link |
| **Owner** | QA Lead |
| **Status** | ⬜ |

### AC-3.2.5: Link Expires After 24 Hours
| Attribute | Value |
|-----------|-------|
| **Description** | Download link expires in 24 hours or less |
| **Verification Method** | Check link after 25 hours |
| **Pass Condition** | Link returns error/expired |
| **Fail Condition** | Link still works |
| **Evidence Required** | Screenshot |
| **Owner** | QA Lead |
| **Status** | ⬜ |

### AC-3.2.6: Export Logged
| Attribute | Value |
|-----------|-------|
| **Description** | Export event recorded in audit trail |
| **Verification Method** | Audit log inspection |
| **Pass Condition** | Export event visible with timestamp |
| **Fail Condition** | No log entry |
| **Evidence Required** | Audit log screenshot |
| **Owner** | Engineering Lead |
| **Status** | ⬜ |

### AC-3.2.7: Action Network Data Included
| Attribute | Value |
|-----------|-------|
| **Description** | Data from Action Network included in export |
| **Verification Method** | Export content review |
| **Pass Condition** | AN data present (form submissions, tags, etc.) |
| **Fail Condition** | AN data missing |
| **Evidence Required** | Export showing AN data |
| **Owner** | Engineering Lead |
| **Status** | ⬜ |

### AC-3.2.8: localStorage Instructions Provided
| Attribute | Value |
|-----------|-------|
| **Description** | Instructions for accessing client-side data |
| **Verification Method** | Export/response content review |
| **Pass Condition** | Instructions on clearing localStorage included |
| **Fail Condition** | No mention of client-side data |
| **Evidence Required** | Screenshot of instructions |
| **Owner** | Engineering Lead |
| **Status** | ⬜ |

### AC-3.2.9: Export Within 72 Hours
| Attribute | Value |
|-----------|-------|
| **Description** | Export available within reasonable timeframe |
| **Verification Method** | Request timing |
| **Pass Condition** | Export available within 72 hours of verified request |
| **Fail Condition** | Takes longer than 72 hours |
| **Evidence Required** | Timestamp comparison |
| **Owner** | QA Lead |
| **Status** | ⬜ |

---

## AC-3.3: Data Deletion

### AC-3.3.1: Deletion Requires Identity Verification
| Attribute | Value |
|-----------|-------|
| **Description** | Deletion not performed without verification |
| **Verification Method** | Request deletion, check verification |
| **Pass Condition** | Email or other verification required |
| **Fail Condition** | Deletion without verification |
| **Evidence Required** | Screenshot of verification flow |
| **Owner** | QA Lead |
| **Status** | ⬜ |

### AC-3.3.2: All Data Locations Identified and Deleted
| Attribute | Value |
|-----------|-------|
| **Description** | Deletion covers all systems (AN, internal, Google Sheets) |
| **Verification Method** | Post-deletion verification |
| **Pass Condition** | Data removed from all identified systems |
| **Fail Condition** | Data remains in any system |
| **Evidence Required** | Verification across all systems |
| **Owner** | Engineering Lead |
| **Status** | ⬜ |

### AC-3.3.3: Action Network Deletion Confirmed
| Attribute | Value |
|-----------|-------|
| **Description** | Record deleted from Action Network |
| **Verification Method** | Action Network search post-deletion |
| **Pass Condition** | No record found in AN |
| **Fail Condition** | Record still exists |
| **Evidence Required** | AN search result screenshot |
| **Owner** | QA Lead |
| **Status** | ⬜ |

### AC-3.3.4: Confirmation Within 30 Days
| Attribute | Value |
|-----------|-------|
| **Description** | Deletion confirmation sent within GDPR timeline |
| **Verification Method** | Email timing |
| **Pass Condition** | Confirmation email within 30 days |
| **Fail Condition** | No confirmation or > 30 days |
| **Evidence Required** | Confirmation email with timestamp |
| **Owner** | QA Lead |
| **Status** | ⬜ |

### AC-3.3.5: Audit Trail Retains Request Only
| Attribute | Value |
|-----------|-------|
| **Description** | Audit log keeps deletion request, not deleted data |
| **Verification Method** | Audit log inspection |
| **Pass Condition** | Request logged, actual data not retained |
| **Fail Condition** | Deleted data still in logs |
| **Evidence Required** | Audit log screenshot |
| **Owner** | Engineering Lead + DPO |
| **Status** | ⬜ |

### AC-3.3.6: Exceptions Handled
| Attribute | Value |
|-----------|-------|
| **Description** | Legal hold and tax records exceptions work |
| **Verification Method** | Test with flagged record |
| **Pass Condition** | Exception documented, user notified |
| **Fail Condition** | Exception not handled |
| **Evidence Required** | Exception notification screenshot |
| **Owner** | Engineering Lead |
| **Status** | ⬜ |

### AC-3.3.7: User Notified of Non-Deletable Data
| Attribute | Value |
|-----------|-------|
| **Description** | If some data cannot be deleted, user informed with reason |
| **Verification Method** | Test case with exception |
| **Pass Condition** | Email explains what wasn't deleted and why |
| **Fail Condition** | Silent exception |
| **Evidence Required** | Notification screenshot |
| **Owner** | QA Lead |
| **Status** | ⬜ |

### AC-3.3.8: Process Documented in Policy
| Attribute | Value |
|-----------|-------|
| **Description** | Deletion process explained in privacy policy |
| **Verification Method** | Privacy policy review |
| **Pass Condition** | Deletion process documented |
| **Fail Condition** | No process documentation |
| **Evidence Required** | Policy screenshot |
| **Owner** | Legal |
| **Status** | ⬜ |

### AC-3.3.9: True Deletion (Not Soft Delete)
| Attribute | Value |
|-----------|-------|
| **Description** | Data actually deleted, not just flagged |
| **Verification Method** | Database inspection |
| **Pass Condition** | Record removed from database |
| **Fail Condition** | Record still exists with "deleted" flag |
| **Evidence Required** | Database query results |
| **Owner** | Engineering Lead |
| **Status** | ⬜ |

---

## AC-3.4: Request Tracking System

### AC-3.4.1: All DSARs Logged with Ticket ID
| Attribute | Value |
|-----------|-------|
| **Description** | Every request gets unique trackable ID |
| **Verification Method** | Multiple submissions, check IDs |
| **Pass Condition** | Unique IDs for each request |
| **Fail Condition** | Duplicate IDs or no IDs |
| **Evidence Required** | Screenshot showing multiple ticket IDs |
| **Owner** | Engineering Lead |
| **Status** | ⬜ |

### AC-3.4.2: 30-Day Deadline Calculated
| Attribute | Value |
|-----------|-------|
| **Description** | System calculates deadline automatically |
| **Verification Method** | System inspection |
| **Pass Condition** | Deadline = submission date + 30 days |
| **Fail Condition** | No deadline or wrong calculation |
| **Evidence Required** | System screenshot showing deadline |
| **Owner** | Engineering Lead |
| **Status** | ⬜ |

### AC-3.4.3: Status Tracking with History
| Attribute | Value |
|-----------|-------|
| **Description** | Request status changes tracked |
| **Verification Method** | Change status, verify history |
| **Pass Condition** | Status history visible with timestamps |
| **Fail Condition** | No status history |
| **Evidence Required** | Screenshot of status history |
| **Owner** | QA Lead |
| **Status** | ⬜ |

### AC-3.4.4: Deadline Notifications
| Attribute | Value |
|-----------|-------|
| **Description** | System alerts when deadline approaching |
| **Verification Method** | Create request, simulate time |
| **Pass Condition** | Alerts at 7 days, 3 days, 1 day before deadline |
| **Fail Condition** | No alerts |
| **Evidence Required** | Alert screenshots |
| **Owner** | Engineering Lead |
| **Status** | ⬜ |

### AC-3.4.5: Admin Dashboard Functional
| Attribute | Value |
|-----------|-------|
| **Description** | Admins can view and manage requests |
| **Verification Method** | Admin access test |
| **Pass Condition** | Dashboard shows all requests, allows management |
| **Fail Condition** | Dashboard missing or broken |
| **Evidence Required** | Dashboard screenshots |
| **Owner** | QA Lead |
| **Status** | ⬜ |

### AC-3.4.6: Compliance Reports Generated
| Attribute | Value |
|-----------|-------|
| **Description** | System generates compliance reports |
| **Verification Method** | Request report |
| **Pass Condition** | Report shows metrics (volume, response time, etc.) |
| **Fail Condition** | No reporting capability |
| **Evidence Required** | Sample report |
| **Owner** | DPO |
| **Status** | ⬜ |

### AC-3.4.7: Secure Admin Access
| Attribute | Value |
|-----------|-------|
| **Description** | Admin functions require authentication |
| **Verification Method** | Access test without auth |
| **Pass Condition** | Unauthorized access blocked |
| **Fail Condition** | Dashboard accessible without auth |
| **Evidence Required** | Access denied screenshot |
| **Owner** | Engineering Lead |
| **Status** | ⬜ |

### AC-3.4.8: Audit Trail for Admin Actions
| Attribute | Value |
|-----------|-------|
| **Description** | Admin actions on requests are logged |
| **Verification Method** | Make changes, check audit log |
| **Pass Condition** | Admin actions visible in audit trail |
| **Fail Condition** | No admin action logging |
| **Evidence Required** | Audit log screenshot |
| **Owner** | Engineering Lead |
| **Status** | ⬜ |

---

## AC-3.5: Consent Withdrawal

### AC-3.5.1: Cookie Consent Withdrawable via Footer
| Attribute | Value |
|-----------|-------|
| **Description** | Footer link opens cookie preferences |
| **Verification Method** | Click footer link |
| **Pass Condition** | Cookie settings open, can change choices |
| **Fail Condition** | Link missing or broken |
| **Evidence Required** | Screenshot |
| **Owner** | QA Lead |
| **Status** | ⬜ |

### AC-3.5.2: Newsletter Unsubscribe in Every Email
| Attribute | Value |
|-----------|-------|
| **Description** | Every newsletter has unsubscribe link |
| **Verification Method** | Review email templates |
| **Pass Condition** | Unsubscribe link present in footer |
| **Fail Condition** | Missing unsubscribe |
| **Evidence Required** | Email screenshot |
| **Owner** | QA Lead |
| **Status** | ⬜ |

### AC-3.5.3: Unsubscribe Page Functional
| Attribute | Value |
|-----------|-------|
| **Description** | Clicking unsubscribe actually unsubscribes |
| **Verification Method** | Full unsubscribe test |
| **Pass Condition** | User removed from newsletter list |
| **Fail Condition** | Still receives emails |
| **Evidence Required** | Action Network showing unsubscribed |
| **Owner** | QA Lead |
| **Status** | ⬜ |

### AC-3.5.4: DSAR Includes Consent Withdrawal
| Attribute | Value |
|-----------|-------|
| **Description** | DSAR form has consent withdrawal option |
| **Verification Method** | Form inspection |
| **Pass Condition** | "Withdraw Consent" in request type options |
| **Fail Condition** | Option missing |
| **Evidence Required** | Screenshot |
| **Owner** | QA Lead |
| **Status** | ⬜ |

### AC-3.5.5: Withdrawal Effective Immediately
| Attribute | Value |
|-----------|-------|
| **Description** | Consent changes take effect immediately |
| **Verification Method** | Change consent, verify behavior |
| **Pass Condition** | New behavior matches new consent |
| **Fail Condition** | Delayed effect |
| **Evidence Required** | Before/after screenshots |
| **Owner** | QA Lead |
| **Status** | ⬜ |

### AC-3.5.6: Past Processing Remains Lawful
| Attribute | Value |
|-----------|-------|
| **Description** | Policy states withdrawal doesn't affect past processing |
| **Verification Method** | Policy review |
| **Pass Condition** | Statement in privacy policy |
| **Fail Condition** | No such statement |
| **Evidence Required** | Policy screenshot |
| **Owner** | Legal |
| **Status** | ⬜ |

### AC-3.5.7: Withdrawal Confirmation
| Attribute | Value |
|-----------|-------|
| **Description** | User receives confirmation of withdrawal |
| **Verification Method** | Withdraw consent, check confirmation |
| **Pass Condition** | Visual and/or email confirmation |
| **Fail Condition** | No confirmation |
| **Evidence Required** | Confirmation screenshot |
| **Owner** | QA Lead |
| **Status** | ⬜ |

---

## Phase 3: Exit Criteria Summary

### Mandatory Exit Criteria (ALL must pass)

| ID | Criterion | Status |
|----|-----------|--------|
| AC-3.1.1 | DSAR form accessible | ⬜ |
| AC-3.1.2 | All request types available | ⬜ |
| AC-3.1.4 | Ticket created on submission | ⬜ |
| AC-3.2.2 | Export includes all data | ⬜ |
| AC-3.2.3 | Export is machine-readable | ⬜ |
| AC-3.3.2 | All data locations deleted | ⬜ |
| AC-3.3.3 | Action Network deletion works | ⬜ |
| AC-3.4.1 | All DSARs tracked | ⬜ |
| AC-3.4.2 | 30-day deadline calculated | ⬜ |
| AC-3.5.1 | Cookie consent withdrawable | ⬜ |
| AC-3.5.2 | Newsletter unsubscribe works | ⬜ |

### Phase 3 Sign-Off

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Engineering Lead | | | |
| QA Lead | | | |
| DPO | | | |

**Phase 3 Status:** ⬜ NOT STARTED / 🔄 IN PROGRESS / ✅ COMPLETE

---

# PHASE 4 & 5: Acceptance Criteria Summary

*Due to document length, Phases 4 and 5 acceptance criteria follow the same detailed format. Key criteria summarized below:*

## Phase 4: Consent Infrastructure

| ID | Criterion |
|----|-----------|
| AC-4.1.1 | Consent timestamp stored in ISO 8601 format |
| AC-4.1.2 | Privacy policy version recorded with consent |
| AC-4.2.1 | Server-side consent logging API functional |
| AC-4.2.3 | IP address hashed (not plain text) |
| AC-4.3.4 | Policy version change triggers re-consent |
| AC-4.4.1 | Annual re-consent after 12 months |
| AC-4.5.1 | Form submissions include consent timestamp |

## Phase 5: Audit & Documentation

| ID | Criterion |
|----|-----------|
| AC-5.1.1 | Article 30 records complete |
| AC-5.2.1 | DPA status verified for all processors |
| AC-5.3.1 | Compliance dashboard accessible |
| AC-5.4.1 | Runbook covers all scenarios |
| AC-5.5.1 | Final audit shows zero critical findings |
| AC-5.5.4 | Compliance score > 90% |
| AC-5.5.5 | DPO sign-off obtained |

---

# FINAL PROJECT SIGN-OFF

## Pre-Launch Compliance Gate

**All phases must be complete with all mandatory acceptance criteria passing.**

### Executive Summary

| Phase | Status | Completion Date | Sign-Off |
|-------|--------|-----------------|----------|
| Phase 0: Security | ⬜ | | |
| Phase 1: Critical Fixes | ⬜ | | |
| Phase 2: Privacy Policy | ⬜ | | |
| Phase 3: User Rights | ⬜ | | |
| Phase 4: Consent | ⬜ | | |
| Phase 5: Audit | ⬜ | | |

### Final Compliance Certification

| Statement | Verified By | Date |
|-----------|-------------|------|
| All exposed credentials have been rotated | DevOps | |
| Privacy policy meets GDPR Articles 13-14 | Legal | |
| User rights mechanisms are functional | QA | |
| Consent is obtained before tracking | Engineering | |
| Audit trail is complete and tamper-evident | DPO | |
| Final compliance score > 90% | DPO | |

### Authorization to Launch

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Engineering Lead | | | |
| QA Lead | | | |
| Legal Counsel | | | |
| Data Protection Officer | | | |
| Executive Sponsor | | | |

---

**Document Control:**
- Version: 1.0
- Created: April 2, 2026
- Classification: Internal - QA & Compliance
- Review Cycle: Per phase completion
