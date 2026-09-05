import https from 'https';
import http from 'http';
import fs from 'fs';

// Helper to download a file following redirects
function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);
    const client = url.startsWith('https') ? https : http;
    
    const request = client.get(url, { headers: { 'User-Agent': 'RunRobRun-AssetFetcher/1.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        // Handle redirect
        downloadFile(res.headers.location, destPath).then(resolve).catch(reject);
        return;
      }
      if (res.statusCode !== 200) {
        file.close();
        fs.unlinkSync(destPath);
        return reject(new Error(`Failed to download ${url}: status ${res.statusCode}`));
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Successfully downloaded: ${destPath}`);
        resolve();
      });
    });

    request.on('error', (err) => {
      file.close();
      if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
      reject(err);
    });
  });
}

async function main() {
  console.log('Downloading audio track...');
  try {
    // Try primary MP3 / audio
    await downloadFile('https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Keshco/Gag_Reflex/Keshco_-_01_-_Tasting_Notes.mp3', 'public/audio/track.mp3');
  } catch (err) {
    console.log('FMA attempt failed, trying fallback audio:', err.message);
    try {
      await downloadFile('https://actions.google.com/sounds/v1/science_fiction/force_field_hum_and_drone.ogg', 'public/audio/track.mp3');
    } catch (e) {
      console.log('Audio fetch fallback error:', e.message);
    }
  }

  console.log('Downloading video loop...');
  try {
    await downloadFile('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', 'public/video/about.mp4');
  } catch (err) {
    console.log('Video download error:', err.message);
  }
}

main();
