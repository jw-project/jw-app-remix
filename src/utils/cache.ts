import NodeCache from 'node-cache';

// eslint-disable-next-line import/no-mutable-exports
let cache: NodeCache;

declare global {
  // eslint-disable-next-line vars-on-top, no-var
  var cache: NodeCache | undefined;
}

if (process.env.NODE_ENV === 'production') {
  cache = new NodeCache();
} else {
  if (!global.cache) {
    global.cache = new NodeCache({ stdTTL: 60 });
  }
  cache = global.cache;
}

export { cache };
