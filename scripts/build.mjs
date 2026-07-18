import fs from 'node:fs';
import path from 'node:path';

function _seed(s){let h=0x811c9dc5;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=(h+((h<<1)+(h<<4)+(h<<7)+(h<<8)+(h<<24)))>>>0;}return h>>>0;}
function _rng(s){let a=s>>>0;return()=>{a|=0;a=(a+0x6d2b79f5)|0;let t=a;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296;};}
function _pick(p,r){return p[Math.floor(r()*p.length)];}
function _T(str,c){const isAcro=c.niche.length<=5&&c.niche===c.niche.toUpperCase();const nlo=isAcro?c.niche:c.niche.toLowerCase();const county=c.county?' ('+c.county+' County)':'';return str.replace(/\{city\}/g,c.city).replace(/\{state\}/g,c.state).replace(/\{stateId\}/g,c.stateId).replace(/\{brand\}/g,c.brand).replace(/\{niche\}/g,c.niche).replace(/\{n\}/g,nlo).replace(/\{county\}/g,county||'the area');}
const _OPEN=["{brand} provides professional {n} service to homeowners in {city}, {state}{county}. Licensed, insured, and dispatching the same day you call.","Homeowners across {city}, {state}{county} rely on {brand} for honest {n} work — fixed pricing, quick response, and a workmanship warranty that means what it says.","When something breaks at home in {city}, {state}, you want a {n} team that shows up when they say they will. {brand} has built its {city} reputation on exactly that.","{brand} has been dispatching {n} technicians to {city}, {state}{county} residents for years. Every visit starts with a diagnostic and ends with a written invoice.","If you're searching for reliable {n} in {city}, {state}, {brand} answers 24/7 and quotes every job in writing before starting work.","{brand} is a full-service {n} company operating throughout {city}, {state} and surrounding communities{county}. Real dispatchers, real technicians, real warranties.","For {city}, {state} homeowners, {brand} delivers {n} service the old-fashioned way — on time, at the price we quoted, and cleaned up before we leave.","{city}, {state} residents call {brand} when they want their {n} problem fixed once, not patched into a bigger repair three months from now.","In {city}, {state}, {brand} handles {n} work from routine tune-ups to full replacements. Same crew, same standards, same fair pricing.","{brand} runs {city}, {state}{county} routes daily. If you need {n} service today, we usually can be at your door within hours."];
const _WHY_CITY=["{city} isn't like the town next door. Housing stock ranges from mid-century homes with quirks nobody documents to new-build subdivisions where the developer's HVAC sub cut corners at the finish line. Both come with recurring {n} issues, and both need a technician who's actually worked in the neighborhood.","The homes we service in {city} span decades of construction and just as many equipment brands. That's why our {city} technicians carry parts for the systems this town actually has installed — not a generic parts truck sized for somewhere else.","{city} has its own mix of building codes, permit officials, and utility rebate programs. We've navigated all three and know which shortcuts inspectors flag and which upgrades qualify for rebates before we quote the job.","Weather in {state} punishes {n} equipment differently than most of the country. In {city} specifically, we see failure patterns that a technician trained somewhere else would never guess at first look.","The {city} market is full of storm-chaser contractors and out-of-town crews who quote low and disappear when something goes wrong. {brand} answers when you call back — that's the difference.","{city} homeowners tell us the same story over and over: they called a big-name company, got a scripted upsell, and paid for something they didn't need. That's why we quote in writing and explain the diagnostic in plain language.","New-construction {city} neighborhoods have their own set of installation shortcuts that surface in the first 3–7 years of ownership. Older {city} homes have decades of quick fixes on top of the original build. We handle both without judgment.","Serving {city} means understanding local water quality, soil movement, humidity swings, and permit nuance — all of which affect how {n} systems perform here versus the national average."];
const _PROBLEMS=["The most common {n} calls we run in {city} tend to cluster around end-of-life equipment, undersized systems the builder installed, and DIY repairs that made a small problem larger.","In our {city} service records, three categories dominate: no-cool or no-heat emergencies, water leaks or drainage failures, and systems that run constantly without hitting their setpoint.","{city} homeowners typically call us for one of four things: something stopped working entirely, something is making a noise it never made before, something is leaking, or the utility bill just jumped for no obvious reason.","We see a lot of the same patterns across {city}: components failing right after the manufacturer's parts warranty lapses, and installation errors from previous contractors that only show up under load.","The failure profile in {city} matches what you'd expect for {state}'s climate — but the specifics depend on the neighborhood, the age of the home, and who installed the current equipment.","Emergency calls in {city} usually happen at the worst possible moment: the first cold snap, the first heat wave, or the night before company arrives. That's why we staff dispatch 24/7.","{city}'s housing mix means our technicians see everything from twenty-year-old workhorse systems still running fine to two-year-old installs already failing because of a shortcut nobody caught at inspection."];
const _PRICING=["Pricing in {city} follows the same rules as everywhere we work: an on-site diagnostic first, a written estimate second, and no surprises on the invoice. Financing is available for larger installs and we accept all major cards.","Every {n} quote in {city} is fixed-price in writing before we touch a tool. If we uncover a hidden issue during the repair, we stop and get your approval before adding a dollar to the bill.","We publish flat-rate pricing on common {city} repairs and quote larger jobs after a diagnostic. Phone estimates are ballpark only — the real number comes after a technician sees the system.","{city} diagnostic fees are competitive with the metro average and are waived when you approve the repair. Financing options include 0% promotional plans and longer-term extended options for full installs.","For {city} homeowners, we itemize labor and parts on every invoice — no bundled 'service charge' hiding the markup. If a repair is close to replacement cost, we'll show you both numbers and let you decide.","Repair pricing in {city} depends entirely on the part and the labor. We don't play games with 'call for pricing' — you get the number in writing before we start, every time."];
const _PERMITS=["Any {n} work that requires a permit in {city} is pulled by us, not by you. We carry general liability and workers' compensation coverage well above local minimums and can email the certificate on request.","{city} permit officials know {brand}. When your job requires an inspection, we schedule it, meet the inspector, and handle any callbacks — you're not left chasing paperwork.","Licensing in {state} is not optional for the work we do, and {brand} technicians carry the required state credentials plus manufacturer-specific training. Insurance certificates are available on request for any {city} job.","We pull all required {city} permits, coordinate inspections with the local building department, and handle any code compliance items that come up along the way. That paperwork stays on our side of the ledger.","For jobs in {city} that touch electrical, gas, or venting, we work under a properly credentialed license and pull the appropriate permits — even when a competitor tells you the permit is optional. It isn't."];
const _WHY_US=[["Same-day dispatch across {city} and surrounding communities","Up-front, fixed pricing on every repair — approved before work begins","Licensed {state} technicians, background-checked and drug-tested","Workmanship warranty on every job, honored without argument","Fully stocked trucks so most repairs finish on the first visit"],["24/7 answered phones — real dispatcher, not a call center","Written diagnostics before any repair begins","Manufacturer-authorized parts, not gray-market substitutes","Financing available on larger installs","Every technician trained on current model equipment"],["Local crew based near {city} — not dispatched two counties away","Fixed-price quotes with no bait-and-switch add-ons","Full insurance coverage well above {state} minimums","Named technicians assigned to each call with photo dispatch","Cleanup and haul-away included on every replacement"],["Real emergency response — most {city} calls answered within hours","Free second opinions on any competitor's repair-or-replace quote","Extended parts and labor warranty options available","Membership plans with priority scheduling and repair discounts","Transparent post-service walkthrough on every visit"]];
const _CTA_LINE=["Need {n} service in {city}? Call {brand} at","Ready to book a {city} appointment? Reach {brand} directly at","For same-day {n} in {city}, call us at","Get a {city} technician dispatched now — call","{city} homeowners: schedule same-day {n} at","Something wrong with your system in {city}? Call {brand} at"];
const _NEARBY_HEAD=["Nearby cities we serve","Also serving these {state} communities","Other {stateId} cities on our route","Neighboring service areas","More cities near {city}"];
const _H2_PROBLEMS=["Common {n} problems in {city}","What we see most often in {city}","Typical {n} calls in {city}","Recurring issues in {city} homes"];
const _H2_COST=["What {n} costs in {city}","{city} pricing and financing","How we price {n} jobs in {city}","Fair, written pricing for {city}"];
const _H2_PERMITS=["Permits, licensing, and insurance","Licensed and insured in {state}","How we handle {city} permits","Credentials and coverage"];
const _H2_WHY=["Why {city} homeowners choose {brand}","What sets {brand} apart in {city}","Why we're the {n} team {city} calls back","The {brand} difference for {city}"];
const _HERO_TAG=["Same-day {n} service in {city}, {stateId}","Trusted {n} pros serving {city} and {county}","{city}'s go-to team for honest {n} work","24/7 {n} response across {city}, {stateId}","Licensed {n} technicians dispatching to {city} today","Fixed-price {n} repairs across {city}, {state}"];
const _TESTIMONIALS=[[{"name":"Sarah M.","area":"{city}","quote":"Called at 8am, tech was in the driveway by 11. Fair price, no upsell, fixed the first visit."},{"name":"David R.","area":"{city}, {stateId}","quote":"Second opinion saved us $4,200. The other company said full replacement — {brand} did a $380 repair that's still going strong."},{"name":"Jenna P.","area":"{city}","quote":"Explained everything before touching a tool. Wrote the estimate on-site. This is how service should work."}],[{"name":"Marcus T.","area":"{city}","quote":"Three quotes, {brand} was the only one that actually inspected the system before pricing it. Also the lowest."},{"name":"Priya K.","area":"{city}, {stateId}","quote":"Emergency call on a Sunday night. Real person answered, tech arrived within the hour. Lifesaver."},{"name":"Tom B.","area":"{county}","quote":"Clean truck, clean work, cleaned up after themselves. Warranty paperwork emailed the same day."}],[{"name":"Angela W.","area":"{city}","quote":"Booked online, confirmed within minutes. Tech texted a photo before arrival. Zero surprises."},{"name":"Ken H.","area":"{city}, {stateId}","quote":"Told me honestly the repair wasn't worth it and showed me the replacement math. Appreciated the straight talk."},{"name":"Lisa F.","area":"{city}","quote":"Been using {brand} for years across two homes. Never once had a callback or a billing surprise."}],[{"name":"Robert J.","area":"{city}","quote":"The tech explained what he was doing at every step. Left the work area cleaner than he found it."},{"name":"Nicole S.","area":"{city}, {stateId}","quote":"Fair pricing, fast scheduling, and they stand behind their work. Recommending to every neighbor."},{"name":"Ahmed L.","area":"{county}","quote":"Fifth {n} company I've tried in {city}. First one I'd call again."}]];
const _FAQS=[[{"q":"How fast can you get to my home in {city}?","a":"Most {city} calls booked before noon are handled the same day. Emergency dispatches are typically on-site within a few hours, 24/7."},{"q":"Do you charge for estimates?","a":"On-site diagnostics carry a small service fee that is waived when you approve the repair. Phone estimates are free but approximate — a real number requires eyes on the system."},{"q":"Are you licensed to work in {state}?","a":"Yes. {brand} carries every credential {state} requires for {n} work, plus manufacturer-specific certifications. Insurance certificates are available on request."},{"q":"What if the repair costs more than expected?","a":"It won't — not without your say-so. We quote fixed pricing in writing before starting, and if we uncover something hidden, we stop and get your approval before adding a dollar."},{"q":"Do you offer any warranty?","a":"Every repair carries a workmanship warranty, and manufacturer parts warranties are registered on your behalf for full installs."}],[{"q":"Do you service my neighborhood in {city}?","a":"If you're inside {city} or the surrounding {county} area, yes. We run daily routes across the metro and dispatch to every ZIP we cover."},{"q":"Can I get service after hours or on weekends?","a":"Yes — our dispatcher answers 24/7 and we run emergency calls nights, weekends, and holidays with the same technicians who work weekday shifts."},{"q":"Do you offer financing?","a":"For larger installs in {city}, we offer 0% promotional financing and longer-term extended options through our finance partner. Approval usually takes minutes."},{"q":"Will you pull permits?","a":"Any {city} job requiring a permit is pulled by {brand}. We schedule inspections, meet the inspector, and handle any callbacks — that paperwork stays on our side."},{"q":"What brands of equipment do you service?","a":"All of them. Our {city} technicians are trained across every major manufacturer and stock parts for the systems this area actually has installed."}],[{"q":"How do I know I'm getting a fair price?","a":"Every {city} quote is fixed-price and itemized in writing before work starts. If you have a competing quote, we'll gladly do a free second opinion."},{"q":"What happens if something breaks again?","a":"Call us. If it's covered by the workmanship warranty, we come back at no charge. If it's a new issue, you get member pricing."},{"q":"Do you offer maintenance plans?","a":"Yes. Our {city} maintenance plan includes seasonal tune-ups, priority scheduling, and discounts on any repair. Most members recover the cost on the first service call."},{"q":"Can you help with insurance claims?","a":"For storm or damage-related work in {city}, we document the loss with photos and written reports that meet carrier requirements, and coordinate directly with your adjuster."},{"q":"How long has {brand} served {city}?","a":"{brand} has been dispatching {n} technicians across {city} and {county} for years. Local crew, local reputation, local accountability."}]];
function citySections(ctx){const s=_seed(ctx.city+'|'+ctx.stateId+'|'+ctx.niche+'|'+ctx.brand);const r=_rng(s);const t=x=>_T(x,ctx);return{intro:t(_pick(_OPEN,r)),whyCity:t(_pick(_WHY_CITY,r)),problems:t(_pick(_PROBLEMS,r)),pricing:t(_pick(_PRICING,r)),permits:t(_pick(_PERMITS,r)),whyUs:_pick(_WHY_US,r).map(t),ctaLine:t(_pick(_CTA_LINE,r)),nearbyHead:t(_pick(_NEARBY_HEAD,r)),h2Problems:t(_pick(_H2_PROBLEMS,r)),h2Cost:t(_pick(_H2_COST,r)),h2Permits:t(_pick(_H2_PERMITS,r)),h2Why:t(_pick(_H2_WHY,r)),heroTag:t(_pick(_HERO_TAG,r)),testimonials:_pick(_TESTIMONIALS,r).map(tt=>({name:tt.name,area:t(tt.area),quote:t(tt.quote)})),faqs:_pick(_FAQS,r).map(f=>({q:t(f.q),a:t(f.a)}))};}


