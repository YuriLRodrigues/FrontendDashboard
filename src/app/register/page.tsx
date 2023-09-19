"use client";

import { useRegister } from "@/hooks/useRegister";
import { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { errorNotification, successNotification } from "@/utils/notications";
import { registerTypeForm } from "@/types/registerForm";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Register() {

  const {data: session} = useSession({
    required: false
  })
  {session && redirect("/dashboard")}

  const { errors, handleSubmit, register, isSubmitting, reset } = useRegister();
  const [showPassword, setShowPassword] = useState<string>("password");
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<string>("password");

  const handleRegister = async (data: registerTypeForm) => {
    
    const userData = {...data, accessName: "user"}

    const createdUser = await fetch(
      "https://backend-dashboard-opal.vercel.app/user",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );

    if (createdUser.ok) {
      reset()
      
      successNotification("Usuário cadastrado com sucesso");
      return setTimeout(() => {
        redirect('/')
      }, 3000)
    }

    errorNotification("Não foi possível cadastrar o usuário")

  };

  return (
    <section className="w-full min-h-screen flex bg-register items-center">
      <ToastContainer />
      <form
        onSubmit={handleSubmit(handleRegister)}
        className="mx-auto marker:px-4 bg-zinc-950/40 shadow-zinc-950/50 backdrop-blur-3xl flex flex-col w-11/12 md:max-w-[600px] items-center rounded-lg justify-center"
      >
        <h2 className="text-white md:text-3xl text-2xl text-center pt-5 font-semibold font-edu">
          Dashboard Register
        </h2>

        <input
          autoComplete="off"
          type="text"
          {...register("name")}
          placeholder="Nome de usuário"
          className={`mt-6 w-8/12 border-b-2 border-zinc-400 text-white placeholder:text-zinc-400 px-2 outline-none bg-transparent my-1 ${
            errors.name?.message &&
            "text-red-500 placeholder:text-red-500 border-red-500"
          }`}
        />
        {errors.name && (
          <p className="font-semibold w-10/12 mx-auto text-red-500 text-xs pt-2 text-center">
            {errors.name.message}
          </p>
        )}

        <input
          autoComplete="off"
          type="text"
          {...register("email")}
          placeholder="E-mail"
          className={`mt-6 w-8/12 border-b-2 border-zinc-400 text-white placeholder:text-zinc-400 px-2 outline-none bg-transparent my-1 ${
            errors.email?.message &&
            "text-red-500 placeholder:text-red-500 border-red-500"
          }`}
        />
        {errors.email && (
          <p className="font-semibold w-10/12 mx-auto text-red-500 text-xs pt-2 text-center">
            {errors.email.message}
          </p>
        )}

        <input
          autoComplete="off"
          type="text"
          {...register("cpf")}
          placeholder="CPF"
          className={`mt-6 w-8/12 border-b-2 border-zinc-400 text-white placeholder:text-zinc-400 px-2 outline-none bg-transparent my-1 ${
            errors.cpf?.message &&
            "text-red-500 placeholder:text-red-500 border-red-500"
          }`}
        />
        {errors.cpf && (
          <p className="font-semibold w-10/12 mx-auto text-red-500 text-xs pt-2 text-center">
            {errors.cpf.message}
          </p>
        )}

        <div className="flex flex-col w-8/12 mx-auto items-center justify-center relative">
          <p
            onClick={() =>
              setShowPassword(showPassword === "password" ? "text" : "password")
            }
            className="cursor-pointer hover:text-zinc-400 duration-200 absolute text-white right-4 top-6"
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
            className={`mt-6 pr-11 w-full border-b-2 border-zinc-400 text-white placeholder:text-zinc-400 px-2 outline-none bg-transparent my-1 ${
              errors.password?.message &&
              "text-red-500 placeholder:text-red-500 border-red-500"
            }`}
          />
          {errors.password && (
            <p className="font-semibold w-10/12 mx-auto text-red-500 text-xs pt-2 text-center">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="flex flex-col w-8/12 mx-auto items-center justify-center relative">
          <p
            onClick={() =>
              setShowConfirmPassword(
                showConfirmPassword === "password" ? "text" : "password"
              )
            }
            className="cursor-pointer hover:text-zinc-400 duration-200 absolute text-white right-4 top-6"
          >
            {showConfirmPassword === "password" ? (
              <AiFillEyeInvisible />
            ) : (
              <AiFillEye />
            )}
          </p>
          <input
            autoComplete="off"
            type={showConfirmPassword}
            {...register("confirmPassword")}
            placeholder="Confirmação de senha"
            className={`mt-6 w-full border-b-2 pr-11 border-zinc-400 text-white placeholder:text-zinc-400 px-2 outline-none bg-transparent my-1 ${
              errors.confirmPassword?.message &&
              "text-red-500 placeholder:text-red-500 border-red-500"
            }`}
          />
          {errors.confirmPassword && (
            <p className="font-semibold w-10/12 mx-auto text-red-500 text-xs pt-2 text-center">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <p className="pt-4 flex gap-2 text-white">Já possui uma conta ? <Link className="underline decoration-white" href={"/"}>Login</Link></p>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`${isSubmitting && "cursor-not-allowed"} text-black font-semibold rounded-lg p-2 my-7 text-center  bg-gradient-to-r from-zinc-100 to-white hover:-translate-y-1 duration-500 shadow-sm shadow-white`}
        >
          {isSubmitting ? "Registrando..." : "Registrar"}
        </button>
      </form>
    </section>
  );
}
