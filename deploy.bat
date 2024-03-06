@echo off

echo -> Git Merge main
git merge main || exit /b

echo -> Build
npm run build -- --base-href https://jsorant.github.io/personal-journey/

echo -> Prepare docs folder
rm -rf docs/* || exit /b
cp -rf dist/apps/personal-journey-front/browser/* docs/ || exit /b
cp dist/apps/personal-journey-front/3rdpartylicenses.txt docs/ || exit /b

echo -> Git Commit & Push
git add .
git commit -m "Deploy"
git push
