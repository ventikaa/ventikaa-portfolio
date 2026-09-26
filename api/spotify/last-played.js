const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token'
const RECENTLY_PLAYED_ENDPOINT = 'https://api.spotify.com/v1/me/player/recently-played?limit=1'
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing'

async function getAccessToken() {
  const basic = Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
  ).toString('base64')

  const res = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: process.env.SPOTIFY_REFRESH_TOKEN,
    }),
  })

  return res.json()
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=30')

  try {
    const token = await getAccessToken()
    const { access_token } = token

    if (!access_token) {
      return res.status(500).json({
        error: 'Spotify token refresh failed',
        reason: token.error,
        detail: token.error_description,
      })
    }

    // try currently playing first
    const nowRes = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: { Authorization: `Bearer ${access_token}` },
    })

    if (nowRes.status === 200) {
      const data = await nowRes.json()
      if (data.item) {
        return res.status(200).json({
          isPlaying: true,
          name: data.item.name,
          artist: data.item.artists.map((a) => a.name).join(', '),
          album: data.item.album.name,
          albumArt: data.item.album.images[0]?.url,
          url: data.item.external_urls.spotify,
        })
      }
    }

    // fall back to recently played
    const recentRes = await fetch(RECENTLY_PLAYED_ENDPOINT, {
      headers: { Authorization: `Bearer ${access_token}` },
    })

    if (!recentRes.ok) {
      const body = await recentRes.json().catch(() => ({}))
      return res.status(500).json({
        error: 'Failed to fetch recently played',
        spotifyStatus: recentRes.status,
        spotifyMessage: body.error?.message,
      })
    }

    const data = await recentRes.json()
    const track = data.items[0]?.track

    if (!track) {
      return res.status(200).json({ name: null })
    }

    return res.status(200).json({
      isPlaying: false,
      name: track.name,
      artist: track.artists.map((a) => a.name).join(', '),
      album: track.album.name,
      albumArt: track.album.images[0]?.url,
      url: track.external_urls.spotify,
    })
  } catch (err) {
    return res.status(500).json({ error: 'Internal error' })
  }
}
