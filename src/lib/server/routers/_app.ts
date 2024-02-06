import { computersRouter } from "./computers";
import { router } from "@/lib/server/trpc";
import { accountRouter } from "./account";
import { pagesRouter } from "./pages";
import { moviesRouter } from "./movies";

export const appRouter = router({
  computers: computersRouter,
  account: accountRouter,
  pages: pagesRouter,
  movies: moviesRouter,
});

export type AppRouter = typeof appRouter;
