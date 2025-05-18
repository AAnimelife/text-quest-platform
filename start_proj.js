const { spawn } = require('child_process');
const path = require('path');

function runCommand(command, args, cwd, label) {
  return new Promise((resolve, reject) => {
    const proc = spawn(command, args, {
      cwd,
      shell: true,
      stdio: 'inherit',
    });

    proc.on('close', (code) => {
      if (code === 0) {
        console.log(`✅ ${label} completed successfully.`);
        resolve();
      } else {
        console.error(`❌ ${label} failed with code ${code}`);
        reject(new Error(`${label} failed`));
      }
    });
  });
}

function runStartDetached(dir) {
  const fullPath = path.resolve(__dirname, dir);
  console.log(`🚀 Starting ${dir} (detached)...`);

  const proc = spawn('npm', ['start'], {
    cwd: fullPath,
    shell: true,
    detached: true,
    stdio: 'inherit',
  });

  proc.unref(); // 👈 Позволяет процессу работать независимо
}

async function setupAndStartDetached(dir) {
  const fullPath = path.resolve(__dirname, dir);
  console.log(`📦 Installing dependencies in ${dir}...`);
  await runCommand('npm', ['install'], fullPath, `${dir}: install`);

  runStartDetached(dir);
}

(async () => {
  try {
    // Устанавливаем и запускаем без ожидания завершения старта
    await Promise.all([
      setupAndStartDetached('frontend'),
      setupAndStartDetached('backend'),
    ]);
  } catch (err) {
    console.error('⛔ Ошибка запуска проектов:', err.message);
    process.exit(1);
  }
})();
