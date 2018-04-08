import auth from './authorization';
import core from './core';
import demo from './demo';

let modules = {};

if (PROD || UAT) {
  modules = {
    auth,
    core,
    demo
  };
} else if (DEV || TEST) {
  modules = {
    auth,
    core,
    demo
  };
}

export let routers = {};
export let redux = {};

Object.keys(modules).forEach(key => {
  const mod = modules[key];
  routers[key] = mod.router || {};
  Object.keys(mod.redux || {}).forEach(rdKey => {
    const rd = mod.redux[rdKey];
    redux[`${key}_${rdKey}`] = rd || {};
  });
});