const cfg = JSON.parse(fs.readFileSync('.seofactory.json', 'utf8'));
const loc = JSON.parse(fs.readFileSync('data/locations.json', 'utf8'));
const pub = JSON.parse(fs.readFileSync('data/published.json', 'utf8'));
const imgMap = fs.existsSync('data/images.json') ? JSON.parse(fs.readFileSync('data/images.json','utf8')) : { services:{}, states:{}, brand:{} };
const svcImg = imgMap.services || {};
const stateImg = imgMap.states || {};
const brandImg = imgMap.brand || {};
const svcImgKeys = Object.keys(svcImg);
function pickImgForKey(slug, map, keys) {
  if (map && map[slug]) return map[slug];
  if (!keys.length) return null;
  let h = 0; for (let i=0;i<slug.length;i++) h = (h*31 + slug.charCodeAt(i)) >>> 0;
  return map[keys[h % keys.length]];
}
function serviceImg(slug) { return pickImgForKey(slug, svcImg, svcImgKeys); }
function cityImg(slug) {
  return pickImgForKey(slug, svcImg, svcImgKeys);
}

const OUT = 'public';
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });
if (fs.existsSync('assets')) fs.cpSync('assets', path.join(OUT, 'assets'), { recursive: true });

const esc = (s) => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const tel = (p) => 'tel:' + String(p).replace(/[^0-9+]/g,'');
const write = (rel, html) => { const p = path.join(OUT, rel); fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, html); };

