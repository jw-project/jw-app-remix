/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/node" />
import type NodeCache from 'node-cache';

declare global {
  var cacheConfigs: NodeCache | undefined;
  var cacheUser: NodeCache | undefined;
}
