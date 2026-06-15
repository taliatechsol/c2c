# campus2corporate (c2c) — Unit Economics & Financial Projections
**Target Market:** Tier 2 & Tier 3 Engineering/Management Colleges (Karnataka, Andhra Pradesh, Telangana)

---

## 1. Unit Economics (Cost of Goods Sold - COGS)
Thanks to the serverless architecture (Next.js + FastAPI + Supabase), the marginal cost to serve one additional student is virtually zero. This provides a massive advantage when earning in INR while paying for cloud services in USD.

*   **Database & Compute:** Generating the test, scoring, and serving the dashboard takes under 2 seconds of serverless compute. (Cost: **~₹0.40 per student**)
*   **AI Enrichment:** Gemini Flash’s free tier covers 1,500 requests/day. For 1,500 students over 6 months, AI inference cost is **₹0**.
*   **Total Tech COGS per Student:** **< ₹1.00**
*   **Gross Margin (Software):** **99%** (Primary costs will be travel, sales, and TPO relationship building).

---

## 2. Pricing Strategy (The India-Specific Model)
Do not rely on students paying out-of-pocket as primary revenue; Tier 2/3 students are highly price-sensitive. Monetize the placement budgets of colleges and the hiring needs of Tier 1 city startups.

### A. The College / TPO Tier (Volume Revenue)
Sell the platform as an **"Employability & Placement Readiness Assessment"** to the Principal or Training & Placement Officer (TPO).
*   **Pricing:** **₹200 to ₹350 per student / year** (Billed to the college as a bulk license).
*   **The Pitch:** "Mass recruiters reject students due to poor communication, low resilience (AQ), and low emotional intelligence (EQ). c2c gives you a dashboard showing exactly which students need soft-skills training *before* the placement drive begins."

### B. The Employer Tier (High Margin Revenue)
Startups in Bengaluru and Hyderabad want talent but refuse to sift through thousands of identical resumes from Tier 2/3 colleges.
*   **Pricing:** **₹20,000 to ₹50,000 flat fee** per successful hire.
*   **The Pitch:** "Stop ignoring Tier 2 colleges. We’ve already filtered 1,500 students through a rigorous AI 'Ordeal.' We will hand you the top 10 'Builders' and 'Rainmakers' who have verified resilience and grit."

### C. The Student Premium Tier (B2C Upsell)
The base assessment is free (paid by the college). 
*   **Pricing:** **₹499 to ₹999 one-time fee** for the "c2c Placement Makeover."
*   **The Pitch:** Unlocks deep 1-on-1 AI interview roleplay, custom cover letter generation, and premium hosting for their interactive portfolio.

---

## 3. Financial Projection (6-Month Scenario: 1,500 Students)
*Assumption: Close 3 to 4 colleges with batches of ~400 students each over 6 months at ₹250/student.*

### Revenue Projections
| Stream | Calculation | Projected Revenue (6 Mos) |
| :--- | :--- | :--- |
| **Colleges (B2B)** | 1,500 students * ₹250 | ₹3,75,000 |
| **Students (Upsell)** | 5% conversion (75) * ₹499 | ₹37,425 |
| **Employers (Placements)**| 5 successful placements * ₹25,000 | ₹1,25,000 |
| **TOTAL REVENUE** | | **~₹5,37,425** |

### Infrastructure Costs (GCP / Vercel / Supabase)
| Service | Monthly Cost | Projected Cost (6 Mos) |
| :--- | :--- | :--- |
| **Supabase Pro Tier** | ~$25/mo (~₹2,100) | ₹12,600 |
| **Serverless Compute** | ~$10/mo (~₹850) | ₹5,100 |
| **Domain & Misc** | - | ₹2,500 |
| **TOTAL TECH COST** | | **~₹20,200** |

**Net Gross Profit (Pre-tax/marketing):** **~₹5,17,225**

---

## 4. Operational Playbook for this Market

1.  **Serverless is Mandatory:** Power outages and erratic internet are common in Tier 2/3 cities. Traffic will be highly spiky (e.g., an entire lab of 100 students logs on at 10:00 AM, then 0 traffic for 5 hours). Serverless (Cloud Run/Vercel) auto-scales to handle the spike and drops to ₹0 when idle.
2.  **The WhatsApp Network Effect:** Make the student's output report easily shareable. If a student in a tier 3 college gets an impressive "Founder Fit" radar chart, they *will* share it on their class WhatsApp groups, creating FOMO and putting pressure on other colleges to adopt the platform.
3.  **Mobile-First Accessibility:** Keep the Next.js UI lightweight. Ensure it loads fast on mobile data (Jio/Airtel 4G), as many students will take the assessment on their phones.
4.  **Leverage the "Bengaluru/Hyd Dream":** Your core marketing message should be that taking the c2c assessment is the fastest bridge to get noticed by top-tier startups in the major IT hubs.
