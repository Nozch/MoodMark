import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { CreateUserInput } from "@/schema/user.schema";
import { trpc } from "@/utils/trpc";
import { useState } from "react";
import dynamic from "next/dynamic";

const LoginForm = dynamic(() => import('@/components/LoginForm'), {ssr: false})
function LoginPage() {
  return <div>
    <LoginForm />
  </div>
}

export default LoginPage;
