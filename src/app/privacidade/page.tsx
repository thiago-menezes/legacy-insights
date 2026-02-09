'use client';

import { Text, View } from 'reshaped';
import Link from 'next/link';
import styles from './styles.module.scss';

export default function PrivacidadePage() {
  return (
    <main className={styles.container}>
      <View maxWidth="800px" padding={8}>
        <View paddingBottom={6}>
          <Link href="/login/criar-conta" className={styles.backLink}>
            ← Voltar
          </Link>
        </View>

        <Text variant="featured-1" weight="bold">
          Política de Privacidade
        </Text>

        <View paddingTop={4} gap={4}>
          <Text variant="body-2" color="neutral-faded">
            Última atualização: 08 de Fevereiro de 2026
          </Text>

          <View gap={3}>
            <Text variant="featured-3" weight="bold">
              1. Informações que Coletamos
            </Text>
            <Text variant="body-2" color="neutral-faded">
              Coletamos informações que você nos fornece diretamente, como
              quando cria uma conta, preenche formulários ou entra em contato
              conosco. Isso inclui nome, endereço de e-mail e informações de
              integração com plataformas de vendas.
            </Text>
          </View>

          <View gap={3}>
            <Text variant="featured-3" weight="bold">
              2. Como Usamos Suas Informações
            </Text>
            <Text variant="body-2" color="neutral-faded">
              Utilizamos as informações coletadas para fornecer, manter e
              melhorar nossos serviços, processar transações, enviar
              comunicações relacionadas ao serviço e oferecer suporte ao
              cliente.
            </Text>
          </View>

          <View gap={3}>
            <Text variant="featured-3" weight="bold">
              3. Compartilhamento de Informações
            </Text>
            <Text variant="body-2" color="neutral-faded">
              Não vendemos, alugamos ou compartilhamos suas informações pessoais
              com terceiros para fins de marketing. Podemos compartilhar suas
              informações apenas quando necessário para fornecer o serviço ou
              quando exigido por lei.
            </Text>
          </View>

          <View gap={3}>
            <Text variant="featured-3" weight="bold">
              4. Segurança dos Dados
            </Text>
            <Text variant="body-2" color="neutral-faded">
              Implementamos medidas de segurança técnicas e organizacionais para
              proteger suas informações pessoais contra acesso não autorizado,
              alteração, divulgação ou destruição.
            </Text>
          </View>

          <View gap={3}>
            <Text variant="featured-3" weight="bold">
              5. Integração com Plataformas
            </Text>
            <Text variant="body-2" color="neutral-faded">
              Quando você conecta sua conta a plataformas como Hotmart, Kiwify
              ou outras, coletamos e armazenamos dados necessários para
              sincronização de métricas e relatórios. Estas informações são
              tratadas com a mesma confidencialidade que seus outros dados
              pessoais.
            </Text>
          </View>

          <View gap={3}>
            <Text variant="featured-3" weight="bold">
              6. Seus Direitos
            </Text>
            <Text variant="body-2" color="neutral-faded">
              Você tem o direito de acessar, corrigir ou excluir suas
              informações pessoais a qualquer momento. Entre em contato conosco
              para exercer esses direitos ou para qualquer dúvida relacionada à
              privacidade.
            </Text>
          </View>

          <View gap={3}>
            <Text variant="featured-3" weight="bold">
              7. Cookies e Tecnologias Similares
            </Text>
            <Text variant="body-2" color="neutral-faded">
              Utilizamos cookies e tecnologias similares para melhorar a
              experiência do usuário, analisar o tráfego do site e personalizar
              o conteúdo. Você pode gerenciar suas preferências de cookies
              através das configurações do seu navegador.
            </Text>
          </View>

          <View gap={3}>
            <Text variant="featured-3" weight="bold">
              8. Alterações nesta Política
            </Text>
            <Text variant="body-2" color="neutral-faded">
              Podemos atualizar nossa Política de Privacidade periodicamente.
              Notificaremos você sobre quaisquer alterações publicando a nova
              Política de Privacidade nesta página.
            </Text>
          </View>

          <View gap={3}>
            <Text variant="featured-3" weight="bold">
              9. Contato
            </Text>
            <Text variant="body-2" color="neutral-faded">
              Se você tiver alguma dúvida sobre esta Política de Privacidade,
              entre em contato conosco através do email:
              suporte@blacklegacy.com.br
            </Text>
          </View>
        </View>
      </View>
    </main>
  );
}
