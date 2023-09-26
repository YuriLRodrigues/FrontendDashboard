"use client";
import { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { errorNotification, successNotification } from "@/utils/notications";
import { loginTypeForm } from "@/types/loginForm";
import { useLogin } from "@/hooks/useLogin";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
  const { data: session } = useSession();
  const route = useRouter();

  session && route.push("/dashboard");

  const { errors, handleSubmit, register, isSubmitting, reset } = useLogin();
  const [showPassword, setShowPassword] = useState<string>("password");

  const handleLogin = async (data: loginTypeForm) => {
    const res = await signIn("credentials", {
      redirect: false,
      ...data,
    });
    if (!res?.error) {
      reset();

      successNotification("Login feito com sucesso");

      route.push("/");

    }

    errorNotification("Usuário não encontrado ou credenciais incorretas");
  };

  return (
    <section className="min-h-screen flex items-center bg-login bg-no-repeat bg-cover w-full">
      <ToastContainer />
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="mx-auto marker:px-4 bg-zinc-950/40 shadow-zinc-950/50 backdrop-blur-3xl flex flex-col w-11/12 md:max-w-[600px] items-center rounded-lg justify-center"
      >
        <h2 className="text-white md:text-3xl text-2xl text-center pt-10 pb-5 font-semibold font-edu">
          Dashboard Login
        </h2>

        <input
          autoComplete="off"
          type="text"
          {...register("email")}
          placeholder="E-mail"
          className={`mt-6 w-8/12 border-b-2 border-white text-white placeholder:text-white px-2 outline-none bg-transparent my-1`}
        />
        {errors.email && (
          <p className="w-10/12 mx-auto text-red-500 text-xs font-semibold pt-2 text-center">
            {errors.email.message}
          </p>
        )}

        <div className="flex flex-col w-8/12 mx-auto items-center justify-center relative">
          <p
            onClick={() =>
              setShowPassword(showPassword === "password" ? "text" : "password")
            }
            className="cursor-pointer hover:text-400 duration-200 absolute text-white right-4 top-6"
          >
            {showPassword === "password" ? (
              <AiFillEyeInvisible />
            ) : (
              <AiFillEye />
            )}
          </p>
          <input
            autoComplete="off"
            type={showPassword}
            {...register("password")}
            placeholder="Senha"
            className={`mt-6 pr-11 w-full border-b-2 border-white text-white placeholder:text-white px-2 outline-none bg-transparent my-1`}
          />
          {errors.password && (
            <p className="w-10/12 mx-auto text-red-500 text-xs pt-2 text-center font-semibold">
              {errors.password.message}
            </p>
          )}
        </div>
        <p className="pt-4 flex gap-2 text-white">
          Não possui uma conta ?{" "}
          <Link className="underline decoration-white" href={"/register"}>
            Registrar
          </Link>
        </p>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`${
            isSubmitting && "cursor-not-allowed"
          } text-black rounded-lg p-2 my-7 text-center bg-white hover:-translate-y-1 duration-500 shadow-sm shadow-zinc-300 w-28`}
        >
          {isSubmitting ? "Logando..." : "Login"}
        </button>
      </form>
    </section>
  );
}
