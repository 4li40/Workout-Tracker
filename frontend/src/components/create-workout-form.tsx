import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
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
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Loader2 } from "lucide-react";
import { API_BASE_URL } from "@/config";

const formSchema = z.object({
  name: z.string().min(2).max(50),
});

export default function CreateWorkoutForm({
  onClose,
}: {
  onClose?: () => void;
}) {
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const session = await authClient.getSession();
        const id = session?.data?.user?.id;
        if (id) {
          setUserId(id);
        } else {
          console.error("User not authenticated");
        }
      } catch (error) {
        console.error("Error fetching session:", error);
      }
    };

    fetchUserId();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    if (!userId) {
      toast.error("User not authenticated");
      setIsLoading(false);
      return;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/workouts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          title: values.name,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create workout");
      }

      toast.success("Workout created!");
      form.reset();
      if (onClose) onClose(); // <-- Close the dialog
      navigate("/dashboard");
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      toast.error(errorMessage || "Failed to create workout");
      console.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Workout Name</FormLabel>
              <FormControl>
                <Input placeholder="Workout Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading} type="submit">
          {isLoading ? <Loader2 className="animate-spin" /> : "Create Workout"}
        </Button>
      </form>
    </Form>
  );
}
