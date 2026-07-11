"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";

const loginSchema = z.object({
  email: z.email("Enter a valid email address"),
  password: z.string().min(1, "Enter your password"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: LoginFormValues) => {
    await authClient.signIn.email(
      { ...values, callbackURL: "/" },
      {
        onSuccess: () => router.push("/"),
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      },
    );
  };

  const isPending = form.formState.isSubmitting;

  return (
    <Card className="overflow-hidden border-white/70 bg-background/85 shadow-2xl shadow-primary/10 backdrop-blur-xl dark:border-white/10 dark:bg-background/80">
      <CardContent className="p-0">
        <div className="border-b border-border/70 bg-muted/35 px-6 pt-0 pb-4 sm:px-8">
          <p className="text-sm font-medium text-primary">Welcome back</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
            Sign in to your workspace
          </h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Pick up exactly where you left off. Your workspace is ready when you
            are.
          </p>
        </div>

        <div className="px-6 py-1 sm:px-8 sm:py-4">
          <div className="grid grid-cols-1 gap-3">
            <Button
              variant="outline"
              type="button"
              disabled={isPending}
              className="h-11 rounded-xl bg-background/70 font-medium"
            >
              <Image
                src={"/logos/google.svg"}
                alt="Google"
                height={20}
                width={20}
              />
              Continue With Google
            </Button>
            <Button
              variant="outline"
              type="button"
              disabled={isPending}
              className="h-11 rounded-xl bg-background/70 font-medium"
            >
              <Image
                src={"/logos/github.svg"}
                alt="Github"
                height={20}
                width={20}
              />
              Continue With GitHub
            </Button>
          </div>

          <div className="my-4 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
            <span className="h-px flex-1 bg-border" />
            Or continue with email
            <span className="h-px flex-1 bg-border" />
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-0">
                    <FormLabel className="text-sm font-medium">
                      Email address
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          type="email"
                          autoComplete="email"
                          placeholder="you@example.com"
                          className="h-11 rounded-xl pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-0">
                    <div className="flex items-center justify-between">
                      <FormLabel className="text-sm font-medium">
                        Password
                      </FormLabel>
                      <button
                        type="button"
                        className="text-xs font-medium text-primary transition-colors hover:text-primary/80"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <FormControl>
                      <div className="relative">
                        <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          type={showPassword ? "text" : "password"}
                          autoComplete="current-password"
                          placeholder="Enter your password"
                          className="h-11 rounded-xl px-10"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((value) => !value)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                        >
                          {showPassword ? (
                            <EyeOff className="size-4" />
                          ) : (
                            <Eye className="size-4" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={isPending}
                className="h-11 w-full rounded-xl text-sm font-semibold shadow-lg shadow-primary/25"
              >
                {isPending ? "Signing you in…" : "Sign in securely"}
                {!isPending && <ArrowRight className="size-4" />}
              </Button>
            </form>
          </Form>

          <p className="mt-7 text-center text-sm text-muted-foreground">
            New to the workspace?{" "}
            <Link
              href="/signup"
              className="font-semibold text-primary underline-offset-4 hover:underline"
            >
              Create an account
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
