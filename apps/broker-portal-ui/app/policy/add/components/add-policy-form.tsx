"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formSchema } from "./add-policy-form.schema";
import { v4 as uuid_v4 } from "uuid";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CrossCircledIcon, PlusIcon } from "@radix-ui/react-icons";

type FormSchemaType = z.infer<typeof formSchema>;

function generateNewInfoLine(): FormSchemaType["lines"][number] {
  return {
    id: uuid_v4(),
    value: "",
  };
}

export function AddPolicyForm() {
  const form = useForm({
    mode: "all",
    resolver: zodResolver(formSchema),
    defaultValues: {
      policyName: "",
      lines: [generateNewInfoLine(), generateNewInfoLine()],
    },
  });

  const formLines = useFieldArray({
    control: form.control,
    name: "lines",
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  function onAddInfoLine() {
    formLines.append(generateNewInfoLine());
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card className="w-[350px]">
          <CardHeader className="flex items-center">
            <CardTitle>Add Policy Form</CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="policyName"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Policy Name</FormLabel>
                  <FormControl>
                    <Input autoFocus placeholder="Policy Name" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the name of the policy.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {formLines.fields.map((lineField, index) => (
              <FormField
                key={lineField.id}
                control={form.control}
                name={`lines.${index}.value`}
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>{`Info Line ${index + 1}`}</FormLabel>
                    <FormControl>
                      <div className="w-full flex flex-row">
                        <Input
                          placeholder={`Info Line ${index + 1}`}
                          {...field}
                        />
                        <Button
                          type="button"
                          onClick={() => formLines.remove(index)}
                          variant="destructive"
                          size="icon"
                          className="ml-2"
                        >
                          <CrossCircledIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" onClick={onAddInfoLine}>
              <PlusIcon className="mr-2 h-4 w-4" />
              Add Info Line
            </Button>
            <Button type="submit" disabled={!form.formState.isValid}>
              Submit Policy
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
