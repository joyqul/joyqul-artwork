import fs from 'fs';
import path from 'path';

const distDir = path.join(process.cwd(), 'dist');
if (!fs.existsSync(distDir)) {
  console.error("Dist folder does not exist! Run build first.");
  process.exit(1);
}

// Find files in dist/assets to resolve hashed webp image paths
const assetsDir = path.join(distDir, 'assets');
let assetFiles = [];
if (fs.existsSync(assetsDir)) {
  assetFiles = fs.readdirSync(assetsDir);
}

function resolveHashedAsset(prefix) {
  // Find a file that starts with the prefix and ends with .webp, keeping standard regex matching in mind
  const match = assetFiles.find(file => file.startsWith(prefix) && file.endsWith('.webp'));
  if (match) {
    return `/assets/${match}`;
  }
  return `/assets/${prefix}.webp`; // default fallback
}

// Map of the core comic profiles to build statically with beautiful index crawlers
const comics = [
  {
    id: "false_love_signal_manga",
    title: "《虛假的戀愛訊號》線上連載與延伸連結 | 玖伊枯 作品集",
    description: "「心動？這種非理性的衝動，不過是虛假的戀愛訊號。」 高能訊號工作室創辦人蕭薪澤一向這麼相信，直到他的學弟詹震銳闖入他的生活，讓他開始感到動搖⋯⋯",
    imagePrefix: "false_love_signal_banner"
  },
  {
    id: "calculus_manga",
    title: "《過氣男優的我竟然成為了微積分補教名師》線上連載與延伸連結 | 玖伊枯 作品集",
    description: "因為種種原因成為了GV男優的張証哲(25)面臨了過氣的問題，在遇到樓下的鄰居後，意外成為了微積分補教名師⋯⋯？！",
    imagePrefix: "calculus_banner"
  },
  {
    id: "how_to_date_a_dragon_manga",
    title: "《要怎麼跟龍談戀愛》線上連載與延伸連結 | 玖伊枯 作品集",
    description: "在全台最大同性交友軟體上滑到了⋯⋯台北大黑龍？！不是，是要怎麼跟龍談戀愛啦？！",
    imagePrefix: "how_to_date_a_dragon_banner"
  },
  {
    id: "joyqul_daily_manga",
    title: "《飄飄的非日常》日常四格漫畫與延伸連結 | 玖伊枯 作品集",
    description: "用四格記錄一些根本不是日常會發生的事情。",
    imagePrefix: "joyqul_daily"
  }
];

// Create redirect landing pages with custom Open Graph cards
comics.forEach(comic => {
  const pageImageRelative = resolveHashedAsset(comic.imagePrefix);
  const pageImageUrl = `https://joyqul.tw${pageImageRelative}`;
  const pageUrl = `https://joyqul.tw/comic/${comic.id}/`;
  
  const seoHtml = `<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/webp" href="${resolveHashedAsset('joyqul_avatar')}" />
    
    <!-- Primary Search Engine Optimization (SEO) Metadata -->
    <title>${comic.title}</title>
    <meta name="description" content="${comic.description}" />
    <meta name="keywords" content="Joyqul, 玖伊枯, 虛假的戀愛訊號, 過氣男優的我竟然成為了微積分補教名師, 要怎麼跟龍談戀愛, 台灣BL漫畫家, BL漫畫, 日常四格, 耽美漫畫" />
    <link rel="canonical" href="${pageUrl}" />

    <!-- Open Graph / Web Crawler sharing cards -->
    <meta property="og:type" content="article" />
    <meta property="og:title" content="${comic.title}" />
    <meta property="og:description" content="${comic.description}" />
    <meta property="og:url" content="${pageUrl}" />
    <meta property="og:image" content="${pageImageUrl}" />

    <!-- Twitter / X sharing cards -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${comic.title}" />
    <meta name="twitter:description" content="${comic.description}" />
    <meta name="twitter:image" content="${pageImageUrl}" />

    <!-- Instant client redirection logic to the SPA hashtag path -->
    <meta http-equiv="refresh" content="0; url=/#/comic/${comic.id}" />
    <script>
      // Seamlessly transfer page context back to React client router
      const spaTarget = window.location.protocol + '//' + window.location.host + '/#/comic/${comic.id}';
      window.location.replace(spaTarget);
    </script>
  </head>
  <body style="font-family: system-ui, -apple-system, sans-serif; background: #FAF8F5; color: #403C35; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; text-align: center;">
    <div>
      <h3 style="font-weight: 500;">正在為您導向至《玖伊枯作品集》作品專頁...</h3>
      <p style="font-size: 14px; color: #8F8778;">若您的瀏覽器沒有自動跳轉，請 <a href="/#/comic/${comic.id}" style="color: #BCA374; font-weight: bold; text-decoration: underline;">點擊此處</a> 直接開啟。</p>
    </div>
  </body>
</html>
`;

// Ensure directory structures match target requirements
  const outputDir = path.join(distDir, 'comic', comic.id);
  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(path.join(outputDir, 'index.html'), seoHtml);
});