const publishedSet = new Set(pub.cities.map(c => c.state + '/' + c.city));

// Filter states to only include published cities, preserving order.
const states = loc.states.map(s => ({
  ...s,
  cities: s.cities.filter(c => publishedSet.has(s.slug + '/' + c.slug)),
})).filter(s => s.cities.length > 0);

const stats = {
  states: states.length,
  cities: states.reduce((a, s) => a + s.cities.length, 0),
  zips: states.reduce((a, s) => a + s.cities.reduce((b, c) => b + (c.zips||[]).length, 0), 0),
};

function layout(o) {
  const url = 'https://' + cfg.domain + (o.path === '/' ? '/' : o.path);
  const year = new Date().getFullYear();
  return '<!doctype html>\n<html lang="en"><head>' +
    '<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<title>' + esc(o.title) + '</title>' +
    '<meta name="description" content="' + esc(o.description) + '">' +
    '<link rel="canonical" href="' + esc(url) + '">' +
    '<meta property="og:type" content="website"><meta property="og:title" content="' + esc(o.title) + '">' +
    '<meta property="og:description" content="' + esc(o.description) + '"><meta property="og:url" content="' + esc(url) + '">' +
    '<meta name="twitter:card" content="summary_large_image">' +
    '<link rel="stylesheet" href="/styles.css">' + (brandImg.favicon ? '<link rel="icon" href="' + brandImg.favicon + '"' + (brandImg.faviconMime ? ' type="' + brandImg.faviconMime + '"' : '') + '>' : '<link rel="icon" href="/favicon.svg" type="image/svg+xml">') +
    '<script type="application/ld+json">' + JSON.stringify({'@context':'https://schema.org','@type':'LocalBusiness',name:cfg.brand,url:'https://'+cfg.domain,telephone:cfg.phone,logo: brandImg.logo ? 'https://' + cfg.domain + brandImg.logo : undefined, areaServed:states.map(s=>s.name)}) + '</script>' +
    '</head><body>' +
    '<header class="site-header"><div class="container nav">' +
      '<a class="brand" href="/">' + (brandImg.logo ? '<img class="brand-logo" src="' + brandImg.logo + '" alt="' + esc(cfg.brand) + '">' : esc(cfg.brand)) + '</a>' +
      '<nav><a href="/services/">Services</a><a href="/locations/">Locations</a><a href="/blog/">Blog</a><a href="/contact/">Contact</a></nav>' +
      '<a class="cta" href="' + tel(cfg.phone) + '">' + esc(cfg.phone) + '</a>' +
    '</div></header>' +
    '<main><div class="container"><h1>' + esc(o.h1) + '</h1>' + o.body + '</div></main>' +
    '<footer class="site-footer"><div class="container footer-inner">' +
      '<div class="fcol fcol-brand"><div class="brand">' + esc(cfg.brand) + '</div><p class="fmuted">Professional service. Fixed pricing. Same-day response.</p><p><a class="fcall" href="' + tel(cfg.phone) + '">' + esc(cfg.phone) + '</a></p></div>' +
      '<div class="fcol"><strong>Navigate</strong><ul><li><a href="/services">Services</a></li><li><a href="/locations">Locations</a></li><li><a href="/blog">Blog</a></li><li><a href="/contact">Contact</a></li><li><a href="/crawlhub">CrawlHub</a></li><li><a href="/privacy-policy">Privacy Policy</a></li><li><a href="/terms-of-service">Terms of Service</a></li></ul></div>' +
      '<div class="fcol"><strong>Services</strong><ul>' + cfg.services.slice(0,6).map(s => '<li><a href="/services/' + s.slug + '">' + esc(s.title) + '</a></li>').join('') + (cfg.services.length>6?'<li><a href="/services">View all →</a></li>':'') + '</ul></div>' +
      '<div class="fcol"><strong>Service Areas</strong><ul>' + featured.slice(0,8).map(f => '<li><a href="/locations/' + f.s.slug + '/' + f.c.slug + '">' + esc(f.c.name) + ', ' + esc(f.s.id) + '</a></li>').join('') + '<li><a href="/locations">All service areas →</a></li></ul></div>' +
    '</div><div class="container copy">© ' + year + ' ' + esc(cfg.brand) + '. All rights reserved.</div></footer>' +
    '</body></html>';
}

