# Flamingos Game Days

SABR BU8 Team 17 Flamingos (Moroco Orthodontics), 2026–27 season.

## How to flip the field status light (about 30 seconds)

1. Open this repository on GitHub (phone app or website) and tap **status.json**.
2. Tap the **pencil** (Edit).
3. Change these lines:
   - `"date"`: the day of the practice or game, written `YYYY-MM-DD` (for example `"2026-11-14"`).
   - `"status"`: one of
     - `"on"` → green light ("Practice is on" / "Game is on")
     - `"cancelled"` → red light
     - `"delayed"` → amber light
     - `"unknown"` → grey light ("No update yet, call the field line")
   - `"note"`: optional short reason, e.g. `"Lightning in the area"`. Leave `""` for none.
4. Tap **Commit changes**.

Parents see it the next time they open the app, usually within a few minutes.

The light only shows for the event whose date matches. When that practice or game is over,
the app goes back to grey on its own, so an old "on" never carries over to the next event.

Keep the quotes and commas exactly as they are. Example:

```json
{
  "date": "2026-11-14",
  "status": "cancelled",
  "note": "Fields closed after heavy rain"
}
```

## How to update who brings snacks

1. Tap **snacks.json**, then the pencil (Edit).
2. Find the game date and type the **family last name** between the quotes, e.g. `"2027-01-16": "Lopez",` (the app adds "family"). Double last names are fine, e.g. `"Vivian Berlinerblau"`.
   Leave `""` for a week nobody has taken yet; the app shows it as "open, sign up".
3. Tap **Commit changes**.

SignUpGenius stays the real sign-up list; this file is just what the app shows.
Use family last names only (no first names or kids' names) since this page is public.

Field line (rain & lightning): (561) 367-7068
