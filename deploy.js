const { execSync } = require('node:child_process');

try {
  console.log('== Git merge main');
  run('git pull origin main');
  run('git merge main');

  console.log('== Build');
  run(
    'npm run build -- --base-href https://jsorant.github.io/personal-journey/'
  );

  console.log('== Prepare docs folder');
  run('rm -rf docs/*');
  run('cp -rf dist/apps/personal-journey-front/browser/* docs/');
  run('cp dist/apps/personal-journey-front/3rdpartylicenses.txt docs/');

  console.log('== Git commit & push');
  run('git add .');
  run(`git commit -m "${commitMessage()}"`);
  run('git push');
} catch (e) {
  console.log('\n\n== DEPLOY FAILED: ' + e.message);
}

function run(command) {
  console.log(execSync(command, { encoding: 'utf-8' }));
}

function commitMessage() {
  return `Deploy - ${new Date().toISOString()}`;
}