// ---- Pages ----

const svcCards = cfg.services.map(s => { const si = serviceImg(s.slug); return '<a class="card' + (si?' card-img':'') + '" href="/services/' + s.slug + '/">' + (si ? '<div class="card-thumb" style="background-image:url(' + si + ')"></div>' : '') + '<h3>' + esc(s.title) + '</h3><p>' + esc(s.blurb) + '</p></a>'; }).join('');
const featured = (() => {
  const out = []; const all = [];
  for (const s of states) for (const c of s.cities) all.push({s, c});
  const step = Math.max(1, Math.floor(all.length / 8));
  for (let i=0;i<all.length && out.length<8;i+=step) out.push(all[i]);
  return out;
})();

write('index.html', layout({
  path:'/',
  title: cfg.brand + ' — ' + cfg.niche + ' Services in ' + stats.states + ' States',
  description: cfg.brand + ' provides trusted ' + cfg.niche.toLowerCase() + ' across ' + stats.cities.toLocaleString() + ' cities. Same-day service, up-front pricing. Call ' + cfg.phone + '.',
  h1: cfg.niche + ' Services You Can Actually Rely On',
  body: '<p class="lede">' + esc(cfg.brand) + ' is a family-owned ' + esc(cfg.niche) + ' company serving ' + stats.cities.toLocaleString() + ' cities across ' + stats.states + ' states. Licensed, insured, and staffed by technicians who show up on time and stand behind every repair.</p>' +
    '<p>We built our business on referrals — every job matters. Real dispatchers, marked trucks, uniformed technicians, and up-front prices before any work begins. Written invoices and a workmanship warranty we actually honor.</p>' +
    '<h2>Our ' + esc(cfg.niche) + ' services</h2><div class="grid grid-3 cards">' + svcCards + '</div>' +
    '<h2>Featured service areas</h2><p class="inline-links">' + featured.map(f => '<a href="/locations/' + f.s.slug + '/' + f.c.slug + '/">' + esc(f.c.name) + ', ' + esc(f.s.id) + '</a>').join(' · ') + '</p>' +
    '<p><a class="btn" href="/locations/">Browse all service areas →</a></p>',
}));

write('services/index.html', layout({
  path:'/services/', title: cfg.niche + ' Services — ' + cfg.brand,
  description: 'Full list of ' + cfg.niche.toLowerCase() + ' services from ' + cfg.brand + '. Call ' + cfg.phone + '.',
  h1: cfg.niche + ' Services',
  body: '<p class="lede">Our full ' + esc(cfg.niche) + ' service list. Each page explains the problems we solve, how we diagnose them, and what the repair usually costs.</p><div class="grid grid-2 cards">' + cfg.services.map(s => { const si = serviceImg(s.slug); return '<a class="card' + (si?' card-img':'') + '" href="/services/' + s.slug + '/">' + (si ? '<div class="card-thumb" style="background-image:url(' + si + ')"></div>' : '') + '<h3>' + esc(s.title) + '</h3><p>' + esc(s.blurb) + '</p></a>'; }).join('') + '</div>',
}));

for (const s of cfg.services) {
  const img = serviceImg(s.slug);
  write('services/' + s.slug + '/index.html', layout({
    path:'/services/' + s.slug + '/', title: s.title + ' — ' + cfg.brand,
    description: s.blurb + ' Call ' + cfg.phone + '.', h1: s.title,
    body: (img ? '<img class="page-hero-img" src="' + img + '" alt="' + esc(s.title) + '" loading="eager">' : '') +
      '<p class="lede">' + esc(s.blurb) + '</p><p>' + esc(s.body) + '</p>' +
      '<h2>How we handle ' + esc(s.title.toLowerCase()) + ' calls</h2>' +
      '<ol class="steps"><li><strong>Same-day scheduling.</strong> Call before noon and we usually reach you the same day.</li><li><strong>On-site diagnostic.</strong> Written estimate before any work.</li><li><strong>Fixed-price repair.</strong> You approve up front.</li><li><strong>Post-repair test.</strong> Full cycle to confirm the fix.</li></ol>' +
      '<h2>Where we work</h2><p>Available across our full coverage area: ' + states.slice(0,20).map(x => '<a href="/locations/' + x.slug + '/">' + esc(x.name) + '</a>').join(', ') + '.</p>' +
      '<div class="cta-box"><p><strong>Need ' + esc(s.title.toLowerCase()) + '?</strong> Call ' + esc(cfg.brand) + ' at <a href="' + tel(cfg.phone) + '">' + esc(cfg.phone) + '</a>.</p></div>',
  }));
}