// Create general quiz landing page under dist/quiz/index.html
const generalQuizTitle = "命定推薦測驗 | 玖伊枯 作品集";
const generalQuizDesc = "回答幾個簡單的趣味選擇題，玖伊枯帶你瞬間找出符合你喜好、最好看最對味的原創耽美/日常推薦作品！";
const generalQuizImage = resolveHashedAsset('joyqul_avatar');
const generalQuizImageUrl = `https://joyqul.tw${generalQuizImage}`;
const generalQuizUrl = "https://joyqul.tw/quiz/";

const generalQuizHtml = `<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/webp" href="${generalQuizImage}" />
    
    <!-- Primary Search Engine Optimization (SEO) Metadata -->
    <title>${generalQuizTitle}</title>
    <meta name="description" content="${generalQuizDesc}" />
    <meta name="keywords" content="Joyqul, 玖伊枯, 命定推薦測驗, 虛假的戀愛訊號, 過氣男優的我竟然成為了微積分補教名師, 要怎麼跟龍談戀愛, 台灣BL漫畫家, BL漫畫, 耽美漫畫" />
    <link rel="canonical" href="${generalQuizUrl}" />

    <!-- Open Graph / Web Crawler sharing cards -->
    <meta property="og:type" content="article" />
    <meta property="og:title" content="${generalQuizTitle}" />
    <meta property="og:description" content="${generalQuizDesc}" />
    <meta property="og:url" content="${generalQuizUrl}" />
    <meta property="og:image" content="${generalQuizImageUrl}" />

    <!-- Twitter / X sharing cards -->
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="${generalQuizTitle}" />
    <meta name="twitter:description" content="${generalQuizDesc}" />
    <meta name="twitter:image" content="${generalQuizImageUrl}" />

    <!-- Instant client redirection logic to the SPA hashtag path -->
    <meta http-equiv="refresh" content="0; url=/#/quiz" />
    <script>
      // Seamlessly transfer page context back to React client router
      const urlParams = window.location.search;
      const spaTarget = window.location.protocol + '//' + window.location.host + '/#/quiz' + (urlParams ? urlParams : '');
      window.location.replace(spaTarget);
    </script>
  </head>
  <body style="font-family: system-ui, -apple-system, sans-serif; background: #FAF8F5; color: #403C35; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; text-align: center;">
    <div>
      <h3 style="font-weight: 500;">正在為您導向至《命定推薦測驗》...</h3>
      <p style="font-size: 14px; color: #8F8778;">若您的瀏覽器沒有自動跳轉，請 <a href="/#/quiz" style="color: #BCA374; font-weight: bold; text-decoration: underline;">點擊此處</a> 直接開啟。</p>
    </div>
  </body>
</html>
`;

const quizDir = path.join(distDir, 'quiz');
fs.mkdirSync(quizDir, { recursive: true });
fs.writeFileSync(path.join(quizDir, 'index.html'), generalQuizHtml);

// Create individual quiz result redirect landing pages
comics.forEach(comic => {
  const pageImageRelative = resolveHashedAsset(comic.imagePrefix);
  const pageImageUrl = `https://joyqul.tw${pageImageRelative}`;
  
  // Extract clean title of the work for matching format
  const rawTitleMatch = comic.title.match(/《([^》]+)》/);
  const comicSubTitle = rawTitleMatch ? rawTitleMatch[1] : comic.title.split('|')[0].trim();
  
  const resultTitle = `命定推薦代表作：《${comicSubTitle}》 | 玖伊枯 作品集`;
  const resultDesc = `我在玖伊枯作品集命定推薦測驗得到的結果是《${comicSubTitle}》！快來回答趣味選擇題，找出最適合你的極品耽美原創作品推薦！`;
  const resultUrl = `https://joyqul.tw/quiz/${comic.id}/`;

  const seoResultHtml = `<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/webp" href="${resolveHashedAsset('joyqul_avatar')}" />
    
    <!-- Primary Search Engine Optimization (SEO) Metadata -->
    <title>${resultTitle}</title>
    <meta name="description" content="${resultDesc}" />
    <meta name="keywords" content="Joyqul, 玖伊枯, 命定推薦測驗, ${comicSubTitle}, 台灣BL漫畫家, BL漫畫, 耽美漫畫" />
    <link rel="canonical" href="${resultUrl}" />

    <!-- Open Graph / Web Crawler sharing cards -->
    <meta property="og:type" content="article" />
    <meta property="og:title" content="${resultTitle}" />
    <meta property="og:description" content="${resultDesc}" />
    <meta property="og:url" content="${resultUrl}" />
    <meta property="og:image" content="${pageImageUrl}" />

    <!-- Twitter / X sharing cards -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${resultTitle}" />
    <meta name="twitter:description" content="${resultDesc}" />
    <meta name="twitter:image" content="${pageImageUrl}" />

    <!-- Instant client redirection logic to the SPA hashtag path -->
    <meta http-equiv="refresh" content="0; url=/#/quiz?result=${comic.id}" />
    <script>
      // Seamlessly transfer page context back to React client router
      const urlParams = window.location.search;
      const spaTarget = window.location.protocol + '//' + window.location.host + '/#/quiz?result=${comic.id}' + (urlParams ? '&' + urlParams.substring(1) : '');
      window.location.replace(spaTarget);
    </script>
  </head>
  <body style="font-family: system-ui, -apple-system, sans-serif; background: #FAF8F5; color: #403C35; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; text-align: center;">
    <div>
      <h3 style="font-weight: 500;">正在為您導向至《玖伊枯作品集》測驗結果...</h3>
      <p style="font-size: 14px; color: #8F8778;">若您的瀏覽器沒有自動跳轉，請 <a href="/#/quiz?result=${comic.id}" style="color: #BCA374; font-weight: bold; text-decoration: underline;">點擊此處</a> 直接開啟。</p>
    </div>
  </body>
</html>
`;

  const outputResultDir = path.join(quizDir, comic.id);
  fs.mkdirSync(outputResultDir, { recursive: true });
  fs.writeFileSync(path.join(outputResultDir, 'index.html'), seoResultHtml);
});

