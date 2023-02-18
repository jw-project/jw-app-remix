/* eslint-disable import/no-mutable-exports */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
import NodeCache from 'node-cache';

let cacheConfigs: NodeCache;
let cacheUser: NodeCache;

declare global {
  var cacheConfigs: NodeCache | undefined;
  var cacheUser: NodeCache | undefined;
}

if (process.env.NODE_ENV === 'production') {
  cacheConfigs = new NodeCache();
  cacheUser = new NodeCache();
} else {
  if (!global.cacheConfigs) {
    global.cacheConfigs = new NodeCache({ stdTTL: 60 });
  }
  if (!global.cacheUser) {
    global.cacheUser = new NodeCache({ stdTTL: 60 });
  }
  cacheConfigs = global.cacheConfigs;
  cacheUser = global.cacheUser;
}

export { cacheConfigs, cacheUser };
