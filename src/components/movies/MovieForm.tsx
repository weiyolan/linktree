"use client";

import { Movie, NewMovieParams, insertMovieParams } from "@/lib/db/schema/movies";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc/client";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

const MovieForm = ({
  movie,
  closeModal,
}: {
  movie?: Movie;
  closeModal?: () => void;
}) => {
  const { toast } = useToast();
  
  const editing = !!movie?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertMovieParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertMovieParams),
    defaultValues: movie ?? {
      title: "",
     category: "",
     favorite: false
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast({
        title: `${action
          .slice(0, 1)
          .toUpperCase()
          .concat(action.slice(1))} Failed`,
        description: data.error,
        variant: "destructive",
      });
      return;
    }

    await utils.movies.getMovies.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast({
      title: 'Success',
      description: `Movie ${action}d!`,
      variant: "default",
    });
  };

  const { mutate: createMovie, isLoading: isCreating } =
    trpc.movies.createMovie.useMutation({
      onSuccess: (res) => onSuccess("create"),
    });

  const { mutate: updateMovie, isLoading: isUpdating } =
    trpc.movies.updateMovie.useMutation({
      onSuccess: (res) => onSuccess("update"),
    });

  const { mutate: deleteMovie, isLoading: isDeleting } =
    trpc.movies.deleteMovie.useMutation({
      onSuccess: (res) => onSuccess("delete"),
    });

  const handleSubmit = (values: NewMovieParams) => {
    if (editing) {
      updateMovie({ ...values, id: movie.id });
    } else {
      createMovie(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (<FormItem>
              <FormLabel>Title</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (<FormItem>
              <FormLabel>Category</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="favorite"
          render={({ field }) => (<FormItem>
              <FormLabel>Favorite</FormLabel>
                <br />
            <FormControl>
              <Checkbox {...field} checked={!!field.value} onCheckedChange={field.onChange} value={""} />
            </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="mr-1"
          disabled={isCreating || isUpdating}
        >
          {editing
            ? `Sav${isUpdating ? "ing..." : "e"}`
            : `Creat${isCreating ? "ing..." : "e"}`}
        </Button>
        {editing ? (
          <Button
            type="button"
            variant={"destructive"}
            onClick={() => deleteMovie({ id: movie.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default MovieForm;
