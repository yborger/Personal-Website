import fs from 'fs';
import path from 'path';

const CASE_STUDY_DIR = path.join(process.cwd(), 'app/portfolio/cases');

export interface CaseStudyMetadata { 
  title: string
  image: string
  summary: string
  slug: string
}

// Function to extract metadata (title, image, summary) from a case study file
export function parseCaseStudy(fileContent) {
  let frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  let match = frontmatterRegex.exec(fileContent);
  let frontMatterBlock = match ? match[1] : '';
  let content = fileContent.replace(frontmatterRegex, '').trim();
  let frontMatterLines = frontMatterBlock.trim().split('\n')
  
  let metadata: Partial<CaseStudyMetadata> = {}

  frontMatterLines.forEach((line) => {
    let [key, ...valueArr] = line.split(': ')
    let value = valueArr.join(': ').trim()
    value = value.replace(/^['"](.*)['"]$/, '$1') // Remove quotes
    metadata[key.trim() as keyof CaseStudyMetadata] = value
  })
  return { metadata: metadata as CaseStudyMetadata, content }
}


// alphabetize by title
export function getAllCaseStudies() {
  if (!fs.existsSync(CASE_STUDY_DIR)) {
    console.error(`Directory not found: ${CASE_STUDY_DIR}`);
    return [];
  }
  const files = fs.readdirSync(CASE_STUDY_DIR);
  let caseStudies = files.map((filename) => {
    const filePath = path.join(CASE_STUDY_DIR, filename);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { metadata } = parseCaseStudy(fileContent);
    return {
      title: metadata.title || 'Untitled',
      image: metadata.image || '/default.jpg',
      summary: metadata.summary || '',
      slug: filename.replace(/\.mdx?$/, ''),
    };
  });

  return caseStudies.sort((a, b) => a.title.localeCompare(b.title));
}

// slug-based extract
export function getCaseStudyBySlug(slug) {
  const filePath = path.join(CASE_STUDY_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { metadata, content } = parseCaseStudy(fileContent);

  return {
    slug,
    title: metadata.title || 'Untitled',
    image: metadata.image || '/default.jpg',
    summary: metadata.summary || '',
    content,
  };
}
