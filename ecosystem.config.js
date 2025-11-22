module.exports = {
  apps: [
    {
      name: 'prymagro-frontend',
      script: 'npm',
      args: 'start',
      cwd: '/var/www/development/local-tasks/prymagro/frontend',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        NEXT_PUBLIC_API_URL: 'http://localhost:5800/api'
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
        NEXT_PUBLIC_API_URL: 'http://localhost:5800/api'
      },
      error_file: '/var/log/pm2/prymagro-frontend-error.log',
      out_file: '/var/log/pm2/prymagro-frontend-out.log',
      log_file: '/var/log/pm2/prymagro-frontend.log',
      time: true,
      autorestart: true,
      max_restarts: 10,
      min_uptime: '10s',
      max_memory_restart: '1G'
    }
  ]
};