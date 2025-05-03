import { Header } from "@/component/Header";
import { Footer } from "@/component/Footer";
import { Main } from "@/component/Main";

export default function Home() {
  return (
    <div className="flex flex-col px-11 gap-4 justify-start">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}
