module.exports = {
  apps: [
    {
      name: "api-moneybook",
      script: "npm",
      args: "run prod",
      env: {
        NODE_ENV: "production",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
