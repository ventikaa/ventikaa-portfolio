/**
 * One-time script to get your Spotify refresh token.
 *
 * Steps:
 * 1. Go to https://developer.spotify.com/dashboard
 * 2. Create an app (name: "Portfolio", redirect URI: http://127.0.0.1:3456/callback)
 * 3. Copy Client ID and Client Secret
 * 4. Run: node scripts/get-spotify-token.mjs <CLIENT_ID> <CLIENT_SECRET>
 * 5. Open the URL it prints in your browser
 * 6. Log in to Spotify and authorize
 * 7. Copy the refresh_token it prints — that's what goes in Vercel env vars
 */

import http from 'node:http'

const CLIENT_ID = process.argv[2]
const CLIENT_SECRET = process.argv[3]
const REDIRECT_URI = 'http://127.0.0.1:3456/callback'
const SCOPES = 'user-read-recently-played user-read-currently-playing'

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error('\nUsage: node scripts/get-spotify-token.mjs <CLIENT_ID> <CLIENT_SECRET>\n')
  console.error('Get these from https://developer.spotify.com/dashboard')
  process.exit(1)
}

const authUrl = new URL('https://accounts.spotify.com/authorize')
authUrl.searchParams.set('client_id', CLIENT_ID)
authUrl.searchParams.set('response_type', 'code')
authUrl.searchParams.set('redirect_uri', REDIRECT_URI)
authUrl.searchParams.set('scope', SCOPES)

console.log('\n1. Open this URL in your browser:\n')
console.log(authUrl.toString())
console.log('\n2. Log in and authorize. You\'ll be redirected back here.\n')

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://127.0.0.1:3456`)
  if (!url.pathname.startsWith('/callback')) return

  const code = url.searchParams.get('code')
  if (!code) {
    res.writeHead(400, { 'Content-Type': 'text/plain' })
    res.end('Missing code parameter')
    return
  }

  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')

  const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: REDIRECT_URI,
    }),
  })

  const data = await tokenRes.json()

  if (data.refresh_token) {
    console.log('\n✓ Got your refresh token!\n')
    console.log('SPOTIFY_REFRESH_TOKEN=' + data.refresh_token)
    console.log('\nAdd these three env vars to Vercel:\n')
    console.log(`  SPOTIFY_CLIENT_ID=${CLIENT_ID}`)
    console.log(`  SPOTIFY_CLIENT_SECRET=${CLIENT_SECRET}`)
    console.log(`  SPOTIFY_REFRESH_TOKEN=${data.refresh_token}`)
    console.log()

    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end('<h2>Done! Check your terminal for the refresh token. You can close this tab.</h2>')
  } else {
    console.error('\nError getting token:', data)
    res.writeHead(500, { 'Content-Type': 'text/plain' })
    res.end('Error: ' + JSON.stringify(data))
  }

  server.close()
})

server.listen(3456, () => {
  console.log('Waiting for Spotify callback on http://127.0.0.1:3456 ...\n')
})
