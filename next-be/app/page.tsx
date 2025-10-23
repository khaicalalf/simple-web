import SignUpPage from "./signup/page";

export default function Home() {
  return (
    <div className="flex justify-items-center flex-col mockup-window border border-base-300 w-full">
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Hello there</h1>
            <SignUpPage />
          </div>
        </div>
      </div>
    </div>
  );
}