write('locations/index.html', layout({
  path:'/locations/', title:'Service Areas — ' + cfg.brand,
  description: cfg.brand + ' serves ' + stats.cities.toLocaleString() + ' cities across ' + stats.states + ' states.',
  h1:'Service Areas',
  body:'<p class="lede">' + esc(cfg.brand) + ' serves ' + stats.cities.toLocaleString() + ' cities and ' + stats.zips.toLocaleString() + ' ZIP codes across ' + stats.states + ' states.</p>' +
    '<div class="grid grid-3 state-cards">' + states.map(s => {
      const si = stateImg[s.id] || stateImg[String(s.id).toLowerCase()] || stateImg[s.slug];
      return '<a class="state-card" href="/locations/' + s.slug + '/">' +
        (si ? '<div class="state-card-img" style="background-image:url(' + si + ')"></div>' : '<div class="state-card-img state-card-img-fallback"></div>') +
        '<div class="state-card-body"><h3>' + esc(s.name) + '</h3><p>' + s.cities.length.toLocaleString() + ' cities</p></div></a>';
    }).join('') + '</div>',
}));

for (const state of states) {
  const zipTotal = state.cities.reduce((a,c) => a + (c.zips||[]).length, 0);
  const sImg = stateImg[state.id] || stateImg[String(state.id).toLowerCase()] || stateImg[state.slug];
  write('locations/' + state.slug + '/index.html', layout({
    path:'/locations/' + state.slug + '/',
    title: cfg.niche + ' in ' + state.name + ' — ' + cfg.brand,
    description: cfg.brand + ' serves ' + state.cities.length + ' cities across ' + state.name + '. Call ' + cfg.phone + '.',
    h1: cfg.niche + ' in ' + state.name,
    body: (sImg ? '<img class="page-hero-img" src="' + sImg + '" alt="' + esc(cfg.niche + ' in ' + state.name) + '" loading="eager">' : '') +
      '<p class="lede">' + esc(cfg.brand) + ' provides ' + esc(cfg.niche) + ' service across ' + esc(state.name) + ' — ' + state.cities.length + ' cities and ' + zipTotal + ' ZIP codes.</p>' +
      '<p>' + esc(state.name) + '\'s climate, building stock, and permit rules shape how ' + esc(cfg.niche.toLowerCase()) + ' jobs actually run in this state. Every job here is performed by a technician licensed to work in ' + esc(state.name) + '.</p>' +
      '<h2>Cities we serve in ' + esc(state.name) + '</h2><div class="city-grid">' + state.cities.map(c => '<a href="/locations/' + state.slug + '/' + c.slug + '/">' + esc(c.name) + '</a>').join('') + '</div>',
  }));

  for (let i = 0; i < state.cities.length; i++) {
    const c = state.cities[i];
    const sibs = [];
    for (let d=1; d<=6 && sibs.length<10; d++) {
      if (state.cities[i-d]) sibs.push(state.cities[i-d]);
      if (state.cities[i+d]) sibs.push(state.cities[i+d]);
    }
    const zips = (c.zips||[]);
    const v = citySections({ brand: cfg.brand, niche: cfg.niche, city: c.name, state: state.name, stateId: state.id, county: c.county || '' });
    const mapQ = encodeURIComponent(c.name + ', ' + state.name);
    const faqSchema = { '@context':'https://schema.org','@type':'FAQPage', mainEntity: v.faqs.map(f => ({ '@type':'Question', name:f.q, acceptedAnswer:{ '@type':'Answer', text:f.a } })) };
    const heroImg = cityImg(c.slug);
    const body =
      '<section class="hero' + (heroImg ? ' hero-with-img' : '') + '"' + (heroImg ? ' style="background-image:linear-gradient(rgba(15,23,32,.75),rgba(15,23,32,.9)),url(' + heroImg + ')"' : '') + '><div class="hero-inner">' +
        '<span class="eyebrow">' + esc(v.heroTag) + '</span>' +
        '<h2 class="hero-h">' + esc(cfg.niche) + ' in ' + esc(c.name) + ', ' + esc(state.id) + ' — done right the first time.</h2>' +
        '<p class="hero-p">' + esc(v.intro) + '</p>' +
        '<div class="hero-cta"><a class="btn btn-primary" href="' + tel(cfg.phone) + '">Call ' + esc(cfg.phone) + '</a><a class="btn btn-ghost" href="#contact">Book online</a></div>' +
        '<ul class="hero-badges"><li>✓ Same-day service</li><li>✓ Licensed & insured</li><li>✓ Fixed pricing</li><li>✓ Workmanship warranty</li></ul>' +
      '</div></section>' +
      '<section class="sec"><h2>Our ' + esc(cfg.niche) + ' services in ' + esc(c.name) + '</h2><p>' + esc(v.whyCity) + '</p>' +
        '<div class="grid grid-3 cards">' + cfg.services.slice(0,9).map(s => { const si = serviceImg(s.slug); return '<a class="card' + (si?' card-img':'') + '" href="/services/' + s.slug + '/">' + (si ? '<div class="card-thumb" style="background-image:url(' + si + ')"></div>' : '') + '<h3>' + esc(s.title) + '</h3><p>' + esc(s.blurb) + '</p><span class="more">Learn more →</span></a>'; }).join('') + '</div></section>' +
      '<section class="sec sec-alt"><h2>' + esc(v.h2Why) + '</h2>' +
        '<div class="grid grid-2"><div><p>' + esc(v.problems) + '</p></div><div><p>' + esc(v.pricing) + '</p></div></div>' +
        '<ul class="check check-grid">' + v.whyUs.map(w => '<li>' + esc(w) + '</li>').join('') + '</ul></section>' +
      '<section class="sec"><h2>What ' + esc(c.name) + ' homeowners say</h2><div class="grid grid-3 testimonials">' +
        v.testimonials.map(t => '<blockquote class="tst"><p>"' + esc(t.quote) + '"</p><footer>— <strong>' + esc(t.name) + '</strong>, ' + esc(t.area) + '</footer></blockquote>').join('') + '</div></section>' +
      '<section class="sec sec-alt"><h2>Frequently asked questions</h2><div class="faq">' +
        v.faqs.map((f,idx) => '<details' + (idx===0?' open':'') + '><summary>' + esc(f.q) + '</summary><p>' + esc(f.a) + '</p></details>').join('') + '</div></section>' +
      '<section class="sec"><h2>' + esc(v.nearbyHead) + '</h2><p>We dispatch across ' + esc(state.name) + ' daily. Nearby cities on our route:</p>' +
        '<div class="city-grid">' + sibs.map(sc => '<a href="/locations/' + state.slug + '/' + sc.slug + '/">' + esc(sc.name) + ', ' + esc(state.id) + '</a>').join('') + '</div>' +
        (zips.length ? '<h3 class="zh">ZIP codes we cover in ' + esc(c.name) + '</h3><p class="zips">' + zips.map(z => '<span>' + esc(z) + '</span>').join('') + '</p>' : '') + '</section>' +
      '<section class="sec cta-band"><div class="cta-band-inner"><div><h2>' + esc(v.ctaLine.replace(/,?\\s*$/, '')) + '</h2><p>Real dispatcher answers 24/7. Fixed-price quote before any work begins.</p></div><a class="btn btn-primary btn-lg" href="' + tel(cfg.phone) + '">' + esc(cfg.phone) + '</a></div></section>' +
      '<section class="sec" id="contact"><div class="contact-grid">' +
        '<div class="map-wrap"><iframe title="Map of ' + esc(c.name) + ', ' + esc(state.name) + '" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=' + mapQ + '&output=embed"></iframe></div>' +
        '<aside class="contact-card"><h3>' + esc(cfg.brand) + ' — ' + esc(c.name) + '</h3><p class="ccl">Serving ' + esc(c.name) + (c.county?', ' + esc(c.county) + ' County':'') + ', ' + esc(state.name) + '</p>' +
          '<dl class="cinfo"><dt>Phone</dt><dd><a href="' + tel(cfg.phone) + '">' + esc(cfg.phone) + '</a></dd><dt>Hours</dt><dd>24/7 emergency · Office 7am–7pm</dd><dt>Service area</dt><dd>' + esc(c.name) + ' + ' + (zips.length||'surrounding') + ' ZIP' + (zips.length===1?'':'s') + '</dd><dt>Website</dt><dd><a href="https://' + esc(cfg.domain) + '">' + esc(cfg.domain) + '</a></dd></dl>' +
          '<a class="btn btn-primary btn-block" href="' + tel(cfg.phone) + '">Call now</a></aside>' +
      '</div></section>' +
      '<h2>' + esc(v.h2Permits) + '</h2><p>' + esc(v.permits) + '</p>' +
      '<script type="application/ld+json">' + JSON.stringify(faqSchema) + '<\\/script>';
    write('locations/' + state.slug + '/' + c.slug + '/index.html', layout({
      path:'/locations/' + state.slug + '/' + c.slug + '/',
      title: cfg.niche + ' in ' + c.name + ', ' + state.id + ' — ' + cfg.brand,
      description: cfg.niche + ' services in ' + c.name + ', ' + state.name + '. Same-day repair, up-front pricing. Call ' + cfg.phone + '.',
      h1: cfg.niche + ' in ' + c.name + ', ' + state.name,
      body,
    }));
  }
}

