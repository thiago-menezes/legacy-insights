'use client';

import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { Button, Checkbox, FormControl, Text, TextField, View } from 'reshaped';
import { withMask } from 'use-mask-input';
import { Icon } from '@/components';
import { EnrollmentSummary } from '../enrollment-summary';
import { TrustIndicators } from '../trust-indicators';
import { RECAPTCHA_SITE_KEY } from './constants';
import { useCourseEnrollmentSidebar } from './hooks';
import styles from './styles.module.scss';
import { CourseEnrollmentSidebarProps } from './types';

const CourseEnrollmentSidebarContent = ({
  course,
  selectedModalityId,
  selectedUnitId,
  selectedShiftName,
  selectedAdmissionFormCode,
}: CourseEnrollmentSidebarProps) => {
  const {
    handleSubmit,
    formData,
    setFormData,
    formHasTouched,
    isFormValid,
    nameError,
    phoneError,
    privacyError,
    isPending,
    clientApiPrice,
    selectedShiftName: displayShiftName,
    selectedAdmissionFormName,
  } = useCourseEnrollmentSidebar({
    course,
    selectedModalityId,
    selectedUnitId,
    selectedShiftName,
    selectedAdmissionFormCode,
  });

  return (
    <form onSubmit={handleSubmit} className={styles.sidebar} id="enrollment">
      <View className={styles.card}>
        <View className={styles.header}>
          <Icon name="user-plus" size={16} />
          <Text variant="body-3" align="center">
            Preencha seus dados para garantir sua vaga
          </Text>
        </View>

        <View className={styles.form}>
          <FormControl>
            <FormControl.Label>Nome completo</FormControl.Label>
            <TextField
              name="name"
              placeholder="Informe seu nome completo"
              className={styles.field}
              value={formData.name}
              onChange={({ value }) =>
                setFormData({ ...formData, name: value })
              }
              hasError={formHasTouched && !!nameError}
              inputAttributes={{
                required: true,
                pattern: '^\\s*\\S+\\s+\\S+.*$',
                title: 'Informe nome e sobrenome',
                'aria-invalid':
                  formHasTouched && !isFormValid && !formData.name,
              }}
            />
          </FormControl>

          {formHasTouched && nameError && (
            <Text variant="caption-2" color="critical">
              {nameError}
            </Text>
          )}

          <FormControl>
            <FormControl.Label>E-mail</FormControl.Label>
            <TextField
              name="email"
              placeholder="Informe seu e-mail"
              className={styles.field}
              value={formData.email}
              onChange={({ value }) =>
                setFormData({ ...formData, email: value })
              }
              hasError={formHasTouched && !isFormValid && !formData.email}
              inputAttributes={{
                type: 'email',
              }}
            />
          </FormControl>

          {formHasTouched && !formData.email && (
            <Text variant="caption-2" color="critical">
              E-mail é obrigatório
            </Text>
          )}

          <FormControl>
            <FormControl.Label>Telefone/WhatsApp</FormControl.Label>
            <TextField
              name="phone"
              placeholder="(99) 99999-9999"
              className={styles.field}
              value={formData.phone}
              hasError={formHasTouched && !!phoneError}
              onChange={({ value }) =>
                setFormData({ ...formData, phone: value })
              }
              inputAttributes={{
                ref: withMask('(99) 99999-9999'),
                placeholder: '(99) 99999-9999',
              }}
            />
          </FormControl>

          {formHasTouched && phoneError && (
            <Text variant="caption-2" color="critical">
              {phoneError}
            </Text>
          )}
        </View>

        <EnrollmentSummary
          courseName={course.name || ''}
          selectedShift={displayShiftName}
          selectedAdmissionForm={selectedAdmissionFormName}
          promotionalPrice={clientApiPrice?.price}
          monthlyPrice={clientApiPrice?.monthlyPrice}
          unitName={course.unit?.name}
          modality={course.enrollment?.modality}
        />

        <View>
          <Checkbox
            name="privacyAccepted"
            checked={formData.privacyAccepted}
            onChange={({ checked }) =>
              setFormData({ ...formData, privacyAccepted: checked })
            }
            hasError={formHasTouched && !!privacyError}
          >
            <Text variant="caption-1" color="neutral-faded">
              Li e aceito o compartilhamento de dados.
              <br />
              <a
                href="https://www.sereducacional.com/cookieconsent/politica_privacidade.html"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                Política de privacidade <Icon name="external-link" size={16} />
              </a>
            </Text>
          </Checkbox>

          {formHasTouched && privacyError && (
            <View paddingTop={2}>
              <Text variant="caption-1" color="critical">
                {privacyError}
              </Text>
            </View>
          )}
        </View>

        <Button
          color="primary"
          fullWidth
          type="submit"
          size="large"
          className={styles.submitButton}
        >
          {isPending ? 'Verificando...' : 'Quero me inscrever'}
        </Button>

        <TrustIndicators />
      </View>
    </form>
  );
};

export const CourseEnrollmentSidebar = (
  props: CourseEnrollmentSidebarProps,
) => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_SITE_KEY}>
      <CourseEnrollmentSidebarContent {...props} />
    </GoogleReCaptchaProvider>
  );
};
