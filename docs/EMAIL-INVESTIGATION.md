# BVP Email Investigation & Migration Planning

**Date:** June 17, 2026
**Status:** Investigating current setup

---

## Current Email Setup (TO BE DETERMINED)

### What We Know:
- ✅ Team has working @blackveteransproject.org email addresses
- ✅ Email works for internal/team communication
- ✅ DNS MX records point to Google (aspmx.l.google.com)
- ✅ SPF record authorizes Google to send email
- ❓ Squarespace shows "GET STARTED" for Google Workspace (not purchased through them)
- ❌ One external person experiencing bounces when emailing certain BVP addresses

### Need to Determine:
- [ ] Where do we access email? (gmail.com? other interface?)
- [ ] Who is the Google Workspace admin (if it exists)?
- [ ] How many BVP email accounts currently exist?
- [ ] What are we paying monthly for email?
- [ ] Which email address is causing the bounce issue?

---

## Investigation Checklist

### 1. Access Method
- [ ] Check where team logs in to email (URL)
- [ ] Screenshot the email interface
- [ ] Note what features are available (Calendar, Drive, Meet, etc.)

### 2. Billing/Payment
- [ ] Search credit card statements for "Google Workspace" or "G Suite"
- [ ] Check Squarespace billing for email charges
- [ ] Check Webflow history for email setup
- [ ] Identify monthly email cost

### 3. Admin Access
- [ ] Try logging into admin.google.com with BVP email
- [ ] Identify who has admin access
- [ ] Document all existing email accounts

### 4. Current Email Addresses
List all @blackveteransproject.org addresses in use:
- [ ] info@blackveteransproject.org (displayed on website - does it exist?)
- [ ] privacy@blackveteransproject.org (displayed on website - does it exist?)
- [ ] cyrus@blackveteransproject.org (mentioned in admin page)
- [ ] [Add other team member emails]

---

## Google Workspace Migration Evaluation

### Option A: Keep Current Setup
**Pros:**
- It's working (mostly)
- Already familiar
- Already paying for it

**Cons:**
- Don't know where it's hosted (documentation issue)
- Occasional bounce issues
- May have limited features
- Unclear admin/management

**Monthly Cost:** $??? (TO BE DETERMINED)

---

### Option B: Fresh Google Workspace Setup via Squarespace
**Pros:**
- Professional Gmail interface
- 30GB+ storage per user
- Google Drive, Calendar, Meet included
- Easy management through Squarespace
- Integrated AI assistant
- Better spam filtering
- Centralized admin panel
- Known/documented setup

**Cons:**
- Migration effort required
- Monthly cost increase (possibly)
- Need to move existing emails

**Monthly Cost:**
- Business Starter: $6/user/month
- Business Standard: $12/user/month
- Business Plus: $18/user/month

**For 5 users:**
- Starter: $30/month
- Standard: $60/month
- Plus: $90/month

---

### Option C: Google Workspace Direct (Not Through Squarespace)
**Pros:**
- Same features as Option B
- Direct Google billing
- May have more control/flexibility

**Cons:**
- More complex setup
- Need to manage DNS separately
- No Squarespace integration

**Monthly Cost:** Same as Option B

---

## Email Accounts Needed

### Essential:
- [ ] info@blackveteransproject.org (general inquiries)
- [ ] privacy@blackveteransproject.org (GDPR/privacy requests)
- [ ] [Team member 1]@blackveteransproject.org
- [ ] [Team member 2]@blackveteransproject.org
- [ ] [Team member 3]@blackveteransproject.org

### Optional:
- [ ] press@blackveteransproject.org (media inquiries)
- [ ] legal@blackveteransproject.org (legal matters)
- [ ] admin@blackveteransproject.org (administrative)

### Alternative Approach (Cost Saving):
Use **Email Aliases** or **Google Groups** instead of full accounts:
- Create 2-3 full accounts for actual people
- Set up aliases/groups for shared emails (info@, privacy@)
- **Cost:** Only pay for actual user accounts, not shared emails

---

## Migration Plan (If We Choose Google Workspace)

### Phase 1: Setup (Week 1)
- [ ] Purchase Google Workspace via Squarespace (or direct)
- [ ] Create admin account
- [ ] Create user accounts for all team members
- [ ] Verify domain ownership
- [ ] Configure MX records (may already be correct)

### Phase 2: Migration (Week 2)
- [ ] Export emails from current system (if needed)
- [ ] Import to new Google Workspace accounts
- [ ] Test sending/receiving
- [ ] Update email signatures
- [ ] Configure mobile devices

### Phase 3: Cutover (Week 3)
- [ ] Run both systems in parallel for 1 week
- [ ] Forward old emails to new system
- [ ] Announce to team
- [ ] Update website contact info (if needed)
- [ ] Cancel old email service

### Phase 4: Cleanup (Week 4)
- [ ] Verify all emails working
- [ ] Set up aliases/groups
- [ ] Configure spam filters
- [ ] Document admin procedures
- [ ] Train team on new features (if any)

---

## Decision Criteria

**Choose Google Workspace if:**
- [ ] We need better collaboration tools (Drive, Calendar, Meet)
- [ ] Current system is unreliable or poorly documented
- [ ] We want centralized admin control
- [ ] Budget allows ~$30-90/month for 5 users
- [ ] Team wants modern Gmail interface and features

**Keep Current Setup if:**
- [ ] It's working well (besides this one bounce issue)
- [ ] It's significantly cheaper
- [ ] We know where it's hosted and how to manage it
- [ ] Migration effort isn't worth the benefit

---

## Next Steps

1. **Complete Investigation Checklist** (above)
2. **Get bounce error message** from external sender
3. **Document current monthly email cost**
4. **Count exact number of email accounts needed**
5. **Team discussion:** What features do we actually need?
6. **Make decision:** Migrate to Google Workspace? Stay with current? Hybrid?
7. **Execute plan** based on decision

---

## Notes & Questions

- Website displays email addresses that may not exist (info@, privacy@)
- DNS already points to Google - migration might be simpler than expected
- Consider if we need full accounts vs aliases/forwarding for shared emails
- Check if current setup has enough storage (team might be hitting limits)

---

**Decision Target Date:** [Set a date - suggest within 1-2 weeks]

**Decision Makers:** [List who needs to approve this]

**Budget Authority:** [Who approves the monthly expense?]
