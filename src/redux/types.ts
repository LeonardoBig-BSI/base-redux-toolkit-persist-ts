import type { store } from "./store";

// Exportando RootState (o tipo do estado global)
export type RootState = ReturnType<typeof store.getState>;

// Exportando AppDispatch (quando for utilizar useDispatch)
export type AppDispatch = typeof store.dispatch;