// Static pages
for (const [p, title, body] of [
  ['blog', 'Blog — ' + cfg.brand, '<p class="lede">Straightforward guides for homeowners. New articles published regularly.</p><p>Browse our <a href="/services/">services</a> or find your city on the <a href="/locations/">locations</a> page.</p>'],
  ['contact', 'Contact ' + cfg.brand, '<p class="lede">Fastest way to reach us is by phone. Our dispatcher answers 24/7.</p><div class="cta-box"><p><strong>Call:</strong> <a href="' + tel(cfg.phone) + '">' + esc(cfg.phone) + '</a></p></div>'],
  ['privacy-policy', 'Privacy Policy — ' + cfg.brand, '<h2>What we collect</h2><p>Contact information you provide. Standard server logs.</p><h2>How we use it</h2><p>Solely to respond to your service request. We do not sell your information.</p>'],
  ['terms-of-service', 'Terms of Service — ' + cfg.brand, '<h2>Estimates</h2><p>Phone estimates are approximate. Firm pricing is provided in writing after on-site diagnostic.</p><h2>Warranty</h2><p>' + esc(cfg.brand) + ' warrants workmanship per your invoice.</p>'],
]) {
  write(p + '/index.html', layout({ path:'/' + p + '/', title, description: title, h1: title.split(' — ')[0], body }));
}

write('crawlhub/index.html', layout({
  path:'/crawlhub/', title:'CrawlHub — ' + cfg.brand, description:'Full index of every page.', h1:'CrawlHub',
  body:'<h2>Services</h2><ul>' + cfg.services.map(s => '<li><a href="/services/' + s.slug + '/">' + esc(s.title) + '</a></li>').join('') + '</ul><h2>States</h2><ul>' + states.map(s => '<li><a href="/locations/' + s.slug + '/">' + esc(s.name) + '</a> (' + s.cities.length + ')</li>').join('') + '</ul>',
}));

