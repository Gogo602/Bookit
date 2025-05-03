import Link from "next/link";

const LoginPage = () => {
    return ( 
        <div class="flex items-center justify-center">
        <div class="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm mt-20">
          <form>
            <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">
              Login
            </h2>

            <div class="mb-4">
              <label htmlFor="email" class="block text-gray-700 font-bold mb-2"
                >Email</label
              >
              <input
                type="email"
                id="email"
                name="email"
                class="border rounded w-full py-2 px-3"
                required
              />
            </div>

            <div class="mb-6">
              <label htmlFor="password" class="block text-gray-700 font-bold mb-2"
                >Password</label
              >
              <input
                type="password"
                id="password"
                name="password"
                class="border rounded w-full py-2 px-3"
                required
              />
            </div>

            <div class="flex flex-col gap-5">
              <button
                type="submit"
                class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Login
              </button>

              <p>
                No account? {" "}
                <Link href="/signup" class="text-blue-500">Register</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
     );
}
 
export default LoginPage;