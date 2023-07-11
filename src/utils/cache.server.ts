import NodeCache from 'node-cache';

let cacheConfigs: NodeCache;
let cacheUser: NodeCache;

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
  ({ cacheConfigs } = global);
  ({ cacheUser } = global);
}

export { cacheConfigs, cacheUser };
