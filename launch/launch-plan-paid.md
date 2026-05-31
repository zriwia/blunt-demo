# Blunt Paid Launch Plan

## Goal

Get the first wave of paid traffic to the Blunt concept with one measurable outcome: **high-quality survey reactions from relevant people**.

Tomorrow's mission is not scale. It is signal:

- Does the message earn curiosity?
- Does paid traffic click into the survey?
- Do reactions show real resonance or polite indifference?

## Core Offer

**Concept reaction, not a hard sell.**

People land on a sharp thesis:

> AI should show how sure it is.

Then they are pushed into one action:

> React to the concept in the survey.

## Funnel

1. Paid ad
2. [`paid/index.html`](../paid/index.html)
3. [`h10-survey.html`](../h10-survey.html)
4. Webhook submissions + optional email capture

## Recommended Launch Structure

### Campaign Objective

Use a **traffic / website visits** style objective first.

Why:

- It is the fastest path to clean landing-page traffic.
- The survey is the actual conversion step.
- Early-stage learning matters more than algorithmic optimization on tiny volume.

### Audience Angles

Run narrow, relevance-first targeting. Start with 2-3 audiences, not 10.

1. AI / product builders
   - Founders
   - Product managers
   - AI engineers
   - Design / research leads

2. Knowledge workers with trust pain
   - Analysts
   - Consultants
   - Researchers
   - Strategy / operations roles

3. Tech-curious early adopters
   - People already engaging with AI, LLM, agent, prompt, or startup topics

### Creative Rotation

Use one video + two image creatives at launch.

1. `launch/creative/blunt_manifesto_15s.mp4`
   - Strongest emotional hook
   - Best for stopping the scroll

2. `launch/creative/blunt_ad_square_01.png`
   - Clear product thesis
   - Direct click driver

3. `launch/creative/blunt_ad_square_02.png`
   - Clear trust-gap framing
   - Slightly more explanatory

## URL Strategy

Use separate tracked URLs per creative.

### Video Ad

```text
https://zriwia.github.io/blunt-demo/paid/?src=x-paid&campaign=blunt-launch&v=video-01
```

### Image Ad 1

```text
https://zriwia.github.io/blunt-demo/paid/?src=x-paid&campaign=blunt-launch&v=image-01
```

### Image Ad 2

```text
https://zriwia.github.io/blunt-demo/paid/?src=x-paid&campaign=blunt-launch&v=image-02
```

## Suggested Spend Logic

Keep this as a **test budget**, not a declaration of war.

- Put enough spend behind each creative to get learnings.
- Avoid fragmenting across too many audiences and messages.
- If budget is tight, run **one audience x two creatives** before opening up more combinations.

## Decision Rules For The First Morning

If one creative clearly wins on click-through:

- Keep it live
- Pause the weakest one
- Push traffic into the survey

If clicks happen but survey starts are weak:

- The landing page message is unclear
- Tighten the hero and CTA emphasis

If survey starts happen but submissions are weak:

- The concept is attracting curiosity but not conviction
- Review question friction and qualitative comments

If CTR is weak across all creatives:

- The problem is probably the hook, not the survey
- Rework the ad front-end before increasing spend

## Assets Ready In Repo

- Paid landing: [`paid/index.html`](../paid/index.html)
- Survey: [`h10-survey.html`](../h10-survey.html)
- Ad copy: [`launch/ad-copy.md`](./ad-copy.md)
- Activation checklist: [`launch/activation-checklist.md`](./activation-checklist.md)
- Creative source board: [`launch/creative/ad-boards.html`](./creative/ad-boards.html)
- Creative packaging notes: [`launch/creative/README.md`](./creative/README.md)

## Human Dependencies

These are the only things the machine cannot unlock for you by itself:

- X Ads account access / billing / Premium gate if still required
- Final campaign activation
- Any platform-side approval or payment issue

Everything else in this repo is structured so you can wake up, unlock the account, upload assets, and go live.
