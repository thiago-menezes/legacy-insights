'use client';

import { useState, useEffect } from 'react';
import {
  Button,
  Checkbox,
  Divider,
  FormControl,
  Link,
  Text,
  TextField,
  View,
} from 'reshaped';
import { useLoginForm } from '@/features/auth/hooks';
import styles from './styles.module.scss';
import { Icon } from '@/components/icon';

export default function LoginV2Page() {
  const { form, isLoading, onSubmit, error } = useLoginForm();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const {
    formState: { errors, isSubmitted },
    setValue,
    watch,
    register,
    trigger,
  } = form;

  useEffect(() => {
    register('identifier');
    register('password');
  }, [register]);

  const identifier = watch('identifier');
  const password = watch('password');

  return (
    <>
      <View paddingBottom={8}>
        <Text variant="title-6" weight="bold" className={styles.headerText}>
          Entrar na Plataforma
        </Text>
        <Text variant="body-2" color="neutral-faded">
          Bem-vindo de volta! Insira seus dados para continuar.
        </Text>
      </View>

      <View gap={4} width="100%">
        <form onSubmit={onSubmit}>
          <View gap={6}>
            <FormControl hasError={!!errors.identifier}>
              <FormControl.Label>Endereço de E-mail</FormControl.Label>
              <TextField
                size="large"
                name="identifier"
                placeholder="exemplo@legacy.com"
                value={identifier || ''}
                onChange={({ value }) => {
                  setValue('identifier', value);
                  if (isSubmitted) trigger('identifier');
                }}
                startSlot={<Icon name="mail" />}
                inputAttributes={{
                  required: true,
                  autoComplete: 'email',
                }}
              />
              {errors.identifier?.message && (
                <FormControl.Error>
                  {errors.identifier.message}
                </FormControl.Error>
              )}
            </FormControl>

            <FormControl hasError={!!errors.password}>
              <FormControl.Label>Sua Senha</FormControl.Label>
              <TextField
                size="large"
                name="password"
                placeholder="••••••••"
                value={password || ''}
                onChange={({ value }) => {
                  setValue('password', value);
                  if (isSubmitted) trigger('password');
                }}
                startSlot={<Icon name="key" />}
                endSlot={
                  <Button
                    variant="ghost"
                    icon={<Icon name={showPassword ? 'eye' : 'eye-off'} />}
                    onClick={() => setShowPassword(!showPassword)}
                  />
                }
                inputAttributes={{
                  required: true,
                  type: showPassword ? 'text' : 'password',
                  autoComplete: 'current-password',
                }}
              />

              {errors.password?.message && (
                <FormControl.Error>{errors.password.message}</FormControl.Error>
              )}
            </FormControl>

            <View
              direction="row"
              align="center"
              justify="space-between"
              gap={4}
            >
              <View direction="row" align="center" gap={4}>
                <Checkbox
                  name="remember-me"
                  checked={rememberMe}
                  onChange={({ checked }) => setRememberMe(checked)}
                >
                  <Text variant="body-3" color="neutral-faded">
                    Lembrar-me
                  </Text>
                </Checkbox>
              </View>
              <Link color="primary" href="/login/esqueci-senha">
                Esqueceu a senha?
              </Link>
            </View>

            <Button
              type="submit"
              color="primary"
              size="large"
              fullWidth
              loading={isLoading}
              disabled={isLoading}
            >
              {isLoading ? 'Entrando...' : 'Entrar agora'}
            </Button>
          </View>
        </form>

        {error && (
          <Text
            color="critical"
            variant="caption-1"
            attributes={{ className: styles.errorMessage }}
          >
            {error}
          </Text>
        )}

        <View position="relative" gap={4}>
          <View
            position="absolute"
            inset={0}
            align="center"
            justify="center"
            zIndex={0}
          >
            <Divider />
          </View>
          <View
            position="relative"
            justify="center"
            align="center"
            gap={2}
            zIndex={10}
          >
            <Text
              variant="body-3"
              color="neutral-faded"
              className={styles.dividerText}
            >
              Ou continue com
            </Text>
          </View>
        </View>

        <View direction="row" gap={4} paddingBottom={4} justify="center">
          <Button
            variant="outline"
            fullWidth
            icon={<Icon name="brand-google" />}
            onClick={() => alert('Login com Google ainda não implementado')}
            disabled
          >
            Google
          </Button>
          <Button
            variant="outline"
            fullWidth
            icon={<Icon name="brand-facebook" />}
            onClick={() => alert('Login com Facebook ainda não implementado')}
            disabled
          >
            Facebook
          </Button>
        </View>
      </View>

      <View className="mt-8" textAlign="center">
        <Text variant="body-3" color="neutral-faded">
          Não tem uma conta?{' '}
          <Link href="/login/criar-conta" color="primary">
            Cadastre-se
          </Link>
        </Text>
      </View>
    </>
  );
}
