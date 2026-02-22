# ConvertKit Email Sequence Mapping

This project keeps localized email sequence copy in `lib/email-content.ts` and provides a rendering helper in `lib/convertkit-email.ts`.

## Sequence mapping

- `welcome`:
  - `internalName`: `welcome`
  - `dayOffset`: `0` (send immediately)
- `day3`:
  - `internalName`: `what_to_expect_day_3`
  - `dayOffset`: `3`
- `day7`:
  - `internalName`: `refer_a_friend_day_7`
  - `dayOffset`: `7`

## Supported locales

- `en`
- `hy`
- `ru`

## Template tokens

- `{{instagram_handle}}` -> default `@studioyerevan` if not provided
- `{{referral_link}}` -> default `[LINK]` if not provided

## How to generate copy-ready templates in code

Use these helpers:

- `getConvertKitTemplate(locale, step, tokens)`
- `getConvertKitSequenceTemplates(locale, tokens)`

Example payload values:

- `instagramHandle`: `@studioyerevan`
- `referralLink`: user-specific referral URL

## Ops workflow (manual copy/paste)

1. Choose locale (`en`, `hy`, or `ru`).
2. Pull rendered `subject` and `body` for `welcome`, `day3`, `day7`.
3. In ConvertKit visual automation:
   - Add email `welcome` at day 0
   - Add email `what_to_expect_day_3` at day 3
   - Add email `refer_a_friend_day_7` at day 7
4. Keep placeholders only when ConvertKit or a downstream step will inject them at send-time.

## Source files

- Copy source: `lib/email-content.ts`
- Rendering/mapping helper: `lib/convertkit-email.ts`
- Validation tests: `tests/lib/convertkit-email.test.ts`
