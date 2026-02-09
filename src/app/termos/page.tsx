'use client';

import { Text, View } from 'reshaped';
import Link from 'next/link';
import styles from './styles.module.scss';

export default function TermosPage() {
  return (
    <main className={styles.container}>
      <View maxWidth="800px" padding={8}>
        <View paddingBottom={6}>
          <Link href="/login/criar-conta" className={styles.backLink}>
            ← Voltar
          </Link>
        </View>

        <Text variant="featured-1" weight="bold">
          Termos de Uso
        </Text>

        <View paddingTop={4} gap={4}>
          <Text variant="body-2" color="neutral-faded">
            Última atualização: 08 de Fevereiro de 2026
          </Text>

          <View gap={3}>
            <Text variant="featured-3" weight="bold">
              1. Aceitação dos Termos
            </Text>
            <Text variant="body-2" color="neutral-faded">
              Ao acessar ou usar o Legacy Insights, você concorda em estar
              vinculado a estes Termos de Uso. Se você não concordar com
              qualquer parte destes termos, não poderá acessar o serviço.
            </Text>
          </View>

          <View gap={3}>
            <Text variant="featured-3" weight="bold">
              2. Descrição do Serviço
            </Text>
            <Text variant="body-2" color="neutral-faded">
              O Legacy Insights é uma plataforma de análise e gestão de dados
              para infoprodutores, oferecendo integração com plataformas de
              vendas, análise de métricas e relatórios personalizados.
            </Text>
          </View>

          <View gap={3}>
            <Text variant="featured-3" weight="bold">
              3. Conta do Usuário
            </Text>
            <Text variant="body-2" color="neutral-faded">
              Você é responsável por manter a confidencialidade de sua conta e
              senha. Você concorda em aceitar a responsabilidade por todas as
              atividades que ocorram sob sua conta.
            </Text>
          </View>

          <View gap={3}>
            <Text variant="featured-3" weight="bold">
              4. Uso Aceitável
            </Text>
            <Text variant="body-2" color="neutral-faded">
              Você concorda em não usar o serviço para qualquer finalidade
              ilegal ou proibida por estes Termos. Você não pode usar o serviço
              de qualquer maneira que possa danificar, desativar ou prejudicar o
              serviço.
            </Text>
          </View>

          <View gap={3}>
            <Text variant="featured-3" weight="bold">
              5. Propriedade Intelectual
            </Text>
            <Text variant="body-2" color="neutral-faded">
              O serviço e seu conteúdo original, recursos e funcionalidades são
              e permanecerão propriedade exclusiva do Legacy Insights e seus
              licenciadores.
            </Text>
          </View>

          <View gap={3}>
            <Text variant="featured-3" weight="bold">
              6. Limitação de Responsabilidade
            </Text>
            <Text variant="body-2" color="neutral-faded">
              Em nenhum caso o Legacy Insights será responsável por quaisquer
              danos indiretos, incidentais, especiais, consequenciais ou
              punitivos, incluindo, sem limitação, perda de lucros, dados, uso
              ou outras perdas intangíveis.
            </Text>
          </View>

          <View gap={3}>
            <Text variant="featured-3" weight="bold">
              7. Alterações nos Termos
            </Text>
            <Text variant="body-2" color="neutral-faded">
              Reservamo-nos o direito de modificar ou substituir estes Termos a
              qualquer momento. Notificaremos sobre quaisquer alterações
              publicando os novos Termos nesta página.
            </Text>
          </View>

          <View gap={3}>
            <Text variant="featured-3" weight="bold">
              8. Contato
            </Text>
            <Text variant="body-2" color="neutral-faded">
              Se você tiver alguma dúvida sobre estes Termos, entre em contato
              conosco através do email: suporte@blacklegacy.com.br
            </Text>
          </View>
        </View>
      </View>
    </main>
  );
}
