# cz-epg

Auto-updating XMLTV EPG (electronic program guide) for a set of Czech TV channels,
built for use as a **Jellyfin** Live TV guide provider.

The guide is regenerated **daily via GitHub Actions** from
[`iptv-org/epg`](https://github.com/iptv-org/epg) (source: `m.tv.sms.cz`), so the URL
below always serves fresh data — 7 days ahead, ~4000+ programmes.

## Guide URL

```
https://raw.githubusercontent.com/hupcus/cz-epg/main/guide.xml
```

## Use in Jellyfin

Dashboard → **Live TV** → **TV Guide Data Providers** → **Add** → **XMLTV** →
paste the URL above → **Save**. Then enable this guide provider on your M3U tuner.
Channels pair automatically because the M3U `tvg-id` values match the `channel id`
values in this guide.

## Channels

`cz.channels.xml` defines the lineup (ČT1/2/24/:D/art, Prima family, Barrandov Krimi,
Disney, History, Minimax, Nicktoons, Seznam TV). ČT :D and ČT art are merged into one
channel (`CTDecko.cz@SD`) by `postprocess-epg.js`, because they share one physical
channel in the playlist (Déčko daytime, art in the evening).

## Notes / fixes baked into the workflow

- `NODE_OPTIONS=--tls-cipher-list=DEFAULT@SECLEVEL=0` — `m.tv.sms.cz` uses a weak
  Diffie-Hellman key and an old certificate signature that modern Node/OpenSSL rejects.
  Scoped to the grab process only (fetches a public TV schedule; no credentials).
- The `m.tv.sms.cz` site config is patched at build time to load the dayjs
  `customParseFormat` plugin (otherwise time parsing throws `Invalid time value`).

## Manual run

Actions tab → **Update EPG** → **Run workflow**.
