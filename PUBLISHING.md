# Publishing Guide

## 📦 Publishing to NPM

### First Time Setup

1. Create an NPM account at https://www.npmjs.com/signup

2. Login to NPM from terminal:
```bash
npm login
```

3. Update `package.json` with your details:
   - Change repository URL to your GitHub username
   - Update author name
   - Verify the package name is available: https://www.npmjs.com/package/react-3d-button

### Build and Test

```bash
# Install dependencies
npm install

# Build the package
npm run build

# Test the build locally
npm pack
# This creates a .tgz file you can test in another project
```

### Publish to NPM

```bash
# For first release
npm publish

# For subsequent releases
npm version patch  # for bug fixes (1.0.0 -> 1.0.1)
npm version minor  # for new features (1.0.0 -> 1.1.0)
npm version major  # for breaking changes (1.0.0 -> 2.0.0)
npm publish
```

## 🚀 Publishing to GitHub

### Create GitHub Repository

1. Go to https://github.com/new

2. Repository name: `react-3d-button`

3. Description: "A beautiful 3D button component for React with Next.js support and customizable themes"

4. Keep it public (recommended for npm packages)

5. **Don't** initialize with README (we already have one)

6. Click "Create repository"

### Push to GitHub

```bash
# In the react-3d-button directory
git remote add origin https://github.com/YOUR_USERNAME/react-3d-button.git
git branch -M main
git push -u origin main
```

### Create a Release (Optional but Recommended)

1. Go to your repository on GitHub
2. Click "Releases" → "Create a new release"
3. Tag version: `v1.0.0`
4. Release title: `v1.0.0 - Initial Release`
5. Description:
```markdown
## 🎉 Initial Release

### Features
- Beautiful 3D button component with tactile press effects
- 9 button variants (primary, secondary, tertiary, success, error, warning, info, anchor, danger)
- 5 pre-built themes (ocean, sunset, forest, pirate, neon)
- Easy customization via CSS variables
- Next.js 13+ App Router support
- Fixed mobile touch issues
- TypeScript support
- Full documentation and examples

Built on top of [react-awesome-button](https://github.com/rcaferati/react-awesome-button) with improvements.
```

6. Click "Publish release"

## 📝 Update Package.json URLs

Before publishing, update these URLs in `package.json`:

```json
{
  "repository": {
    "type": "git",
    "url": "https://github.com/YOUR_USERNAME/react-3d-button.git"
  },
  "bugs": {
    "url": "https://github.com/YOUR_USERNAME/react-3d-button/issues"
  },
  "homepage": "https://github.com/YOUR_USERNAME/react-3d-button#readme"
}
```

## 🎯 Post-Publishing Checklist

- [ ] Test installation: `npm install react-3d-button`
- [ ] Verify package page: https://www.npmjs.com/package/react-3d-button
- [ ] Add topics/tags on GitHub (react, button, 3d, nextjs, typescript)
- [ ] Update README with actual GitHub username in badges and links
- [ ] Star your own repo 😄
- [ ] Share on social media/Reddit/Dev.to

## 🔄 Making Updates

When you make changes:

```bash
# Make your changes
git add .
git commit -m "feat: add new feature"
git push

# Bump version and publish
npm version patch  # or minor/major
npm publish
git push --tags
```

## 📊 Package Stats

After publishing, you can track your package at:
- NPM: https://www.npmjs.com/package/react-3d-button
- Bundle size: https://bundlephobia.com/package/react-3d-button
- Downloads: https://npm-stat.com/charts.html?package=react-3d-button
