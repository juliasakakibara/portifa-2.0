import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { config } from "@/config";
import { signOgImageUrl } from "@/lib/og-image";
import Markdown from "react-markdown";

const content = `# About Me

![Julia](./images/euzinha.webp)

UX Engineer, mas não se preocupe: já estou me tratando com arte, terra e um pouco de tinta natural.
Misturo biotecnologia com barro, sensor com pigmento e teoria com prática (quando dá).

Criei esse espaço pra compartilhar minhas experiências com tintas feitas de terra, ideias que ainda não viraram nada e projetos que talvez nunca fiquem prontos.
Gosto de tecnologia, mas também gosto quando as coisas falham e a gente precisa improvisar.

Se você está procurando um caminho linear, receitas prontas ou promessas de sucesso… talvez essa não seja a página certa.
Mas se curte experimentar, se sujar, rir do absurdo e fazer do erro um material de trabalho — então sinta-se em casa.`;

export async function generateMetadata() {
  return {
    title: "About Me",
    description: "Learn more about Samantha and her travel adventures",
    openGraph: {
      title: "About Me",
      description: "Learn more about Samantha and her travel adventures",
      images: [
        signOgImageUrl({
          title: "Samantha",
          label: "About Me",
          brand: config.blog.name,
        }),
      ],
    },
  };
}

const Page = async () => {
  return (
    <div className="container mx-auto px-5">
      <Header />
      <div className="prose lg:prose-lg dark:prose-invert m-auto mt-20 mb-10 blog-content">
        <Markdown>{content}</Markdown>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