// Create Special Thanks redirect page
const specThanksTitle = "《虛假的戀愛訊號》周邊預購感謝名單與進度 | 玖伊枯 作品集";
const specThanksDesc = "「即日起至 7/10 募資中」、「商品製作中」與「感謝贊助名單」。高能訊號工作室 (Hyper Biosignal Studio) 官方募資周邊企劃專屬頁。";
const specThanksImage = resolveHashedAsset('false_love_signal_banner');
const specThanksImageUrl = `https://joyqul.tw${specThanksImage}`;
const specThanksUrl = "https://joyqul.tw/false_love_signal/2026_special_thanks/";

const specThanksHtml = `<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/webp" href="${resolveHashedAsset('joyqul_avatar')}" />
    
    <!-- Primary Search Engine Optimization (SEO) Metadata -->
    <title>${specThanksTitle}</title>
    <meta name="description" content="${specThanksDesc}" />
    <meta name="keywords" content="Joyqul, 玖伊枯, 虛假的戀愛訊號, 高能訊號工作室, 募資中, 商品製作中, 感謝贊助名單" />
    <link rel="canonical" href="${specThanksUrl}" />

    <!-- Open Graph / Web Crawler sharing cards -->
    <meta property="og:type" content="article" />
    <meta property="og:title" content="${specThanksTitle}" />
    <meta property="og:description" content="${specThanksDesc}" />
    <meta property="og:url" content="${specThanksUrl}" />
    <meta property="og:image" content="${specThanksImageUrl}" />

    <!-- Twitter / X sharing cards -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${specThanksTitle}" />
    <meta name="twitter:description" content="${specThanksDesc}" />
    <meta name="twitter:image" content="${specThanksImageUrl}" />

    <!-- Instant client redirection logic to the SPA hashtag path -->
    <meta http-equiv="refresh" content="0; url=/#/false_love_signal/2026_special_thanks" />
    <script>
      // Seamlessly transfer page context back to React client router
      const urlParams = window.location.search;
      const spaTarget = window.location.protocol + '//' + window.location.host + '/#/false_love_signal/2026_special_thanks' + (urlParams ? urlParams : '');
      window.location.replace(spaTarget);
    </script>
  </head>
  <body style="font-family: system-ui, -apple-system, sans-serif; background: #FAF8F5; color: #403C35; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; text-align: center;">
    <div>
      <h3 style="font-weight: 500;">正在為您導向至《虛假的戀愛訊號》周邊預購專頁...</h3>
      <p style="font-size: 14px; color: #8F8778;">若您的瀏覽器沒有自動跳轉，請 <a href="/#/false_love_signal/2026_special_thanks" style="color: #BCA374; font-weight: bold; text-decoration: underline;">點擊此處</a> 直接開啟。</p>
    </div>
  </body>
</html>
`;

const specThanksDir = path.join(distDir, 'false_love_signal', '2026_special_thanks');
fs.mkdirSync(specThanksDir, { recursive: true });
fs.writeFileSync(path.join(specThanksDir, 'index.html'), specThanksHtml);

// Copy original non-hashed joyqul_avatar.webp to dist/assets/ as a robust static fallback
const sourceAvatar = path.join(process.cwd(), 'assets', 'joyqul_avatar.webp');
const targetAvatar = path.join(distDir, 'assets', 'joyqul_avatar.webp');
if (fs.existsSync(sourceAvatar)) {
  fs.mkdirSync(path.dirname(targetAvatar), { recursive: true });
  fs.copyFileSync(sourceAvatar, targetAvatar);
  console.log("Successfully copied static joyqul_avatar.webp fallback to dist/assets/");
}

console.log("SEO Landing Pages build successfully completed!");
