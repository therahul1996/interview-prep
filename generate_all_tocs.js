const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();
const dirs = fs.readdirSync(rootDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory() && dirent.name !== '.git' && dirent.name !== 'node_modules')
  .map(dirent => dirent.name);

function generateSlug(text) {
  // Remove markdown formatting
  let cleanText = text.replace(/[*_~`]/g, '');
  // To lowercase
  cleanText = cleanText.toLowerCase();
  // Remove punctuation
  cleanText = cleanText.replace(/[.,?/#!$%^&*;:{}=\-_`~()]/g, '');
  // Replace spaces with hyphens
  cleanText = cleanText.replace(/\s+/g, '-');
  return cleanText;
}

for (const dir of dirs) {
  const readmePath = path.join(rootDir, dir, 'README.md');
  if (fs.existsSync(readmePath)) {
    let content = fs.readFileSync(readmePath, 'utf8');

    // Skip if it already has the table header `| No. | Questions |`
    if (content.includes('| No. | Questions')) {
      console.log(`Skipping ${dir} - already has TOC`);
      continue;
    }

    // Find all questions. Matches lines starting with 2 to 4 '#' characters, a space, a number, a dot, and then text.
    const questionRegex = /^(#{2,4})\s+([0-9]+)\.\s+(.*)$/gm;
    let match;
    const questions = [];
    while ((match = questionRegex.exec(content)) !== null) {
      const hashes = match[1];
      const number = match[2];
      const text = match[3].trim();
      questions.push({ number, text, hashes });
    }

    if (questions.length === 0) {
      console.log(`Skipping ${dir} - no questions found matching format`);
      continue;
    }

    // Build TOC
    let toc = '### Table of Contents\n\n| No. | Questions |\n|---- | --------- |\n';
    for (const q of questions) {
      const slug = `${q.number}-${generateSlug(q.text)}`;
      toc += `| ${q.number} | [${q.text}](#${slug}) |\n`;
    }
    toc += '\n';

    // Insert TOC right after the main header block
    // We expect the file to have a header block starting with `<div align="center">` and ending with `---`
    // If not, we insert after the first `# ` heading
    
    // Check for the div header
    const headerRegex = /<div align="center">[\s\S]*?<\/div>\s*---\s*/;
    const headerMatch = content.match(headerRegex);

    if (headerMatch) {
      const insertPos = headerMatch.index + headerMatch[0].length;
      content = content.slice(0, insertPos) + toc + content.slice(insertPos);
    } else {
      // Fallback: insert after first `# ` heading
      const h1Regex = /^#\s+.*$/m;
      const h1Match = content.match(h1Regex);
      if (h1Match) {
        const insertPos = h1Match.index + h1Match[0].length + 1;
        content = content.slice(0, insertPos) + '\n' + toc + content.slice(insertPos);
      } else {
        // Just prepend
        content = toc + content;
      }
    }

    fs.writeFileSync(readmePath, content);
    console.log(`Updated ${dir}/README.md with TOC`);
  }
}
