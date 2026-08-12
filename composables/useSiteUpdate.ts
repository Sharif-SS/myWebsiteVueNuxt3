const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

const TZ = 'America/St_Johns'

function ordinal(day: number): string {
  const rem10 = day % 10
  const rem100 = day % 100
  if (rem10 === 1 && rem100 !== 11) return `${day}st`
  if (rem10 === 2 && rem100 !== 12) return `${day}nd`
  if (rem10 === 3 && rem100 !== 13) return `${day}rd`
  return `${day}th`
}

function formatDate(date: Date): string {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: TZ,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  }).formatToParts(date)
  const get = (type: string) => parts.find(p => p.type === type)?.value ?? ''
  return `${MONTHS[Number(get('month')) - 1]} ${ordinal(Number(get('day')))}, ${get('year')}`
}

function extractLatestDate(content: string): string | null {
  const matches = [...content.matchAll(/^## (\d{4})-(\d{2})-(\d{2})(?:[^\S\n]*(\d{2}:\d{2}))?/gm)]
  if (!matches.length) return null
  const latest = matches.reduce((a, b) => {
    const ka = `${a[1]}-${a[2]}-${a[3]} ${a[4] ?? '00:00'}`
    const kb = `${b[1]}-${b[2]}-${b[3]} ${b[4] ?? '00:00'}`
    return kb > ka ? b : a
  })
  const date = latest[4]
    ? new Date(`${latest[1]}-${latest[2]}-${latest[3]}T${latest[4]}:00Z`)
    : new Date(`${latest[1]}-${latest[2]}-${latest[3]}T12:00:00Z`)
  return formatDate(date)
}

const changelogRaw = (() => {
  const files = import.meta.glob('/docs/changelog.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>
  return Object.values(files)[0] ?? ''
})()

export function useSiteUpdate(): { date: string | null } {
  return { date: changelogRaw ? extractLatestDate(changelogRaw) : null }
}
