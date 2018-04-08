import productionConfigs from './env/production.json';
import developmentConfigs from './env/development.json';

/**
 * Load the environment configuration with specific environment such as production
 */
class Config {
  constructor() {
    // Load the environment configuration
    if (PROD) {
      this.config = productionConfigs;
    } else if (DEV) {
      this.config = developmentConfigs;
    }
  }

  /**
   * Get the current environment configuration object which is loaded in the load() function
   * @return {object}
   */
  getConfig() {
    return this.config;
  }
}

export default new Config();
