const { google } = require('googleapis');

const SITE_URL = 'https://trinabh.com.np/';
const SITEMAP_URL = 'https://trinabh.com.np/sitemap.xml';

async function main() {
  const keyJson = process.env.GSC_SERVICE_ACCOUNT_KEY;
  if (!keyJson) {
    throw new Error('GSC_SERVICE_ACCOUNT_KEY environment variable is not set');
  }

  const credentials = JSON.parse(keyJson);
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/webmasters'],
  });

  const searchconsole = google.searchconsole({ version: 'v1', auth });

  await searchconsole.sitemaps.submit({
    siteUrl: SITE_URL,
    feedpath: SITEMAP_URL,
  });

  console.log(`Sitemap resubmitted: ${SITEMAP_URL}`);
}

main().catch((err) => {
  console.error('Failed to resubmit sitemap:', err.message);
  process.exit(1);
});
