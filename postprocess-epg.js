// Post-processes guide.xml for this Jellyfin setup.
// ČT :D and ČT art share one physical channel in the M3U playlist
// (tvg-id="CTDecko.cz@SD", stream ct_art). ČT :D airs daytime, ČT art evening.
// We merge ČT art's programmes into the ČT :D channel so that single M3U
// channel gets a complete 24h guide instead of going blank in the evening.
const fs = require('fs')
const path = require('path')

const file = path.join(__dirname, 'guide.xml')
let xml = fs.readFileSync(file, 'utf8')

// 1. Reassign every ČT art programme to the ČT :D channel id.
const reassigned = (xml.match(/channel="CTart\.cz@SD"/g) || []).length
xml = xml.replace(/(<programme\b[^>]*\bchannel=")CTart\.cz@SD(")/g, '$1CTDecko.cz@SD$2')

// 2. Drop the now-unused standalone ČT art <channel> definition.
xml = xml.replace(/<channel id="CTart\.cz@SD"><display-name>[\s\S]*?<\/channel>/g, '')

// 3. Relabel the merged channel so the display name reflects both.
xml = xml.replace(
  /(<channel id="CTDecko\.cz@SD"><display-name>)[^<]*(<\/display-name>)/,
  '$1ČT :D / ČT art$2'
)

fs.writeFileSync(file, xml)
console.log(`postprocess: merged ${reassigned} ČT art programmes into CTDecko.cz@SD`)
