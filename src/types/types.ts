type ScriptMeta = { id: string; author: string; name: string };

export type Script = [ScriptMeta, ...string[]];
