import type { DataFunctionArgs } from "@remix-run/node";
import { Form, useNavigation } from "@remix-run/react";
import { HeaderCenter } from "~/components/header-center";
import Spinner from "~/components/spinner";
import { authenticator } from "~/services/authenticator.server";
import { returnToCookie } from "~/services/return-to-cookie.server";
import { buildImageUrl } from "~/utils/image";

export async function loader({ request }: DataFunctionArgs) {
  let url = new URL(request.url);
  let returnTo = url.searchParams.get("returnTo");

  let headers = new Headers();
  if (returnTo) {
    headers.append("Set-Cookie", await returnToCookie.serialize(returnTo));
  }

  return await authenticator.isAuthenticated(request, {
    successRedirect: "/",
  });
}

export async function action({ request }: DataFunctionArgs) {
  const url = new URL(request.url);
  const returnTo = url.searchParams.get("returnTo") as string | null;
  const searchParams = new URLSearchParams(url.searchParams);
  searchParams.delete("returnTo");

  const pathname = `${returnTo ?? "/"}?${searchParams.toString()}`;

  try {
    return await authenticator.authenticate("passphrase", request, {
      successRedirect: pathname,
      failureRedirect: "/",
      context: { searchParams: searchParams.toString() },
    });
  } catch (error) {
    if (!returnTo) throw error;
    if (error instanceof Response && isRedirect(error)) {
      error.headers.append(
        "Set-Cookie",
        await returnToCookie.serialize(returnTo)
      );
      return error;
    }
    throw error;
  }
}

function isRedirect(response: Response) {
  if (response.status < 300 || response.status >= 400) return false;
  return response.headers.has("Location");
}

const Login = () => {
  const navigation = useNavigation();

  return (
    <>
      <div
        className={`fixed top-0 z-20 flex h-20 w-full justify-center p-4 text-beige`}
      >
        <HeaderCenter />
      </div>
      <img
        src={buildImageUrl({
          imageName: "login-bg.jpg",
          mode: "landscape",
        })}
        alt="Two people's feet in the heather overlooking a body of water and the sun setting behind some mountains."
        className="fixed left-0 top-0 z-0 h-screen w-full overflow-y-clip bg-fixed object-cover object-bottom"
      />
      <div className="z-1 fixed left-0 top-0 h-full w-full bg-grey-transparent" />
      <div className="flex h-screen items-center justify-center text-beige">
        <div className="z-10 flex h-full max-w-xl flex-col items-center justify-center rounded-md  p-4 lg:h-auto lg:p-8">
          <h1 className="text-center font-roboto text-3xl font-extralight ">
            OH NO! IT LOOKS LIKE YOU'RE NOT LOGGED IN 😢
          </h1>
          <p className="max-w-md p-4 text-center font-thin">
            Enter the provided password you have received in order to gain
            access.
          </p>
          <Form method="post" className="flex w-full flex-col gap-1">
            <input
              name="passphrase"
              placeholder="Password to enter site here"
              type="password"
              className="h-10 w-full rounded-md border-2 border-gray-600 p-3 text-black"
            />
            <button
              className="relative flex justify-center rounded-sm bg-grey p-2 text-beige"
              type="submit"
            >
              {navigation.state === "idle" ? "Submit" : <Spinner />}
            </button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
