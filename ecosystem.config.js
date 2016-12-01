module.exports = {
  apps: [{
    name: 'server',
    script: 'server.js',
    post_update: ['npm install'],
    watch: true,
    ignore_watch: ['node_modules', 'logs', '.git'],
    env: {
      "NODE_ENV": "development",
    },
    env_production : {
       "NODE_ENV": "production"
    }
  }]
}
