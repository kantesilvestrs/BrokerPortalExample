import { checkAuthentication } from "@/lib/auth";
import { AddPolicyForm } from "./components/add-policy-form";

export default async function PolicyAdd() {
  await checkAuthentication();

  return (
    <div className="w-full h-full flex flex-column justify-center items-center">
      <AddPolicyForm />
    </div>
  );
}
