module.exports = {
  apps: [
    {
      name: 'API-MICROSERVICE-PAYMENT',
      script: 'server.js',
      args: 'one two',
      instances: '16',
      watch: ['server', 'client'],
      watch_delay: 1000,
      ignore_watch: ['node_modules', 'tmp'],
      watch_options: {
        followSymlinks: false,
      },
      max_memory_restart: '1G',
      log_date_format: 'DD/MM/YYYY HH:mm:ss',
      output: './log_pm2/out.log',
      error: './log_pm2/error.log',
      log_file: './log_pm2/combined.log',
      merge_logs: true,
      env: {
        TZ: 'America/Sao_Paulo',
      },
    },
  ],
};
