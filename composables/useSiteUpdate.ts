const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

function ordinal(day: number): string {
  const rem10 = day % 10
  const rem100 = day % 100
  if (rem10 === 1 && rem100 !== 11) return `${day}st`
  if (rem10 === 2 && rem100 !== 12) return `${day}nd`
  if (rem10 === 3 && rem100 !== 13) return `${day}rd`
  return `${day}th`
}

function formatDate(y: string, m: string, d: string): string {
  return `${MONTHS[Number(m) - 1]} ${ordinal(Number(d))}, ${y}`
}

function extractLatestDate(content: string): string | null {
  const matches = [...content.matchAll(/^## (\d{4})-(\d{2})-(\d{2})(?:[^\S\n]*(\d{2}:\d{2}))?/gm)]
  if (!matches.length) return null
  const latest = matches.reduce((a, b) => {
    const ka = `${a[1]}-${a[2]}-${a[3]} ${a[4] ?? '00:00'}`
    const kb = `${b[1]}-${b[2]}-${b[3]} ${b[4] ?? '00:00'}`
    return kb > ka ? b : a
  })
  return formatDate(latest[1], latest[2], latest[3])
}

const changelogRaw = (() => {
  const files = import.meta.glob('/docs/changelog.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>
  return Object.values(files)[0] ?? ''
})()

export function useSiteUpdate(): { date: string | null } {
  return { date: changelogRaw ? extractLatestDate(changelogRaw) : null }
}
