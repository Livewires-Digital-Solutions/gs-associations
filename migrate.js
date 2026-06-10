const fs = require('fs');
const path = require('path');

const mappings = {
  // Public
  'src/pages/public/HomePage.tsx': 'app/(public)/page.tsx',
  'src/pages/public/PropertiesPage.tsx': 'app/(public)/properties/page.tsx',
  'src/pages/public/PropertyDetailPage.tsx': 'app/(public)/properties/[id]/page.tsx',
  'src/pages/public/LoansPage.tsx': 'app/(public)/loans/page.tsx',
  'src/pages/public/BlogListPage.tsx': 'app/(public)/blog/page.tsx',
  'src/pages/public/BlogDetailPage.tsx': 'app/(public)/blog/[slug]/page.tsx',
  'src/pages/public/AboutPage.tsx': 'app/(public)/about/page.tsx',
  'src/pages/public/ContactPage.tsx': 'app/(public)/contact/page.tsx',

  // Auth
  'src/pages/auth/LoginPage.tsx': 'app/(public)/login/page.tsx',
  'src/pages/auth/RegisterPage.tsx': 'app/(public)/register/page.tsx',

  // User Dashboard
  'src/pages/user/UserDashboard.tsx': 'app/dashboard/page.tsx',
  'src/pages/user/SavedProperties.tsx': 'app/dashboard/saved/page.tsx',
  'src/pages/user/RecentlyViewed.tsx': 'app/dashboard/history/page.tsx',
  'src/pages/user/ProfileSettings.tsx': 'app/dashboard/profile/page.tsx',

  // Admin
  'src/pages/admin/AdminDashboard.tsx': 'app/admin/page.tsx',
  'src/pages/admin/AdminProperties.tsx': 'app/admin/properties/page.tsx',
  'src/pages/admin/AdminTracking.tsx': 'app/admin/tracking/page.tsx',
  'src/pages/admin/AdminLeads.tsx': 'app/admin/leads/page.tsx',
  'src/pages/admin/AdminUsers.tsx': 'app/admin/users/page.tsx',
  'src/pages/admin/AdminBlog.tsx': 'app/admin/blog/page.tsx',
  'src/pages/admin/AdminLoans.tsx': 'app/admin/loans/page.tsx',
  'src/pages/admin/AdminAnalytics.tsx': 'app/admin/analytics/page.tsx',
  'src/pages/admin/AdminSettings.tsx': 'app/admin/settings/page.tsx',
};

// Also we need to modify components in-place to fix router imports
const componentsToPatch = [
  'src/components/property/PropertyCard.tsx',
];

function processContent(content, srcPath, destPath) {
  // 1. Add use client
  if (!content.startsWith("'use client'") && !content.startsWith('"use client"')) {
    content = `'use client';\n\n` + content;
  }

  // 2. Fix relative imports to use alias
  // Replace imports like: import { ... } from '../../stores/authStore'
  // Or import ... from '../components/...'
  // We'll just replace '../' and '../../' with relative paths that match the NEW location, or just use `@/src/`
  
  content = content.replace(/from '(\.\.\/)+([^']+)'/g, (match, prefix, rest) => {
    // Determine the absolute path of the import relative to the srcPath
    const absoluteImportPath = path.resolve(path.dirname(srcPath), prefix + rest);
    // Relative to the project root
    const rootRelative = path.relative(__dirname, absoluteImportPath);
    return `from '@/${rootRelative}'`;
  });

  // 3. Replace react-router-dom with Next.js navigation
  let importsToAdd = [];
  
  if (content.includes('Link')) {
    importsToAdd.push(`import Link from 'next/link';`);
  }
  
  let navImports = [];
  if (content.includes('useNavigate') || content.includes('useLocation') || content.includes('useParams')) {
    if (content.includes('useNavigate')) navImports.push('useRouter');
    if (content.includes('useLocation')) navImports.push('usePathname');
    if (content.includes('useParams')) navImports.push('useParams');
    importsToAdd.push(`import { ${navImports.join(', ')} } from 'next/navigation';`);
  }

  // Remove react-router-dom import entirely
  content = content.replace(/import\s+{([^}]*)}\s+from\s+['"]react-router-dom['"];?\n?/g, '');
  
  // Replace useNavigate with useRouter
  content = content.replace(/const\s+navigate\s*=\s*useNavigate\(\)/g, 'const router = useRouter()');
  content = content.replace(/navigate\(/g, 'router.push(');

  // Replace useLocation with usePathname
  content = content.replace(/const\s+location\s*=\s*useLocation\(\)/g, 'const pathname = usePathname()');
  content = content.replace(/location\.pathname/g, 'pathname');

  // Insert the new imports after the 'use client'; line
  const lines = content.split('\n');
  const finalLines = [];
  let added = false;
  for (const line of lines) {
    finalLines.push(line);
    if ((line.startsWith("'use client'") || line.startsWith('"use client"')) && !added) {
      finalLines.push('');
      finalLines.push(...importsToAdd);
      added = true;
    }
  }
  
  return finalLines.join('\n');
}

for (const [src, dest] of Object.entries(mappings)) {
  if (fs.existsSync(src)) {
    const content = fs.readFileSync(src, 'utf-8');
    const newContent = processContent(content, src, dest);
    
    // Ensure dest directory exists
    const destDir = path.dirname(dest);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    
    fs.writeFileSync(dest, newContent);
    console.log(`Migrated: ${src} -> ${dest}`);
  } else {
    console.warn(`File not found: ${src}`);
  }
}

for (const comp of componentsToPatch) {
  if (fs.existsSync(comp)) {
    const content = fs.readFileSync(comp, 'utf-8');
    const newContent = processContent(content, comp, comp); // same dest
    fs.writeFileSync(comp, newContent);
    console.log(`Patched component: ${comp}`);
  }
}
