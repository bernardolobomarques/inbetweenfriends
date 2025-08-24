
import type { Post } from '@/types';
import { getImagePath } from './images';

const authorBio = "Carolina Bianchi é estudante de direito internacional em Barcelona, natural do Rio de Janeiro. Fluente em quatro idiomas, tem experiência com debates no estilo da ONU e adora compartilhar suas reflexões sobre a vida, amizades e o mundo.";

const posts: Post[] = [
    {
    id: 1,
    slug: 'a-arte-de-viver-com-atencao-plena',
    title: 'A Arte de Viver com Atenção Plena em um Mundo Frenético',
    excerpt: 'Descubra como cultivar a atenção plena e encontrar paz em meio ao caos da vida diária. Práticas simples para uma existência mais presente e gratificante.',
    content: `<p>Em um mundo que exige constantemente nossa atenção, encontrar momentos de paz pode parecer um luxo. No entanto, a atenção plena não é sobre escapar da realidade, mas sim sobre nos ancorarmos nela. É a prática simples de estar ciente do momento presente, sem julgamento. Isso pode ser tão simples quanto prestar atenção à sua respiração por alguns minutos a cada dia, ou saborear seu café da manhã sem a distração do celular.</p><h2>Começando Sua Prática</h2><p>Comece pequeno. Dedique cinco minutos todas as manhãs a um exercício de atenção plena. Você pode usar um aplicativo ou simplesmente sentar-se em silêncio. O objetivo não é limpar a mente, mas observar seus pensamentos à medida que vêm e vão, como nuvens no céu. Com o tempo, essa prática constrói uma base de calma interior que você pode levar consigo ao longo do dia. Você descobrirá que está mais receptiva e menos reativa ao estresse que surge.</p><h3>O Escaneamento Corporal</h3><p>Outra técnica poderosa é a meditação de escaneamento corporal. Deite-se confortavelmente e leve sua atenção a cada parte do seu corpo, dos dedos dos pés ao topo da cabeça. Observe quaisquer sensações – calor, formigamento, tensão – sem a necessidade de mudá-las. Essa prática não apenas relaxa o corpo, mas também fortalece a conexão mente-corpo, promovendo um senso mais profundo de autoconsciência e bem-estar.</p><blockquote>"A melhor maneira de capturar os momentos é prestar atenção. É assim que cultivamos a atenção plena." - Jon Kabat-Zinn</blockquote>`,
    featuredImage: 'mesa-pintura',
    authorName: 'Carolina Bianchi',
    authorImage: '/carolinda.jpg',
    authorBio: authorBio,
    publishDate: '26 de Outubro, 2023',
    date: '2023-10-26T10:00:00Z',
    category: 'Autoconhecimento'
  },
  {
    id: 2,
    slug: 'nutrindo-amizades-o-segredo-para-uma-vida-feliz',
    title: 'Nutrindo Amizades: O Segredo para uma Vida Feliz',
    excerpt: 'Explore a importância de conexões profundas e significativas e aprenda a cultivar amizades que te apoiam e te elevam em todas as estações da vida.',
    content: `<p>A conexão humana está no cerne da nossa felicidade. Embora vivamos em um mundo cada vez mais digital, o valor da verdadeira amizade nunca foi tão importante. São esses relacionamentos que nos acompanham nos dias mais sombrios e celebram conosco nos momentos mais brilhantes. Mas, como qualquer jardim, as amizades precisam ser cuidadas.</p><h2>A Arte de Estar Presente</h2><p>Nutrir uma amizade significa estar presente. Significa guardar o celular quando estão juntas, ouvir com empatia e reservar tempo uma para a outra, mesmo quando a vida fica corrida. São os pequenos gestos: uma mensagem rápida para saber como ela está, lembrar de uma data importante ou simplesmente oferecer um ombro amigo. Qualidade em vez de quantidade é fundamental. Algumas conexões profundas e autênticas são muito mais gratificantes do que uma vasta rede de conhecidos.</p><h3>Abraçando a Vulnerabilidade</h3><p>A vulnerabilidade também é um pilar de amizades fortes. Compartilhar seu verdadeiro eu, incluindo medos e inseguranças, permite que os outros façam o mesmo. Isso cria um espaço de confiança e respeito mútuo onde ambas as pessoas podem crescer. Não tenha medo de tomar a iniciativa. Procure alguém que você admira e sugira um café. Você nunca sabe aonde esse simples ato de coragem pode levar.</p>`,
    featuredImage: 'garota',
    authorName: 'Carolina Bianchi',
    authorImage: '/carolinda.jpg',
    authorBio: authorBio,
    publishDate: '22 de Outubro, 2023',
    date: '2023-10-22T10:00:00Z',
    category: 'Amizade'
  },
  {
    id: 3,
    slug: 'despertando-seu-espirito-criativo',
    title: 'Despertando Seu Espírito Criativo',
    excerpt: 'Todos têm uma centelha criativa. Este post te guia em uma jornada para redescobrir suas paixões criativas, superar a autocrítica e abrir espaço para a criatividade.',
    content: `<p>A criatividade não é exclusividade de artistas e músicos; é uma qualidade humana inata que todos possuímos. Seja na cozinha, na jardinagem, na escrita ou na resolução de problemas, expressar nossa criatividade é vital para uma vida vibrante. Frequentemente, no entanto, as pressões da vida adulta e o medo de não ser "bom o suficiente" podem sufocar esse espírito.</p><h2>Permissão para Brincar</h2><p>Para despertar sua criatividade, primeiro você deve se dar permissão para brincar. Esqueça o resultado e foque no processo. Rabisque sem propósito, dance na sua sala de estar ou escreva uma história apenas para você. Crie um espaço e tempo dedicados às suas atividades criativas, por menores que sejam. Isso sinaliza ao seu cérebro que essa atividade é importante.</p><h3>Silenciando o Crítico Interno</h3><p>Superar o crítico interno é talvez o maior desafio. Quando ouvir aquela voz de autocrítica, reconheça-a e, em seguida, gentilmente a deixe de lado. Lembre-se de que o objetivo não é a perfeição, mas a expressão. Colabore com outras pessoas, faça uma aula ou visite um museu para encontrar inspiração. Quanto mais você se expõe a novas ideias e experiências, mais alimenta seu próprio fogo criativo.</p>`,
    featuredImage: 'mapa',
    authorName: 'Carolina Bianchi',
    authorImage: '/carolinda.jpg',
    authorBio: authorBio,
    publishDate: '18 de Outubro, 2023',
    date: '2023-10-18T10:00:00Z',
    category: 'Criatividade'
  },
    {
    id: 4,
    slug: 'a-alegria-de-viajar-sem-pressa',
    title: 'A Alegria de Viajar Sem Pressa: Conectando-se Profundamente',
    excerpt: 'Vá além da lista de tarefas e abrace uma maneira mais significativa de ver o mundo. Viajar sem pressa é sobre imersão, conexão e criar memórias duradouras.',
    content: `<p>Em nosso mundo acelerado, as férias às vezes podem parecer uma corrida para ver o máximo possível. Viajar sem pressa oferece uma alternativa revigorante. É uma mentalidade que te encoraja a se conectar com um lugar em um nível mais profundo, em vez de apenas passar pela superfície. Em vez de pular de cidade em cidade a cada dois dias, você pode passar uma semana ou mais em um único local, conhecendo o ritmo de vida local.</p><h2>A Beleza da Espontaneidade</h2><p>Essa abordagem permite descobertas espontâneas que muitas vezes são as partes mais memoráveis de uma viagem. Você pode tropeçar em um café escondido, iniciar uma conversa com um artesão local ou encontrar um cantinho favorito em um parque do bairro. Ao ficar mais tempo, você pode apoiar os negócios locais, aprender algumas frases no idioma local e obter uma compreensão mais autêntica da cultura.</p><h3>Sustentável e Enriquecedor</h3><p>Viajar sem pressa também é mais sustentável, tanto para o meio ambiente quanto para o seu próprio bem-estar. Reduz sua pegada de carbono e elimina o estresse de fazer e desfazer malas constantemente. Você volta para casa não exausta, mas genuinamente revigorada e com uma coleção mais rica de histórias e experiências. Então, da próxima vez que planejar uma viagem, considere desacelerar. O mundo tem muito a oferecer quando você reserva um tempo para realmente vê-lo.</p>`,
    featuredImage: 'cabana',
    authorName: 'Carolina Bianchi',
    authorImage: '/carolinda.jpg',
    authorBio: authorBio,
    publishDate: '15 de Outubro, 2023',
    date: '2023-10-15T10:00:00Z',
    category: 'Viagens'
  },
];


export async function getPosts(): Promise<Post[]> {
  // Sort posts by date in descending order (newest first)
  const sortedPosts = posts.map(post => ({
    ...post,
    featuredImage: getImagePath(post.featuredImage)
  })).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return sortedPosts;
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const allPosts = await getPosts();
  return allPosts.find(post => post.slug === slug);
}