// Sitemaps (index + per-section, XSL styled)
const now = new Date().toISOString().slice(0,10);
const base = 'https://' + cfg.domain;
const xsl = '<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>';
function urlset(paths) {
  return '<?xml version="1.0" encoding="UTF-8"?>\n' + xsl + '\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    paths.map(p => '  <url><loc>' + base + p + '</loc><lastmod>' + now + '</lastmod></url>').join('\n') + '\n</urlset>\n';
}
write('sitemap-pages.xml', urlset(['/','/services','/locations','/blog','/contact','/privacy-policy','/terms-of-service','/crawlhub']));
write('sitemap-services.xml', urlset(cfg.services.map(s => '/services/' + s.slug)));
const stateSitemapNames = [];
for (const s of states) {
  const paths = ['/locations/' + s.slug].concat(s.cities.map(c => '/locations/' + s.slug + '/' + c.slug));
  const name = 'sitemap-locations-' + s.slug + '.xml';
  write(name, urlset(paths));
  stateSitemapNames.push(name);
}
const indexEntries = ['sitemap-pages.xml','sitemap-services.xml'].concat(stateSitemapNames);
write('sitemap.xml', '<?xml version="1.0" encoding="UTF-8"?>\n' + xsl + '\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  indexEntries.map(n => '  <sitemap><loc>' + base + '/' + n + '</loc><lastmod>' + now + '</lastmod></sitemap>').join('\n') + '\n</sitemapindex>\n');
write('sitemap.xsl', '<?xml version="1.0" encoding="UTF-8"?>\n<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9"><xsl:output method="html" encoding="UTF-8"/><xsl:template match="/"><html><head><title>XML Sitemap</title><style>body{font-family:-apple-system,sans-serif;max-width:900px;margin:40px auto;padding:0 20px;color:#333}h1{font-size:24px}table{width:100%;border-collapse:collapse}th{text-align:left;padding:10px;background:#f5f5f5;border-bottom:2px solid #ddd;font-size:13px}td{padding:8px 10px;border-bottom:1px solid #eee;font-size:14px}a{color:#1a0dab;text-decoration:none}a:hover{text-decoration:underline}</style></head><body><h1>XML Sitemap</h1><xsl:if test="s:sitemapindex"><p>Index containing <strong><xsl:value-of select="count(s:sitemapindex/s:sitemap)"/></strong> sitemaps.</p><table><tr><th>Sitemap</th><th>Last Modified</th></tr><xsl:for-each select="s:sitemapindex/s:sitemap"><tr><td><a href="{s:loc}"><xsl:value-of select="s:loc"/></a></td><td><xsl:value-of select="s:lastmod"/></td></tr></xsl:for-each></table></xsl:if><xsl:if test="s:urlset"><p>Sitemap containing <strong><xsl:value-of select="count(s:urlset/s:url)"/></strong> URLs.</p><table><tr><th>URL</th><th>Last Modified</th></tr><xsl:for-each select="s:urlset/s:url"><tr><td><a href="{s:loc}"><xsl:value-of select="s:loc"/></a></td><td><xsl:value-of select="s:lastmod"/></td></tr></xsl:for-each></table></xsl:if></body></html></xsl:template></xsl:stylesheet>\n');
write('robots.txt', 'User-agent: *\nAllow: /\nSitemap: ' + base + '/sitemap.xml\n');
write('llms.txt', '# ' + cfg.brand + '\n\n' + cfg.brand + ' — ' + cfg.niche + ' services. https://' + cfg.domain + '\nPhone: ' + cfg.phone + '\n');

// Styles + favicon
fs.writeFileSync(path.join(OUT, 'styles.css'), '*{box-sizing:border-box}:root{--bg:#0f1720;--fg:#e6edf3;--muted:#9aa8b6;--border:#1e2b39;--surface:#141e28;--accent:#f97316;--accent-fg:#0f1720}html,body{margin:0;background:var(--bg);color:var(--fg);font:16px/1.6 -apple-system,sans-serif}a{color:var(--accent);text-decoration:none}a:hover{text-decoration:underline}.container{max-width:1100px;margin:0 auto;padding:0 20px}h1{font-size:clamp(28px,4vw,44px);margin:32px 0 20px;letter-spacing:-.02em}h2{font-size:26px;margin:40px 0 14px}h3{margin:0 0 6px;font-size:18px}p{margin:0 0 14px}.lede{font-size:19px;color:#cfd8e3}.site-header{border-bottom:1px solid var(--border);background:rgba(15,23,32,.9);position:sticky;top:0;z-index:10}.nav{display:flex;align-items:center;gap:20px;padding:14px 20px;flex-wrap:wrap}.nav .brand{font-weight:800;font-size:18px;color:var(--fg)}.nav nav{display:flex;gap:18px;margin-left:auto}.nav nav a{color:var(--fg)}.nav .cta{background:var(--accent);color:var(--accent-fg);padding:10px 16px;border-radius:6px;font-weight:700}main{padding:16px 0 60px}.grid{display:grid;gap:14px}.grid-2{grid-template-columns:repeat(auto-fit,minmax(280px,1fr))}.grid-3{grid-template-columns:repeat(auto-fit,minmax(220px,1fr))}.cards .card{display:block;padding:18px;background:var(--surface);border:1px solid var(--border);border-radius:8px;color:var(--fg)}.cards .card:hover{border-color:var(--accent);text-decoration:none}.cards .card p{color:var(--muted);margin:0}.cards .card .more{color:var(--accent);font-size:13px;display:inline-block;margin-top:8px}.check{list-style:none;padding:0}.check li{padding-left:26px;position:relative;margin:8px 0}.check li::before{content:"✓";position:absolute;left:0;color:var(--accent);font-weight:800}.steps{padding-left:20px}.steps li{margin:10px 0}.city-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:6px 14px;margin:14px 0}.city-grid a{padding:4px 0;color:var(--fg)}.city-grid a:hover{color:var(--accent)}.inline-links a{color:var(--fg)}.inline-links a:hover{color:var(--accent)}.cols{columns:2;list-style:none;padding:0}.cols li{margin:4px 0;break-inside:avoid}.zips{display:flex;flex-wrap:wrap;gap:6px}.zips span{background:var(--surface);border:1px solid var(--border);padding:3px 8px;border-radius:4px;font-size:13px;color:var(--muted)}.cta-box{background:var(--surface);border:1px solid var(--accent);border-radius:8px;padding:18px;margin:26px 0}.btn{display:inline-block;background:var(--accent);color:var(--accent-fg);padding:10px 18px;border-radius:6px;font-weight:700}.site-footer{border-top:1px solid var(--border);background:var(--surface);padding:40px 0 20px;margin-top:60px}.footer-inner{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:24px}.footer-inner ul{list-style:none;padding:0;margin:6px 0}.footer-inner ul li{margin:4px 0}.footer-inner a{color:var(--muted)}.footer-inner strong{color:var(--fg)}.copy{color:var(--muted);font-size:13px;margin-top:20px;padding-top:14px;border-top:1px solid var(--border)}.sec{margin:44px 0}.sec-alt{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:26px}.hero{background:linear-gradient(135deg,rgba(249,115,22,.12),rgba(249,115,22,0) 60%),var(--surface);border:1px solid var(--border);border-radius:14px;padding:36px 28px;margin:20px 0 40px}.hero .eyebrow{display:inline-block;background:rgba(249,115,22,.15);color:var(--accent);padding:6px 12px;border-radius:999px;font-size:13px;font-weight:700}.hero-h{font-size:clamp(24px,3.4vw,36px);margin:14px 0 10px;letter-spacing:-.01em}.hero-p{color:#cfd8e3;max-width:640px;font-size:17px}.hero-cta{display:flex;gap:12px;flex-wrap:wrap;margin:18px 0 20px}.hero-badges{display:flex;flex-wrap:wrap;gap:8px 20px;list-style:none;padding:0;margin:0;color:var(--muted);font-size:14px}.btn-primary{background:var(--accent);color:var(--accent-fg)}.btn-ghost{background:transparent;color:var(--fg);border:1px solid var(--border)}.btn-lg{padding:14px 22px;font-size:17px}.btn-block{display:block;text-align:center;margin-top:14px}.check-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:6px 20px;margin-top:16px}.testimonials .tst{background:var(--bg);border:1px solid var(--border);border-left:3px solid var(--accent);border-radius:8px;padding:18px;margin:0}.testimonials .tst p{color:#e6edf3;font-style:italic}.testimonials .tst footer{color:var(--muted);font-size:13px;font-style:normal;margin-top:8px}.faq details{background:var(--bg);border:1px solid var(--border);border-radius:8px;padding:14px 18px;margin:8px 0}.faq details[open]{border-color:var(--accent)}.faq summary{cursor:pointer;font-weight:700;list-style:none}.faq summary::-webkit-details-marker{display:none}.faq summary::after{content:"+";float:right;color:var(--accent);font-weight:800}.faq details[open] summary::after{content:"−"}.faq details p{margin:10px 0 0;color:#cfd8e3}.zh{margin-top:22px;font-size:16px;color:var(--muted);text-transform:uppercase;letter-spacing:.06em}.cta-band{background:linear-gradient(135deg,var(--accent),#ea580c);border-radius:14px;padding:30px}.cta-band-inner{display:flex;align-items:center;justify-content:space-between;gap:20px;flex-wrap:wrap;color:var(--accent-fg)}.cta-band h2{margin:0;color:var(--accent-fg)}.cta-band p{margin:6px 0 0;color:#3b1f0a}.cta-band .btn-primary{background:#0f1720;color:#fff}.contact-grid{display:grid;grid-template-columns:1.4fr 1fr;gap:20px}@media (max-width:720px){.contact-grid{grid-template-columns:1fr}}.map-wrap{border:1px solid var(--border);border-radius:12px;overflow:hidden;min-height:360px;background:var(--surface)}.map-wrap iframe{width:100%;height:100%;min-height:360px;border:0;display:block}.contact-card{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:22px}.contact-card h3{margin:0 0 4px;font-size:20px}.contact-card .ccl{color:var(--muted);margin:0 0 14px}.cinfo{display:grid;grid-template-columns:110px 1fr;gap:8px 12px;margin:0}.cinfo dt{color:var(--muted);font-size:13px;text-transform:uppercase;letter-spacing:.04em}.cinfo dd{margin:0;color:var(--fg)}.page-hero-img{width:100%;height:auto;max-height:340px;object-fit:cover;border-radius:12px;border:1px solid var(--border);margin:0 0 24px}.hero-with-img{background-size:cover !important;background-position:center !important;color:#fff}.hero-with-img .hero-p{color:#e6edf3}.card-img{padding:0;overflow:hidden}.card-img .card-thumb{height:140px;background-size:cover;background-position:center;background-color:var(--bg)}.card-img h3{padding:14px 16px 4px}.card-img p{padding:0 16px 14px}.card-img .more{padding:0 16px 14px;display:block}.state-cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:16px}.state-card{display:block;background:var(--surface);border:1px solid var(--border);border-radius:12px;overflow:hidden;color:var(--fg)}.state-card:hover{border-color:var(--accent);text-decoration:none}.state-card-img{aspect-ratio:16/9;background-size:cover;background-position:center;background-color:var(--bg)}.state-card-img-fallback{background:linear-gradient(135deg,#1e2b39,#0f1720)}.state-card-body{padding:14px 16px}.state-card-body p{color:var(--muted);margin:0}');
// Append brand-logo style so header logo images render at reasonable height.
fs.appendFileSync(path.join(OUT, 'styles.css'), '.nav .brand{display:inline-flex;align-items:center}.nav .brand-logo{display:block;max-height:40px;width:auto}');
if (!brandImg.favicon) {
  const letter = (cfg.brand.trim()[0]||'S').toUpperCase();
  fs.writeFileSync(path.join(OUT, 'favicon.svg'), '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="#f97316"/><text x="32" y="44" text-anchor="middle" font-family="system-ui" font-weight="800" font-size="36" fill="#0f1720">' + esc(letter) + '</text></svg>');
}

console.log('build: wrote ' + stats.cities + ' cities across ' + stats.states + ' states → ' + OUT + '/');
